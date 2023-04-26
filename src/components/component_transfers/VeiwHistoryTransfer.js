import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Modal, Button, Table } from 'react-bootstrap';
import Moment from 'moment';
import { getHistoryTransfers } from '../../services/getproductionall';
import TableScrollbar from 'react-table-scrollbar';


class VeiwHistoryTransfer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idpd: this.props.idpds,
            lgShow: false,
            resultdata: [],
            isloadView: false,
            sumAmount: ""
        }
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

        //this.apiservciepickbarcode()
        this.resultlsit()
    }

    // apiservciepickbarcode() {

    //     Array.prototype.sum = function (prop) {
    //         var total = 0
    //         for (var i = 0, _len = this.length; i < _len; i++) {
    //             total += this[i][prop]
    //         }
    //         return total
    //     }

    //  //   this.resultlsit()
    // }


    resultlsit() {

        getHistoryTransfers(this.state.idpd).then((data) => {
            if (data) {
                console.log(data)
                this.setState({
                    resultdata: data[0],
                    isloadView: true,
                    //   sumAmount: res[0].sum("QTY")
                })

            }

        })

    }

    oncheckdate(dataData) {
        if (dataData == '1900-01-01T00:00:00.000Z') {
            return "";
        }
        else {
            return Moment(dataData).format('DD/MM/YYYY')
        }
    }


    render() {

        return (
            <>
                <Button variant="primary" size="sm" onClick={() => this.handleShow()} style={{ marginTop: 5, marginLeft: 5 }}>
                    ประวัติการโอนคลัง
                </Button>
                <Modal size='xl' show={this.state.lgShow} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>ภาพรวม Transection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isloadView ? <div>
                            PRODID : {this.state.idpd}
                            <TableScrollbar height="400px">
                                <Table responsive style={{ fontSize: 12 }}>
                                    <thead style={{ backgroundColor: "#40E0D0" }}>
                                        <tr>
                                            <th>JOURNALID</th>
                                            <th>TRANSDATE</th>
                                            <th>FROM WH</th>
                                            <th>TO WH</th>
                                            <th>QTY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.resultdata.map((item, index) =>
                                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F6F5F4' : '#FCF9F6' }}>
                                                <td>{item.JOURNALID}</td>
                                                <td>{this.oncheckdate(item.TRANSDATE)}</td>
                                                <td>{item.FROMWAREHOUSE}</td>
                                                <td>{item.TOWAREHOUSE}</td>
                                                <td>{item.QTY}</td>
                                                <td>
                                                    {item.STATUS == "POSTED" ? <p style={{ color: "#0FCDA0" }}>{item.STATUS}</p> : <p style={{ color: "#E29F0F" }}>{item.STATUS}</p>}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>

                                        </tr>
                                    </tbody>
                                </Table>
                            </TableScrollbar>



                        </div> : <div>LOADING . . . </div>}


                    </Modal.Body>
                </Modal>
            </>
        )
    }

}
export default VeiwHistoryTransfer;

