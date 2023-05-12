import { Fragment, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {  useSelector } from "react-redux";


const url = 'http://localhost';

const Report = () => {

    const [day, setDay] = useState([]);
    const [week, setWeek] = useState([]);
    const [month, setMonth] = useState([]);

    const token = useSelector(state => state.auth.token);

    const getExpensHandler = useCallback(async () => {
        try {
            const day = await axios.get(`${url}:4000/report/getDailyExpenses`, { headers: { "Authorization": token } });
            let d = []
            day.data.forEach(day => {
                d.push(day)
            });
            setDay([...d]);

            const week = await axios.get(`${url}:4000/report/getWeeklyExpenses`, { headers: { "Authorization": token } });
            let w = []
            week.data.forEach(week => {
                w.push(week)
            });
            setWeek([...w]);

            const month = await axios.get(`${url}:4000/report/getMonthlyExpenses`, { headers: { "Authorization": token } });
            let m = []
            month.data.forEach(month => {
                m.push(month)
            });
            setMonth([...m]);

        }
        catch (error) {
            console.log(error);
        }

    }, [])

    useEffect(() => {
        getExpensHandler();
    }, [getExpensHandler]);


    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h2 className="text-center fw-bold">Report</h2><br /><br /><br /><br />

                <div className="row justify-content-center">
                    <div className="col-md-10" >
                        <h4 className="text-center fw-bold">Daily Expenses</h4>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th><h5 className="fw-bold">Amount</h5></th>
                                    <th><h5 className="fw-bold">Description</h5></th>
                                    <th><h5 className="fw-bold">Category</h5></th>
                                    <th><h5 className="fw-bold">Added on</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {day.map((expense) => {
                                    return (
                                        <tr key={expense._id}>
                                            <td>{expense.amount}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.category}</td>
                                            <td>{expense.createdAt.slice(0,10)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table><br /><br />
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-10" >
                        <h4 className="text-center fw-bold">Weekly Expenses</h4>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th><h5 className="fw-bold">Amount</h5></th>
                                    <th><h5 className="fw-bold">Description</h5></th>
                                    <th><h5 className="fw-bold">Category</h5></th>
                                    <th><h5 className="fw-bold">Added on</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {week.map((expense) => {
                                    return (
                                        <tr key={expense._id}>
                                            <td>{expense.amount}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.category}</td>
                                            <td>{expense.createdAt.slice(0,10)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table><br /><br />
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-10" >
                        <h4 className="text-center fw-bold">Monthly Expenses</h4>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th><h5 className="fw-bold">Amount</h5></th>
                                    <th><h5 className="fw-bold">Description</h5></th>
                                    <th><h5 className="fw-bold">Category</h5></th>
                                    <th><h5 className="fw-bold">Added on</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {month.map((expense) => {
                                    return (
                                        <tr key={expense._id}>
                                            <td>{expense.amount}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.category}</td>
                                            <td>{expense.createdAt.slice(0,10)}</td>
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

export default Report;