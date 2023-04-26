import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Route, Link, Router, Redirect, Switch } from 'react-router-dom';


import HOME from './components/home';
import BOMS from './components/boms';
import INDEX from './components/index';
import SCANBARCODE from './components/scanbarcode';
import WRKCTRLISTID from './components/wrkctr_list_id';
import Reportworkcenter from './components/componnent_reports/Reportworkcenter';
import ReportworkcenterV1 from './components/componnent_reports/ReportworkcenterV1';
import scanbarcodeTransfers from './components/scanbarcodeTransfers';
import scanbarcodeTransfersCutitem from './components/scanbarcodeTransfersCutitem';
import ReportOnhand from'./components/conponent_cuttransfers/ReportOnhand';
import ReportJournalCut_History from './components/conponent_cuttransfers/ReportJournalCut_History';
import ReportTodateShift from './components/component_picks/ReportTodateShift';
import ReportOnhandbyWareHouse from './components/componnent_reports/ReportOnhandbyWareHouse';
import ReportOnhandByItemId from './components/component_picks/ReportOnhandByItemId';


function App() {
  return (
    <BrowserRouter basename='/swanbarcode'>
      <div className="App">
        <Switch>
          {/* <Route exact path="/Login" component={INDEX} /> */}
          <Route exact path="/" component={INDEX} />
          <Route path="/Home" component={HOME} />
          <Route path="/Boms" component={BOMS} />
          <Route path="/SCANBARCODE" component={SCANBARCODE} />
          <Route path="/WRKCTRLISTID" component={WRKCTRLISTID}/>
          <Route path="/scanbarcodeTransfers" component={scanbarcodeTransfers}/>
          <Route path="/Viewworkcerter/:areaid/:poolid" component={ReportworkcenterV1}/>
          <Route path="/scanbarcodeTransfersCutitem" component={scanbarcodeTransfersCutitem}/>
          <Route path="/repostOnhand" component={ReportOnhand}/>
          <Route path="/reportJournalHistory" component={ReportJournalCut_History}/>
          <Route path="/reportTodateShift/:pdId/:itemid" component={ReportTodateShift}/>
          <Route path="/roportOnhandbyWareHouse/:emplid" component={ReportOnhandbyWareHouse}/>
          <Route path="/reportOnhandByItemId/:itemid" component={ReportOnhandByItemId}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
