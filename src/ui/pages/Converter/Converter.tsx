import React, {ChangeEvent, useEffect} from "react";
import styles from './Converter.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
  CurrencyExchangeRatesType, disableCreateTransaction, getCurrencyApi, ConverterInitialStateType,
  setInputChangeFromValue,
  setInputChangeToValue,
  setSelectCurrencyFromValue,
  setSelectCurrencyToValue,
} from "../../../bll/converterReducer";
import {AppStoreType} from "../../../bll/store";
import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import {saveToLocalStorage} from "../../../common/utilites/localStorage";
import Button from "../../../common/components/Button/Button";
import {v1} from "uuid";
import {addTransaction, TransactionDataType} from "../../../bll/transactionsReducer";
import {currentDate, currentTime} from "../../../common/utilites/currentTime";
import {toDisableButton} from "../../../common/utilites/helper";

export const Converter = () => {
  const currencyExchangeRates = useSelector<AppStoreType, CurrencyExchangeRatesType>(state => state.converterReducer.data)
  const baseCurrency = useSelector<AppStoreType, string>(state => state.converterReducer.query.base_currency)
  const {
    inputChangeFromValue,
    inputChangeToValue,
    selectCurrencyFromValue,
    selectCurrencyToValue,
    isDisabledCreateTransaction
  } = useSelector<AppStoreType, ConverterInitialStateType>(state => state.converterReducer)
  const transactions = useSelector<AppStoreType, Array<TransactionDataType>>(state => state.transactionsReducer.transactions)
  const dispatch = useDispatch()

  const currenciesApi = Object.keys(currencyExchangeRates)
  const selectCurrencyFromValues = [baseCurrency, ...currenciesApi]
  const selectCurrencyToValues = ['', ...currenciesApi]
  const exchangeRateSelectedCurrencies = currencyExchangeRates[selectCurrencyToValue]

  const onChangeInputChangeFromValue = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value
    if (Number(currentValue) < 0) return
    dispatch(setInputChangeFromValue(currentValue))
    const calculatedInputChangeToValue = (Math.round(Number(Number(currentValue) * exchangeRateSelectedCurrencies) * 100) / 100)
    dispatch(setInputChangeToValue(calculatedInputChangeToValue.toString()))
    dispatch(disableCreateTransaction(false))
  }
  const onChangeInputChangeToValue = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value
    if (Number(currentValue) < 0) return
    dispatch(setInputChangeToValue(currentValue))
    const calculatedInputChangeFromValue = (Math.round(Number(Number(currentValue) / exchangeRateSelectedCurrencies) * 100) / 100)
    dispatch(setInputChangeFromValue(calculatedInputChangeFromValue.toString()))
    dispatch(disableCreateTransaction(false))
  }
  const onChangeSelectCurrencyFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.currentTarget.value
    dispatch(setSelectCurrencyFromValue(currentValue))
    dispatch(getCurrencyApi(currentValue))
    toDisableButton(dispatch)
  }
  const onChangeSelectCurrencyTo = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.currentTarget.value
    dispatch(setSelectCurrencyToValue(currentValue))
    toDisableButton(dispatch)
  }

  const createTransaction = () => {
    const transaction: TransactionDataType = {
      id: v1(),
      date: currentDate(new Date()),
      time: currentTime(new Date()),
      currencyFrom: {name: baseCurrency, amount: inputChangeFromValue},
      currencyTo: {name: selectCurrencyToValue, amount: inputChangeToValue},
      exchangeRate: currencyExchangeRates[selectCurrencyToValue],
      sendMoney: {
        isSentMoney: false,
        sentToBankAccount: '',
        date: '',
        time: '',
      }
    }
    saveToLocalStorage<Array<TransactionDataType>>('bankTransactions', [transaction, ...transactions])
    dispatch(addTransaction(transaction))
    toDisableButton(dispatch)
  }

  useEffect(() => {
    dispatch(getCurrencyApi('USD'))
  }, []);

  return (
    <div className={styles.converter}>
      <h1>Currency Converter</h1>
      <div>
        <Input
          type={'number'}
          value={inputChangeFromValue}
          onChange={onChangeInputChangeFromValue}
        />
        <Select
          options={selectCurrencyFromValues}
          value={selectCurrencyFromValue}
          onChange={onChangeSelectCurrencyFrom}
        />
      </div>
      <div>
        <Input
          type={'number'}
          value={inputChangeToValue}
          onChange={onChangeInputChangeToValue}
        />
        <Select
          options={selectCurrencyToValues}
          value={selectCurrencyToValue}
          onChange={onChangeSelectCurrencyTo}
        />
      </div>
      <div>
        <Button
          onClick={createTransaction}
          disabled={isDisabledCreateTransaction}
        >Create transaction</Button>
      </div>
    </div>
  )
}


