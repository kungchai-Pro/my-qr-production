import React, { Component } from 'react'
import { Form, Button, Col, Row, Container, Card, Table, Modal, Spinner, Collapse, Alert } from 'react-bootstrap';
import { BsCheckBox, BsArrowRepeat, BsFullscreen,BsFillFileEarmarkBarGraphFill } from "react-icons/bs";
import Headerbom from './headerbom';
import PickScanBarcode from './component_picks/picklistscanbarcode';
import PickScanBarcodeUnpost from './component_picks/picklistscanbarcodeUnpost';
import SweetAlert from 'react-bootstrap-sweetalert';
import { InvalidateSumtotalPick } from '../services/getproductionall'
// import { BsFillFileEarmarkBarGraphFill,BsFilter } from "react-icons/bs";
import { Link } from 'react-router-dom';

const BASE_URL1 = process.env.REACT_APP_BASE1_URL;
const BASE_URL2 = process.env.REACT_APP_BASE2_URL;

async function checksumary(getitemAll) {

    var i;
    var statusall;
    var itemdetail;
    for (i = 0; i < getitemAll.length; i++) {

        if (getitemAll[i] != undefined) {

            var Onhands = getitemAll[i].Onhand
            var QtyActuals = getitemAll[i].QtyActual

            await InvalidateSumtotalPick(getitemAll[i].INVENTSERIALID).then(data => {
                // console.log(data)
                if (data.stutas == true) {
                    var allsum = parseInt(QtyActuals) + data.datalist[0].totalsum
                    if (allsum > Onhands) {
                        //  alert('เกิน')
                        statusall = 1
                        itemdetail = data.datalist[0].inventSerialId
                    }
                    else {
                        statusall = 0
                    }
                }
                else if (data.stutas == false) {
                    statusall = 0
                }

            })
        }

    }
    // console.log(statusall)
    return statusall;
    // console.log(this.state.items.length)
    // alert(statusall)
    // if(statusall==0){
    //     this.addItem_insert()
    // }
    // else{
    //     alert('ข้อมูลจำนวนบ้างไอเทม '+itemdetail)
    // }
}

class Scanbarcode extends Component {

    constructor(props) {
        super(props);
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
            inputValue: '',
            items: [],
            getitemAll: [],
            Datarray: [],
            DATAAREAID: null, PRODID: null, BOMID: null, ITEMID: null, ITEMNAME: null,
            BOMQTY: null, INVENTSITEID: null, INVENTLOCATIONID: null, INVENTBATCHID: null,
            UNITID: null, BOMQTYSERIE: null, QTYBOMCALC: null, REMAINBOMPHYSICAL: null,
            QTYBOMSTUP: null, REMAINBOMFINANCIAL: null, AvailableQty: null, result: [],
            ResponseSave: false, InvenItem: [],
            isloeding: true,
            Text_Null: false, result_Null: 'ON Result', checks: false,
            ismodal: false, iditem: null, Qtyitem: null, BATCHNUMBER: null,
            Textinput: null, WMSLOCATIONID: null,
            ErrorNull: false, ErrorDuplicate: false,
            overOn_hand: null,
            count_dataArray: null,
            isShowpick: false,
            alertT: false,
            sumtotollist: 0,
            datetime: dates
        }

        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.removeBarCode = this.removeBarCode.bind(this);
        this.ResetArray = this.ResetArray.bind(this);

    }

    componentDidMount() {

        this.callApi() //เรียก API item มาแสดงในหัวหน้าสแกน
            .then(res => {
                this.setState({ Datarray: res[0] });
                //   console.log(res)

                localStorage.setItem('ITEMNAME', this.state.Datarray[0].ITEMNAME)
                localStorage.setItem('ITEMID',this.state.Datarray[0].ITEMID)

                this.setState({
                    DATAAREAID: this.state.Datarray[0].DATAAREAID,
                    PRODID: this.state.Datarray[0].PRODID,
                    BOMID: this.state.Datarray[0].BOMID,
                    ITEMID: this.state.Datarray[0].ITEMID,
                    ITEMNAME: this.state.Datarray[0].ITEMNAME,
                    BOMQTY: this.state.Datarray[0].BOMQTY,
                    INVENTSITEID: this.state.Datarray[0].INVENTSITEID,
                    INVENTLOCATIONID: this.state.Datarray[0].INVENTLOCATIONID,
                    INVENTBATCHID: this.state.Datarray[0].INVENTBATCHID,
                    UNITID: this.state.Datarray[0].UNITID,
                    BOMQTYSERIE: this.state.Datarray[0].BOMQTYSERIE,
                    QTYBOMCALC: this.state.Datarray[0].QTYBOMCALC,
                    REMAINBOMPHYSICAL: this.state.Datarray[0].REMAINBOMPHYSICAL,
                    QTYBOMSTUP: this.state.Datarray[0].QTYBOMSTUP,
                    REMAINBOMFINANCIAL: this.state.Datarray[0].REMAINBOMFINANCIAL,
                    AvailableQty: this.state.Datarray[0].AvailableQty,
                    WMSLOCATIONID: this.state.Datarray[0].WMSLOCATIONID,
                    warningQtynull: false,
                })
                setTimeout(() => {

                    this.setState({
                        isloeding: false
                    })

                }, 800);

            })
            .catch(err =>
                alert(err + '_ERR_CONNECTION_REFUSED tests data lest')
            );

    }

    //connect API เรียก API item มาแสดงในหัวหน้าสแกน
    callApi = async () => {

        const { AreaIds, ProdIds, ItemIds } = this.props.location.state // data by page 1 

        const response = await fetch(BASE_URL1 + '/getforScancode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "AreaId": AreaIds,
                "ProdId": ProdIds,
                "ItemId": ItemIds
            })
        })
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };


    // รับค่าจาก Text input serail barcode
    handleChange(e) {
        this.setState({ value: e.target.value });
    }


    // Delete ค่าออกจาก Array item ที่กรอกเข้าใน Array
    removeBarCode(e) {
        var array = this.state.items;
        delete array[e];
        this.setState({
            Allarrey: array
        })

        //        getitemAll

        var arraygetitemAll = this.state.getitemAll;
        delete arraygetitemAll[e];
        this.setState({
            Allarrey: arraygetitemAll
        })




        // count length data array ---------------->

        var count = array.filter(val => val != '').length;
        this.setState({
            count_dataArray: count
        })
        this.sumtotalitem() //sum total item list
    }


    // reset ค่าใน Array ทั้งหมด 2136210500550
    ResetArray() {

        var count = this.state.items.filter(val => val != '').length;
        this.setState({
            items: [],
            Text_Null: false,
            result_Null: 'ON Result',
            ErrorNull: null,
            ErrorDuplicate: false,
            warningQtynull: false,
            count_dataArray: 0,
            sumtotollist: 0

        })

    }


  
    // ทำการ insert ข้อมูลเข้า ดาต้าเบส 
    async addItem_insert() {

        ///  InvalidateSumtotalPick()  ยังต้องทำต่อ 


        checksumary(this.state.items).then(data => {
          //  console.log(data + '= = ' + this.state.items)
            if (data == 1) {
                alert('มีบ้างรายการ เกินจำนวน onhand  กรุณาตรวจสอบข้อมูล')
            }
            else if (data == 0) {
                const dataqty = this.checking_QtyActual()
                if (this.state.datetime == "") {
                    alert("กรุณาตรวจสอบวันที่")
                    return
                }

                if (dataqty >= 1) {
                    this.setState({
                        warningQtynull: true,

                    })
                }
                else {
                    if (this.state.items != '') {
                        setTimeout(() => {
                            this.setState({
                                isloeding: false
                            })

                        }, 1000);

                        var i;
                        for (i = 0; i < this.state.items.length; i++) {
                            //  console.log('insert =')
                            if (this.state.items[i] != undefined) {
                                this.Save_insert(i);
                            }

                        }


                        this.setState({
                            isloeding: true,
                            items: [],
                            result_Null: 'ON Result',
                            ErrorNull: false,
                            ErrorDuplicate: false,
                            Text_Null: false,
                            warningQtynull: false,
                            count_dataArray: 0

                        }, function () {
                            this.showAlert()
                        })
                        //----- end loob ---> 
                    }
                    else {
                        alert("ไม่มีข้อมูล กรุณาตรวจสอบข้อมูลก่อนบันทึก")

                    }
                }
            }

        })
    }

    // count จำนวน length Array 
    checking_QtyActual() {
        var count = this.state.items.filter(val => val.QtyActual == 0 || val.QtyActual == "0").length;
        return count;
    }

    // connect api insert database ----
    Save_insert = async (i) => {



        var idPRODPOOLID = localStorage.getItem('idPRODPOOLID');
        var idWRKCTRID = localStorage.getItem('idWRKCTRID');
        var idEMPLID = localStorage.getItem('idEMPLID');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                PoolId: idPRODPOOLID,
                WrkCtrId: idWRKCTRID,//*
                ProdId: this.state.PRODID,
                TransDate: this.state.datetime,
                ItemId: this.state.ITEMID,
                InventSiteId: this.state.INVENTSITEID,
                InventLocationId: this.state.INVENTLOCATIONID,
                inventBatchId: this.state.items[i].INVENTBATCHID,
                wMSLocationId: this.state.items[i].WMSLOCATIONID,
                inventSerialId: this.state.items[i].INVENTSERIALID,
                BOMUnitId: this.state.UNITID,
                BOMConsump: this.state.items[i].QtyActual,
                EmpID: idEMPLID,
                DataAreaId: this.state.DATAAREAID,
                InventTransId: "",
                Shift: localStorage.getItem('shifts')
            })
        };

        console.log(JSON.stringify(requestOptions))
        const response = await fetch(BASE_URL2 + '/inserItem', requestOptions)
        const body = await response.json();
        if (response.status == 200) {
            this.setState({ ResponseSave: true })
        }
        if (response.status !== 200)
            throw Error(alert(body.message));
        return body;
    }


    // editor getapi chang is post 
    callApiInven = async (data) => {

        const { DATAAREAID, INVENTSITEID, INVENTLOCATIONID, ITEMID } = this.state // data by page 1 

        console.log(DATAAREAID + '/' + INVENTSITEID + '/' + INVENTLOCATIONID + '/' + ITEMID + '/' + data)


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "DataAreaId": DATAAREAID,
                "InventSerialId": data,
                "InventSiteId": INVENTSITEID,
                "inventWarehouse": INVENTLOCATIONID,
                "ItemId": ITEMID,
                "QtyActual": 0 // โยนค่ากลับเข้าไปเพื่อ  return ค่ากลับเข้ามาเป็น ศูนย์
            })
        };

        const response = await fetch(BASE_URL1 + '/itemscancode', requestOptions);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };


    // key  textinput เข้า Array 
    keyPress = (e) => {

        if (e.target.value != "") {// หากไม่มีค่าว่าใน text input 

            if (e.keyCode == 13) { // check ว่ามีการ  enter ข้อมูลเข้ามาหรือไม่หรือไม่จะไม่เข้าเงื่อนไข   

                this.callApiInven(e.target.value)
                    .then(res => {
                        let items = this.state.items;
                        let getitemAll = this.state.getitemAll
                        this.setState({
                            InvenItem: res[0]
                        })

                        console.log(this.state.InvenItem.length)

                        if (this.state.InvenItem.length == 0) { // check item ไม่เท่ากับ 0
                            this.setState({
                                Text_Null: true,
                                result_Null: e.target.value,
                                ErrorDuplicate: false,
                                ErrorNull: false
                            })
                            e.target.value = ""
                        }
                        else { // หากไม่เท่ากัน 0

                            this.setState({
                                Text_Null: false,
                                result_Null: e.target.value,
                                ResponseSave: false,
                                ErrorDuplicate: false
                            })

                            var i;
                            var error_datanull = false;
                            if (this.state.items.length > 0) {

                                for (i = 0; i < this.state.items.length; i++) { // ตรวจสอบว่า มีข้อมูลในการแสกนซ้ำกันหรือไม่ แล้ว return true

                                    if (this.state.items[i] != undefined) {
                                        if (this.state.items[i].INVENTSERIALID.toLowerCase().trim() == this.state.result_Null.toLowerCase().trim()) {
                                            this.setState({
                                                ErrorDuplicate: true,
                                                ErrorNull: false
                                            })

                                            setTimeout(() => {
                                                e.target.value = ""
                                            }, 1000);

                                            return error_datanull = true;
                                        }

                                    }

                                }
                            }
                            //end ---->

                            for (i = 0; i < this.state.InvenItem.length; i++) {

                                if (error_datanull != true) {// หากข้อมูลไม่ซ้ำกัน

                                    if (this.state.InvenItem[i].Onhand > 0) { // ตรวจสอบข้อมูลว่ามีจำนวนมาก on-hand อยู่หรือไม่

                                        this.state.getitemAll.push(this.state.InvenItem[i]); //เอาไว้ตรวจสอบข้อมูลเกินจำนวน  onhand

                                        this.state.items.push(this.state.InvenItem[i]);
                                        var count = this.state.items.filter(val => val != '').length;

                                        this.sumtotalitem() // sumtotal item list

                                        //   e.target.value = ""
                                        this.setState({
                                            ErrorNull: false,
                                            ErrorDuplicate: false,
                                            count_dataArray: count
                                        })
                                    }
                                    else {  //หากไม่มีแสดงค่าดังนี้

                                        this.setState({
                                            ErrorNull: true,
                                        })

                                    }
                                }
                                else {
                                    this.setState({ ErrorNull: true })
                                }
                            }

                            //---end ไม่ซ้ำกัน>

                        }

                        this.setState({
                            items,
                            getitemAll
                        })


                        setTimeout(() => {
                            e.target.value = ""
                        }, 1000);

                    })

            } // end enter ---- >
        }

    }


    click_EditQtyitem() {//ตรวจสอบการกรอกจำ item เกินจำนวน on-hand
        var id = this.state.iditem;
        var data = '' + this.state.Textinput + '';
        var messages = "";

        if (this.state.Textinput == null) {
            messages = "คุณยังไม่ได้ระบุจำนวน"
            this.setState({ overOn_hand: messages })
        }
        else {

            if (this.state.items[id].Onhand >= this.state.Textinput) {
                this.setState({ ismodal: false, Qtyitem: this.state.items[id].QtyActual = data }) //  แก้ไขตรงนี้ ---->
                this.setState({ overOn_hand: null })


            }
            else {
                messages = "คุณเบิกเกินจำนวน On-nand"
                this.setState({ overOn_hand: messages })
            }
        }

        this.sumtotalitem() // sum total item list

    }

    // show pop up --> เพื่อกรอกจำนวนที่ต้องการเบิก
    modalClose = () => {
        this.setState({
            ismodal: false,
            overOn_hand: null,
            Textinput: null
        })
    }

    // close pop up  edit data qty
    modalShow(id) {
        if (id != null) {
            this.setState({
                ismodal: true,
                iditem: id,
                Qtyitem: this.state.items[id].Onhand,
                BATCHNUMBER: this.state.items[id].INVENTSERIALID,
                overOn_hand: null
            })
        }
    }

    //  alert  // alert show confirm 
    showAlert() {
        this.setState({
            alertT: true
        })

    };

    onConfirm = () => { // alert show confirm 
        this.sumtotalitem()
        this.setState({ alertT: false, sumtotollist: 0 })

    }

    sumtotalitem = () => { // sum total item list 
        var i;
        var sum = null;
        for (i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i] != undefined) {
                sum += parseInt(this.state.items[i].QtyActual)
            }
            if (sum != null) {
                this.setState({ sumtotollist: sum })
            }
            else {
                this.setState({ sumtotollist: 0 })
            }


        }
    }


    render() {

        if (this.state.isloeding == true) {

            return <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <center>
                    <Spinner animation="grow" variant="primary" />
                </center>
            </div>

        }
        else if (this.state.isloeding == false) {

            var i = 1;
            return (
                <Container>
                    <div><Headerbom /></div>
                    <Container>
                        <Card body>
                            <div style={{ margin: 5 }}><h5>สแกน QR Code ตัดเบิกลูกเหล็ก</h5></div>
                            <Row style={{ fontSize: 14, padding: 5 }}>
                                <Col>
                                    <div>PRODID  : {this.state.PRODID}</div>
                                    <div>ITEMID : {this.state.ITEMID}</div>
                                    <div>ITEMNAME : {this.state.ITEMNAME}</div>
                                    <div>วันที่{" : "}<input type='date'
                                        value={this.state.datetime}
                                        onChange={(e) => this.setState({ datetime: e.target.value })}
                                        style={{ marginTop: 10 }} />
                                    </div>
                                </Col>
                                <Col>
                                    <div>SITE : {this.state.INVENTSITEID}    , W/H  : {this.state.INVENTLOCATIONID} {" "}<span style={{marginLeft:15}}>
                                        <Link to={`/reportOnhandByItemId/${this.state.ITEMID}`} target={"_blank"}><BsFillFileEarmarkBarGraphFill /> รายงานยอดคงเหลือตาม Item ลูกเหล็ก</Link></span></div>
                                    <div>BOM Qty :  {this.state.BOMQTY}    Unit: {this.state.UNITID}  / PER SERIE : {this.state.BOMQTYSERIE} / DataAreaId : {this.state.DATAAREAID}</div>
                                    <div><h6>ON HANDs :  {this.state.AvailableQty.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h6></div>
                                    <div>
                                        <PickScanBarcode idpds={this.state.PRODID} items={this.state.ITEMID} bomunitId={this.state.UNITID} dataareaId={this.state.DATAAREAID} />
                                        <PickScanBarcodeUnpost idpds={this.state.PRODID} items={this.state.ITEMID} />
                                        {" "}<Link to={`/reportTodateShift/${this.state.PRODID}/${this.state.ITEMID}`} target={"_blank"}><Button variant="primary" size="sm" style={{ marginTop: 4 }}>สรุปประจำวัน</Button></Link>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <Container>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Col sm="6" style={{ padding: 7 }}>

                                <Form.Control type="text" placeholder="PUT BARCODE  ENTER"
                                    onKeyDown={this.keyPress} onChange={(e) => this.handleChange(e)} autoComplete='off' autoFocus={true} size="sm" />
                            </Col>
                            <Col>
                                <Button variant="success" style={{ margin: 5 }} onClick={() => this.addItem_insert()} size="sm">ยันยืน</Button>
                                <Button variant="warning" style={{ margin: 5 }} onClick={() => this.ResetArray()} size="sm"> <BsArrowRepeat />ยกเลิกทั้งหมด</Button>
                            </Col>
                        </Form.Group>
                    </Container>
                    <Container>
                        <div>
                            <div>
                                <div>
                                    <hr></hr>
                                    <div>
                                        {this.state.Text_Null && <h5 style={{ color: "#E74C3C" }}>ไม่มีข้อมูล รหัส :{this.state.result_Null}</h5>}
                                        {this.state.Text_Null ? false : <h5>รหัส :{this.state.result_Null}</h5>}
                                        {this.state.ErrorNull && <h5 style={{ color: "#E74C3C" }}>ไม่มีจำนวนสินค้าเป็น 0 </h5>}
                                        {this.state.ErrorDuplicate && <h5 style={{ color: "#E74C3C" }}>คุณได้ทำข้อมูลซ้ำ</h5>}
                                        {<div className="row" style={{ justifyContent: 'space-between', padding: 10 }}>จำนวนรายการ : {this.state.count_dataArray}
                                            <div style={{ marginRight: 200 }}>รวม : {parseInt(this.state.sumtotollist).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div> </div>}

                                    </div>
                                    <div className="text-center" style={{ color: "#f9b208", fontSize: 14 }}>{this.state.warningQtynull ? <h3>! กรุณาตรวจสอบ PICKING มีบางรายการมีค่าเป็น 0</h3> : <div></div>}</div>
                                </div>
                                <div className="col-xs-12" ref={(list) => this.list = list} style={{ height: '400px', overflowY: 'scroll', background: '#ECF0F1', marginBlockEnd: 10, padding: 2 }}>
                                    {this.state.items.map((item, index) =>
                                        <Container key={index}>
                                            <div className="row">

                                                <Card style={{ width: '100%', fontSize: 14, padding: 5 }}>
                                                    <Row>
                                                        <Col>
                                                            <h6>NO {i++}</h6>
                                                        </Col>
                                                        {<Col>
                                                            <div>BATCH ID</div>
                                                            <div>{this.state.items[index].INVENTBATCHID}</div>
                                                        </Col>}
                                                        <Col>
                                                            <div>เบอร์ลูกเหล็ก</div>
                                                            <div>{this.state.items[index].INVENTSERIALID}</div>
                                                        </Col>
                                                        <Col>
                                                            <div>ยอดคงเหลือ</div>
                                                            <div>{this.state.items[index].Onhand.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                        </Col>
                                                        <Col>
                                                            <div style={{ fontWeight: 'bold' }}>ยอดตัดเบิก</div>
                                                            <div style={{ color: 'red', fontWeight: 'bold' }}>{parseInt(this.state.items[index].QtyActual).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>

                                                        </Col>
                                                        <Col className="text-right">
                                                            <Button variant="primary" onClick={() => this.modalShow(index)} size="sm"
                                                                style={{ fontSize: 12, padding: 5, marginRight: 5 }}
                                                            >แก้ไข</Button>

                                                            <Button variant="warning" className="text-center"
                                                                onClick={() => this.removeBarCode(index)} size="sm"
                                                                style={{ fontSize: 12, padding: 5 }}
                                                            >ลบทิ้ง</Button>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </div>
                                        </Container>
                                    )}
                                </div>
                            </div>
                        </div>

                    </Container>
                    <Modal
                        show={this.state.ismodal}
                        onHide={this.modalClose}
                        backdrop="static"
                        keyboard={false} >
                        <Modal.Header closeButton>
                            <Modal.Title> เบอร์ลูกเหล็ก = {this.state.BATCHNUMBER}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>จำนวน  : {this.state.Qtyitem}</div>
                            <div><Form.Control type="number" placeholder=" Qty item" onChange={(e) => this.setState({ Textinput: e.target.value })} autoComplete="off" /></div>
                            <div><h4 style={{ color: "#E74C3C" }}> {this.state.overOn_hand} </h4></div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalClose}>ยกเลิก</Button>
                            <Button variant="primary" onClick={() => this.click_EditQtyitem()}>ตกลง</Button>
                        </Modal.Footer>
                    </Modal>

                    {
                        this.state.alertT && <SweetAlert success title="Good job!" onConfirm={this.onConfirm} >คุณได้ทำการบันทึกเรียบร้อยแล้ว!</SweetAlert>
                    }


                </Container>
            )
        }
    }
}
export default Scanbarcode;