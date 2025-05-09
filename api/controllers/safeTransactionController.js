const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { SafeTransaction, AddingType, TransactionType }  = require("./../models/safeTransactionModel");
const ErrorMsgs = require("./../utils/ErrorMsgsConstants");

exports.getAllSafeTransactions = catchAsync(async (req, res, next) => {
    let transactions = await SafeTransaction.find()
    .populate("user")
    .populate("delivery")
    .sort({ _id: -1 })
    .limit(500);
    

    let totalAmount = transactions.reduce((sum, transaction) => {
      if (transaction.addingType === AddingType.ADDING) {
        return sum + transaction.amount; // Add the amount if it's an addition
      } else if (transaction.addingType === AddingType.DEDUCTION) {
        return sum - transaction.amount; // Subtract the amount if it's a deduction
      } else {
        return sum; // If transactionType is not recognized, leave sum unchanged
      }
    }, 0);
   
    res.status(200).json({
      totalAmount: totalAmount,
      transactions: transactions,
    });
  });

  exports.addSafeTransaction = catchAsync(async (req, res, next) => {
    let transaction = await SafeTransaction.create(req.body); 
    let createdTransaction = await SafeTransaction.findById(transaction._id) 
    .populate("user")
    .populate("delivery")

    res.status(200).json({
      createdTransaction
    });
  });


  exports.deleteSafeTransaction = catchAsync(async (req, res, next) => {
    let { id } = req.query;

   let transaction = await SafeTransaction.findOneAndDelete({
      _id: id,
    });

    res.status(200).json({
      transaction
    });
    
  });