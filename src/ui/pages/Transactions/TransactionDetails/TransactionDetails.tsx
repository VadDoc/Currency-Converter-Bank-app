import React from "react";
import styles from "./TransactionDetails.module.scss"
import {
  deleteTransaction,
  setTransactionDetails,
  TransactionDataType
} from "../../../../bll/transactionsReducer";
import {useDispatch} from "react-redux";
import {SendMoneyTools} from "./SendMoneyTools/SendMoneyTools";
import {SentMoneyInfo} from "./SentMoneyInfo/SentMoneyInfo";

export const TransactionDetails = ({transaction}: PropsType) => {
  const dispatch = useDispatch()
  const isSentMoney = transaction.sendMoney.isSentMoney

  const getBack = () => {
    dispatch(setTransactionDetails(null))
  }
  const removeTransaction = () => {
    dispatch(deleteTransaction(transaction.id))
    dispatch(setTransactionDetails(null))
  }

  return (
    <div className={styles.transactionDetails}>
      <div>
        <div onClick={getBack}>&lt;&lt; Back</div>
        {!transaction.sendMoney.isSentMoney ?
          <div onClick={removeTransaction}>Delete</div> : <div/>}
      </div>
      <h1>Transaction:</h1>
      <div>
        <h2>Currency exchange</h2>
        <p>Date: {transaction.date}</p>
        <p>Time: {transaction.time}</p>
        <p>
          Exchange: {transaction.currencyFrom.amount} {transaction.currencyFrom.name}
          <span className={styles.arrow}>&rArr;</span>
          {transaction.currencyTo.amount} {transaction.currencyTo.name}
        </p>
        <p>Exchange rate: {transaction.exchangeRate}</p>
        {!isSentMoney && <SendMoneyTools transaction={transaction}/>}
      </div>
      {isSentMoney && <SentMoneyInfo transaction={transaction}/>}
    </div>
  )
}

type PropsType = {
  transaction: TransactionDataType
}