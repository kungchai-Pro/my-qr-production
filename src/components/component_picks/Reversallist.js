import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { pickfordel, deletepicking} from '../../services/getproductionall';

const BASE_URL2 = process.env.REACT_APP_BASE2_URL;

export default class Reversallist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            liked: false,
            titels: "กลับรายการ",
            buttonstyls: `warning`
        }
    }


    Onlike = async () => {

        // this.setState({ liked: !this.state.liked, titels: `รอการบันทึก`, buttonstyls: `success` })
        // console.log(this.props.resultpick)
        // console.log(this.props.dataareaId)
        // console.log(this.props.bomunitId)

        // var date = new Date().getDate() + 1;
        // var month = new Date().getMonth() + 1;
        // var year = new Date().getFullYear();
        // var datetime = year + '-' + month + '-' + date;


        var idPRODPOOLID = localStorage.getItem('idPRODPOOLID');
        var idWRKCTRID = localStorage.getItem('idWRKCTRID');
        var idEMPLID = localStorage.getItem('idEMPLID');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                PoolId: idPRODPOOLID, //*
                WrkCtrId: idWRKCTRID, //*
                ProdId: this.props.resultpick.TRANSREFID,// * TRANSREFID 
                TransDate: this.props.resultpick.DATEPHYSICAL,//*
                ItemId: this.props.resultpick.ITEMID,//*
                InventSiteId: this.props.resultpick.INVENTSITEID,//*
                InventLocationId: this.props.resultpick.INVENTLOCATIONID,//*
                inventBatchId: this.props.resultpick.INVENTBATCHID,//*
                wmsLocationId: this.props.resultpick.WMSLOCATIONID,//*
                inventSerialId: this.props.resultpick.INVENTSERIALID,//*
                BOMUnitId: this.props.bomunitId, //*
                BOMConsump: this.props.resultpick.QTY,//* QTY 
                EmpID: idEMPLID, //*
                DataAreaId: this.props.dataareaId,//*
                InventTransId:this.props.resultpick.INVENTTRANSID,//*
                Shift: localStorage.getItem('shifts')//*
            })
        };

        console.log(JSON.stringify(requestOptions))
        const response = await fetch(BASE_URL2 + '/inserItem', requestOptions)
        const body = await response.json();
        if (response.status == 200) {
            // this.setState({ ResponseSave: true })
            console.log('success')
            this.setState({ liked: !this.state.liked, titels: `เสร็จแล้ว`, buttonstyls: `success` })
        }
        if (response.status !== 200)
            throw Error(alert(body.message));
        return body;
    }

    //style={{display:this.state.liked === true ? "hidden" : "undefined" }}


    componentDidMount=async()=>{
        // console.log(this.props.resultpick.TRANSREFID)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input_Prodid:this.props.resultpick.TRANSREFID,
                input_Serialid:this.props.resultpick.INVENTSERIALID,
                input_qty:this.props.resultpick.QTY
            })
        };

        console.log(JSON.stringify(requestOptions))

        const response = await fetch(BASE_URL2 + '/getchecklistpicking', requestOptions)
        const body = await response.json();
        if (response.status == 200) {
            // this.setState({ ResponseSave: true })
            console.log('success')
            if(body.stutas==true){
              //  console.log(body)
                this.setState({ liked: !this.state.liked, titels: `รอกลับรายการ`, buttonstyls: `success` })
            }
            
            
            // if(){
            //     this.setState({ liked: !this.state.liked, titels: `เสร็จแล้ว`, buttonstyls: `success` })
            // }
            
        }
        if (response.status !== 200)
            throw Error(alert(body.message));
        return body;
    }

    render() {

        return <div>
            {this.props.resultpick.QTY<=0&&
            <Button variant={this.state.buttonstyls} size="sm" onClick={() => this.Onlike()} disabled={this.state.liked} >
                <label style={{ fontSize: 11 }}>{this.state.titels}</label>
            </Button>}

        </div>;
    }
}
