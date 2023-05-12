import { useRef, Fragment } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth';
import { themesActions } from "../../store/theme";

const url = 'http://localhost';

const Login = () => {
    const dispatch = useDispatch();
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

            const respone = await axios.post(`${url}:4000/user/login`, loginDetails);

            if (respone.data.success) {
                dispatch(authActions.login({ token: respone.data.token, ispremiumuser: respone.data.user.ispremiumuser }));
                dispatch(themesActions.themeLog(respone.data.user.ispremiumuser));
                alert(respone.data.message);

                history.push('/home');
            }
            else {
                throw new Error('Failed to Login');
            }
        }

        catch (error) {
            console.log(error);
            alert(error.response.data.message)
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
                            <p className="text-center"> <Link to="/password">Forgot Password?</Link></p>
                            <Button type="submit" variant="primary" size="lg">Login</Button>
                            <p className="text-center"> <Link to="/signup">New User? Signup</Link></p><br />
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>

    );
};

export default Login;