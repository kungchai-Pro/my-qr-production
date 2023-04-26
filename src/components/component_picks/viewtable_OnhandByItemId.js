import React, { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const columns = [
    {
        name: 'ITEMID',
        selector: row => row.ITEMID,
        sortable: true,
        grow: 2,
    },
    {
        name: 'ITEMNAME',
        selector: row => row.ITEMNAME,
        sortable: true,
        grow: 3,
    },
    {
        name: 'INVENTSITEID',
        selector: row => row.INVENTSITEID,
        sortable: true,
        grow: 1,
    },
    {
        name: 'INVENTLOCATIONID',
        selector: row => row.INVENTLOCATIONID,
        sortable: true,
        grow: 1,
        left: true
    },
    {
        name: 'INVENTBATCHID',
        selector: row => row.INVENTBATCHID,
        sortable: true,
        right: true,
    },
    {
        name: 'INVENTSERIALID',
        selector: row => row.INVENTSERIALID,
        sortable: true,
        grow: 2,
        right: true,
    },
    {
        name: 'Onhand',
        selector: row => row.Onhand.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'LOCATADD',
        selector: row => row.LOCATADD,
        sortable: true,
        right: true,
    },
    {
        name: 'TRANSDATE',
        selector: row => row.TRANSDATE,
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


const ViewtableOnhandByItemId = (props) => {
    const { data } = props
    const [pending, setPending] = useState(true);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const d=new Date()
    const LoadingExcel=()=>{
        return(
        <ExcelFile element={<button>Download Data</button>} filename={"Onhand by ItemID"+d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()}>
        <ExcelSheet data={selectedRows} name={"OnhandbyWarehouse"}>
          <ExcelColumn label="ITEMID" value="ITEMID" />
          <ExcelColumn label="ITEMNAME" value="ITEMNAME" />
          <ExcelColumn label="INVENTSITEID" value="INVENTSITEID" />
          <ExcelColumn label="INVENTLOCATIONID" value="INVENTLOCATIONID" />
          <ExcelColumn label="INVENTBATCHID" value="INVENTBATCHID" />
          <ExcelColumn label="INVENTSERIALID" value="INVENTSERIALID" />
          <ExcelColumn label="Onhand" value="Onhand" />
          <ExcelColumn label="LOCATADD." value="LOCATADD" />
          <ExcelColumn label="TRANSDATE" value="TRANSDATE" />
        </ExcelSheet>
      </ExcelFile>)
    }
    const tableData = {
        columns,
        data,
        exportHeaders: true,
        filter: true,
        export: false,
        print: false,
    };


    return <div>
        <div>{selectedRows.length>0&&<div className='buttondownloading'><LoadingExcel /></div>}</div>
        <DataTableExtensions
            {...tableData}
            
        >
        <DataTable
            columns={columns}
            data={data}
            selectableRows

            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}

            pagination
            customStyles={customStyles}
            highlightOnHover
        />
        </DataTableExtensions>
    </div>
}

export default ViewtableOnhandByItemId;
