import React, { Component } from 'react';
import $ from "jquery";
import { NavLink, Redirect } from 'react-router-dom';
import moment from "moment";
import { CommonGet } from './../../../../src/utils/CommonFetch';

//import { Permission } from '../../../utils/Permission';
//import { CommonEncryptParam, CommonDecryptParam } from "../../../utils/CommonParams";
$.DataTable = require('datatables.net');

const screenId = 100;

export class AilmentIndex extends Component {
  

    displayName = AilmentIndex.name

    state = {
     
        pageLoad: false,
        redirect: false,
        isCreateEditHidden: false,

        dataList: [],
        ailmentId: "",
        ailmentName: "",
        ailmentDescription: "",
        createdBy: "",
        createdDate: moment(),
        modifiedBy: "",
        modifiedDate:  moment(),
        isActive: true
        // insuranceCompanyId: "",
        // insuaranceCompanyList: [],
  

    };

    componentWillMount() {
      
              this.getData();
       
    }

    getData = () => {
     
        CommonGet('ailment/GetAll', 'activeStatusEnum=2')
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
        setTimeout(() => {
            var j$ = $.noConflict();

            j$('#example').DataTable();
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
    rendermasterTable(dataList) {
        console.log(JSON.stringify(dataList));
        let tableContent = dataList === undefined ? null : (
            dataList.map((data) => {

                let activeStatus = data.isActive ? "Active" : "InActive";
                return (
                    <tr key={data.ailmentId}>
                        <td>{data.ailmentName}</td>
                        <td>{data.ailmentDescription}</td>
                    

                        <td>{activeStatus}</td>
                        <td>
                  
                            <a title="View " onClick={(event) => this.readHandler(event, data.ailmentId)}><i className="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i> </a>

                        </td>
                        {
                            this.state.isCreateEditHidden ? null : <td>
                                <a title="Edit" onClick={(event) => this.editHandler(event, data.ailmentId)}><i className="fa fa-pencil-square fa-2x fore-color-cyan icon-green"></i> </a>
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
                            <th>Ailment Name</th>
                            <th>Ailment Description</th>
                          

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
                                        <h5 className="title">Ailment</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        {this.state.isCreateEditHidden ? null : <NavLink className="btn btn-info pull-right" to="/aliment/create"><i className="fa fa-plus"></i> Create </NavLink>}
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
