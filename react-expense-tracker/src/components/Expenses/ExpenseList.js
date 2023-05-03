import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ExpenseList = (props) => {
    return (
        <div className="row justify-content-center">
            <div className="col-md-10">
                <Table striped>
                    <thead>
                        <tr>
                            <th><h5 className="fw-bold">Amount</h5></th>
                            <th><h5 className="fw-bold">Description</h5></th>
                            <th><h5 className="fw-bold">Category</h5></th>
                            <th><h5 className="fw-bold">Edit</h5></th>
                            <th><h5 className="fw-bold">Delete</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((expense) => {
                            return (
                                <tr key={expense._id}>
                                    <td>{expense.amount}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.description}</td>
                                    <td><Button type="submit" variant="info" size="sm">Edit</Button></td>
                                    <td><Button type="submit" variant="danger" size="sm">Delete</Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ExpenseList;