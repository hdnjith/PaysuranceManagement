import React, { Component } from 'react';
import $ from "jquery";
import { NavLink, Redirect } from 'react-router-dom';
import moment from "moment";
import { CommonGet } from './../../../../src/utils/CommonFetch';
//import { Permission } from '../../../utils/Permission';
//import { CommonEncryptParam, CommonDecryptParam } from "../../../utils/CommonParams";
$.DataTable = require('datatables.net');

const screenId = 100;

export class HospitalIndex extends Component {
  

    displayName = HospitalIndex.name

    state = {
        //categoryId: "",
        //categoryCode: "",
        //categoryDescription: "",
        //categoryValue: "",
        //createdBy: "",
        //createdDate: Date.now,
        //modifiedBy: "",
        //modifiedDate: Date.now,
        //isActive: true,

        //boxtypeList: [],
        //boxtypeData: {},
        pageLoad: false,
        redirect: false,
        isCreateEditHidden: false,

        dataList: [],
        hospitalId: "",
        hospitalName: "",
        location: "",
        address: "",
        email: "",
        hotline: "",
        representiveName: "",
        representiveContact: "",
        paysuaranceContactPersonId: moment(),
        mouDocument: moment(),
        mouDocumentStartDate: moment(),
        mouDocumentExpiryDate: moment(),
        scannedCopyOfMouPath: "",
        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,
        file: "",
        fileName: "",
        // insuranceCompanyId: "",
        // insuaranceCompanyList: [],
        paysuaranceContactList: [
            { paysuaranceContactId: 1, name: "Mysore" },
            { paysuaranceContactId: 2, name: "Lucknow" }
        ], productList: [
            { productId: 1, name: "Alpha" },
            { productId: 2, name: "Beta" }
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
        CommonGet('Hospital/GetAll', 'activeStatusEnum=2')
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
        var j$ = $.noConflict();

        j$('#example').DataTable();
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
    rendermasterTable(dataList) {
        console.log(JSON.stringify(dataList));
        let tableContent = dataList === undefined ? null : (
            dataList.map((data) => {

                let activeStatus = data.isActive ? "Active" : "InActive";
                return (
                    <tr key={data.hospitalId}>
                        <td>{data.hospitalName}</td>
                        <td>{data.email}</td>
                        <td>{data.address}</td>

                        <td>{activeStatus}</td>
                        <td>
                  
                            <a title="View " onClick={(event) => this.readHandler(event, data.hospitalId)}><i className="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i> </a>

                        </td>
                        {
                            this.state.isCreateEditHidden ? null : <td>
                                <a title="Edit" onClick={(event) => this.editHandler(event, data.hospitalId)}><i className="fa fa-pencil-square fa-2x fore-color-cyan icon-green"></i> </a>
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
                            <th>Hospital</th>
                            <th>email</th>
                            <th>address</th>

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
        let contents = this.rendermasterTable(this.state.dataList);

        return (
            <div className="row" hidden={this.state.pageLoad} >
                <div className="col-md-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="row">

                                <div className="col-md-10">
                                    <div className="card-header">
                                        <h5 className="title">Hospital</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        {this.state.isCreateEditHidden ? null : <NavLink className="btn btn-info pull-right" to="/hospital/create"><i className="fa fa-plus"></i> Create </NavLink>}
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
