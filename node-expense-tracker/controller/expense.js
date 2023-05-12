const Expense = require('../models/expenses');

const ITEAM_PER_PAGE=5;

function isexpensevalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const getExpense = async (req, res) => {
    try {
        const page = (+req.query.page || 1);
        const total_items = await Expense.count({userId: req.user._id});
        const expenses = await Expense.find({ userId: req.user._id }).sort({createdAt:-1}).skip((page-1)*ITEAM_PER_PAGE).limit(ITEAM_PER_PAGE)
        return res.status(200).json({expenses: expenses, 
            totalItems: total_items,
            hasNextPage: (page*ITEAM_PER_PAGE<total_items),
            hasPreviousPage: page>1,
            currentPage:page,
            nextPage:page+1,
            previousPage:page-1,
            lastPage:(Math.ceil(total_items/ITEAM_PER_PAGE)),
            succese: true
        });    
    } 
    catch (err) {
        return res.status(500).json({succese: false, error: err})
    }
}

const getAllExpense = async (req, res) => {
    try {
  
        const expenses = await Expense.find({ userId: req.user._id }).sort({createdAt:-1});
        return res.status(200).json({expenses: expenses});    
    } 
    catch (err) {
        return res.status(500).json({succese: false, error: err})
    }
}


const addexpense = async (req, res) => {
    try 
    {
        const{amount, description, category} = req.body;     
        if(isexpensevalid(amount) || isexpensevalid(description) || isexpensevalid(category)){
            return res.status(400).json({succese: false, message: "Parameters missing"});
        }  
        const userId = req.user._id;
        const date = new Date();
        const expense = await Expense.create({
            amount: amount,
            description: description, 
            category: category, 
            createdAt: date,
            userId: userId
        });
        return res.status(200).json({expense, succese: true});   
    } 
    catch (err) {
        return res.status(500).json({succese: false, error: err});
    }
}


const deleteexpense = async (req, res) => {
    try {
        const expenseId = req.params.expenseId;
        if(isexpensevalid(expenseId))
        {
            return res.status(400).json({succese: false});
        }
        
        const noOfRows = await Expense.findByIdAndRemove(expenseId);
        if(noOfRows === 0){
            return res.status(404).json({succese: false, message: "Expense does not belongs to User"});
        }
        return res.status(200).json({succese: true, message: "Deleted Successfully"});  
    } 
    catch (err) {
        return res.status(403).json({succese: false, message: "Failed"})
    }
}


module.exports = {
    addexpense,
    getExpense,
    deleteexpense,
    getAllExpense
}

