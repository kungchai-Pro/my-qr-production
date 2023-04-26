import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Card, Image } from 'react-bootstrap';
import Background from './image/09052562-0106.jpg';
const BASE_URL1 = process.env.REACT_APP_BASE1_URL;
class Index extends React.Component {


    constructor(props) {
        super(props);

        // reset login status
        //   this.props.logout();

        this.state = {
            username: '',
            password: '',
            shifts:'',
            submitted: false,
            datajson: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        if (name == 'password') {
            this.setState({ password:e.target.value });
            console.log('password =>' + e.target.value)
        }
        else if (name == 'Shift') {
            console.log('shift =>'+e.target.value)
            this.setState({shifts:e.target.value})
        }

    }

    componentDidMount() {
        //  localStorage.removeItem("idWRKCTRID")
        localStorage.removeItem("idPRODPOOLID")
        localStorage.removeItem("password")
        localStorage.removeItem("onNameUsers")
        localStorage.removeItem('shifts');
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { password,shifts } = this.state;
        //  if (password) {
        // this.props.login(username, password);
        if(password ==""||shifts==""){
            alert('กรุงณาป้อนข้อมูลให้ครบ')
        }
        else{
        this.callApi(password,shifts).then(res => {

            this.setState({
                datajson: res[0]
            })
            if (this.state.datajson.length >= 1) {
                localStorage.setItem('password', password);
                localStorage.setItem('shifts', shifts);
                localStorage.setItem('EMPLID',this.state.datajson[0].EMPLID)
               // console.log(JSON.stringify(this.state.datajson[0].EMPLID))

                this.props.history.push('/WRKCTRLISTID');
            }
            else {
                alert("Password  Invalid")
            }


        })
            .catch(err => console.log(err));


         }
    }

    callApi = async (passwordid,shifts) => {
        const response = await fetch(BASE_URL1 + `/login/${passwordid}/${shifts}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };


    render() {
        const { username, password, submitted } = this.state;
        return (<div><div style={{
            width: '100%',
            backgroundColor: "#bbdfc8"
        }}>
            <Container>
                <div className="Container" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                    width: '100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    //  backgroundImage: `url(${Background})`,
                    // opacity:0.4
                }}>
                    <Image src={Background} rounded style={{ width: '24rem', heigth: '30rem', padding: 1, marginTop: '10%' }} />
                    <Card style={{ width: '25rem', heigth: '30rem', padding: 20, marginTop: '10%' }}>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <div>
                                    {/* <Image src={Background} rounded /> */}
                                    <h4 style={{ color: '#f58634' }}>SIGN IN  ( LIVE DEV )</h4>
                                </div>
                                <div style={{ color: '#39a6a3' }}>
                                    <label htmlFor="password"><h5> To System Barcode</h5></label>
                                </div>
                                <div>
                                    {/* <select name="Shift" id="Shift" className="form-control" onChange={this.handleChange}>
                                        <option value="">เลือก กะทำงาน</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </select> */}
                                   <div><b><input type='radio' name='Shift' value="A" onChange={this.handleChange} /> กะทำงาน A <input type='radio' name='Shift' value="B" onChange={this.handleChange}/> กะทำงาน B</b>
                                   <br/>
                                   </div>
  
                                </div>
                                <br/>
                                <input type="password" className="form-control" name="password" placeholder="input password "
                                    maxlength="10" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <Button variant="success" type="submit">SIGN IN</Button>
                                {/* <Link to="/Home" className="btn btn-link">Register(เข้าระบบ)</Link> */}

                            </div>
                        </form>
                    </Card>
                </div>
            </Container>

        </div>
            <center>
                <p style={{ color: '#4b778d' }}>@ System picking item list by barcode  || version v1</p>
            </center>
        </div>

        );
    }
}

export default Index;