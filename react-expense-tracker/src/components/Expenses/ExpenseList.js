import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useSelector} from 'react-redux';

const ExpenseList = (props) => {
    const storedExpense = useSelector((state) => state.expense.expense);

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
                        {storedExpense.map((expense) => {
                            return (
                                <tr key={expense._id}>
                                    <td>{expense.amount}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.category}</td>
                                    <td><Button type="submit" variant="info" size="sm" onClick={() => props.editExpense(expense._id, expense.amount, expense.description, expense.category)}>Edit</Button></td>
                                    <td><Button type="submit" variant="danger" size="sm" onClick={() => props.deletExpense(expense._id)}>Delete</Button></td>
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