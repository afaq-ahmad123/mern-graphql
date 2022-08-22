import { Button, Card, Image } from "semantic-ui-react";
import moment from 'moment';
import { Link } from 'react-router-dom';


export default function PostCard({ post }) {
    console.log(post);
    return (
        <Card>
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
                <Button as="div" labelPosition="right">

                </Button>
            </Card.Content>
        </Card>
    );
}