// @flow
import React, { useState } from 'react';

import Sort from 'Components/Header/Sort';
import Stats from 'Components/Header/Stats';

import MEDIA_STATS from 'Queries/fetchMediaStats';
import { useQuery } from '@apollo/client';
import Loading from 'Components/Loading';
import { ErrorWrap } from 'Components/Error/Styles';

import { getLocalStorage, setLocalStorage } from 'Helpers';
import RenderMovieList from './RenderMovieList';

import { LibraryListWrap, RenderListWrap, SortRow } from '../Styles';

const MovieList = () => {
    const type = "movie";

    const sortValues = [{ value: 'title', label: 'Title'}, { value: 'releaseDate', label: 'Release Date' }];
    const sortDirections = [{ value: 'asc', label: 'Ascending'}, { value: 'desc', label: 'Descending' }];
    
    const [sortOrder, setSortOrder] = useState(getLocalStorage(type, "sortOrder") || sortValues[0]);
    const [sortDirection, setSortDirection] = useState(getLocalStorage(type, "sortDirection") || sortDirections[0]);
        
    const { loading, error, data } = useQuery(MEDIA_STATS);

    if (loading) return <Loading />;
    if (error) return <ErrorWrap>{`Error! ${error.message}`}</ErrorWrap>;

    const { movieCount } = data.mediaStats;

    return (
        <LibraryListWrap>
            <SortRow>
                <Stats type="movies" count={movieCount} />
                <Sort
                    type={type}
                    sortOrder={sortOrder}
                    sortDirection={sortDirection}
                    setSortOrder={setSortOrder}
                    setSortDirection={setSortDirection}
                    setLocalStorage={setLocalStorage}
                    getLocalStorage={getLocalStorage}
                    sortValues={sortValues}
                    sortDirections={sortDirections}
                />
            </SortRow>
            <RenderListWrap>
                <RenderMovieList
                    sortOrder={sortOrder.value}
                    sortDirection={sortDirection.value}
                    count={movieCount}
                />
            </RenderListWrap>
        </LibraryListWrap>
    )
};

export default MovieList;
