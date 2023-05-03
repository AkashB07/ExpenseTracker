import { useRef, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const url = 'http://localhost';

const Expenses = () => {
    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

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

            console.log(expenseDetails);
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
                            <Button type="submit" variant="primary" size="md">Add</Button>
                        </div>

                    </Form><br /><br /><br />
                </div>
            </div>
        </Fragment>

    );
};

export default Expenses;