const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");

//router object
const router = express.Router();

//routes
//add transaction POST MEthod
router.post("/add-transaction", addTransaction);
//Edit transaction POST MEthod
router.post("/edit-transaction", editTransaction);
//Delete transaction POST MEthod
router.post("/delete-transaction", deleteTransaction);

//get transactions
router.post("/get-transaction", getAllTransaction);

//expenses+income
router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
