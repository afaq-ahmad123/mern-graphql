import React from 'react';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react'
import { AuthContext } from '../context/auth';
import { GET_POSTS } from '../utils/graphqlQueries';
import AddPost from './AddPost';
import Card from './Card';

function Home () {
    const { loading, error, data } = useQuery(GET_POSTS);
    const { user } = useContext(AuthContext);
    return (
        <Grid columns={3}>
            <Grid.Row padded="false">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <AddPost />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading Posts...</h1>
                ) : (
                    <Transition.Group>
                        {data?.getPosts?.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <Card post={post} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Home;
