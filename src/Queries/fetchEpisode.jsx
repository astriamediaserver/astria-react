import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

const FETCH_EPISODE = gql`
    query episode($uuid: String!) {
        episode(uuid: $uuid) {
          name
          overview
          airDate

          playState{
            finished
            playtime
          }
            files {
                fileName
                uuid
                totalDuration
                streams {
                    codecMime
                    streamType
                }
            }
        }
    }
`;

const FetchEpisode = ({ uuid }) => (
  <Query
    query={FETCH_EPISODE}
    variables={{ uuid }}
  >

    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return `Error! ${error.message}`;
      const { episode } = data;

      return (<MediaItem type="episode" {...episode} />);
    }}

  </Query>
);

export default FetchEpisode;
