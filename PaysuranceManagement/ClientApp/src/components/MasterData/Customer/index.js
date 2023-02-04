import React, { Component } from 'react';
import $ from "jquery";
import { NavLink, Redirect } from 'react-router-dom';
import moment from "moment";
import { CommonGet } from './../../../../src/utils/CommonFetch';
import { ReactSession } from 'react-client-session';
//import { Permission } from '../../../utils/Permission';
//import { CommonEncryptParam, CommonDecryptParam } from "../../../utils/CommonParams";
$.DataTable = require('datatables.net');

const screenId = 100;

ReactSession.setStoreType("localStorage");

export class CustomerIndex extends Component {
  

    displayName = CustomerIndex.name

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
        isMemberAddHidden: false,

        dataList: [],
        customerId: "",
        customerName: "",
        customerType: "",
        identificationNo: "",
        adress: "",
        contact: "",
        email: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        insuranceCompanyId: "",
        productId: "",
        customerSheet: "",
        customerOnboardType: "Customer",

        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,

        productList: [],

        // insuranceCompanyId: "",
        // insuaranceCompanyList: [],
        CustomerTypeList: [
            { CustomerTypeId: "Retail", name: "Retail" },
            { CustomerTypeId: "Corparate", name: "Corparate" }
        ],

        customerOnboardTypeList: [
            { customerOnboardType: "Customer", name: "Customer" },
            { customerOnboardType: "Member", name: "Member" }
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
        CommonGet('Customer/GetAll', 'activeStatusEnum=2')
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
      
        //j$(document).ready(function (j$) {
        //    j$('#example').DataTable();
        //});
        // Changing the state after 2 sec
        // from the time when the component
        // is rendered
      //  $.noConflict();
      //  $('#example').DataTable();
        setTimeout(() => {
            var j$ = $.noConflict();

            j$('#example').DataTable();
        }, 200);
    }
    readHandler = (event, id) => {
        //const encryptedResult = CommonEncryptParam(id.toString());
        //this.props.history.push("/masterdata/boxtype/View/" + encryptedResult);

    }
    editHandler = (event, id) => {

        if (this.state.customerOnboardType === 'Member') {
            alert('Unable to edit');
        }
        else {
            const encryptedResult = id.toString();
            this.props.history.push("Edit/" + encryptedResult);
        }
      

    }

    addMember = (event, id) => {

        if (this.state.customerOnboardType === 'Member') {
            alert('Unable to edit');
        }
        else {
            const encryptedResult = id.toString();
            this.props.history.push("/customerbulk/create/" + encryptedResult);
        }
      

    }

    viewMember = (event, id) => {

        const encryptedResult = id.toString();
        this.props.history.push("MemberViewIndex/" + encryptedResult);
      

    }

    addClaimHandler = (id) => {

      
        const encryptedResult = id.toString();
        ReactSession.set("customerCifSession", id);
       // localStorage.setItem("customerIdSession", JSON.stringify(encryptedResult));
      //  alert(id);
       // window.sessionStorage.setItem("customerIdSession", id);
        this.props.history.push("/claim");


    }
    handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [event.target.name]: value });
        if (event.target.name === 'customerOnboardType') {

            var table = $('#example').DataTable();
            table.destroy();
          //  $('#example').empty(); // empty in case the columns change



            if (value === 'Customer') {

                this.setState({
                    dataList: [],
                    loading: false,
                });
                CommonGet('Customer/GetAll', 'activeStatusEnum=2')
                    //  CommonPost('Beta/SaveBeta', null, formData)
                    .then(data => {

                        this.setState({
                            dataList: data.data,
                            loading: false,
                        });
                    })
                    .then(() => {

                    });
                setTimeout(() => {
                    var j$ = $.noConflict();

                    j$('#example').DataTable();
                }, 1000);
            }
            else {
                this.setState({
                    dataList: [],
                    loading: false,
                });

                CommonGet('CustomerBulkUpload/GetAllBulkCustomer', 'activeStatusEnum=2')
                    //  CommonPost('Beta/SaveBeta', null, formData)
                    .then(data => {

                        this.setState({
                            dataList: data.data,
                            loading: false,
                        });
                    })
                    .then(() => {

                    });
                setTimeout(() => {
                    var j$ = $.noConflict();

                    j$('#example').DataTable();
                }, 1000);
            }
            
        }
  
        
    }
    renderDropDowncustomerOnboardType(customerOnboardTypeList) {
   
        let dropDown = customerOnboardTypeList === undefined ? null : (
            customerOnboardTypeList.map((data) => {
                
                if (data.customerOnboardType === "Customer") {
                    return (
                        <option value={data.customerOnboardType} selected> {data.name} </option>
                    );
                }
                else {
                    return (
                        <option value={data.customerOnboardType} > {data.name} </option>
                    );
                }


            }));

        return (
            <select id="customerOnboardType" name="customerOnboardType" class="form-control mandatory" onChange={this.handleChange} >
            
                {dropDown}
            </select>
        );

    }
    rendermasterTable(dataList, customerOnboardType) {
      
        if (this.state.customerOnboardType === "Customer") {
            let tableContent = dataList === undefined ? null : (
                dataList.map((data) => {

                    let activeStatus = data.isActive ? "Active" : "InActive";

                    return (
                        <tr key={data.customerId}>
                            <td>{data.customerName}</td>
                            <td>{data.cif}</td>
                            <td>{data.customerType}</td>
                            <td>{data.adress}</td>

                            <td>{activeStatus}</td>
                        
                            <td>

                                <a title="View " onClick={(event) => this.readHandler(event, data.customerId)}><i className="fa fa-list-alt fa-1x fore-color-cyan icon-blue"></i> </a>

                            </td>
                            {
                                this.state.isCreateEditHidden ? null : <td>
                                    <a title="Edit" onClick={(event) => this.editHandler(event, data.customerId)}><i className="fa fa-pencil-square fa-1x fore-color-cyan icon-green"></i> </a>
                                </td>
                            }
                           <td>
                                <a title="Member" onClick={(event) => this.addMember(event, data.customerId)}><i className="fa fa-upload fa-1x fore-color-cyan icon-dark-blue"></i> </a>
           
                            </td>
                            <td>
                                <a title="View Member" onClick={(event) => this.viewMember(event, data.customerId)}><i className="fa fa-users fa-1x fore-color-cyan icon-orange"></i> </a>
                            </td>
                            


                        </tr>

                    );
                })
            );

            return (

                <div className="table-responsive row-top-gap">
                    <table id="example" className="display dataTable no-footer">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Cif</th>
                                <th>Type</th>
                                <th>Adress</th>
                             
                                <th>Status</th>
                               
                                <th>View</th>
                                {this.state.isCreateEditHidden ? null : <th>Edit</th>}
                                <th>Add Member</th>
                                <th>View Members</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            );

        }
        else {

            let tableContent = dataList === undefined ? null : (
                dataList.map((data) => {

                    let activeStatus = data.isActive ? "Active" : "InActive";

                    return (
                        <tr key={data.customerBulkUpload.customerBulkId}>
                            <td>{data.customerBulkUpload.insuredName}</td>
                            <td>{data.customerBulkUpload.policyNo}</td>
                            <td>{data.customerBulkUpload.cif} </td>
                            <td>{data.customer.cif} {data.customer.customerName}</td>

                            <td>{activeStatus}</td>
                            <td>

                                <a title="Claim " onClick={(event) => this.addClaimHandler(data.customerBulkUpload.cif)}><i className="fa fa-line-chart fa-2x fore-color-cyan icon-orange"></i> </a>

                            </td>
                            <td>

                                <a title="View " onClick={(event) => this.readHandler(event, data.customerBulkUpload.customerBulkId)}><i className="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i> </a>

                            </td>
                            {
                                this.state.isCreateEditHidden ? null : <td>
                                    <a title="Edit" onClick={(event) => this.editHandler(event, data.customerBulkUpload.customerBulkId)}><i className="fa fa-pencil-square fa-2x fore-color-cyan icon-green"></i> </a>
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
                                <th>Member</th>
                                <th>Policy No</th>
                                <th>cif</th>
                                <th>Customer</th>

                                <th>Status</th>
                                <th>Claim</th>
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

       

    }

    render() {

        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}
        let contents = this.rendermasterTable(this.state.dataList, this.state.customerOnboardType);
        let customerOnboardTypeList = this.renderDropDowncustomerOnboardType(this.state.customerOnboardTypeList);
        return (
            <div className="row" hidden={this.state.pageLoad} >
                <div className="col-md-12">
                    <div className="card">

                        <div className="card-body">

                            <div className="row row-top-gap" hidden= "true">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Customer Onboard </label>
                                        {customerOnboardTypeList}
                                        <span id="errcustomerOnboardTypeList" className="text text-danger"></span>
                                    </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                    <div className="form-group">&nbsp;</div>
                                </div>
                            </div>

                            <div className="row" id="CustomerCustomer">

                                <div className="col-md-10">
                                    <div className="card-header">
                                        <h5 className="title"> {this.state.customerOnboardType}s </h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        {this.state.isCreateEditHidden ? null : <NavLink className="btn btn-info pull-right" to="/customer/create"><i className="fa fa-plus"></i> Create </NavLink>}
                                         <NavLink className="btn btn-info pull-right" to="/customer/memberindex"><i className="fa fa-user"></i> Members </NavLink>
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
