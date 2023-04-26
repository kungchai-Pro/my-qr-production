import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'moment';

// {item.ReportAsFinished.toLocaleString(undefined, { maximumFractionDigits: 2 })} 
const columns = [
   // {
    //    name: 'TRANSREFID',
     //   selector: row => row.TRANSREFID,
     //   sortable: true,
      //  grow: 1,//ความก้วางของ cell
        // style: {
		// 	color: '#202124',
		// 	fontSize: '14px',
		// 	fontWeight: 500,
		// },
   // },
    // {
    //     name: 'VOUCHERPHYSICAL',
    //     selector: row => row.VOUCHERPHYSICAL,
    //     sortable: true,
    //     grow: 1,//ความก้วางของ cell
    //     style: {
	// 		color: '#202124',
	// 		fontSize: '14px',
	// 		fontWeight: 500,
	// 	},
    // },
    {
        name: 'DATEPHYSICAL',
        selector: row =>Moment(row.DATEPHYSICAL ).format('DD/MM/YYYY'),
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
        grow: 1.5,
        left:true
        // style: {
		// 	color: '#202124',
		// 	fontSize: '14px',
		// 	fontWeight: 500,
		// },
    },
    // {
    //     name: 'SITE',
    //     selector: row => row.INVENTSITEID,
    //     sortable: true,
    //     right: true,
    // },
    {
        name: 'LOCATIONID',
        selector: row => row.INVENTLOCATIONID,
        sortable: true,
        right: true,
    },

    {
        name: 'SERIAL ID',
        selector: row => row.INVENTSERIALID,
        sortable: true,
        right: true,
    },
    {
        name: 'BATCHID',
        selector: row => row.INVENTBATCHID,
        sortable: true,
        right: true,
    },
    {
        name: 'จำนวน',
        selector: row => row.QTY.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        sortable: true,
        right: true,
    },
    {
        name: 'กะ ทำงาน',
        selector: row => row.SHIFT,
        sortable: true,
        right: true,
    },
    // {
    //     name: 'รวมยอดผลิต',
    //     selector: row => row.RAFTOTAL.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //     sortable: true,
    //     right: true,
    // },
    // {
    //     name: 'Remaining',
    //     selector: row => row.QTY_RAFNEGATIVE.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //     sortable: true,
    //     right: true,
    //     conditionalCellStyles: [
	// 		{
	// 			when: row => row.QTY_RAFNEGATIVE > 300,
	// 			style: {
	// 				backgroundColor: 'rgba(63, 195, 128, 0.9)',
	// 				color: 'white',
	// 				'&:hover': {
	// 					cursor: 'pointer',
	// 				},
	// 			},
	// 		},
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
			// {
			// 	when: row => row.QTY_RAFNEGATIVE < 0,
			// 	style: {
			// 		backgroundColor: 'rgba(242, 38, 19, 0.9)',
			// 		color: 'white',
			// 		'&:hover': {
			// 			cursor: 'not-allowed',
			// 		},
			// 	},
			// },
		// ],
    // },
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
