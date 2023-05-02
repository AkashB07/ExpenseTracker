import { useRef, Fragment } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const url = 'http://localhost';
const token = localStorage.getItem('token');

const Profile = () => {
    const history = useHistory();
    const nameInputRef = useRef();
    const photoUrlInputRef = useRef();
    
    const profileHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredname = nameInputRef.current.value;
            const enteredphotoUrl = photoUrlInputRef.current.value;

            const profileDetails = {
                name: enteredname,
                photourl: enteredphotoUrl
            }

            const respone = await axios.post(`${url}:4000/user/profile`, profileDetails, {headers: {"Authorization" : token}})
            if (respone.data.success) {
                alert(respone.data.message);
                history.push('/');
            }
            else {
                throw new Error('Failed to Update');
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h1 className="text-center">Profile Details</h1><br /><br /><br /><br />

                <div className="col-md-4">
                    <form id="loginform" onSubmit={profileHandler}>

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
                            <label>Profile Photo Url</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Profile Photo Url"
                                required ref={photoUrlInputRef}
                            />
                        </div><br />

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">Update</Button><br />
                        </div>

                    </form><br /><br /><br />
                </div>
            </div>
        </Fragment>

    );
};

export default Profile;