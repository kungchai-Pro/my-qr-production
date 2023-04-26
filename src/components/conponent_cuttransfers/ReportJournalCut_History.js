import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { ReportJournalCutHistory } from '../../services/getproductionall';
import TableReport from './TableReport';
import './ReportjournalStyles.css';
export default class ReportJournalCut_History extends Component {
  constructor(props) {
    super(props)

    const d = new Date();
    var months = d.getMonth() + 1;
    var datesconvert = d.getDate();

    if (months.toString().length == 1) {
      months = '0' + months
    }
    if (datesconvert.toString().length == 1) {
      datesconvert = '0' + datesconvert
    }
    var dates = d.getFullYear() + '-' + months + '-' + datesconvert

    this.state = {
      datalist: [],
      setdateNow: dates,
      isLoading: false,
      textheader:'Report Journal History'
    }
  }
  componentDidMount() {

    this.isloadingApi(this.state.setdateNow)
  }

  isloadingApi(isdatanow) {

    ReportJournalCutHistory(isdatanow).then(data => {
      if (data.success == true) {
        this.setState({
          datalist: data.listall,
          isLoading: false,
          textheader:'Report Journal History'
        })
      }
      else{
        this.setState({
          datalist: data.listall,
          isLoading: false,
          textheader:'Report Journal History'
        })
      }
    })
  }


  async isSearchList() {
    this.setState({
      isLoading: true,
      textheader:'กำลังค้นหาข้อมูล . . . '
    })


    setTimeout(() => {
      this.isloadingApi(this.state.setdateNow)
    }, 1500);


  }


  render() {
    // if (this.state.isLoading == true) {
    //   return (<div className='cardheader-reportcutjournal-wrad'>
    //     <h4> กำลังค้นหาข้อมูล </h4>
    //   </div>)
    // }
    // else if (this.state.isLoading == false) {

      return (
        <div>
          <div className='cardheader-reportcutjournal-wrad'>{this.state.textheader}</div>
          <div className='crad-text-search-wrad'>
            <div>
              <input type='date' name='AddDate' id='AddDate'
               value={this.state.setdateNow} onChange={(e) => this.setState({ setdateNow: e.target.value })} style={{ marginTop: 10,height:40,marginRight:10 }} />
            </div>
            <div>
              <Button onClick={() => this.isSearchList()} style={{marginTop:10,}}>ค้นหา</Button>
            </div>
          </div>
        <div><hr/></div>
          <div><TableReport data={this.state.datalist} /></div>
        </div>
      )
    }
 // }
}
