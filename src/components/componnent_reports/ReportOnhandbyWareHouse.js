import React, { Component} from 'react'
import { Button } from 'react-bootstrap'
import { ssrs_onhandbywarehouse } from '../../services/getproductionall'
import Viewtable_Onhandbywarehouse from './viewtableOnhandbywarehouse'
import'../componnent_reports/styslereport.css'

class ReportOnhandbyWareHouse  extends Component {
    // const {emplid } = this.props.match.params
    constructor(props){
        super(props)

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
        this.state={
            dataAll:[] ,
            Ondates:dates,
            isloading:false 
        }

    
        // const [dataAll, setDataAll] = useState([])
        // const [Ondates, setOndates] = useState(dates)
    }


  ///  componentDidMount(){
        //   const { emplid } = props.match.params
        // const[]=useState()
        // this.isloadingdata()

      //  this.setState({isloading:true})


//}

     isloadingdata = () => {
        const { emplid } = this.props.match.params
        ssrs_onhandbywarehouse(emplid, this.state.Ondates).then((data) => {
            // console.log(data)
            // setDataAll(data.listall)
            this.setState({
                dataAll:data.listall
            })
        })
    }

     IsSearch = () => {
       // setDataAll([])
       this.setState({isloading:true})
       this.setState({dataAll:[]})
        this.isloadingdata()
    }
render(){
    return (
        <div>
            <div className='header-onhandbywarehouse'>
                <div style={{fontSize:20,marginBottom:20}}><center>Report OnhandbyWareHouse</center></div>
                <div style={{fontSize:18,marginBottom:10}}><u>รายงานยอดคงเหลือตามคลังสินค้า</u></div>
                <div>
                    <input type='date' name='Ondate' value={this.state.Ondates} 
                    onChange={(e) => this.setState({Ondates:e.target.value})} />
                    {" "}
                    <Button onClick={() => this.IsSearch()}>
                        ค้นหา
                    </Button>
                </div>
                
            </div>
            <hr/>
            <div>
        {this.state.isloading==true&&<div>
                {this.state.dataAll.length <= 0 ? <div className='Loadingstylse'>กำลังโหลดข้อมูล . . .</div> : <Viewtable_Onhandbywarehouse data={this.state.dataAll} />}
            </div>}
            </div>
        </div>
    )
    }
}

export default ReportOnhandbyWareHouse