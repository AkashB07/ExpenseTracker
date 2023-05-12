const express = require('express');

const reportController = require('../controller/report');

const userauthentication = require('../middleware/auth');
const router = express.Router();


router.get('/getDailyExpenses',userauthentication.authenticate, reportController.getDailyExpenses);

router.get('/getWeeklyExpenses',userauthentication.authenticate, reportController.getWeeklyExpenses);

router.get('/getMonthlyExpenses',userauthentication.authenticate, reportController.getMonthlyExpenses);


module.exports = router;