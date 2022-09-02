import React from "react";
import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";


export default function PostCard({ post }) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{post.username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${post.id}`}>{moment(post.createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{post.content}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{ id: post.id, likes: post.likes, likesCount: post.likesCount }} />
                <Popup
                    content="Comment on Post"
                    trigger={
                        <Button labelPosition="right" as={Link} to={`/post/${post.id}`}>
                            <Button color="blue" basic>
                                <Icon name="comments" />
                            </Button>
                            <Label basic color="blue" pointing="left">
                                {post.commentsCount}
                            </Label>
                        </Button>
                    }
                />
                {(user.username === post.username) && <DeletePost postId={post.id} />}
            </Card.Content>
        </Card>
    );
}