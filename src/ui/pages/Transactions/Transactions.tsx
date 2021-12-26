import styles from "./Transactions.module.scss"
import {getFromLocalStorage, saveToLocalStorage} from "../../../common/utilites/localStorage";
import {defaultTransactions} from "../../../common/utilites/helper";
import {Paginator} from "../../../common/components/Paginator/Paginator";
import React, {useEffect} from "react";
import {
  setTransactionsFromLS,
  deleteTransaction,
  TransactionDataType,
  setTransactionDetails
} from "../../../bll/transactionsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store";
import {TransactionDetails} from "./TransactionDetails/TransactionDetails";

export const Transactions = () => {
  const transactions = useSelector<AppStoreType, Array<TransactionDataType>>(state => state.transactionsReducer.transactions)
  const transactionDetails = useSelector<AppStoreType, TransactionDataType | null>(state => state.transactionsReducer.transactionDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    const transactionsFromLS: Array<TransactionDataType> = getFromLocalStorage<Array<TransactionDataType>>('bankTransactions', defaultTransactions)
    transactionsFromLS && dispatch(setTransactionsFromLS(transactionsFromLS))
  }, []);

  useEffect(() => {
    saveToLocalStorage<Array<TransactionDataType>>('bankTransactions', transactions)
  }, [transactions]);

  const deleteCurrentTransaction = (id: string) => dispatch(deleteTransaction(id))

  const showTransactionDetails = (transaction: TransactionDataType) => {
    dispatch(setTransactionDetails(transaction))
  }

  return (
    <div className={styles.transactions}>
      {!transactionDetails ?
        <>
          <h1>Your transactions</h1>
          <div>
            {transactions.map(tr => (
              <div className={styles.transaction}
                   key={tr.id}
                   style={{fontWeight: tr.sendMoney.isSentMoney ? 'bold' : 'normal'}}>
                <div onClick={() => showTransactionDetails(tr)}>
                  {tr.currencyFrom.amount} {tr.currencyFrom.name}
                  <span className={styles.arrow}>&rArr;</span>
                  {tr.currencyTo.amount} {tr.currencyTo.name}
                </div>
                {!tr.sendMoney.isSentMoney ?
                  <span className={styles.delete} onClick={() => deleteCurrentTransaction(tr.id)}>x</span> :
                  <span className={styles.sent}>&#10004;</span>}
              </div>
            ))}
          </div>

          <Paginator
            totalItemsCount={transactions.length}//общее количество
          />
        </> :
        <TransactionDetails transaction={transactionDetails}/>
      }
    </div>
  )
}

