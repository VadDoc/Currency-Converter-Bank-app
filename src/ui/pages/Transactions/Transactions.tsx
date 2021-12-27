import styles from "./Transactions.module.scss"
import {getFromLocalStorage, saveToLocalStorage} from "../../../common/utilites/localStorage";
import {Paginator} from "../../../common/components/Paginator/Paginator";
import React, {useEffect} from "react";
import {
  setTransactionsFromLS,
  deleteTransaction,
  TransactionDataType,
  setTransactionDetails, setPagesTransactions, setCurrentPage, TransactionsInitialStateType
} from "../../../bll/transactionsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store";
import {TransactionDetails} from "./TransactionDetails/TransactionDetails";

export const Transactions = () => {
  const {
    transactions,
    pagesTransactions,
    transactionDetails,
    currentPage,
    pageSize,
    portionSize
  } = useSelector<AppStoreType, TransactionsInitialStateType>(state => state.transactionsReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    const transactionsFromLS: Array<TransactionDataType> = getFromLocalStorage<Array<TransactionDataType>>('bankTransactions', [])
    transactionsFromLS && dispatch(setTransactionsFromLS(transactionsFromLS))
  }, []);

  useEffect(() => {
    saveToLocalStorage<Array<TransactionDataType>>('bankTransactions', transactions)
  }, [transactions]);

  const deleteCurrentTransaction = (id: string) => {
    dispatch(deleteTransaction(id))
    dispatch(setPagesTransactions(currentPage))
  }

  const showTransactionDetails = (transaction: TransactionDataType) => {
    dispatch(setTransactionDetails(transaction))
  }

  const onChangedPage = (p: number) => {
    dispatch(setPagesTransactions(p))
    dispatch(setCurrentPage(p))
  }

  return (
    <div className={styles.transactions}>
      {!transactionDetails ?
        <>
          <h1>Your transactions</h1>
          <div>
            {pagesTransactions.map(tr => (
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
            totalItemsCount={transactions.length}//total number
            currentPage={currentPage}
            pageSize={pageSize} //number of items per page
            portionSize={portionSize} //number of visible buttons
            onChangedPage={onChangedPage}
          />
        </> :
        <TransactionDetails transaction={transactionDetails}/>
      }
    </div>
  )
}

