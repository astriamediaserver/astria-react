import React from 'react'
import gql from "graphql-tag"
import { Query } from "react-apollo"

import Movie from 'Components/Media/Movie'

const FETCH_MOVIE = uuid => gql`
    {
        movies(uuid: "${uuid}") {
            title
            year
            overview
            imdb_id
            backdrop_path
            uuid

            files {
                file_name
                uuid
                streams{
                    codec_mime
                    stream_type
                }
            }
        }
    }
`

const FetchMovie = ({ uuid, autoplay }) => {
    return (
        <Query
            query={FETCH_MOVIE(uuid)}
        >

            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                let movie = data.movies[0];

                return (<Movie {...movie} />);
            }}

        </Query>
    )
};

export default FetchMovie
