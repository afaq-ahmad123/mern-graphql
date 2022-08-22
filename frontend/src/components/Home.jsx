import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react'
import Card from './Card';

function Home () {
    const { loading, error, data } = useQuery(GET_POSTS);

    console.log(data);
    return (
        <Grid columns={3} divided>
            <Grid.Row>
                Recent Posts
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading Posts...</h1>
                ) : (
                    data?.getPosts?.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <Card post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
};

const GET_POSTS = gql`
    {
        getPosts {
            id content username createdAt
            comments {
            content
            id
            }
            likes {
            username
            id
            }
            likesCount
            commentsCount
        }
    }
`;

export default Home;
