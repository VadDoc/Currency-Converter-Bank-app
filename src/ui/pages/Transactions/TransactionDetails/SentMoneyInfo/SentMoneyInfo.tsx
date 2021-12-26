import React from "react";
import {TransactionDataType} from "../../../../../bll/transactionsReducer";

export const SentMoneyInfo = ({transaction}: PropsType) => {
  return (
    <div>
      <h2>Bank transfer</h2>
      <p>Sent: {transaction.currencyTo.amount} {transaction.currencyTo.name}</p>
      <p>Date: {transaction.sendMoney.date}. Time: {transaction.sendMoney.time}</p>
      <p>To Bank account: {transaction.sendMoney.sentToBankAccount}</p>
    </div>
  )
}

type PropsType = {
  transaction: TransactionDataType
}