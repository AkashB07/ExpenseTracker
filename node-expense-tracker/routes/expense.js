const express = require('express');

const expenseController = require('../controller/expense');
const userauthentication = require('../middleware/auth');


const router = express.Router();

router.post('/addexpense', userauthentication.authenticate ,expenseController.addexpense);

router.get('/getexpenses', userauthentication.authenticate ,expenseController.getExpense);

router.get('/getallexpenses', userauthentication.authenticate ,expenseController.getAllExpense);

router.delete('/deleteexpense/:expenseId', userauthentication.authenticate, expenseController.deleteexpense);

module.exports = router;
