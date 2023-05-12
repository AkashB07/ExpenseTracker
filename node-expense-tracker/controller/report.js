const Expense = require('../models/expenses');


const getDailyExpenses = async (req, res)=>{
    try {
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const today = new Date().setHours(0,0,0,0);
        const now = new Date();
        const result = await Expense.find({ userId: req.user._id }).where('createdAt').gt(today).lt(now).sort({createdAt:-1});
        return res.status(200).json(result);
    } 
    catch (error) {
        return res.status(500).json({succese: false, error: error})
    }  
}

const getWeeklyExpenses = async (req, res, next)=>{
    try {
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const todayDate = new Date().getDate();
        const lastWeek  = new Date().setDate(todayDate-7);
        const now = new Date();
        const result = await Expense.find({ userId: req.user._id }).where('createdAt').gt(lastWeek).lt(now).sort({createdAt:-1});
        return res.status(200).json( result);
    } 
    catch (error) {
        return res.status(500).json({succese: false, error: error})
    }   
}

const getMonthlyExpenses = async (req, res, next)=>{
    try {
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const month = new Date().getMonth()
        const lastMonth  = new Date().setMonth(month-1)
        const now = new Date()
        const result = await Expense.find({ userId: req.user._id }).where('createdAt').gt(lastMonth).lt(now).sort({createdAt:-1});
        return res.status(200).json( result);
    } 
    catch (error) {
        return res.status(500).json({succese: false, error: error})
    }   
}
   
module.exports = {
    getDailyExpenses,
    getWeeklyExpenses,
    getMonthlyExpenses
}