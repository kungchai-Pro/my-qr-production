
import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Modal, Button, Table, Badge } from 'react-bootstrap';

import Moment from 'moment';
import { picklistScanBarcodes } from '../../services/getproductionall';
//import '../components/css/Tables.css';
import TableScrollbar from 'react-table-scrollbar';
import Reversallist from './Reversallist';


class picklistscanbarcode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idpd: this.props.idpds,
            itemid: this.props.items,
            bomunitId: this.props.bomunitId,
            dataareaId: this.props.dataareaId,
            lgShow: false,
            resultpick: [],
            isloadView: false,
            Textsearch: "",
            sumAmount: "",
            Datalist: []
        }
        // bomunitId={this.state.UNITID} dataareaId={this.state.DATAAREAID}
    }




    handleClose = () => {
        this.setState({
            lgShow: false,
            // rusultList: [],
            isloadView: false
        });
    }

    handleShow = () => {
        this.setState({
            lgShow: true
        });

        this.apiservciepickbarcode()
    }


    apiservciepickbarcode() {

        Array.prototype.sum = function (prop) {
            var total = 0
            for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop]
            }
            return total
        }
        picklistScanBarcodes(this.state.idpd, this.state.itemid).then((res) => {
            if (res) {
                this.setState({
                    resultpick: res[0],
                    Datalist: res[0],
                    isloadView: true,
                    sumAmount: res[0].sum("QTY")
                })

            }

        })
    }

    //convert time 
    oncheckdate(dataData) {
        if (dataData == '1900-01-01T00:00:00.000Z') {
            return "";
        }
        else {
            return Moment(dataData).format('DD/MM/YYYY')
        }
    }

    onSearhc(e) {
        this.setState({ Textsearch: e })

        let value = this.state.Textsearch.toLowerCase();
        if (e < 0) { this.setState({ Datalist: this.state.resultpick }) }
            console.log(e)
        let result;
        // console.log(value);
        result = this.state.resultpick.filter((data) => {
            return data.INVENTSERIALID.search(e) != -1;
        });
        this.setState({ Datalist: result,
            sumAmount:result.sum("QTY")
         })
    }

    render() {

        // function rowStyleFormat(row, rowIdx) {
        //     return { backgroundColor: rowIdx % 2 === 0 ? 'red' : 'blue' };
        //   }
        return (
            <>
                <Button variant="primary" size="sm" onClick={() => this.handleShow()} style={{ marginTop: 5 }}>
                    รายละเอียดตัดเบิก ( POSTED )
                </Button>

                <Modal size='xl' show={this.state.lgShow} onHide={() => this.handleClose()}
                //  scrollable={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>รายละเอียดตัดเบิก</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isloadView ? <div>
                            <div><Badge pill variant="success"><b style={{ fontSize: 14 }}>PD . {this.state.resultpick.length > 0 && this.state.resultpick[0].TRANSREFID}</b></Badge> </div>
                            <div><input type='text' name='searhcitem' onChange={(e) => this.onSearhc(e.target.value)}
                                value={this.state.Textsearch} placeholder='ค้นหา' /></div>

                            <TableScrollbar height="400px">
                                <Table responsive style={{ fontSize: 12 }}>
                                    <thead style={{ backgroundColor: "#40E0D0" }}>
                                        <tr>
                                            {/* <th>PD.</th> */}
                                            <th>DATE</th>
                                            <th>ITEMID</th>
                                            <th>SITE</th>
                                            <th>WAREHOUSE</th>
                                            {/* BATCH */}
                                            <th>BATCH</th>
                                            <th>SERIALID</th>
                                            <th>QTY</th>
                                            <th>TRANSID</th>
                                            <th style={{ width: 150 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.Datalist.map((item, index) =>
                                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F6F5F4' : '#FCF9F6' }}>
                                                {/* <td style={{ width: 150 }}>{item.TRANSREFID}</td> */}
                                                <td style={{ width: 150 }}>{this.oncheckdate(item.DATEPHYSICAL)}</td>
                                                {/* <td>{this.oncheckdate(item.DATEFINANCIAL)}</td> */}
                                                <td style={{ width: 150 }}>{item.ITEMID}</td>
                                                <td style={{ width: 150 }}>{item.INVENTSITEID}</td>
                                                <td style={{ width: 150 }}>{item.INVENTLOCATIONID}</td>
                                                <td style={{ width: 150 }}>{item.INVENTBATCHID}</td>
                                                <td style={{ width: 150 }}>{item.INVENTSERIALID}</td>
                                                <td style={{ width: 150 }}>{item.QTY.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                <td style={{ width: 150 }}>{item.INVENTTRANSID}</td>
                                                <td style={{ width: 180 }}>
                                                    {/* <Reversallist resultpick={item} dataareaId={this.state.dataareaId}
                                                    bomunitId={this.state.bomunitId} /> */}
                                                    </td>
                                            </tr>
                                        )}
                                        <tr>
                                            {/* <td style={{ width: 150 }}></td> */}
                                            <td style={{ width: 150 }}></td>
                                            <td style={{ width: 150 }}></td>
                                            <td style={{ width: 150 }}></td>
                                            <td style={{ width: 150 }}></td>
                                            <td style={{ width: 150 }}></td>
                                            <td style={{ width: 150 }}><h6>Total</h6></td>
                                            <td style={{ width: 150 }}><h6>{this.state.sumAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h6></td>
                                            <td style={{ width: 150 }}></td>
                                            <td style={{ width: 150 }}></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </TableScrollbar>

                            {/* </div> */}

                        </div> : <div>LOADING . . . </div>}


                    </Modal.Body>
                </Modal>
            </>
        )
    }

}
export default picklistscanbarcode;

