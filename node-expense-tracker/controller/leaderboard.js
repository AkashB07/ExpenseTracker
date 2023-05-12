const User = require('../models/users');
const Expense = require('../models/expenses');


const getAllUserWithExpense = async(req,res)=>{
    try {
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const users = await User.find();
        var UserAndExpense=[]
        var alldata={};
        for(let i=0;i<users.length;i++){
            const expense = await Expense.find({userId:users[i].id})
            var totalexpense=0;
            for(let i=0;i<expense.length;i++){
              totalexpense=totalexpense+expense[i].amount
            }
            alldata={
                ...users[i],
                totalexpense
            }
            UserAndExpense.push(alldata)
        }
    
        return res.status(200).json(UserAndExpense);    
    } 
    catch (error) {
        res.status(500).json({message: err, success: false});
    }
    
  }

  

module.exports = {
    getAllUserWithExpense
}
