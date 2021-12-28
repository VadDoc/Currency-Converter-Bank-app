const pageSize = 10

const initialState: TransactionsInitialStateType = {
  transactions: [],
  transactionDetails: null,
  bankAccountValue: '',
  pageSize: pageSize,
  currentPage: 1,
  portionSize: 5,
  pagesTransactions: []
}

export const transactionsReducer = (state = initialState, action: ActionsType): TransactionsInitialStateType => {
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
          {...tr, sendMoney: {...action.data.sendMoney}} : tr)
      }
    case "TRANSACTIONS/CHANGE_BANK_ACCOUNT":
      return {...state, bankAccountValue: action.value}
    case "TRANSACTIONS/SET_CURRENT_PAGE":
      return {...state, currentPage: action.pageNumber}
    case "TRANSACTIONS/SET_PAGE_TRANSACTIONS":
      return {...state, pagesTransactions: state.transactions.slice(pageSize * (action.page - 1), pageSize * action.page)}
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
export const setPagesTransactions = (page: number) =>
  ({type: 'TRANSACTIONS/SET_PAGE_TRANSACTIONS', page} as const)
export const setCurrentPage = (pageNumber: number) =>
  ({type: 'TRANSACTIONS/SET_CURRENT_PAGE', pageNumber} as const)

type ActionsType = ReturnType<typeof addTransaction>
  | ReturnType<typeof deleteTransaction>
  | ReturnType<typeof setTransactionsFromLS>
  | ReturnType<typeof setTransactionDetails>
  | ReturnType<typeof sendMoney>
  | ReturnType<typeof changeBankAccount>
| ReturnType<typeof setPagesTransactions>
  | ReturnType<typeof setCurrentPage>

export type TransactionsInitialStateType = {
  transactions: Array<TransactionDataType>
  transactionDetails: TransactionDataType | null
  bankAccountValue: string
  pageSize: number
  currentPage: number
  portionSize: number
  pagesTransactions: Array<TransactionDataType>
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