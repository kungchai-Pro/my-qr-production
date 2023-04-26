import React, { useState, useEffect } from 'react'
import ViewtableOnhandByItemId from './viewtable_OnhandByItemId'
import { ssrs_OnhandByItemId } from '../../services/getproductionall'
import'./styleReportdateShift.css';
const ReportOnhandByItemId = (props) => {
    
    const [dataall, setDataall] = useState([])
    const [itemidlist,setItemidlist]=useState("")

    useEffect(() => {
      //  const { itemid } = props.match.params
       // console.log(JSON.stringify(props.match.params))
        const byitemid=localStorage.getItem('ITEMID')
        setItemidlist(byitemid)
        ssrs_OnhandByItemId(byitemid).then((data) => {
            setDataall(data.listall)
        })
    }, [])
    return (
        <div>
            <div className='header-onhandbyitemid'>
                <div style={{fontSize:20}}><center>Report OnhandByItemId</center></div>
                <div style={{marginBottom:10}}><u>รายงานยอดคงเหลือตาม item ลูกเหล็ก</u></div>
                <div>Item : {itemidlist}</div>
            </div>
            <hr />
            <div><ViewtableOnhandByItemId data={dataall} /></div>
        </div>
    )
}

export default ReportOnhandByItemId