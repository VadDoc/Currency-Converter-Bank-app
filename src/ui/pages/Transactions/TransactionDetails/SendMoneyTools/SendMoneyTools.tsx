import styles from "../TransactionDetails.module.scss";
import Input from "../../../../../common/components/Input/Input";
import Button from "../../../../../common/components/Button/Button";
import React, {ChangeEvent, useState} from "react";
import {
  changeBankAccount,
  sendMoney, setPagesTransactions,
  setTransactionDetails,
  TransactionDataType, TransactionsInitialStateType
} from "../../../../../bll/transactionsReducer";
import {currentDate, currentTime} from "../../../../../common/utilites/currentTime";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../../bll/store";
import {saveToLocalStorage} from "../../../../../common/utilites/localStorage";

export const SendMoneyTools = ({transaction}: PropsType) => {
  const {
    transactions,
    bankAccountValue,
    currentPage
  } = useSelector<AppStoreType, TransactionsInitialStateType>(state => state.transactionsReducer)

  const dispatch = useDispatch()

  const [error, setError] = useState(false);

  const onChangeBankAccountValue = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    dispatch(changeBankAccount(e.currentTarget.value))
  }

  const sendMoneyToBankAccount = () => {
    if (/^[a-z0-9]{10}$/i.test(bankAccountValue)) {
      const sentMoneyTransaction = {
        ...transaction, sendMoney: {
          ...transaction.sendMoney,
          isSentMoney: true,
          date: currentDate(new Date()),
          time: currentTime(new Date()),
          sentToBankAccount: bankAccountValue
        }
      }
      dispatch(sendMoney(sentMoneyTransaction))
      dispatch(changeBankAccount(''))
      dispatch(setTransactionDetails(null))
      dispatch(setPagesTransactions(currentPage))
    } else {
      setError(true)
    }

    saveToLocalStorage<Array<TransactionDataType>>('bankTransactions', [...transactions])
  }

  return (
    <>
      <div className={styles.forSend}>
        Send {transaction.currencyTo.amount} {transaction.currencyTo.name} to:
      </div>
      <div>
        <Input
          value={bankAccountValue}
          onChange={onChangeBankAccountValue}
          placeholder={'Bank account'}
        />
      </div>
      <div>
        <Button onClick={sendMoneyToBankAccount}>Send money</Button>
      </div>
      {error && <div className={styles.error}>Account should have 10 numbers or letters</div>}
    </>
  )
}

type PropsType = {
  transaction: TransactionDataType
}