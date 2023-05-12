const express = require('express');

const leaderboardController = require('../controller/leaderboard');

const userauthentication = require('../middleware/auth');
const router = express.Router();


router.get('/getData',userauthentication.authenticate, leaderboardController.getAllUserWithExpense);


module.exports = router;