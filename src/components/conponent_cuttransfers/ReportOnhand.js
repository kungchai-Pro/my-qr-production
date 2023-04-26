import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { ReportSearchOnhand } from '../../services/getproductionall';
import TableReportOnhand from './TableReportOnhand';
import './ReportjournalStyles.css';
export default class ReportOnhand extends Component {
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
      setdataList: "",
      isLoading: false,
      textheader: 'Report Onhand'
    }
    this.keyPress = this.keyPress.bind(this);
  }
  componentDidMount() {

  //  this.isloadingApi(this.state.setdateNow)
  }

  isloadingApi(isdatanow) {

    ReportSearchOnhand(isdatanow).then(data => {
      if (data.success == true) {
        this.setState({
          datalist: data.listall,
          isLoading: false,
          textheader: 'Report Onhand'
        })
      }
      else {
        this.setState({
          datalist: data.listall,
          isLoading: false,
          textheader: 'Report Onhand'
        })
      }
    })
  }


  async isSearchList() {

    this.setState({
      isLoading: true,
      textheader: 'กำลังค้นหาข้อมูล . . . '
    })


    setTimeout(() => {
      this.isloadingApi(this.state.setdataList)
    }, 1500);

  }

  keyPress = (e) => {

    if (e.target.value != "") {// หากไม่มีค่าว่าใน text input 
      if (e.keyCode == 13) {

        this.setState({
          isLoading: true,
          textheader: 'กำลังค้นหาข้อมูล . . . '
        })


        setTimeout(() => {
          this.isloadingApi(this.state.setdataList)
        }, 1500);

      }
    }
  }

  render() {
    return (
      <div>
        <div className='cardheader-reportcutjournal-wrad'>{this.state.textheader}</div>
        <div className='crad-text-search-wrad'>
          <div>
            <input type='Text' name='AddDate' id='AddDate'
              value={this.state.setdataList} placeholder="PUT SERIAL ENTER"
              onChange={(e) => this.setState({ setdataList: e.target.value })}
              onKeyDown={this.keyPress}
              style={{ marginTop: 10, height: 40, marginRight: 10 }} />
          </div>
          <div>
            <Button onClick={() => this.isSearchList()} style={{ marginTop: 10, }}>ค้นหา</Button>
          </div>
        </div>
        <div><hr /></div>
        <div><TableReportOnhand data={this.state.datalist} /></div>
      </div>
    )
  }
  // }
}
