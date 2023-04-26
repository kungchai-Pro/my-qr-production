import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


// {item.ReportAsFinished.toLocaleString(undefined, { maximumFractionDigits: 2 })} 
const columns = [
    {
        name: 'JOURNALID',
        selector: row => row.JOURNALID,
        sortable: true,
        grow: 1,//ความก้วางของ cell
        // style: {
        // 	color: '#202124',
        // 	fontSize: '14px',
        // 	fontWeight: 500,
        // },
    },
    {
        name: 'TRANSDATE',
        selector: row => row.TRANSDATE,
        sortable: true,
        grow: 1,//ความก้วางของ cell
        // style: {
        // 	color: '#202124',
        // 	fontSize: '14px',
        // 	fontWeight: 500,
        // },
    },
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
        name: 'FROM WH',
        selector: row => row.FROMWAREHOUSE,
        sortable: true,
        grow: 1,
        left: true
        // style: {
        // 	color: '#202124',
        // 	fontSize: '14px',
        // 	fontWeight: 500,
        // },
    },
    {
        name: 'TO WH',
        selector: row => row.TOWAREHOUSE,
        sortable: true,
        grow: 1,
        left: true,
    },
    {
        name: 'SERIAL',
        selector: row => row.INVENTSERIALID,
        sortable: true,
        left: true,
    },
    // {
    //     name: 'ตัวคูณ',
    //     selector: row => row.NO_ON,
    //     sortable: true,
    //     right: true,
    // },
    {
        name: 'QTY',
        selector: row => row.QTY.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'REF.',
        selector: row => row.RUNNINGNUMBER_INBOUND,
        sortable: true,
        right: true,
    },
    {
        name: 'STATUS',
        selector: row => row.STATUS,
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
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const tableData = {
        columns,
        data,
        exportHeaders: true,
        filter: true,
        export: false,
        print: false,
    };


    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);



    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    // const contextActions = React.useMemo(() => {
    //     console.log(JSON.stringify(selectedRows))

    //     return (
    //         <ExcelFile element={<button>Download Data</button>} filename="InventoryOnhand">
    //             <ExcelSheet data={selectedRows} name="InventoryOnhand">
    //                 <ExcelColumn label="ITEMNUMBER" value="ITEMID" />
    //                 <ExcelColumn label="ITEMNAME" value="ITEMNAME" />
    //                 <ExcelColumn label="SITE" value="INVENTSITEID" />
    //                 <ExcelColumn label="WAREHOUSE" value="INVENTLOCATIONID" />
    //                 <ExcelColumn label="BATCHID" value="INVENTBATCHID" />
    //                 <ExcelColumn label="SERIALNUMBER" value="INVENTSERIALID" />
    //                 <ExcelColumn label="PACKAGINGGROUPID" value="PACKAGINGGROUPID" />
    //                 {/* <ExcelColumn label="ItemGroupCost" value="ITEMGROUPIDCOST" /> */}
    //                 <ExcelColumn label="ITEMGROUPID" value="ITEMGROUPID" />
    //                 <ExcelColumn label="QTY" value="QTY" />
    //                 <ExcelColumn label="UNIT" value="UNIT" />
    //                 <ExcelColumn label="UNITPRICE" value="UNITPRICE" />
    //                 <ExcelColumn label="AMOUNT" value="AMOUNT" />
    //                 <ExcelColumn label="MIN" value="MININVENTONHAND" />
    //                 <ExcelColumn label="MAX" value="MAXINVENTONHAND" />
    //                 <ExcelColumn label="DESCRIPTIONS" value="Descriptions" />
    //             </ExcelSheet>
    //         </ExcelFile>
    //     );
    // }, [data, selectedRows, toggleCleared]);
    const d=new Date()
    const LoadingExcel=()=>{
        return(
        <ExcelFile element={<button>Download Data</button>} filename={"Journal History"+d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()}>
        <ExcelSheet data={selectedRows} name="JournalHistory">
          <ExcelColumn label="JOURNALID" value="JOURNALID" />
          <ExcelColumn label="TRANSDATE" value="TRANSDATE" />
          <ExcelColumn label="ITEMID" value="ITEMID" />
          <ExcelColumn label="FROM WAREHOUSE" value="FROMWAREHOUSE" />
          <ExcelColumn label="TO WAREHOUSE" value="TOWAREHOUSE" />
          <ExcelColumn label="SERIAL ID" value="INVENTSERIALID" />
          <ExcelColumn label="QTY" value="QTY" />
          <ExcelColumn label="REF." value="RUNNINGNUMBER_INBOUND" />
          <ExcelColumn label="STATUS" value="STATUS" />
        </ExcelSheet>
      </ExcelFile>)
    }


    return (<div>
            <div className='buttondownloading'>
                {selectedRows.length > 0 && <LoadingExcel/>}
            </div>
        <DataTableExtensions
            {...tableData}
            
        >
            
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                // contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                pagination
                progressPending={pending}
                customStyles={customStyles}
                highlightOnHover
            />
        </DataTableExtensions>
    </div>
    )
}

export default TableReport;
