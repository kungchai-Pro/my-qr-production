import React, { Component } from 'react'
import {
    Button, Col, Row,
    Container, Table, Spinner,
    Badge,
    Card, Modal
} from 'react-bootstrap';
import Moment from 'moment';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { productionall, PickDetailList, RafDetailList } from '../services/getproductionall';
// import Pageination from './PaginationV1';
import TableScrollbar from 'react-table-scrollbar';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from 'react-router-dom';
import { BsFillFileEarmarkBarGraphFill,BsFilter } from "react-icons/bs";
import './css/pickingproduct.css';

const BASE_URL = process.env.REACT_APP_BASE1_URL;
class wrkctr_list_id extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Passwords: localStorage.getItem('password'),
            Shifts: localStorage.getItem('shifts'),
            datajson: [],
            isloeding: true,
            nameUsers: null,
            Pdall: [],
            isloadPd: true,
            isloadView: false,
            pageOfItems: [],
            rusultList: [],
            HeaderReport: "",
            selectedIndex: 0,
            PDworkcenter: null
        }
    }

    componentDidMount() {

        this.callApi(this.state.Passwords, this.state.Shifts).then(res => {

            this.setState({
                datajson: res[0],
            }, function () {
                this.setState({
                    nameUsers: this.state.datajson[0].EMPNAME
                })

                this.apiservice(this.state.datajson[0].DATAAREAID, this.state.datajson[0].PRODPOOLID)
            })
        })

        setTimeout(() => {

            this.setState({
                isloeding: false
            })

        }, 800);


    }

    /* get user login */
    callApi = async (passwordid, shifts) => {
        const response = await fetch(BASE_URL + `/login/${passwordid}/${shifts}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    onNextHome(DATAAREAID, WRKCTRID, PRODPOOLID, idEMPLID) {
        localStorage.setItem('idDATAAREAID', DATAAREAID);
        localStorage.setItem('idWRKCTRID', WRKCTRID);
        localStorage.setItem('idPRODPOOLID', PRODPOOLID);
        localStorage.setItem('idEMPLID', idEMPLID);

        var idPRODPOOLIDS = localStorage.getItem('idPRODPOOLID');

        if (idPRODPOOLIDS) {

            this.props.history.push('/HOME');
        }

    }

    apiservice = (dataareaId, prodpoolId, workcenter) => {
        if (this.state.datajson) {
            // var Pdresult = this.state.datajson;
            productionall(dataareaId, prodpoolId, workcenter).then(res => {
                this.setState({
                    Pdall: res[0],
                    isloadPd: false,
                    PDworkcenter: workcenter
                })
            })
        }

    }

    apiservicPicklist = (idpd, typepd) => {

        if (typepd == 'pick') {

            PickDetailList(idpd).then((res) => {
                this.setState({
                    rusultList: res[0],
                    isloadView: true,
                    HeaderReport: "รายละเอียดเบิกลูกเหล็ก ( Picking Detail Posted )"
                })
            })
            return;
        }
        else if (typepd == 'Raf') {

            RafDetailList(idpd).then((res) => {
                this.setState({
                    rusultList: res[0],
                    isloadView: true,
                    HeaderReport: "รายละเอียดรับผลผลิต ( Report As Finished Posted )"
                })
            })
            return;
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


    onSumMultiplier = (NO_ON, piicklist) => {
        var result = NO_ON * piicklist;
        if (result > 0) {
            return <div>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        }
        else {
            return <div style={{ color: "#F73309" }}>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        }
    }




    onlgShow(idpd, typepd) {

        this.setState({
            lgShow: true,
        })
        this.apiservicPicklist(idpd, typepd)
    }

    _closeModal = () => {
        this.setState({
            lgShow: false,
            rusultList: [],
            isloadView: false,
            HeaderReport: []
        });

    }

    sumresult(esum) {
        Array.prototype.sum = function (prop) {
            var total = 0
            for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop]
            }
            return total
        }

        return esum.sum("QTY");
    }

    oncheckdate(dataData) {
        if (dataData == '1900-01-01T00:00:00.000Z') {
            return "";
        }
        else {
            return Moment(dataData).format('DD/MM/YYYY')
        }
    }


    handleSelect = index => {
        this.setState({ selectedIndex: index });
    };

    handleButtonClick = (dtAreaId, dtpro, workcenter) => {

        this.apiservice(dtAreaId, dtpro, workcenter)

        this.setState({
            selectedIndex: 1,
            isloadPd: true,
            Pdall: []
        });
    };


    render() {

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
            localStorage.setItem('onNameUsers', this.state.nameUsers);
            return (
                <div style={{ margin: 20 }}>
                    {/* <Container> */}
                    <Breadcrumb>
                        <Breadcrumb.Item href="/swanbarcode/">
                            Sign out
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>system ax-application</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className='row-div-space-between'>
                        <div style={{ margin: 10 }}>
                            <Link to={`/Viewworkcerter/${this.state.datajson[0].DATAAREAID}/${this.state.datajson[0].PRODPOOLID}`}
                                target={"_blank"}> <BsFillFileEarmarkBarGraphFill />WorkCenterAll</Link>{" / "}
                                <Link to={`/roportOnhandbyWareHouse/${this.state.datajson[0].EMPLID}`} target={"_blank"}
                                ><BsFillFileEarmarkBarGraphFill />รายงานยอดคงเหลือตามคลังสินค้า</Link>
                        </div>
                        <div style={{ margin: 10 }}>
                        <Link to={'/scanbarcodeTransfersCutitem'} >
                           <BsFilter /> โอนย้าย กรรไกร
                        
                        </Link>
                        </div>
                    </div>

                    <Tabs
                        selectedIndex={this.state.selectedIndex}
                        onSelect={this.handleSelect}
                        id="uncontrolled-tab-example"
                    >
                        <TabList>
                            <Tab>Home</Tab>
                            <Tab>ภาพรวม Production</Tab>
                        </TabList>
                        <TabPanel>
                            <p></p>
                            {/* <label><h5>List User in Site</h5></label> */}
                            <p></p>
                            <label>ชื่อพนักงาน  : {this.state.nameUsers} กะทำงาน : {this.state.Shifts}</label>


                            {

                                this.state.datajson.map((item, index) =>
                                    <div key={index}>
                                        <Card style={{ padding: 5, marginTop: 2.05, marginBottom: 10, backgroundColor: '#FBF8F8' }}>
                                            <Row>
                                                <Col><div> <h6>EMPLID</h6></div>{item.EMPLID}</Col>
                                                <Col><div><h6>Pool ID</h6></div>{item.PRODPOOLID}</Col>
                                                <Col><div><h6>Work Center</h6></div>{item.WRKCTRID}</Col>
                                                <Col><div><h6>DATAAREAID</h6></div> {item.DATAAREAID}
                                                </Col>
                                                <Col>
                                                    <Button variant="warning" onClick={() => this.onNextHome(item.DATAAREAID, item.WRKCTRID, item.PRODPOOLID, item.EMPLID)}>JOB ผลิต</Button>{" "}
                                                    <Button onClick={() => this.handleButtonClick(item.DATAAREAID, item.PRODPOOLID, item.WRKCTRID)}>
                                                        ภาพรวม
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card>

                                    </div>
                                )
                            }
                        </TabPanel>
                        <TabPanel>
                            <p></p>
                            <h6>ภาพรวม Production </h6>

                            <h6>Workcenter :  <Badge pill variant="success"> {this.state.PDworkcenter}</Badge></h6>

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
                                <thead style={{ backgroundColor: '#FAF8F6' }}>
                                    <tr>
                                        <th style={{ fontSize: 12 }}>Prod ID.</th>
                                        <th style={{ fontSize: 12 }}>Item ID</th>
                                        <th style={{ fontSize: 12 }}>Item Name</th>
                                        <th style={{ fontSize: 12 }}>Oder(qty)</th>
                                        {/* <th>ตัวคูณ</th> */}
                                        <th style={{ color: "#CE1212", fontSize: 12 }}>ลูกเหล็ก</th>
                                        <th style={{ color: "#CE1212", fontSize: 12 }}>รวม</th>
                                        <th style={{ color: "#ff8303", fontSize: 12 }}>รับเข้า Hold</th>
                                        <th style={{ color: "#ff8303", fontSize: 12 }}>รับเข้า FG</th>
                                        <th style={{ color: "#ff8303", fontSize: 12 }}>รวมยอดผลิต</th>
                                        <th style={{ fontSize: 12 }}>Remaining</th>
                                        <th style={{ fontSize: 12 }}>Detail</th>
                                    </tr>
                                </thead>
                                {
                                    this.state.Pdall.map((item, index) =>
                                        <tbody key={index}>
                                            <tr>
                                                <td style={{ fontSize: 12 }}>{item.PRODID}</td>
                                                <td style={{ fontSize: 12 }}>{item.ITEMID}</td>
                                                <td style={{ fontSize: 12 }}>{item.NAME}</td>
                                                <td style={{ fontSize: 12 }}>{item.QTYSCHED.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                {/* <td>{item.NO_ON.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td> */}
                                                <td style={{ fontSize: 12 }}>{item.PICKINGLIST.toLocaleString(undefined, { maximumFractionDigits: 2 })} <label style={{ color: '#F73309' }}>( *{item.NO_ON.toLocaleString(undefined, { maximumFractionDigits: 2 })} )</label>
                                                </td>

                                                <td style={{ fontSize: 12 }}>{this.onSumMultiplier(item.NO_ON, item.PICKINGLIST)}</td>

                                                <td style={{ fontSize: 12 }}>{item.RAFHOLD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                <td style={{ fontSize: 12 }}>{item.RAFFG.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                <td style={{ fontSize: 12 }}>{item.RAFTOTAL.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                <td style={{ fontSize: 12 }}>{this.onDiffen(item.QTYSCHED, item.RAFTOTAL)}</td>
                                                <td style={{ fontSize: 12 }}><Button variant="success" size="sm" onClick={() => this.onlgShow(item.PRODID, 'pick')}>Pick</Button >{" "}
                                                    <Button variant="info" size="sm" onClick={() => this.onlgShow(item.PRODID, 'Raf')}>RAF</Button ></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            </Table>
                        </TabPanel>
                    </Tabs>


                    <Modal
                        size="xl"
                        show={this.state.lgShow}
                        onHide={() => this._closeModal()}
                        dialogClassName="modal-90w"
                        scrollable={true}
                        aria-labelledby="example-modal-sizes-title-xl"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-xl">

                                {this.state.HeaderReport}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.isloadView ?
                                <TableScrollbar height="400px">
                                    <Table responsive style={{ fontSize: 12 }}>
                                        <thead style={{ backgroundColor: "#8E9594" }}>
                                            <tr>
                                                <th>Prod ID.</th>
                                                <th>Item ID</th>
                                                <th>Item name</th>
                                                <th>วันที่รับเข้าสต๊อก</th>
                                                {/* <th>วันที่ End JOB</th> */}

                                                <th>Site</th>
                                                <th>Warehouse</th>
                                                <th>Serial Number</th>
                                                <th>QTY</th>
                                                {/* <th>Vourchar</th> */}
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {this.state.rusultList.map((item, index) =>
                                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F6F5F4' : '#FCF9F6' }}>
                                                    <td>{item.TRANSREFID}</td>
                                                    <td>{item.ITEMID}</td>
                                                    <td>{item.ITEMNAME}</td>
                                                    <td>{this.oncheckdate(item.DATEPHYSICAL)}</td>
                                                    {/* <td>{this.oncheckdate(item.DATEFINANCIAL)}</td> */}

                                                    <td>{item.INVENTSITEID}</td>
                                                    <td>{item.INVENTLOCATIONID}</td>
                                                    <td>{item.INVENTSERIALID}</td>
                                                    <td>{item.QTY.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                    {/* <td>{item.VOUCHERPHYSICAL}</td> */}
                                                </tr>
                                            )
                                            }
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                {/* <td></td> */}
                                                <td></td>
                                                <td></td>
                                                <td><h6>Total</h6></td>
                                                <td><h6>{this.sumresult(this.state.rusultList).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h6></td>
                                                <td></td>
                                            </tr>
                                        </tbody>

                                    </Table> </TableScrollbar> : <div>LOADING . . . </div>}
                            <div></div>
                        </Modal.Body>
                    </Modal>

                    {/* </Container > */}
                </div>
            )
        }
    }

}

export default wrkctr_list_id;
