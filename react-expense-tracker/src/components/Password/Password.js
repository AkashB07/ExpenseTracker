import { useRef, Fragment } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const url = 'http://localhost';

const Password = () => {
    const history = useHistory();
    const emailInputRef = useRef();

    const passwordHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredEmail = emailInputRef.current.value;

            const loginDetails = {
                email: enteredEmail
            }

            const respone = await axios.post(`${url}:4000/password/forgotpassword`, loginDetails)
            console.log(respone)
            if (respone.status === 200) {
                console.log("Mail Successfuly sent");
                const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDjqOQY_V4SVhSavTu5M9Y4qf1NFLRbo_0",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            requestType: "PASSWORD_RESET",
                            email: enteredEmail,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                if (res.ok) {
                    alert("Reset Link Sent");
                }
            } else {
                throw new Error('Something went wrong!!!')
            }

            // if (respone.data.success) {
            //     alert(respone.data.message);
            //     localStorage.setItem('token', respone.data.token);

            // const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDjqOQY_V4SVhSavTu5M9Y4qf1NFLRbo_0",
            //     {
            //         method: "POST",
            //         body: JSON.stringify({
            //             requestType: "PASSWORD_RESET",
            //             email: enteredEmail,
            //         }),
            //         headers: {
            //             "Content-Type": "application/json",
            //         }
            //     }
            // )
            // if (res.ok) {
            //     alert("Reset Link Sent");
            // }
            // const data = await res.json();
            // localStorage.setItem("tokenID", data.idToken);

            // history.push('/');
            // }
            // else {
            //     throw new Error('Failed to Login');
            // }
        }

        catch (error) {
            // alert(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h1 className="text-center">Reset Password</h1><br /><br /><br /><br />

                <div className="col-md-4">
                    <form id="loginform" onSubmit={passwordHandler}>

                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required ref={emailInputRef}
                            />
                        </div><br />

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">Reset</Button>
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>

    );
};

export default Password;