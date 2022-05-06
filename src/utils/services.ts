import moment from "moment"

// const getUniqueValue = (array:any, startTime:string)=> {
//     return array.filter((e:any, i:number) =>( 
//       array.findIndex((a:any) =>{
          
//           const date1 = moment(a[startTime]).format("YYYY-MM-DD").toString()
//           const date2 = moment(e[startTime]).format("YYYY-MM-DD").toString()
//           console.log(date1, date2);
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
                recuringData.forEach((res:any,index:number)=>{
                    const recdate1 = moment(res.startTime).format("YYYY-MM-DD").toString()
                    const recdate2 = moment(value.startTime).format("YYYY-MM-DD").toString()
                    if(recdate1===recdate2){
                        recuringData[index].recuring.push(value)
                    }else{
                        console.log("pushing from 2nd " ,res.startTime)
                        let t1 = moment(recuringData[recuringData.length-1].startTime).format("YYYY-MM-DD").toString()
                        let t2 = moment(value.startTime).format("YYYY-MM-DD").toString()
                        if( t1 !== t2)  {
                         recuringData.push({recuring:[value], startTime:value.startTime,lol:"lol"})
                        }
                    }
                })
            }else{
                recuringData.push({recuring:[value], startTime:value.startTime})
            }
         }else{
            nonRecuringData.push(value)
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
 



 export {getFormatedData}

