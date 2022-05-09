import moment from "moment"

// const getUniqueValue = (array:any, startTime:string)=> {
//     return array.filter((e:any, i:number) =>( 
//       array.findIndex((a:any) =>{
          
//           const date1 = moment(a[startTime]).format("YYYY-MM-DD").toString()
//           const date2 = moment(e[startTime]).format("YYYY-MM-DD").toString()
//         return date1.includes(date2)
//       }
//         ) === i
//        )
//      );
//  }


 const getFormatedData =(array:any)=>{
     let nonRecuringData:any = [];
     let recuringData:any = []
     let result:any = []
     array.forEach((value:any)=>{
         let count =0;
         for(let i of array){
           const date1 = moment(value.startTime).format("YYYY-MM-DD").toString()
           const date2 = moment(i.startTime).format("YYYY-MM-DD").toString()
           if(date1===date2){
                count++;
            }
         }
         if(count>=2){
            if(recuringData.length>0){
                recuringData.forEach((res:any,i:number)=>{
                    const recdate1 = moment(res.startTime).format("YYYY-MM-DD").toString()
                    const recdate2 = moment(value.startTime).format("YYYY-MM-DD").toString()
                    if(recdate1===recdate2){
                        recuringData[i].recuring.push({...value,randomId:randomId()})
                    }else{
                        let t1 = moment(recuringData[recuringData.length-1].startTime).format("YYYY-MM-DD").toString()
                        let t2 = moment(value.startTime).format("YYYY-MM-DD").toString()
                        if( t1 !== t2)  {
                         recuringData.push({recuring:[{...value,randomId:randomId()}], startTime:value.startTime,lol:"lol"})
                        }
                    }
                })
            }else{
                recuringData.push({recuring:[{...value,randomId:randomId()}], startTime:value.startTime})
            }
         }else{
            nonRecuringData.push({...value,randomId:randomId()})
         }
     })
     result =  recuringData.length>0 ? [...nonRecuringData ,...recuringData] : [...nonRecuringData]
    
     result.sort((a:any, b:any)=> {
        var c:any = new Date(a.startTime );
        var d:any = new Date(b.startTime );
        return c-d;
    });

    return result
 }  
 


 const getFormatedReccuringDate = (deleteRecurenceBooking:any)=>{
    // const deleteRecurenceBooking = [
    //     {id:2,dateDeletes:["2022-09-18"]},
    //     {id:2,dateDeletes:["2022-09-22"]},
    //   {id:1,dateDeletes:["2022-05-09"]}, 
    //   {id:1,dateDeletes:["2022-09-10"]},
    //   {id:3,dateDeletes:["2022-09-11"]},
    //   {id:1,dateDeletes:["2022-09-17"]},
    //   {id:2,dateDeletes:["2022-09-24"]},
    //     {id:2,dateDeletes:["2022-09-23"]},
    //   ]
      let result:any = [];
      deleteRecurenceBooking.forEach((res:any)=>{
        let count =0
        for(let i of deleteRecurenceBooking){
          if(res.id===i.id){
              count++;
          }
        }
        if(count>=2 && result.length>0){
            result.forEach((value:any,index:number)=>{
                if(value.id===res.id){
                    result[index].dateDeletes.push(...res.dateDeletes)
                }else{
                   let t =  result.some((resp:any)=>resp.id===res.id);
                   if(t===false){
                       result.push(res)
                   }
                }
            })
        }else{
            result.push(res)
        }
      })
      
     return result

 }


 const randomId = ()=>{
    return (Math.floor(Math.random() *1000 *Math.random()*11))
 }


 export {getFormatedData,getFormatedReccuringDate}

