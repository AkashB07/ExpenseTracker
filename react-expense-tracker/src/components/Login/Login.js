import { useRef, Fragment } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const url = 'http://localhost';

const Login = () => {
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const loginHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;

            const loginDetails = {
                email: enteredEmail,
                password: enteredPassword
            }

            const respone = await axios.post(`${url}:4000/user/login`, loginDetails)
            if (respone.data.success) {
                alert(respone.data.message);
                localStorage.setItem('token', respone.data.token)
                history.push('/');
            }
            else {
                throw new Error('Failed to Login');
            }
        }

        catch (error) {
            alert(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h1 className="text-center">Login</h1><br /><br /><br /><br />

                <div className="col-md-4">
                    <form id="loginform" onSubmit={loginHandler}>

                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required ref={emailInputRef}
                            />
                        </div><br />

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required ref={passwordInputRef}
                            />
                        </div><br />

                      
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">Login</Button><br />
                            <p className="text-center"> <Link to="/signup">New User? Signup</Link></p><br />
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>

    );
};

export default Login;