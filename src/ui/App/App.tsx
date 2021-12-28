import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Converter} from "../pages/Converter/Converter";
import {Transactions} from "../pages/Transactions/Transactions";
import {Navigation} from "../../common/components/Navigation/Navigation";
import {LoadingLine} from "../../common/components/LoadingLine/LoadingLine";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import {setPagesTransactions, setTransactionsFromLS, TransactionDataType} from "../../bll/transactionsReducer";
import {getFromLocalStorage} from "../../common/utilites/localStorage";
import {getCurrencyApi} from "../../bll/converterReducer";

function App() {
  const {loading, error} = useSelector<AppStoreType, { [key: string]: boolean | string }>((state) => state.appReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrencyApi('USD'))
    const transactionsFromLS: Array<TransactionDataType> = getFromLocalStorage<Array<TransactionDataType>>('bankTransactions', [])
    transactionsFromLS && dispatch(setTransactionsFromLS(transactionsFromLS))
    dispatch(setPagesTransactions(1))
  }, []);

  return (
    <div className="App">
      {loading && <LoadingLine/>}
      {error ? <div className={'error-message'}>{error}</div> :
        <>
          <Routes>
            <Route path={'/'} element={<Converter/>}/>
            <Route path={'converter'} element={<Converter/>}/>
            <Route path={'transactions'} element={<Transactions/>}/>
          </Routes>
          <Navigation/>
        </>}
    </div>
  );
}

export default App;
