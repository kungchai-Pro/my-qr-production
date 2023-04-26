import React, { Component } from 'react'
import Headers from './Headers';
import { Button, Col, Row, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { BsBookmarkPlus, BsFillGridFill, BsBookmark } from "react-icons/bs";
import Pageination from './Pagination';
import { Link } from 'react-router-dom';
const BASE_URL1 = process.env.REACT_APP_BASE1_URL;
const d = new Date();
const dates = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
const datetime = d.getHours() + ':' + d.getSeconds();

class Boms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowdata: [],
            pageOfItems: [],
            isloeding: true,
            datareaids: localStorage.getItem('datareaids'),
            prodids: localStorage.getItem('prodids'),
            idwrkctrid: localStorage.getItem('idWRKCTRID'),
            idprodpoolid: localStorage.getItem('idPRODPOOLID'),
            idemplid: localStorage.getItem('idEMPLID'),
            noNameUser: localStorage.getItem('onNameUsers'),
            shifts:localStorage.getItem('shifts'),
            dates: dates,
            datetimes: datetime,
            data_null: false
        }
        this.onChangePage = this.onChangePage.bind(this)
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({ rowdata: res[0] });
                console.log(res)

                if (this.state.rowdata == 0) {
                    this.setState({ data_null: true })
                }

                setTimeout(() => {

                    this.setState({
                        isloeding: false
                    })

                }, 800);
            })
            .catch(error => {
                alert(error + '_ERR_CONNECTION_REFUSED')
            })


            setInterval(() => {

                const ds = new Date();
                var timemers = ds.getHours() + ':' + ds.getMinutes() + ':' + ds.getSeconds()
                this.setState({ datetimes: timemers })
    
            }, 1000);

    }

    callApi = async () => {
        const BASE_URL = process.env.REACT_APP_BASE_URL;

        const response = await fetch(BASE_URL1 + '/bomproduction/' + this.state.datareaids + '/' + this.state.prodids + '');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    onNextScanCode(dataAreaId, ProdId, ItemId) {

        this.props.history.push('/SCANBARCODE', { AreaIds: dataAreaId, ProdIds: ProdId, ItemIds: ItemId });
    }

    onNextScanCodeTransfers(dataAreaId, ProdId, ItemId) {

        this.props.history.push('/scanbarcodeTransfers', { AreaIds: dataAreaId, ProdIds: ProdId, ItemIds: ItemId });
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
                //  backgroundColor: "blue"
            }}>
                <center>
                    <Spinner animation="grow" variant="primary" />
                </center>
            </div>
        }

        else if (this.state.isloeding == false) {
            const { rowdata, pageOfItems } = this.state;
            return (
                <div>
                    <div><Headers /></div>
                    <Container>
                        <Card body style={{ backgroundColor: "#A3E4D7" }}>
                            <Container>
                                <div><h2>BOM PRODUCTION  :{this.state.prodids}</h2></div>
                                <Row>
                                    <Col>
                                        <div><h6>WORK CENTER  : {this.state.idwrkctrid}</h6></div>
                                        <div><h6>EMPID : {this.state.idemplid}, {this.state.noNameUser} (กะการทำงาน : {this.state.shifts}) </h6></div>

                                    </Col>
                                    <Col>
                                        <div><h6>DATE : {this.state.dates}</h6></div>
                                        <div><h6>TIME : {this.state.datetimes}</h6></div>
                                    </Col>
                                    <Col></Col>
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
                                    <Card.Header>BOM PRODUCTION</Card.Header>
                                    <Card.Body>
                                        <Card.Title>ผลการแสดงข้อมูลในการค้นหา</Card.Title>
                                        <Card.Text>
                                            <Alert variant="danger">
                                                <h1>ไม่พบข้อมูล</h1>
                                            </Alert>
                                        </Card.Text>
                                        <Link to="/Home"><Button variant="primary">Go Back</Button></Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        }

                        <div className="row">
                            {pageOfItems.map((item, index) =>
                                <div className="col-12 col-sm-6 col-lg-6 mt-3" key={index}>
                                    <Card style={{ margin: 5, border: 1, background: "#0779e4" }}>
                                        <Card.Header style={{ color: '#ffff' }} ><BsFillGridFill /> ITEM ID : {item.ITEMID}</Card.Header>
                                        <Card.Body style={{ background: '#e8e8e8' }}>
                                            <Card.Title> Item name : {item.ITEMNAME}</Card.Title>
                                            <div> Site : {item.INVENTSITEID}    / {item.INVENTLOCATIONID} </div>
                                            <div> Bom Qty : {item.BOMQTY} Unit : {item.UNITID}</div>
                                            <div> Per Series : {item.BOMQTYSERIE.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                            <div className="text-right">
                                            <Button variant="primary" onClick={() => this.onNextScanCode(item.DATAAREAID, item.PRODID, item.ITEMID)}><BsBookmarkPlus />ตัดเบิกเหล็ก</Button>{" "}
                                            <Button variant="warning" onClick={() => this.onNextScanCodeTransfers(item.DATAAREAID, item.PRODID, item.ITEMID)}><BsBookmarkPlus />โอนคลัง</Button>
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
                </div>
            )
        }
    }
}
export default Boms;