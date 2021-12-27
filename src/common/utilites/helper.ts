import {
  ConverterActionsType,
  disableCreateTransaction,
  setInputChangeFromValue,
  setInputChangeToValue
} from "../../bll/converterReducer";
import {Dispatch} from "redux";

export const toDisableButton = (dispatch: Dispatch<ConverterActionsType>) => {
  dispatch(setInputChangeFromValue(''))
  dispatch(setInputChangeToValue(''))
  dispatch(disableCreateTransaction(true))
}
