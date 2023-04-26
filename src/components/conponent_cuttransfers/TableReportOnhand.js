import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';


// {item.ReportAsFinished.toLocaleString(undefined, { maximumFractionDigits: 2 })} 
const columns = [
    // {
    //     name: 'DATAAREAID',
    //     selector: row => row.DATAAREAID,
    //     sortable: true,
    //     grow: 1,//ความก้วางของ cell
    //     // style: {
    // 	// 	color: '#202124',
    // 	// 	fontSize: '14px',
    // 	// 	fontWeight: 500,
    // 	// },
    // },
    {
        name: 'ITEMID',
        selector: row => row.ITEMID,
        sortable: true,
        grow: 3,//ความก้วางของ cell
        // style: {
        // 	color: '#202124',
        // 	fontSize: '14px',
        // 	fontWeight: 500,
        // },
    },
    {
        name: 'ITEMNAME',
        selector: row => row.ITEMNAME,
        sortable: true,
        grow: 3,//ความก้วางของ cell
        // style: {
        // 	color: '#202124',
        // 	fontSize: '14px',
        // 	fontWeight: 500,
        // },
    },
    {
        name: 'SITE',
        selector: row => row.SITE,
        sortable: true,
        grow: 0.5,
        left: true
        // style: {
        // 	color: '#202124',
        // 	fontSize: '14px',
        // 	fontWeight: 500,
        // },
    },
    {
        name: 'WAREHOUSE',
        selector: row => row.WAREHOUSE,
        sortable: true,
        grow: 2,
        left: true,
    },
    {
        name: 'BATCH',
        selector: row => row.BATCH,
        sortable: true,
        grow: 1,
        left: true,
    },
    // {
    //     name: 'ตัวคูณ',
    //     selector: row => row.NO_ON,
    //     sortable: true,
    //     right: true,
    // },
    {
        name: 'LOCATION',
        selector: row => row.LOCATION,
        sortable: true,
        left: true,
    },
    {
        name: 'SERIALS',
        selector: row => row.SERIALS,
        sortable: true,
        right: true,
    },
    {
        name: 'Onhand',
        selector: row => row.Onhand.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },

];

const customStyles = {
    headRow: {
        style: {
            border: 'none',
            backgroundColor: '#28B463'
        },
    },
    headCells: {
        style: {
            color: '#ffff',
            fontSize: '14px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
        },
    },
    pagination: {
        style: {
            border: 'none',
        },
    },
};


const TableReport = (props) => {
    const { data } = props
    const [pending, setPending] = useState(true);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);


    return <DataTable
        columns={columns}
        data={data}
        pagination
        progressPending={pending}
        customStyles={customStyles}
        highlightOnHover
    />
}

export default TableReport;
