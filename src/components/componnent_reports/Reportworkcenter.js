import React, { useState } from 'react';
import {
    Button, Col, Row, Container, Table, Spinner, Badge,
    Card, Modal
} from 'react-bootstrap';
import Moment from 'moment';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import TableScrollbar from 'react-table-scrollbar';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Link } from 'react-router-dom';

import { productionworkcenterall } from '../../services/getproductionall';
import { Alert } from 'reactstrap';

export class Reportworkcenter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist: [],
            isloadPd: true,
            time: {},
            seconds: 120,
            is_reload:false
        }

        // this.state = { time: {}, seconds: 5 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }




    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }


    componentDidMount() {



        productionworkcenterall('live', 'MFG4').then((data) => {

            console.log(data)
            this.setState({
                datalist: data[0]
            })
            if (data.length > 0) {
                this.setState({
                    isloadPd: false
                })

                let timeLeftVar = this.secondsToTime(this.state.seconds);
                this.setState({ time: timeLeftVar });

                this.startTimer()
                 
            }
        })
            .catch(e => {

                alert(e)
            })
    }



    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
         //   clearInterval(this.timer);
          //  this.startTimer()
          this.reloadDate()
           
        }
    }


    reloadDate() {

       

        // setInterval(() => {
            this.setState({
                is_reload:true
            })
            productionworkcenterall('live', 'MFG4').then((data) => {

                // console.log(data)
                this.setState({
                    datalist: data[0]
                })
                if (data.length > 0) {
                    this.setState({
                        isloadPd: false,
                        is_reload:false,
                        seconds:120
                    })
                }
            })
                .catch(e => {

                    alert(e)
                })

        // }, 40000)
    }


    onSumMultiplier = (NO_ON, piicklist) => {
        var result = NO_ON * piicklist;
        if (result > 0) {
            return <div>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        }
        else {
            return <div style={{ color: "#F73309" }}>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        }
    }


    onDiffen = (QTYSCHED, RAFTOTAL) => {
        var result = RAFTOTAL - QTYSCHED
        if (result > 0) {
            return <div style={{ color: "#green" }}>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        }
        else {
            return <div style={{ color: "#F73309" }}>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        }
    }


    render() {
        return (
            <div>
                {/* <center> <h2>Report Workcenter All</h2></center> */}
                {/* <div>{JSON.stringify(this.state.datalist)}</div> */}

                {/* <TabPanel> */}
                <p></p>
                

                <div>
                    {/* <button onClick={this.startTimer}>Start</button> */}
                    <h4>Production : FMG4 </h4> m: {this.state.time.m} s: {this.state.time.s}
                </div>

                {/* <h4>Workcenter :  <Badge pill variant="success"> List workceter all {this.state.PDworkcenter}</Badge></h4> */}
                    

                   
                <center>   {this.state.isloadPd ? <div><Button variant="primary" style={{ margin: 5 }} disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> Loading...
                </Button>
                </div> : <div></div>}
                </center>
                <Table responsive="sm">
                    <thead style={{ backgroundColor: '#1A98D6' }}>
                        <tr>
                            <th>Prod ID</th>
                            <th>Oder(qty)</th>
                            {/* <th>ตัวคูณ</th> */}
                            <th style={{ color: "#CE1212" }}>ลูกเหล็ก</th>
                            <th style={{ color: "#CE1212" }}>รวม</th>
                            <th style={{ color: "#ffff" }}>รับเข้า Hold</th>
                            <th style={{ color: "#ffff" }}>รับเข้า FG</th>
                            <th style={{ color: "#ffff" }}>รวมยอดผลิต</th>
                            <th>Remaining</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    {
                        this.state.datalist.map((item, index) =>
                            <tbody key={index} style={{ backgroundColor: index % 2 === 0 ? '#F6F5F4' : '#FCF9F6' }}>
                                <tr>
                                    <td>{item.PRODID}</td>
                                    <td>{item.QTYSCHED.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    {/* <td>{item.NO_ON.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td> */}
                                    <td>{item.PICKINGLIST.toLocaleString(undefined, { maximumFractionDigits: 2 })} <label style={{ color: '#F73309' }}>( *{item.NO_ON.toLocaleString(undefined, { maximumFractionDigits: 2 })} )</label>
                                    </td>

                                    <td>{this.onSumMultiplier(item.NO_ON, item.PICKINGLIST)}</td>

                                    <td>{item.RAFHOLD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td>{item.RAFFG.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td>{item.RAFTOTAL.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td>{this.onDiffen(item.QTYSCHED, item.RAFTOTAL)}</td>
                                    {/* <td><Button variant="success" size="sm" onClick={() => this.onlgShow(item.PRODID, 'pick')}>Pick Detail</Button > <Button variant="info" size="sm" onClick={() => this.onlgShow(item.PRODID, 'Raf')}>RAF Detail</Button ></td> */}
                                </tr>
                            </tbody>
                        )
                    }
                </Table>
                {/* </TabPanel> */}

            </div>
        )
    }
}

export default Reportworkcenter
