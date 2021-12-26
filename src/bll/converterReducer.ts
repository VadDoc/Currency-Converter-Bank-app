import {Dispatch} from "redux";
import {api, getCurrencyResponseType} from "../dal/api/api";
import axios from "axios";
import {setError} from "./appReducer";

const initialState: ConverterInitialStateType = {
  query: {
    timestamp: 0,
    base_currency: ""
  },
  data: {},
  inputChangeFromValue: '',
  inputChangeToValue: '',
  selectCurrencyFromValue: '',
  selectCurrencyToValue: '',
  isDisabledCreateTransaction: true,
  loading: false,
}

export const converterReducer = (state = initialState, action: ConverterActionsType): ConverterInitialStateType => {
  switch (action.type) {
    case "CONVERTER/GET_CURRENCY_API":
      return {
        ...state,
        query: action.data.query,
        data: action.data.data,
        selectCurrencyFromValue: action.data.query.base_currency
      }
    case "CONVERTER/SET_INPUT_CHANGE_FROM":
      return {...state, inputChangeFromValue: action.value}
    case "CONVERTER/SET_INPUT_CHANGE_TO":
      return {...state, inputChangeToValue: action.value}
    case "CONVERTER/SET_SELECT_CURRENCY_FROM":
      return {...state, selectCurrencyFromValue: action.value}
    case "CONVERTER/SET_SELECT_CURRENCY_TO":
      return {...state, selectCurrencyToValue: action.value}
    case "CONVERTER/DISABLE_CREATE_TRANSACTION":
      return {...state, isDisabledCreateTransaction: action.value}
    case "CONVERTER/SET_LOADING_STATUS":
      return {...state, loading: action.value}
    default:
      return state;
  }
}

const getCurrency = (data: getCurrencyResponseType) =>
  ({type: 'CONVERTER/GET_CURRENCY_API', data} as const)
export const setInputChangeFromValue = (value: string) =>
  ({type: 'CONVERTER/SET_INPUT_CHANGE_FROM', value} as const)
export const setInputChangeToValue = (value: string) =>
  ({type: 'CONVERTER/SET_INPUT_CHANGE_TO', value} as const)
export const setSelectCurrencyFromValue = (value: string) =>
  ({type: 'CONVERTER/SET_SELECT_CURRENCY_FROM', value} as const)
export const setSelectCurrencyToValue = (value: string) =>
  ({type: 'CONVERTER/SET_SELECT_CURRENCY_TO', value} as const)
export const disableCreateTransaction = (value: boolean) =>
  ({type: 'CONVERTER/DISABLE_CREATE_TRANSACTION', value} as const)
export const setAppLoading = (value: boolean) =>
  ({type: 'CONVERTER/SET_LOADING_STATUS', value} as const)

//thunks
export const getCurrencyApi = (baseCurrency: string) => async (dispatch: Dispatch) => {
  dispatch(setAppLoading(true));
  try {
    const response = await api.getCurrency(baseCurrency)
    dispatch(getCurrency(response.data))
    dispatch(setInputChangeFromValue(''))
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if(error.response.status===429) {
        dispatch(setError(error.response.data.too_many_requests))
      } else {
        dispatch(setError('Sorry: we have some error. Try later'))
      }
    }
  } finally {
    dispatch(setAppLoading(false));
  }
}

export type ConverterInitialStateType = {
  query: QueryParamsType
  data: CurrencyExchangeRatesType
  inputChangeFromValue: string
  inputChangeToValue: string
  selectCurrencyFromValue: string
  selectCurrencyToValue: string
  isDisabledCreateTransaction: boolean
  loading: boolean
}
export type CurrencyExchangeRatesType = { [key: string]: number }
export type QueryParamsType = { timestamp: number, base_currency: string }
export type ConverterActionsType = ReturnType<typeof getCurrency>
  | ReturnType<typeof setInputChangeFromValue>
  | ReturnType<typeof setInputChangeToValue>
  | ReturnType<typeof setSelectCurrencyFromValue>
  | ReturnType<typeof setSelectCurrencyToValue>
  | ReturnType<typeof disableCreateTransaction>
  | ReturnType<typeof setAppLoading>