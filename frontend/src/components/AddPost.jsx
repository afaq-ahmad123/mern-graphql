import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { CREATE_POST, GET_POSTS } from "../utils/graphqlQueries";
import { useForm } from "../utils/hooks";

export default function AddPost() {
    const {formData, onChange, onSubmit } = useForm({ content: '' }, createPostCallback);

    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: formData,
        update(proxy, result) {
            console.log(result);
            const data = proxy.readQuery({
                query: GET_POSTS
            });
            const newData = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: GET_POSTS, data: {getPosts: newData} });
            formData.content = '';
        },
    });

    function createPostCallback () {
        return createPost();
    }
    return (
    <div>
        <Form onSubmit={onSubmit}>
            <h1>Create Post</h1>
            <Form.Field>
                <Form.Input
                    placeholder="Enter Post"
                    name="content"
                    value={formData?.content}
                    onChange={onChange}
                    error={!!error}
                />
            </Form.Field>
            <Button color="teal" type="submit">Add Post</Button>
        </Form>
        {error && !!Object.keys(error)?.length && 
            <div className="ui error message" style={{ marginBottom: 20 }}>
                <ul className="list">
                    <li>{error.graphQLErrors[0]?.message}</li>
                </ul>
            </div>
        }
    </div>
    );
};
