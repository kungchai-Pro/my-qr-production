import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';


// {item.ReportAsFinished.toLocaleString(undefined, { maximumFractionDigits: 2 })} 
const columns = [
    {
        name: 'PRODID',
        selector: row => row.id,
        sortable: true,
        grow: 1,//ความก้วางของ cell
        // style: {
		// 	color: '#202124',
		// 	fontSize: '14px',
		// 	fontWeight: 500,
		// },
    },
    {
        name: 'Itim ID',
        selector: row => row.ITEMID,
        sortable: true,
        grow: 1,//ความก้วางของ cell
        // style: {
		// 	color: '#202124',
		// 	fontSize: '14px',
		// 	fontWeight: 500,
		// },
    },
    {
        name: 'Work center',
        selector: row => row.WRKCTRID,
        sortable: true,
        grow: 1,//ความก้วางของ cell
        // style: {
		// 	color: '#202124',
		// 	fontSize: '14px',
		// 	fontWeight: 500,
		// },
    },
    {
        name: 'ItemName',
        selector: row => row.NAME,
        sortable: true,
        grow: 3,
        left:true
        // style: {
		// 	color: '#202124',
		// 	fontSize: '14px',
		// 	fontWeight: 500,
		// },
    },
    {
        name: 'Oder(qty)',
        selector: row => row.QTYSCHED.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'ลูกเหล็ก',
        selector: row => row.PICKINGLIST.toLocaleString(undefined, { maximumFractionDigits: 2 })+' ('+row.NO_ON+')',
        sortable: true,
        right: true,
    },
    // {
    //     name: 'ตัวคูณ',
    //     selector: row => row.NO_ON,
    //     sortable: true,
    //     right: true,
    // },
    {
        name: 'รวม (ลูกเหล็ก * qty)',
        selector: row => row.SUMPICKING.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'รับเข้า Hold',
        selector: row => row.RAFHOLD.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'รับเข้า FG',
        selector: row => row.RAFFG.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'รวมยอดผลิต',
        selector: row => row.RAFTOTAL.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'Remaining',
        selector: row => row.QTY_RAFNEGATIVE.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
        conditionalCellStyles: [
			{
				when: row => row.QTY_RAFNEGATIVE > 300,
				style: {
					backgroundColor: 'rgba(63, 195, 128, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
			// {
			// 	when: row => row.QTY_RAFNEGATIVE >= 0 && row.QTY_RAFNEGATIVE < 0,
			// 	style: {
			// 		backgroundColor: 'rgba(248, 148, 6, 0.9)',
			// 		color: 'white',
			// 		'&:hover': {
			// 			cursor: 'pointer',
			// 		},
			// 	},
			// },
			{
				when: row => row.QTY_RAFNEGATIVE < 0,
				style: {
					backgroundColor: 'rgba(242, 38, 19, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'not-allowed',
					},
				},
			},
		],
    },
];

const customStyles = {
	headRow: {
		style: {
			border: 'none',
            backgroundColor:'#28B463'
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


const Viewtablev2=(props)=>{
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

export default Viewtablev2;
