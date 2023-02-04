
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MessageModal from '../../UI/Modal/MessageModal';
import { CommonGet, CommonPost } from '../../../utils/CommonFetch';
//import { CommonPost } from '../../utils/CommonFetch';
//import { GetUser } from "../../../utils/GetUser";
//import { Permission } from '../../../utils/Permission';
import DatePicker from 'react-datepicker';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";



const screenId = 100;


    export class PolicyEdit extends Component {

        displayName = PolicyEdit.name

    state = {
        policyId: "",
        policyName: "",
        policyType: "",
        policyDescription: "",
        insuranceCompanyId: "",
        policyNo: "",
        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,
        // insuranceCompanyId: "",
        // insuaranceCompanyList: [],
        policyTypeList: [
            { policyTypeId: "Retail", name: "Retail" },
            { policyTypeId: "Coperate", name: "Coperate" }
        ],
        insuaranceCompanyList: [],


        policyCoverageId: "",
        policyCoverageType: "",
        minAmount: "",
        maxAmount: "",
        planId: "",
        policyCoverageList: [],
        detailPolicy: {},
        policyCoverageData: {},
        loading: false,
        isRecordsHidden: false,

        messageModal: {
            messageType: '',
            messageDescription: '',
            isModalHidden: true
        },
        action: '',
        pageLoad: false,
        redirect: false
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
        //            this.setState({
        //                pageLoad: false,
        //                redirect: false,
        //            })
        //        }
        //    });
    }

    getData = () => {
        var id = this.props.match.params["id"];

        var queryString = "policyId=" + id;
       
        CommonGet('Policy/GetDetailPolicyId', queryString)
            .then(data => {
                this.setState({
                    detailPolicy: data.data
                });
            })
            .then(() => {
                console.log('GetDetailPolicy');
                console.log(JSON.stringify(this.state.detailPolicy));
                let newData = this.state.detailPolicy;
             //   var today = new Date();
                console.log(JSON.stringify(newData.policy.policyId));
                this.setState({
                    policyId: newData.policy.policyId,
                    policyName: newData.policy.policyName,
                    policyType: newData.policy.policyType,
                    policyTypeId: newData.policy.policyType,
                    policyNo: newData.policy.policyNo,
                    policyDescription: newData.policy.policyDescription,
                    insuranceCompanyId: newData.policy.insuranceCompanyId,
                    createdBy: newData.policy.createdBy,
                    createdDate: newData.policy.createdDate,
                    modifiedBy:"",
                    modifiedDate: "",
                    isActive: newData.policy.isActive,
                    policyCoverageList: newData.policyCoverageList,
                })


            });
        CommonGet('InsuranceCompany/GetAll', 'activeStatusEnum=1')
            //  CommonPost('Beta/SaveBeta', null, formData)
            .then(data => {

                this.setState({
                    insuaranceCompanyList: data.data,
                    loading: false,
                });
            })
            .then(() => {

            });
    }

    formValidations = () => {
        let isValid = true;

     

        return isValid;
    }

        formNextHandler = (event) => {
            event.preventDefault();

            let isValid = this.formValidations();

            if (true) {

                var today = new Date();

                let formData = {


                    policyId: this.state.policyId,
                    policyName: this.state.policyName,
                    policyType: this.state.policyType,
                    policyDescription: this.state.policyDescription,
                    insuranceCompanyId: Number(this.state.insuranceCompanyId),
                    policyNo: this.state.policyNo.toString(),
                    createdBy: 1,
                    createdDate: moment(),
                    modifiedBy: null,
                    modifiedDate: null,
                    isActive: this.state.isActive

                }
                this.setState({
                    loading: true
                });

              //  formData["policyId"] = 0;
               
                CommonPost('Policy/Update', null, formData)
                    .then((data) => {
                        // alert(JSON.stringify(data));
                        // console.log(JSON.stringify(data));

                        this.setState({
                            messageModal: data
                        });
                        const currentMsgModal = {
                            ...this.state.messageModal
                        };

                        currentMsgModal["messageType"] = data.statusCode

                        currentMsgModal["messageDescription"] = data.message
                        this.setState({
                            messageModal: currentMsgModal
                        });
                    })
                    .then(() => {
                        const modifiedMsgModal = this.state.messageModal;
                        // let currentFormData = this.state.customForm;

                        // if request success you have reset the form. otherwise you have maintain the current state.
                        if (modifiedMsgModal.messageType === "Success") {
                        //    this.formDisableHandler();
                        }

                        modifiedMsgModal.isModalHidden = false;
                        this.setState({
                            messageModal: modifiedMsgModal,
                        })
                    })

                this.setState({
                    loadPolicyCoverageDetail: false,
                    loadPolicyCoverageResult: false,
                });

               
            }
        }


    formSubmitHandler = (event) => {
        event.preventDefault();

        let isValid = this.formValidations();

        if (isValid) {
            var today = new Date();
            let formData = {

                policyCoverageId: this.state.policyCoverageId,
                policyNo: this.state.policyNo.toString(),
                policyCoverageType: this.state.policyCoverageType,
                minAmount: Number(this.state.minAmount),
                maxAmount: Number(this.state.maxAmount),
                planId: this.state.planId.toString(),
                createdBy: 1,
                createdDate: moment(),
                modifiedBy: null,
                modifiedDate: null,
                isActive: this.state.isActive
            }

            this.setState({
                loading: true
            });

            //CommonPost('/api/Boxtype/UpdateBoxtype', null, formData)
            CommonPost('Policy/UpdatePolicyCoverage', null, formData)
                .then((data) => {
                    this.setState({
                        messageModal: data
                    });
                    const currentMsgModal = {
                        ...this.state.messageModal
                    };

                    currentMsgModal["messageType"] = data.statusCode;
                    currentMsgModal["messageDescription"] = data.message;


                    this.setState({
                        messageModal: currentMsgModal
                    });
                })
                .then(() => {
                    const modifiedMsgModal = this.state.messageModal;
                    // let currentFormData = this.state.customForm;

                    // if request success you have reset the form. otherwise you have maintain the current state.
                    if (modifiedMsgModal.messageType === "Success") {
                        this.formResetHandler();
                    }

                    modifiedMsgModal.isModalHidden = false;
                    this.setState({
                        messageModal: modifiedMsgModal,
                    })
                })

            //////
         
            var queryString = "policyId=" + this.state.policyId;

            CommonGet('Policy/GetDetailPolicyId', queryString)
                .then(data => {
                    this.setState({
                        detailPolicy: data.data,
                        policyCoverageList:[],
                    });
                })
                .then(() => {
                    console.log('GetDetailPolicy');
                    console.log(JSON.stringify(this.state.detailPolicy));
                    let newData = this.state.detailPolicy;
                    //   var today = new Date();
                    console.log(JSON.stringify(newData.policy.policyId));
                    this.setState({
                        policyId: newData.policy.policyId,
                        policyName: newData.policy.policyName,
                        policyType: newData.policy.policyType,
                        policyTypeId: newData.policy.policyType,
                        policyNo: newData.policy.policyNo,
                        policyDescription: newData.policy.policyDescription,
                        insuranceCompanyId: newData.policy.insuranceCompanyId,
                        createdBy: newData.policy.createdBy,
                        createdDate: newData.policy.createdDate,
                        modifiedBy: "",
                        modifiedDate: "",
                        isActive: newData.policy.isActive,
                        policyCoverageList: newData.policyCoverageList,
                    })


                });

            //////
        }
    }

    handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [event.target.name]: value });
    }

    modalDismissHandler = () => {
        const modalToDismiss = this.state.messageModal;
        modalToDismiss.isModalHidden = true;
        this.setState({
            messageModal: modalToDismiss
        })
    }

    formResetHandler = () => {

        this.setState({
            policyCoverageId: "",
            policyCoverageType: "",
            minAmount: "",
            maxAmount: "",
            planId: "",

            createdBy: "",
            createdDate: 0,
            ModifiedBy: "",
            ModifiedDate: 0,
            isActive: true

        })
        document.getElementById("isActive").checked = false;
    }
  
        ////////

        renderDropDownproductType(policyTypeList) {

       
            let dropDown = policyTypeList === undefined ? null : (
                policyTypeList.map((data) => {
                   
                    if (data.policyTypeId === this.state.policyTypeId) {
                        return (
                            <option value={data.policyTypeId} selected> {data.name} </option>
                        );
                    }
                    else {
                        return (
                            <option value={data.policyTypeId}> {data.name} </option>
                        );
                    }
                }));

            return (
                <select id="policyTypeId" name="policyTypeId" class="form-control mandatory" onChange={this.handleChange}>
                    <option value="-1"> Please Select </option>
                    {dropDown}
                </select>
            );

        }

        renderDropDowninsuaranceCompanyList(insuaranceCompanyList) {
            console.log(JSON.stringify(insuaranceCompanyList));
            let dropDown = insuaranceCompanyList === undefined ? null : (
                insuaranceCompanyList.map((data) => {
                
                    if (data.insuranceCompanyId === this.state.insuranceCompanyId) {
                        return (
                            <option value={data.insuranceCompanyId} selected> {data.insuranceCompanyName} </option>
                        );
                    }
                    else {
                        return (
                            <option value={data.insuranceCompanyId}> {data.insuranceCompanyName} </option>
                        );
                    }
                }));

            return (
                <select id="insuranceCompanyId" name="insuranceCompanyId" class="form-control mandatory" onChange={this.handleChange}>
                    <option value="0"> Please Select </option>
                    {dropDown}
                </select>
            );

        }
        //////////

        policyCoverageEditHandler = (event, id) => {
          
        
            var queryString = "policyCoverageId=" + id;
            CommonGet('Policy/GetPolicyCoverageById', queryString)
                .then(data => {
                    this.setState({
                        policyCoverageData: data.data
                    });
                })
                .then(() => {

                    let newData = this.state.policyCoverageData;
                    //   var today = new Date();
                    this.setState({
                       
                        policyCoverageId: newData.policyCoverageId,
                        policyCoverageType: newData.policyCoverageType,
                        minAmount: newData.minAmount,
                        maxAmount: newData.maxAmount,
                        planId: newData.planId,
                    })
                });


        }

        renderPolicyCoverageTable(policyCoverageList) {

            let tableContent = policyCoverageList === undefined ? null : (
                policyCoverageList.map((policy) => {
                    let activeStatus = policy.isActive ? "Active" : "InActive";
                    return (
                        <tr key={policy.policyCoverageId}>
                            <td>{policy.policyCoverageType}</td>
                            <td className="right">{policy.minAmount}</td>
                            <td className="right">{policy.maxAmount}</td>
                            <td className="right">{policy.planId}</td>
                            <a title="Edit" onClick={(event) => this.policyCoverageEditHandler(event, policy.policyCoverageId)}><i className="fa fa-pencil-square fa-2x fore-color-cyan icon-green"></i> </a>

                        </tr>
                    );
                })
            );
            return (
                <div className="row">
                    <div className="col-md-9">
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Policy Coverage Type</th>
                                        <th>Min Amount</th>
                                        <th>Max Amount</th>
                                        <th>Plan Id</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableContent}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            );

        }
    render() {
        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}

        let insuaranceCompanyList = this.renderDropDowninsuaranceCompanyList(this.state.insuaranceCompanyList);
        let policyTypeList = this.renderDropDownproductType(this.state.policyTypeList);
        let contents = this.renderPolicyCoverageTable(this.state.policyCoverageList);
        let form = (
            <div>
                <div>

                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Policy Type</label>
                                {policyTypeList}
                                <span id="errproductType" className="text text-danger"></span>

                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>

                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Policy Name</label>
                                <input type="text" className="form-control" value={this.state.policyName} name="policyName" id="policyName" onChange={this.handleChange} />
                                <span id="errpolicyName" className="text text-danger"></span>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>

                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Policy Description</label>
                                <input type="text" className="form-control" value={this.state.policyDescription} name="policyDescription" id="policyDescription" onChange={this.handleChange} />
                                <span id="errpolicyDescription" className="text text-danger"></span>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>

                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Insuarance Company</label>
                                {insuaranceCompanyList}
                                <span id="errinsuranceCompanyId" className="text text-danger"></span>

                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>


                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>policy No</label>
                                <input type="text" className="form-control" value={this.state.policyNo} name="policyNo" id="policyNo" disabled required onChange={this.handleChange} />
                                <span id="errpolicyNo" className="text text-danger"></span>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>


                    <div className="row" >
                        <div className="col-md-2">
                            <div className="checkbox checkbox-primary">
                                <input id="isActive" type="checkbox"
                                    checked={this.state.isActive}
                                    name="isActive"
                                    onChange={(e) => this.setState({ isActive: e.target.checked })}
                                     />
                                <label htmlFor="isActive">
                                    Active
                                                </label>
                            </div>
                        </div>
                        <div className="col-md-10 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary" value="Modify" onClick={this.formNextHandler} />
                            </div>
                        </div>
                        <div className="col-md-10 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>
                </div>

                <div id="policyCoverageDetail" hidden={this.state.loadPolicyCoverageDetail}>
                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Policy Coverage Type</label>
                                <input type="text" className="form-control" value={this.state.policyCoverageType} name="policyCoverageType" id="policyCoverageType" onChange={this.handleChange} />
                                <span id="errpolicyCoverageType" className="text text-danger"></span>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>

                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Min Amount</label>
                                <input type="number" className="form-control" value={this.state.minAmount} name="minAmount" id="minAmount" onChange={this.handleChange} />
                                <span id="errminAmount" className="text text-danger"></span>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>
                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Max Amount</label>
                                <input type="number" className="form-control" value={this.state.maxAmount} name="maxAmount" id="maxAmount" onChange={this.handleChange} />
                                <span id="errmaxAmount" className="text text-danger"></span>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>

                    <div className="row row-top-gap">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Plan id</label>
                                <input type="text" className="form-control" value={this.state.planId} name="planId" id="planId" disabled onChange={this.handleChange} />
                                <span id="errplanId" className="text text-danger"></span>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary" value="Update" onClick={this.formSubmitHandler} />
                            </div>
                        </div>
                        <div className="col-md-10 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>

                </div>
                <div id="policyCoverageResult" hidden={this.state.loadPolicyCoverageResult}>
                    <div className="row">
                        {contents}
                    </div>

                </div>
            </div >
        );


        return (
            <div className="row" hidden={this.state.pageLoad} >
                <div className="col-md-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="card-header">
                                        <h5 className="title">Policy</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">

                                        <Link className="btn btn-info pull-right" to="/policy/index"><i className="fas fa-arrow-left"></i> All Policy</Link>

                                    </div>
                                </div>
                            </div>

                            <hr />
                            <MessageModal
                                hidden={this.state.messageModal.isModalHidden}
                                messageType={this.state.messageModal.messageType}
                                messageDescription={this.state.messageModal.messageDescription}
                                clicked={this.modalDismissHandler}
                            />
                            {form}


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//export default Boxtype;