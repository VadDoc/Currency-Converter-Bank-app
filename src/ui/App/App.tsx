import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Converter} from "../pages/Converter/Converter";
import {Transactions} from "../pages/Transactions/Transactions";
import {Navigation} from "../../common/components/Navigation/Navigation";
import {LoadingLine} from "../../common/components/LoadingLine/LoadingLine";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";

function App() {
  const {loading, error} = useSelector<AppStoreType, { [key: string]: boolean | string }>((state) => state.appReducer);

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
