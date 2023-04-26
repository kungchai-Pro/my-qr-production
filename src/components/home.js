import React, { Component } from 'react'
import { Modal, Button, Col, Row, Container, Card, Alert, Spinner } from 'react-bootstrap';
import Headers from './Headers';
import Pageination from './Pagination';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { BsBookmarkFill, BsFillGridFill, BsBookmark } from "react-icons/bs";
import { productionByPd } from '../services/getproductionall';
import './css/homestyles.css'

const BASE_URL1 = process.env.REACT_APP_BASE1_URL;

const d = new Date();
const dates = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();

//const datetime = d.getHours() + ':' + d.getSeconds();



class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowdata: [],
            pageOfItems: [],
            isloeding: true,
            iddataareaid: localStorage.getItem('idDATAAREAID'),
            idwrkctrid: localStorage.getItem('idWRKCTRID'),
            idprodpoolid: localStorage.getItem('idPRODPOOLID'),
            idemplid: localStorage.getItem('idEMPLID'),
            noNameUser: localStorage.getItem('onNameUsers'),
            shifts: localStorage.getItem('shifts'),
            dates: dates,
            datetimes: null,
            data_null: false,
            lgShow: false,
            pdbyid: [],
            loaddata: false

        }
        this.onChangePage = this.onChangePage.bind(this)
    }
    componentDidMount() {

        setInterval(() => {

            const ds = new Date();
            var timemers = ds.getHours() + ':' + ds.getMinutes() + ':' + ds.getSeconds()
            this.setState({ datetimes: timemers })

        }, 1000);

        this.callApi()
            .then(res => {
                this.setState({ rowdata: res[0] });
                console.log(res[0])
                if (this.state.rowdata == 0) {
                    this.setState({ data_null: true })
                }
                setTimeout(() => {

                    this.setState({
                        isloeding: false
                    })

                }, 200);

            })
            .catch(error => {
                alert(error + '_ERR_CONNECTION_REFUSED')
            })
    }

    callApi = async () => {
        const response = await fetch(BASE_URL1 + '/productionlist/' + this.state.idprodpoolid + '/' + this.state.idwrkctrid + '/' + this.state.iddataareaid);

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleClick = (datareaids, prodids) => {
        localStorage.setItem('datareaids', datareaids);
        localStorage.setItem('prodids', prodids);
        var idprodpoolid = localStorage.getItem('datareaids');

        if (idprodpoolid != null) {
            this.props.history.push('/Boms');
        }

    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    onlgShow(varea, vpool, vpdid) {

        this.setState({
            lgShow: true,
        })
        this.apiservice(varea, vpool, vpdid)
    }

    _closeModal = () => {
        this.setState({
            lgShow: false,
            pdbyid: [],
            loaddata: false
        });

    }

    apiservice(idarea, idpool, pdid) {
        productionByPd(idarea, idpool, pdid).then(res => {
            if (res) {
                this.setState({
                    pdbyid: res[0],
                    loaddata: true
                })
            }

            console.log(this.state.pdbyid)
        })


    }

    a



    render() {

        const { rowdata, pageOfItems } = this.state;
        var nf = new Intl.NumberFormat();
        if (this.state.isloeding == true) {

            return <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
                //  backgroundColor: "blue"
            }}>
                <center>
                    <Spinner animation="grow" variant="primary" />
                </center>
            </div>
        }
        else if (this.state.isloeding == false) {
            const { pdbyid } = this.state;
            return (
                <div>
                    <Headers />
                    <Container>
                        <Card body style={{ backgroundColor: "#A3E4D7" }}>
                            <Container>
                                <div style={{ color: "#FF5733" }}><h2>JOB PROD. สำหรับการผลิต ( SHOP FLOOR ) </h2></div>
                                <Row>
                                    <Col>
                                        <div><h6>WORK CENTER  : {this.state.idwrkctrid}</h6></div>
                                        <div><h6>EMPID : {this.state.idemplid}, {this.state.noNameUser} (กะการทำงาน : {this.state.shifts})</h6></div>
                                    </Col>
                                    <Col>
                                        <div><h6>DATE : {this.state.dates}</h6></div>
                                        <div><h6>TIME : {this.state.datetimes}</h6></div>
                                    </Col>
                                    <Col><h2></h2></Col>
                                </Row>
                            </Container>
                        </Card>
                        {this.state.data_null &&
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh'
                                //  backgroundColor: "blue"
                            }}>
                                <Card>
                                    <Card.Header>JOB PRODUCTION สำหรับหน้างาน ( SHOP FLOOR )</Card.Header>
                                    <Card.Body>
                                        <Card.Title>ผลการแสดงข้อมูลในการค้นหา</Card.Title>
                                        <Card.Text>
                                            <Alert variant="danger">
                                                <h1>ไม่พบข้อมูล</h1>
                                            </Alert>
                                        </Card.Text>
                                        <Link to="/WRKCTRLISTID"><Button variant="primary">Go Back</Button></Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        }

                        <div className="row">
                            {pageOfItems.map((item, index) =>
                                <div className="col-12 col-sm-6 col-lg-6 mt-3" key={item.PRODID}>

                                    <Card style={{ margin: 5, border: 1, background: "#16a596" }}>
                                        <Card.Header style={{ color: '#ffff' }} ><h2><BsFillGridFill /> ( ลำดับ . {item.SHOPPRIORITY} ) ID : {item.PRODID}</h2></Card.Header>
                                        <Card.Body style={{ background: '#f1f6f9' }}>
                                            <Card.Title> Item ID : {item.ITEMID}</Card.Title>
                                            <Card.Title> Item Name :  {item.ItemName}</Card.Title>
                                            <Card.Text ><BsBookmark />Qtysched  : {item.QTYSCHED.toLocaleString(undefined, { maximumFractionDigits: 2 })}  <BsBookmark style={{ marginLeft: 10 }} />Remain Qty : {item.REMAININVENTPHYSICAL.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Card.Text>
                                            <div><Card.Text ><BsBookmark />Site  : {item.INVENTSITEID}  <BsBookmark style={{ marginLeft: 10 }} />Warehouse : {item.INVENTLOCATIONID}</Card.Text></div>
                                            <div><BsBookmark />On hand : {item.AvailableQty.toLocaleString(undefined, { maximumFractionDigits: 2 })} </div>
                                            <div> Report As Finish : {item.ReportAsFinished.toLocaleString(undefined, { maximumFractionDigits: 2 })} </div>
                                            <div> Start Date : {Moment(item.PRODSTART).format('DD/MM/YYYY')}</div>
                                            <div> Delivery Date : {Moment(item.DLVDATE).format('DD/MM/YYYY')}</div>
                                            <div className='cardhome-list'>
                                                <div>
                                                    <Button variant="warning" onClick={() => this.handleClick(item.DATAAREAID, item.PRODID)}><BsBookmarkFill />Production BOMs</Button>
                                                {/* </div>
                                                <div> */}
                                                {" "}
                                                    <Button variant="primary" onClick={() => this.onlgShow(item.DATAAREAID, this.state.idprodpoolid, item.PRODID)}>#Overview...</Button >
                                                </div>
                                                {item.PRODSTATUS=='Started'?<div style={{color:'#ffff',fontSize:18,backgroundColor:'#1D903B',padding:5,borderRadius:10}}>
                                               STATUS: {item.PRODSTATUS}
                                                </div>:<div style={{color:'#F04C0F',fontSize:18}}>
                                                STATUS: {item.PRODSTATUS}
                                                </div>
                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>


                                </div>
                            )}

                        </div>
                        {
                            rowdata != '' ? <Pageination items={rowdata} onChangePage={this.onChangePage} /> : <div></div>

                        }
                    </Container>


                    <Modal
                        size="xl"
                        show={this.state.lgShow}
                        onHide={() => this._closeModal()}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                ภาพรวม Production
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.loaddata ? <div>
                                <Row style={{ fontSize: 12 }}>
                                    <Col><div> <h6>Prod ID.</h6></div>{pdbyid[0].PRODID}</Col>
                                    <Col><div> <h6>Job Oder(qty)</h6></div>{pdbyid[0].QTYSCHED.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Col>
                                    <Col><div> <h6>ตัวคูณ </h6>{pdbyid[0].NO_ON.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div></Col>
                                    <Col><div> <h6>เบิกเหล็กผลิต</h6>{pdbyid[0].PICKINGLIST.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div></Col>
                                    <Col><div><h6> รับเข้า Hold</h6>{pdbyid[0].RAFHOLD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div></Col>
                                    <Col><div><h6>รับเข้า FG</h6>  {pdbyid[0].RAFFG.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div></Col>
                                    <Col><div> <h6>รวมยอดผลิต</h6>  {pdbyid[0].RAFTOTAL.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div></Col>
                                </Row>

                            </div> : <div>LOADING . . . </div>}
                            <div></div>
                        </Modal.Body>
                    </Modal>

                </div>

            )
        }
    }

}
export default Home;