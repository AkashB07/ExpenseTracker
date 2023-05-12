import { Fragment, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";


const url = 'http://localhost';

const Leaderboard = () => {

    const token = useSelector(state => state.auth.token);
    const [user, setUser] = useState([]);

    const getLeaderboard = useCallback(async () => {
        try {
            const response = await axios.get(`${url}:4000/leaderboard/getData`, { headers: { "Authorization": token } });
            const data = response.data;
            data.sort((a, b) => parseFloat(b.totalexpense) - parseFloat(a.totalexpense));
            const u = [];
            data.forEach( data => {
                u.push(data);
            });
            
            setUser([...u]);

        }
        catch (error) {
            console.log(error);
        }

    }, [])

    useEffect(() => {
        getLeaderboard();
    }, [getLeaderboard]);

    let i = 0;
    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h2 className="text-center fw-bold">Leaderboard</h2><br /><br /><br /><br />

                <div className="row justify-content-center">
                    <div className="col-md-10" >
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th><h5 className="fw-bold">Rank</h5></th>
                                    <th><h5 className="fw-bold">Name</h5></th>
                                    <th><h5 className="fw-bold">Total</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((user) => {
                                    return (
                                        <tr key={user._doc._id}>
                                            <td>{++i}</td>
                                            <td>{user._doc.name}</td>
                                            <td>₹ {user.totalexpense}</td>
  
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table><br /><br />
                    </div>
                </div>

                
            </div>

        </Fragment>
    );
};

export default Leaderboard;