const url_api_v1 = process.env.REACT_APP_BASE1_URL;

const url_api_v2 = process.env.REACT_APP_BASE2_URL;

export const productionall = async (dataAreaId, poolId, workcenter) => {
  return await fetch(url_api_v1 + '/productionall/' + dataAreaId + '/' + poolId + '/' + workcenter)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })

}

export const productionByPd = async (dataAreaId, poolId, prodId) => {
  return await fetch(url_api_v1 + '/productionbypd/' + dataAreaId + '/' + poolId + '/' + prodId)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })

}

// viewPickdetail list 
export const PickDetailList = async (prodId) => {
  return await fetch(url_api_v1 + '/pickDetail/' + prodId)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })
}

// viewPickdetail list 
export const RafDetailList = async (prodId) => {
  return await fetch(url_api_v1 + '/detailRaf/' + prodId)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })

}

// viewPickdetail list 
export const PicklistScanBarcodes = async (prodId, itemid) => {
  return await fetch(url_api_v1 + '/pickingscan/' + prodId + '/' + itemid)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })

}


export const picklistScanBarcodes = async (prodId, itemid) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prodid:prodId,
      itemid: itemid
    })
  }

  return await fetch(url_api_v1 + '/pickingscan',getnumberOject)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })
}

export const pickfordel = async (prodId, itemid) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prodid:prodId,
      itemid: itemid
    })
  }

  return fetch(url_api_v2 + '/pickfordel',getnumberOject)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })
}

export const deletepicking = async (prodId, itemid, ids) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prodid:prodId,
      itemid:itemid,
      ids: ids
    })
  }

  return await fetch(url_api_v2 + '/deletepicking',getnumberOject)
    .then(res => res.json())
    .catch(err => {
      //  alert(err)
    })
}

// get data all production workcenter all 

export const productionworkcenterall = async (dataAreaId, poolId) => {

  return await fetch(url_api_v1 + '/proworkcenterall/' + dataAreaId + '/' + poolId)
    .then(res => res.json())
    .catch(err => {
       alert(err)
    })

}

export const getnumberTransfer = async () => {
  var dt = new Date();
  var Ys = dt.getFullYear()
  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "InYears": Ys,

    })
  };

  let next_numbers = null;
  var idnum = null;

  await fetch(url_api_v2 + `/numberTransfer`, getnumberOject)
    .then(res => res.json())
    .then((res) => {
      // console.log(res)
      if (res.stutas == true) {
        next_numbers = res.listall[0].Next_number
        idnum = res.listall[0].Idrun;


      }
      else if (res.stutas == false) {

        return next_numbers = next_numbers = {
          nextid: "",
          idnums: ""
        };
      }


    })
    .catch(err => {
      //  alert(err)
    })

  return next_numbers = {
    nextid: next_numbers,
    idnums: idnum
  };

}

export const updatenumberTransfer = async (ids, numbers) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Idrun: ids,
      InNumber: numbers

    })
  };

  await fetch(url_api_v2 + `/updateNumTransfer`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {

      console.log(e)
    })

}

const insertNewNumberTransfer = async () => {

  var dt = new Date();
  var Ys = dt.getFullYear()

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      InYears: Ys,
      InNumber: 0
    })
  }
  await fetch(url_api_v2 + `/insertnumberTransfer`, getnumberOject)
    .then(res => res.json())
    .then((res) => {
      if (res) {
        console.log('สร้างใหม่เรียบร้อยแล้ว')
      }
    })
    .catch((e) => {
      console.log(e)
    })

};

export const getHistoryTransfers = async (idprod) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vbsprodid: idprod
    })
  }
  return await fetch(url_api_v1 + `/prodoutbound`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })

};



// ค้นหา warehouse form and TO transfers  หน้า กรรไกร
export const cuttransferScanOnHand = async (SerialIds,InventLocations,QtyActuals) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      SerialId:SerialIds,
      InventLocation:InventLocations,
      QtyActual:QtyActuals
    })
  }
  return await fetch(url_api_v1 + `/cuttransferScanOnHand`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })

};


export const listwarehousefrom = async (Emplid) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emplid: Emplid
    })
  }
  return await fetch(url_api_v1 + `/listingwarehouseFrom`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })

};


export const listwarehouseTo = async (Emplid) => {

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emplid: Emplid
    })
  }
  return await fetch(url_api_v1 + `/listingwarehouseTO`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })

};

export const ReportJournalCutHistory=async(isDate)=>{

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      SetDate:isDate
    })
  }
  return await fetch(url_api_v1 + `/journalCutHistory`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })
}

export const ReportSearchOnhand=async(Serialid)=>{

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inventserialid:Serialid
    })
  }
  return await fetch(url_api_v1 + `/scanSerialOnhand`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })
}

export const ReportPickTodateShift=async(ProdIds,ItemIDs,TransDates)=>{

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ProdId:ProdIds,
      ItemID:ItemIDs,
      TransDate:TransDates
    })
  }
  return await fetch(url_api_v1 + `/ViewPickingShiftDate`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })
}


export const InvalidateSumtotalPick=async(serialids)=>{

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      serialid:serialids
    })
  }
  return await fetch(url_api_v2 + `/suminvalidPick`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })
}

export const PendingForAX=async(idempl)=>{

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emplid:idempl
    })
  }
  return await fetch(url_api_v2 + `/pendingforAX`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })

}

export const PendingForAXDelete=async(idempl,runnings,serailids)=>{

  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emplid:idempl,
      Running:runnings,
      Serialnumber:serailids
    })
  }
  return await fetch(url_api_v2 + `/PendingForAXDelete`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })

}

export const ssrs_onhandbywarehouse=async(Idempl,Ondates)=>{
console.log()
  const getnumberOject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emplid:Idempl,
      Ondate:Ondates
    })
  }
  return await fetch(url_api_v1 + `/ssrsOnhandbyWarehouse`, getnumberOject)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    })
    .catch((e) => {
      console.log(e)
    })

}

export const ssrs_OnhandByItemId=async(itemidall)=>{
  console.log()
    const getnumberOject = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemid:itemidall
      })
    }
    return await fetch(url_api_v1 + `/ssrsOnhandByItemId`, getnumberOject)
      .then(res => res.json())
      .catch((e) => {
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
  
  }
  
