import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../utils/graphqlQueries";
import { useForm } from "../utils/hooks";


function Register () {
    const [error, setError] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const {formData, onChange, onSubmit } = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, registerCallBack);

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register } }) {
            login(register);
            navigate('/');
        },
        onError(err) {
            setError(err.graphQLErrors[0]?.extensions.errors);
        },
        variables: formData
    });

    function registerCallBack() {
        return registerUser();
    }


    return (<div>
        <Form onSubmit={onSubmit} noValidate loading={loading}>
            <h1>Register</h1>
            <Form.Input 
                label="Username"
                placeholder="Username"
                name="username"
                type="text"
                error={!!error?.username}
                value={formData?.username}
                onChange={onChange}
            />
            <Form.Input 
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                error={!!error?.email}
                value={formData?.email}
                onChange={onChange}
            />
            <Form.Input 
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                error={!!error?.password}
                value={formData?.password}
                onChange={onChange}
            />
            <Form.Input 
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                error={!!error?.confirmPassword}
                value={formData?.confirmPassword}
                onChange={onChange}
            />
            <Button type="submit" primary>Register</Button>
        </Form>
        {error && !!Object.keys(error)?.length && 
            <div className="ui error message">
                <ul className="list">
                    {Object.values(error)?.map((value, index) => <li key={index}>{value}</li>)}
                </ul>
            </div>
        }
    </div>);
};

export default Register;
