import React from "react";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { DELETE_COMMENT, DELETE_POST, GET_POSTS } from "../utils/graphqlQueries";


export default function DeletePost ({ postId, commentId, callback}) {
    const [confirmOpen, setConfirm] = useState(false);

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostOrComment] = useMutation(mutation, {
        variables: { postId, commentId },
        update(proxy) {
            setConfirm(false);
            if(!commentId) {
                const data = proxy.readQuery({ query: GET_POSTS });
                proxy.writeQuery({ query: GET_POSTS, data: { getPosts: data.getPosts.filter(post => post.id !== postId)}})
            }
            if (callback) callback();
        }
    })

    return (
        <>
            <Popup
                content="Delete Button"
                trigger={
                    <Button color="red" floated="right" onClick={() => setConfirm(true)}>
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                }
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirm(false)}
                onConfirm={deletePostOrComment}
            />
        </>
    );
}