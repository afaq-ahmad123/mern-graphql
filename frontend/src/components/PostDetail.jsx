import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, Grid, Icon, Image, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { CREATE_COMMENT, GET_POST } from "../utils/graphqlQueries";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";


export default function DetailPage () {
    const [comment, setComment] = useState('');
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data } = useQuery(GET_POST, {
        variables: {
            postId
        }
    });
    function deleteCallback () {
        return navigate('/');
    }

    const [addComment] = useMutation(CREATE_COMMENT, {
        variables: {
            postId,
            content: comment
        },
        update() {
            setComment('');
        }
    })

    const post = data?.getPost;
    if (!post) return <h1>Loading...</h1>

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{post?.username}</Card.Header>
                            <Card.Meta>{moment(post?.createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{post?.content}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton post={{ id: post.id, likes: post.likes, likesCount: post.likesCount }} />
                            <Button labelPosition="right" as={Link} to={`/post/${post.id}`}>
                                <Button color="blue" basic>
                                    <Icon name="comments" />
                                </Button>
                                <Label basic color="blue" pointing="left">
                                    {post?.commentsCount}
                                </Label>
                            </Button>
                            {(user.username === post.username) && <DeletePost postId={post.id} callback={deleteCallback} />}
                        </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                                <p>Add Comment</p>
                                <Form onSubmit={addComment}>
                                    <div className="ui input field action">
                                        <input
                                            value={comment}
                                            placeholder="Add Comment"
                                            onChange={({target}) => setComment(target?.value)}
                                        />
                                        <button type="submit" className="ui button teal">
                                            Add
                                        </button>
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {post?.comments?.map((comment, index) => (
                        <Card key={index} fluid>
                            <Card.Content>
                                {user && user.username === comment.username && <DeletePost postId={post?.id} commentId={comment?.id} />}
                                <Card.Header>{comment?.username}</Card.Header>
                                <Card.Meta>{moment(comment?.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment?.content}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}