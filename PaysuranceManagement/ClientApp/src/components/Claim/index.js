import React, { Component } from 'react';
import $ from "jquery";
import { NavLink, Redirect } from 'react-router-dom';

import { CommonGet } from '../../utils/CommonFetch';
//import { Permission } from '../../../utils/Permission';
//import { CommonEncryptParam, CommonDecryptParam } from "../../../utils/CommonParams";

const screenId = 100;

export class ClaimIndex extends Component {
  

    displayName = ClaimIndex.name

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

        claimList: [],
          claimId: "",
        claimRef: "",
        insuranceCompanyId: "",
        claimType: "",
        coperateId: "",
        policyId: "",
        hospitalId: "",
        ailmentId: "",
        dateOfAdmission:"",
        dateOfDischarge: "",
        amountClaimed: "",
        amountDeducted: "",
        amountSettled: "",
        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,
        // insuranceCompanyId: "",
        // insuaranceCompanyList: [],
        insuaranceCompanyList: [
            { insuranceCompanyId: 1, name: "Mysore" },
            { insuranceCompanyId: 2, name: "Lucknow" }
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
        CommonGet('Beta/GetAllBeta', 'activeStatusEnum=2')
      //  CommonPost('Beta/SaveBeta', null, formData)
            .then(data => {

                this.setState({
                    claimList: data.data,
                    loading: false,
                });
            })
            .then(() => {
              
            });
    }

    componentDidMount() {

        // Changing the state after 2 sec
        // from the time when the component
        // is rendered
        setTimeout(() => {
          //  $('#example').DataTable();
          //  this.getData();
        }, 10000);
    }
    readHandler = (event, id) => {
        //const encryptedResult = CommonEncryptParam(id.toString());
        //this.props.history.push("/masterdata/boxtype/View/" + encryptedResult);

    }
    editHandler = (event, id) => {
        //const encryptedResult = CommonEncryptParam(id.toString());
        //this.props.history.push("/masterdata/boxtype/Edit/" + encryptedResult);

    }
    rendersuppliresTable(claimList) {
        console.log(JSON.stringify(claimList));
        let tableContent = claimList === undefined ? null : (
            claimList.map((claim) => {

                let activeStatus = claim.isActive ? "Active" : "InActive";
                return (
                    <tr key={claim.claimId}>
                        <td>{claim.claimRef}</td>
                        <td>{claim.cif}</td>
                        <td>{claim.claimType}</td>
                        <td>{claim.amountClaimed}</td>
                        <td>{claim.amountDeducted}</td>
                        <td>{claim.amountSettled}</td>



                        <td>{activeStatus}</td>
                        <td>

                            <a title="View " onClick={(event) => this.readHandler(event, claim.claimId)}><i className="fa fa-list-alt fa-2x fore-color-cyan icon-blue"></i> </a>

                        </td>
                        {
                            this.state.isCreateEditHidden ? null : <td>
                                <a title="Edit" onClick={(event) => this.editHandler(event, claim.claimId)}><i className="fa fa-pencil-square fa-2x fore-color-cyan icon-green"></i> </a>
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
                            <th>Claim Ref</th>
                            <th>Cif</th>
                            <th>claim Type</th>
                            <td>AmountClaimed</td>
                            <td>AmountDeducted</td>
                            <td>AmountSettled</td>
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
        let contents = this.rendersuppliresTable(this.state.claimList);

        return (
            <div className="row" hidden={this.state.pageLoad} >
                <div className="col-md-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="row">

                                <div className="col-md-10">
                                    <div className="card-header">
                                        <h5 className="title">Claim</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        {this.state.isCreateEditHidden ? null : <NavLink className="btn btn-info pull-right" to="/insuaranceCompany/create"><i className="fa fa-plus"></i> Create </NavLink>}
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
