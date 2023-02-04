import React, { Component } from 'react';
import $ from "jquery";
import { NavLink, Redirect } from 'react-router-dom';

import { CommonGet } from './../../../../src/utils/CommonFetch';
//import { Permission } from '../../../utils/Permission';
//import { CommonEncryptParam, CommonDecryptParam } from "../../../utils/CommonParams";
$.DataTable = require('datatables.net');
const screenId = 100;

export class ProductIndex extends Component {
  

    displayName = ProductIndex.name

    state = {

        //boxtypeList: [],
        //boxtypeData: {},
        pageLoad: false,
        redirect: false,
        isCreateEditHidden: false,

        dataList: [],
        productId: "",
        productType: "",
        productName: "",
        productDescription: "",
        insuranceCompanyId: "",
        policyNo: "",
        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,
        // insuranceCompanyId: "",
        // insuaranceCompanyList: [],
        productTypeList: [
            { productTypeId: "Retail", name: "Retail" },
            { productTypeId: "Coperate", name: "Coperate" }
        ],
        insuaranceCompanyList: [
            { insuranceCompanyId: 1, name: "A" },
            { insuranceCompanyId: 2, name: "B" }
        ]

    };

    componentWillMount() {
        this.getData();
        //Permission(screenId)
        //    .then(data => {
        //        if (data.data == undefined || data.data.length == 0) {
        //            this.setState({
        //                pageLoad: true,
        //                redirect: true
        //            });
        //        } else {
        //            this.getData();
        //            let hasRecord = false;
        //            data.data.map(code => {
        //                if (code.screenFunctionCode === "MASTERBRANCHADDEDIT") {
        //                    hasRecord = true;
        //                }
        //            });

        //            if (hasRecord) {
        //                this.setState({
        //                    pageLoad: false,
        //                    redirect: false,
        //                    isCreateEditHidden: false
        //                });
        //            } else {
        //                this.setState({
        //                    pageLoad: true,
        //                    redirect: true
        //                });
        //            }
        //        }
        //    });
    }

    getData = () => {
        CommonGet('product/GetAll', 'activeStatusEnum=2')
      //  CommonPost('Beta/SaveBeta', null, formData)
            .then(data => {

                this.setState({
                    dataList: data.data,
                    loading: false,
                });
            })
            .then(() => {
              
            });
    }



    componentDidMount() {
        //   $.noConflict();
            setTimeout(() => {
                var j$ = $.noConflict();

                j$('#example').DataTable();
          //  this.getData();
        }, 1000);

       
        //j$(document).ready(function (j$) {
        //    j$('#example').DataTable();
        //});
        // Changing the state after 2 sec
        // from the time when the component
        // is rendered
      //  $.noConflict();
      //  $('#example').DataTable();
        //setTimeout(() => {
        //    $('#example').DataTable();
        //  //  this.getData();
        //}, 10000);
    }
    readHandler = (event, id) => {
        //const encryptedResult = CommonEncryptParam(id.toString());
        //this.props.history.push("/masterdata/boxtype/View/" + encryptedResult);

    }
    editHandler = (event, id) => {
        const encryptedResult = id.toString();
        this.props.history.push("Edit/" + encryptedResult);

    }
    rendersuppliresTable(dataList) {
        console.log(JSON.stringify(dataList));
        let tableContent = dataList === undefined ? null : (
            dataList.map((data) => {

                let activeStatus = data.isActive ? "Active" : "InActive";
                return (
                    <tr key={data.productId}>
                        <td>{data.productType}</td>
                        <td>{data.productName}</td>
                        <td>{data.productDescription}</td>

                        <td>{activeStatus}</td>
                        <td>
                  
                            <a title="View " onClick={(event) => this.readHandler(event, data.productId)}><i className="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i> </a>

                        </td>
                        {
                            this.state.isCreateEditHidden ? null : <td>
                                <a title="Edit" onClick={(event) => this.editHandler(event, data.productId)}><i className="fa fa-pencil-square fa-2x fore-color-cyan icon-green"></i> </a>
                            </td>
                        }

                    </tr>
                );
            })
        );

        return (
            <div className="table-responsive row-top-gap">
                <table id="example" className="display dataTable no-footer">
                    <thead>
                        <tr>
                            <th>productType</th>
                            <th>productName</th>
                            <th>productDescription</th>

                            <th>Status</th>
                            <th>View</th>
                            {this.state.isCreateEditHidden ? null : <th>Edit</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        );

    }

    render() {

        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}
        let contents = this.rendersuppliresTable(this.state.dataList);

        return (
            <div className="row" hidden={this.state.pageLoad} >
                <div className="col-md-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="row">

                                <div className="col-md-10">
                                    <div className="card-header">
                                        <h5 className="title">Product</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        {this.state.isCreateEditHidden ? null : <NavLink className="btn btn-info pull-right" to="/product/create"><i className="fa fa-plus"></i> Create </NavLink>}
                                      </div>
                                </div>
                            </div>

                            <hr />
                            {contents}

                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

//export default Boxtype;
  //   {this.state.isCreateEditHidden ? null : <NavLink className="btn btn-info pull-right" to="/masterdata/boxtype/create"><i className="fa fa-plus"></i> Create Boxtype</NavLink>}
