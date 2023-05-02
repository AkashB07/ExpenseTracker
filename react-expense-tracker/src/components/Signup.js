import { useRef, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const url = 'http://localhost';

const Signup = () => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const singnuptHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredName = nameInputRef.current.value;
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;
            const enteredConfirmPassword = confirmPasswordInputRef.current.value;

            if (enteredPassword !== enteredConfirmPassword) {
                alert("Password should be same");
                return;
            }

            const signupDetails = {
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword
            }

            const respone = await axios.post(`${url}:4000/user/signup`, signupDetails)
            if (respone.status === 201) {
                alert(respone.data.message);
            }
            else {
                throw new Error('Failed to Signup')
            }
        }

        catch (error) {
            console(error);
        }
    }

    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h1 className="text-center">Sign Up</h1><br /><br /><br /><br />

                <div className="col-md-4">
                    <form id="loginform" onSubmit={singnuptHandler}>

                    <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                required ref={nameInputRef}
                            />
                        </div><br />

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

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                required ref={confirmPasswordInputRef}
                            />
                        </div><br />

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">Signup </Button><br />
                            <p className="text-center"> <Link to="/login">Already Registered? Login</Link></p><br />
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>

    );
};

export default Signup;