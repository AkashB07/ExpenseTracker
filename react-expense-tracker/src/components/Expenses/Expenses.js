import { useRef, Fragment, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ExpenseList from './ExpenseList';


const url = 'http://localhost';
const token = localStorage.getItem('token');
let btn1, btn2, btn3;

const Expenses = () => {
    const [expense, setExpense] = useState([]);
    const [hasPreviousPage, setHasPreviousPage] = useState([]);
    const [hasNextPage, setHasNextPage] = useState([]);


    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();


    const getExpensHandler = useCallback(async (page) => {
        try {
            const respone = await axios.get(`${url}:4000/expense/getexpenses/?page=${page}`, { headers: { "Authorization": token } });
            const storeData = [];
            respone.data.expenses.forEach(expense => {
                storeData.push(expense);
            });
            setExpense([...storeData]);
            pagination(respone);
        }
        catch (error) {
            console.log(error);
        }

    }, [])

    useEffect(() => {
        getExpensHandler(1);
    }, [getExpensHandler]);

    const pagination = (respone) => {
        if (respone.data) {
            let currentPage = respone.data.currentPage;
            setHasNextPage(respone.data.hasNextPage);
            let nextPage = respone.data.nextPage;
            setHasPreviousPage(respone.data.hasPreviousPage);
            let previousPage = respone.data.previousPage;
            if (hasPreviousPage) {
                btn2 = <Button className="btn btn-secondary" onClick={() => getExpensHandler(previousPage)}>{previousPage}</Button>
            }

            btn1 = <Button className="btn btn-primary" onClick={() => getExpensHandler(currentPage)}>{currentPage}</Button>

            if (hasNextPage) {
                btn3 = <Button className="btn btn-secondary" onClick={() => getExpensHandler(nextPage)}>{nextPage}</Button>
            }
        }
    }


    const addExpensHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredAmount = amountInputRef.current.value;
            const enteredDescription = descriptionInputRef.current.value;
            const enteredCategory = categoryInputRef.current.value;

            const expenseDetails = {
                amount: enteredAmount,
                description: enteredDescription,
                category: enteredCategory,
            }
            amountInputRef.current.value = '';
            descriptionInputRef.current.value = '';
            categoryInputRef.current.value = '';

            const res = await axios.post(`${url}:4000/expense/addexpense`, expenseDetails, { headers: { "Authorization": token } });
            if (res.status === 200) {
                alert('Successfuly added the Expense');
                getExpensHandler(1);
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment><br />
            <div className="row justify-content-center">
                <h2 className="text-center">Enter Expenses</h2><br /><br /><br /><br />

                <div className="col-md-7">
                    <Form id="loginform" onSubmit={addExpensHandler}>
                        <Row className="mb-3">

                            <Form.Group as={Col} >
                                <Form.Label>Choose Expense Amount</Form.Label>
                                <input
                                    type="amount"
                                    className="form-control"
                                    name="category"
                                    required ref={amountInputRef}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Choose Expense Description</Form.Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    required ref={descriptionInputRef}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Choose Expense Category</Form.Label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    required ref={categoryInputRef}
                                >
                                    <option value="Food" disabled>Select</option>
                                    <option value="Fuel">Fuel</option>
                                    <option value="Food">Food</option>
                                    <option value="Electricity">Electricity</option>
                                    <option value="Movie">Movie</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Home Decor">Home Decor</option>
                                    <option value="others">Others</option>
                                </select>
                            </Form.Group>
                        </Row>

                        <div className="text-center" >
                            <Button type="submit" variant="success" size="md">Add</Button>
                        </div>

                    </Form><br /><br /><br />
                </div>
            </div>
            <ExpenseList items={expense} />
            <div className="text-center">
                {hasPreviousPage > 0 && btn2}
                {btn1}
                {hasNextPage && btn3}
            </div>
        </Fragment>
    );
};

export default Expenses;