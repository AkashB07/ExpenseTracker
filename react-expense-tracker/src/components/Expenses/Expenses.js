import { useRef, Fragment, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";

import { expenseActions } from "../../store/expense";
import ExpenseList from './ExpenseList';
import Premium from '../Premium/Premium';
import { themesActions } from "../../store/theme";


const url = 'http://localhost';
let btn1, btn2, btn3;

const Expenses = () => {

    const [hasPreviousPage, setHasPreviousPage] = useState([]);
    const [hasNextPage, setHasNextPage] = useState([]);
    const [premium, setPremium] = useState(false);
    const [primefeatures, setPrimefeatures] = useState(false);

    const TotalExpense = useSelector((state) => state.expense.totalexpense);
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    // const token = useSelector(state => state.auth.token);


    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();


    const getExpensHandler = useCallback(async (page) => {
        try {
            const respone = await axios.get(`${url}:4000/expense/getexpenses/?page=${page}`, { headers: { "Authorization": token } });
            dispatch(expenseActions.expense(respone.data.expenses));
            console.log()

            dispatch(expenseActions.cleartotalexpense());
            const resAll = await axios.get(`${url}:4000/expense/getallexpenses`, { headers: { "Authorization": token } });
            dispatch(expenseActions.allExpense(resAll.data.expenses));
            resAll.data.expenses.forEach(expense => {
                dispatch(expenseActions.totalexpense(expense.amount));
            });
 
            pagination(respone);
        }
        catch (error) {
            console.log(error);
        }

    }, [])

    useEffect(() => {
        getExpensHandler();
    }, [getExpensHandler]);

    useEffect(() => {
        if (TotalExpense >= 10000) {
            setPremium(true);
        } 
        else {
            setPremium(false);
            if (TotalExpense >= 10000) {
                setPremium(true);
            } 
            else {
                setPremium(false);
            }
        }
    }, [TotalExpense]);

    const activatePremiumHandler = () => {
        dispatch(themesActions.themeLogOut(false));
        setPrimefeatures(!primefeatures);
      };

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
                getExpensHandler(1);
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    const deletExpenseHandler = async (expenseId) => {
        try {
            await axios.delete(`${url}:4000/expense/deleteexpense/${expenseId}`, { headers: { "Authorization": token } });
            getExpensHandler(1);
            alert('Successfuly deleted the Expense');

        }
        catch (error) {
            console.log(error);
        }
    }

    const editExpenseHandler = async (expenseId, amount, description, category) => {
        try {
            amountInputRef.current.value = amount;
            descriptionInputRef.current.value = description;
            categoryInputRef.current.value = category;
            await axios.delete(`${url}:4000/expense/deleteexpense/${expenseId}`, { headers: { "Authorization": token } });

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
                                <label>Choose Expense Amount</label>
                                <input
                                    type="amount"
                                    className="form-control"
                                    name="category"
                                    required ref={amountInputRef}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <label>Choose Expense Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    required ref={descriptionInputRef}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <label>Choose Expense Category</label>
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

                    </Form><br />
                </div>
            </div>
            <div className="text-center">
            <h3>Total Expense: ₹{TotalExpense}</h3>
            {premium && <Button variant="outline-success" onClick={activatePremiumHandler}>{primefeatures ?'Deactivate Premium' : 'Activate Premium'}</Button>}<br /><br />
            {primefeatures && premium &&  <Premium />}
            </div><br />
            <ExpenseList deletExpense={deletExpenseHandler} editExpense={editExpenseHandler} /><br />
            <div className="text-center">
                {hasPreviousPage > 0 && btn2}
                {btn1}
                {hasNextPage && btn3}
            </div>
        </Fragment>
    );
};

export default Expenses;