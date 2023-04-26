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
// import ViewTabile from '../../ViewTable';
import Viewtablev2 from './viewtablev2';


class ReportworkcenterV1 extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            datalist: [],
            isloadPd: true,
            time: {},
            seconds: 30,
            is_reload: false,
            Text_poolid: null
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
        const { areaid, poolid } = this.props.match.params

        productionworkcenterall(areaid, poolid).then((data) => {

            console.log(data)
            this.setState({
                datalist: data[0]
            })
            if (data.length > 0) {
                this.setState({
                    isloadPd: false,
                    Text_poolid: poolid
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
            //clearInterval(this.timer);
            //  this.startTimer()
            this.reloadDate()

        }

    }
    reloadDate() {



        // setInterval(() => {
        this.setState({
            is_reload: true
        })
        const { areaid, poolid } = this.props.match.params

        productionworkcenterall(areaid, poolid).then((data) => {

            // console.log(data)
            this.setState({
                datalist: data[0]
            })
            if (data.length > 0) {
                this.setState({
                    isloadPd: false,
                    is_reload: false,
                    seconds: 30
                })

                let timeLeftVar = this.secondsToTime(this.state.seconds);
                this.setState({ time: timeLeftVar });

                this.startTimer()

            }
        })
            .catch(e => {

                alert(e)
            })

        // }, 40000)
    }



    render() {


        return (
            <div>
                {/* <Container> */}
                <div style={{ height: 400, width: '100%' }} >
                        <div className='boxrigth' style={{ marginBottom: 20, fontsize: 20, color: '#0571B4' }}>m: {this.state.time.m} s: {this.state.time.s}</div>
                        <div style={{ margin: 10, fontsize: 20, color: '#0571B4' }}>Factory Area : {this.state.Text_poolid}</div>
                        <div className="boxLeft">
                            {/* <ViewTabile data={this.state.datalist} /> */}
                            <Viewtablev2 data={this.state.datalist}/>
                    </div>
                </div>
                {/* </Container> */}
            </div>
        )
    }

}

export default ReportworkcenterV1
