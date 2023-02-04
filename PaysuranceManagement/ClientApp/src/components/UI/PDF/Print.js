// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import NumberFormat from 'react-number-format';
// import moment from "moment";

// // const tableStyle = {
// //        width: "297mm!important",

// //     fontSize: 8,
// // };

// // const theadStyle = {
// //   height: "50px!important",
    
// //  fontSize: 8,
// // };
// const styles = {
//     fontFamily: "sans-serif",
//     textAlign: "center"
//     };
//     const colstyle = {
//     width: "280px"
//     };
//     const tableStyle = {
//     width: "1300px",
//     fontSize: "8px"
//     };

// const prints = (props) => {
//    // console.log('print', props)

//     let reportHeader = props.reportHeader;
//     let branchName=props.branchName;
    
//     let tables = props.headers.length == 0 ? null : props.headers.map(function (item, index) {
//        // console.log('datacontent', props.data[index])
//         let elements = [];
//         var selectedItemArr = [];
//         if(props.data.length>=index+1){
//         props.data[index].map(obj => {
//             selectedItemArr = Object.keys(obj).map(function (key) {
//                 let item = [key, obj[key]];
//                 return [key, obj[key]];
//             });
//             elements.push(selectedItemArr)

//         })
//     }
//         return (
//             <div>
//                 <table  id="table-to-xls" class="table table-striped" style={tableStyle}>
//                     <thead >
//                     <colgroup>
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// <col span="1" style={colstyle} />
// </colgroup>
//                         <tr>
//                             {getHeaders(item)}
//                         </tr>
//                     </thead>
//                     {
//                         elements.length == 0 ? null :  getTableContent(elements) 
//                     }
                    
//                 </table>
//             </div>
//         )
//     })

//     return (
//         <div>
//             <h3>{reportHeader} </h3>
//             <div class="alert alert-info alert-height">
//             <div className="row">
//             <div className="col-md-12 text-right">
//                                             <strong>DFCC Vardhana Bank  Limited</strong><br />
//                                             73,W A D Ramanayake Mawatha <br />
//                                             Colombo 02, Sri Lanka <br />
//                                             Tel: 94-11-2371371<br />
//                                             Fax: 94-11-2371372<br />
//                                             Email:info@dfccvardhanabank.com<br />
//                                             Web:www.dfccvardhanabank.com<br />
//                                         </div>
//                                         <br/>
//                                         </div>
//                                         <br/>
//                 <div class="col-md-6">
//                     <strong>Genarated By:</strong> iamteller  </div>
                    
//                 <div class="col-md-6"><strong>Genarated Date:</strong> {moment().format('YYYY-MMM-DD')}</div>
//                 <div class="col-md-6"><strong>Genarated Time:</strong> {moment().format('HH:mm:ss')}</div></div>
//            {branchName}  
//             {tables}
          
            
//         </div>
//     )
// }

// const getHeaders = (tableHeaders2) => {
//     let headers2 = (tableHeaders2 == undefined || tableHeaders2.length == 0) ? null : (
//         tableHeaders2.map(header => {
//             return (
//                 <th>
//                     {header}
//                 </th>
//             )
//         })
//     )
//     return headers2;
// }

// const getTableContent = (selectedItemArr) => {
//     //  console.log('inside get table content', selectedItemArr)
//     let i = 0;
//     let tableData1 = (

//         selectedItemArr.length == 0 ? null : selectedItemArr.map(function (item, index) {
//             return (
//                 <tr className="center">{tableData(index, selectedItemArr)}</tr>
//             )
//         })
//     );

//     return (
//         <tbody>
//             {tableData1}
//         </tbody>
//     )
// }

// const tableData = (key, selectedItemArr) => {
//     let data = selectedItemArr.length == 0 ? null : selectedItemArr[key].map(item => {
//         return (
//             <td className="center">{item[1]}</td>
//         )
//     })
//     return data;
// }


// export default prints;