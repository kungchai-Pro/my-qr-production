
import React, { useState } from 'react';
import { Component } from 'react';
import { Form, Modal, Button, Table } from 'react-bootstrap';
import Moment from 'moment';
import { pickfordel, deletepicking} from '../../services/getproductionall';
//import '../components/css/Tables.css';
import TableScrollbar from 'react-table-scrollbar';


class picklistscanbarcodeUnpost extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idpd: this.props.idpds,
            itemid: this.props.items,
            lgShow: false,
            resultpick: [],
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

        this.resultlsit()
    }


    resultlsit(){
        pickfordel(this.state.idpd, this.state.itemid).then((res) => {
            if (res) {
                this.setState({
                    resultpick: res[0],
                    isloadView: true,
                    sumAmount: res[0].sum("BOMConsump")
                })

            }

        })
    }

    DeletepickingByid(_idpd,_item,_ids){

        deletepicking(_idpd,_item,_ids).then((res)=>{
                if(res){
                   this.resultlsit()
                }
        })
        .catch((err)=>{
            alert(err)
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

        const divStyle = {
            overflowY: 'scroll',
            border: '1px solid red',
            width: 'auto',
            //  float: 'left',
            height: '500px',
            //   position:'relative'
        };

        
        return (
            <>
                <Button variant="primary" size="sm" onClick={() => this.handleShow()} style={{marginTop:5,marginLeft:5}}>
                รายการเบิก ( NON POST )
                </Button>

                <Modal size='xl' show={this.state.lgShow} onHide={() => this.handleClose()}
                //  scrollable={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>ภาพรวม Transection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.isloadView ? <div>
                            <TableScrollbar height="400px">
                                <Table responsive style={{ fontSize: 12}}>
                                    <thead style={{backgroundColor:"#40E0D0"}}>
                                    <tr>
                                        <th>ProdId</th>
                                        <th>TransDate</th>
                                        <th>ItemId</th>
                                        <th>InventBatchId</th>
                                        <th>InventSerialId</th>
                                        <th>BOMConsump</th>
                                        <th>InventTransId</th>
                                        <th>Shift</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {this.state.resultpick.map((item, index) =>
                                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F6F5F4' : '#FCF9F6' }}>
                                                <td style={{width:150}}>{item.ProdId}</td>
                                                <td style={{width:150}}>{this.oncheckdate(item.TransDate)}</td>
                                                <td style={{width:150}}>{item.ItemId}</td>
                                                <td style={{width:150}}>{item.inventBatchId}</td>
                                                <td style={{width:150}}>{item.inventSerialId}</td>
                                                <td style={{width:150}}>{item.BOMConsump.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                <td style={{width:150}}>{item.InventTransId}</td>
                                                <td style={{width:150}}>{item.Shift}</td>
                                                <td style={{width:150}}>
                                                <Button
                                                onClick={()=>this.DeletepickingByid(item.ProdId,item.ItemId,item.Id)}
                                                >ลบ{item.id}</Button></td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td style={{width:150}}></td>
                                            <td style={{width:150}}></td>
                                            <td style={{width:150}}></td>
                                            <td style={{width:150}}></td>
                                            <td style={{width:150}}><h6>Total</h6></td>
                                            <td style={{width:150}}><h6>{this.state.sumAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h6></td>
                                            <td style={{width:150}}></td>
                                            <td style={{width:150}}></td>
                                            <td style={{width:150}}></td>
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
export default picklistscanbarcodeUnpost;

