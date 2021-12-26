import {TransactionDataType} from "../../bll/transactionsReducer";
import {
  ConverterActionsType,
  disableCreateTransaction,
  setInputChangeFromValue,
  setInputChangeToValue
} from "../../bll/converterReducer";
import {Dispatch} from "redux";

export const defaultTransaction: TransactionDataType = {
  id: '',
  date: '',
  time: '',
  currencyFrom: {name: '', amount: ''},
  currencyTo: {name: '', amount: ''},
  exchangeRate: 0,
  sendMoney: {
    isSentMoney: false,
    sentToBankAccount: '',
    date: '',
    time: '',
  }
}

export const defaultTransactions: Array<TransactionDataType> = [defaultTransaction]

export const toDisableButton = (dispatch: Dispatch<ConverterActionsType>) => {
  dispatch(setInputChangeFromValue(''))
  dispatch(setInputChangeToValue(''))
  dispatch(disableCreateTransaction(true))
}
