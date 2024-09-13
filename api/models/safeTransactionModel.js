const mongoose = require('mongoose');
// Define the enums
const AddingType = {
    ADDING: 'Adding',
    DEDUCTION: 'Deduction',
};

const TransactionType = {
    CUSTODY: 'Custody',
    SETTLE: 'Settle',
};

const safeTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  amount: {
    type: Number,
  },
  transactionType: {
    type: String,
    enum: Object.values(TransactionType), // Enum validator
  },
  addingType: {
    type: String,
    enum: Object.values(AddingType), // Enum validator
  }

},{
  timestamps: true // This will add createdAt and updatedAt fields
});
const SafeTransaction = new mongoose.model('SafeTransaction', safeTransactionSchema);
module.exports = {
  SafeTransaction,
  AddingType,
  TransactionType
};