import React, { useState } from 'react';

import { Form, Button, Col, Row, Container, Card, Table, Modal, Spinner, Collapse, Alert } from 'react-bootstrap';

import "react-tabs/style/react-tabs.css";
import { ReportPickTodateShift } from '../../services/getproductionall';
import ViewtableShift from './viewtable_shift';
import './styleReportdateShift.css'
class ReportTodateShift extends React.Component {

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
            isloadPd: true,
            sumtotollist: 0,
            sumshiftA: 0,
            sumshiftB: 0,
            sumshiftUnshift: 0,
            dateNow: dates,
            itemnames:localStorage.getItem('ITEMNAME'),
            itemids:localStorage.getItem('ITEMID'),
            isloading: false
        }
    }
    
    componentDidMount() {
        this.isLoadingdata()

    }

    sumtotalitem = () => { // sum total item list 
        var i;
        var sum = null;
        for (i = 0; i < this.state.datalist.length; i++) {
            if (this.state.datalist[i] != undefined) {
                sum += parseInt(this.state.datalist[i].QTY)
            }
            if (sum != null) {
                this.setState({ sumtotollist: sum })
            }
            else {
                this.setState({ sumtotollist: 0 })
            }

        }
    }

    sumtotalitemA = () => { // sum total item list 
        var i;
        var sum = null;
        for (i = 0; i < this.state.datalist.length; i++) {
            if (this.state.datalist[i] != undefined) {
                if (this.state.datalist[i].SHIFT == "A") {
                    sum += parseInt(this.state.datalist[i].QTY)
                }

            }
            if (sum != null) {
                this.setState({ sumshiftA: sum })
            }
            else {
                this.setState({ sumshiftA: 0 })
            }

        }
    }

    sumtotalitemB = () => { // sum total item list 
        var i;
        var sum = null;
        for (i = 0; i < this.state.datalist.length; i++) {
            if (this.state.datalist[i] != undefined) {
                if (this.state.datalist[i].SHIFT == "B") {
                    sum += parseInt(this.state.datalist[i].QTY)
                }

            }
            if (sum != null) {
                this.setState({ sumshiftB: sum })
            }
            else {
                this.setState({ sumshiftB: 0 })
            }

        }
    }

    sumtotalitemUnshift = () => { // sum total item list 
        var i;
        var sum = null;
        for (i = 0; i < this.state.datalist.length; i++) {
            if (this.state.datalist[i] != undefined) {
                if (this.state.datalist[i].SHIFT == "") {
                    sum += parseInt(this.state.datalist[i].QTY)
                }

            }
            if (sum != null) {
                this.setState({ sumshiftUnshift: sum })
            }
            else {
                this.setState({ sumshiftUnshift: sum })
            }

        }
    }

    isSearchDetail = () => {
        this.isLoadingdata()
    }

    isLoadingdata = () => {
        const { pdId} = this.props.match.params
       const itemidnew=localStorage.getItem('ITEMID')
        this.setState({ isloading: true })
        ReportPickTodateShift(pdId, itemidnew, this.state.dateNow).then((data) => {//29/03/2022
            //  console.log(data)
            this.setState({
                datalist: data.listall
            }, function () {
                this.sumtotalitem()
                this.sumtotalitemA()
                this.sumtotalitemB()
                this.sumtotalitemUnshift()
                this.setState({ isloading: false })
            })
            if (data.length > 0) {
                this.setState({
                    isloadPd: false,

                })
            }
        })
            .catch(e => {

                alert(e)
            })
    }

    render() {
        const { pdId, itemid } = this.props.match.params
        return (
            <div>
                <Container style={{marginTop:20}}>
                    <Card body className='header-report-wrap'>
                        <div style={{ margin: 5,fontSize:20,marginBottom:10 }}><center><h3>รายงานประจำวัน Pick DetailList </h3></center></div>
                        <Row style={{ fontSize: 14, padding: 5 }}>
                            <Col>
                                <div>PRODID  : {pdId}</div>
                                <div>ITEMID : {this.state.itemids}</div>
                                <div>ITEMNAME : {this.state.itemnames}</div>
                                <div><hr/>
                                </div>
                                <div style={{ marginTop: 10 }}>วันที่ {" "}<input type='Date' value={this.state.dateNow} onChange={(e)=>this.setState({dateNow:e.target.value})}/>
                            {" "}<Button onClick={() =>this.isSearchDetail()}>ค้นหา</Button></div>
                            </Col>
                            <Col>
                                <div style={{ flexDirection: "row", width: '100%', padding: 10 }}>
                                    <div className='cardlayout-sum'>
                                        <div>กะ A</div>
                                        <div>{this.state.sumshiftA}</div>
                                    </div>
                                    <div className='cardlayout-sum'>
                                        <div>กะ B</div>
                                        <div>{this.state.sumshiftB}</div>
                                    </div>
                                    <div className='cardlayout-sum'>
                                        <div>ไม่ระบุกะ</div>
                                        <div>{this.state.sumshiftUnshift}</div>
                                    </div>
                                    <div className='cardlayout-sum'>
                                        <div style={{ color: "#DB1905", fontSize: 18 }}>รวม</div>
                                        <div style={{ color: "#DB1905", fontSize: 18 }}>{this.state.sumtotollist}</div>
                                    </div>

                                </div>

                            </Col>
                        </Row>
                    </Card>
                </Container>
                <hr />
                <Container>
                <div style={{ margin: 10 }}>
                    {this.state.isloading == true ? <div><center style={{ fontSize: 20, color: '#1BA735' }}>กำลังโหลดข้อมูล . . . </center></div> : <div className="boxLeft">
                        <ViewtableShift data={this.state.datalist} />
                    </div>}
                </div>
                </Container>
            </div>
        )
    }

}

export default ReportTodateShift
