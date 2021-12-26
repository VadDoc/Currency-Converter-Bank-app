import axios, {AxiosResponse} from "axios";
import {CurrencyExchangeRatesType, QueryParamsType} from "../../bll/converterReducer";

const instance = axios.create({
  baseURL: 'https://freecurrencyapi.net/api/v2/',
})

export const api = {
  getCurrency(baseCurrency: string) {
    return instance.get<null, AxiosResponse<getCurrencyResponseType>>(`latest`, {
      params: {
        base_currency: baseCurrency
      }
    })
  },
}

export type getCurrencyResponseType = {
  query: QueryParamsType
  data: CurrencyExchangeRatesType
}