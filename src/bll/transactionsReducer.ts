const initialState: InitialStateType = {
  transactions: [],
  transactionDetails: null,
  bankAccountValue: ''
}

export const transactionsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "TRANSACTIONS/SET_TRANSACTIONS_FROM_LOCAL_STORAGE":
      return {...state, transactions: action.data}
    case "TRANSACTIONS/ADD_TRANSACTION":
      return {...state, transactions: [action.data, ...state.transactions]}
    case "TRANSACTIONS/DELETE_TRANSACTION":
      return {...state, transactions: state.transactions.filter(tr => tr.id !== action.id)}
    case "TRANSACTIONS/SET_TRANSACTION_DETAILS":
      return {...state, transactionDetails: action.data}
    case "TRANSACTIONS/SEND_MONEY":
      return {
        ...state, transactions: state.transactions.map(tr => tr.id === action.data.id ?
          {
            ...tr, sendMoney: {
              ...tr.sendMoney,
              isSentMoney: action.data.sendMoney.isSentMoney,
              sentToBankAccount: action.data.sendMoney.sentToBankAccount,
              date: action.data.sendMoney.date,
              time: action.data.sendMoney.time
            }
          } : tr)
      }
    case "TRANSACTIONS/CHANGE_BANK_ACCOUNT":
      return {...state, bankAccountValue: action.value}
    default:
      return state;
  }
}

export const setTransactionsFromLS = (data: Array<TransactionDataType>) =>
  ({type: 'TRANSACTIONS/SET_TRANSACTIONS_FROM_LOCAL_STORAGE', data} as const)
export const addTransaction = (data: TransactionDataType) =>
  ({type: 'TRANSACTIONS/ADD_TRANSACTION', data} as const)
export const deleteTransaction = (id: string) =>
  ({type: 'TRANSACTIONS/DELETE_TRANSACTION', id} as const)
export const setTransactionDetails = (data: TransactionDataType | null) =>
  ({type: 'TRANSACTIONS/SET_TRANSACTION_DETAILS', data} as const)
export const sendMoney = (data: TransactionDataType) =>
  ({type: 'TRANSACTIONS/SEND_MONEY', data} as const)
export const changeBankAccount = (value: string) =>
  ({type: 'TRANSACTIONS/CHANGE_BANK_ACCOUNT', value} as const)

type ActionsType = ReturnType<typeof addTransaction>
  | ReturnType<typeof deleteTransaction>
  | ReturnType<typeof setTransactionsFromLS>
  | ReturnType<typeof setTransactionDetails>
  | ReturnType<typeof sendMoney>
  | ReturnType<typeof changeBankAccount>
type InitialStateType = {
  transactions: Array<TransactionDataType>
  transactionDetails: TransactionDataType | null
  bankAccountValue: string
}
export type TransactionDataType = {
  id: string
  date: string
  time: string
  currencyFrom: { name: string, amount: string }
  currencyTo: { name: string, amount: string }
  exchangeRate: number
  sendMoney: {
    isSentMoney: boolean
    sentToBankAccount: string
    date: string
    time: string
  }
}