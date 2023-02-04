import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MessageModal from '../../UI/Modal/MessageModal';
import { CommonPost, CommonGet } from './../../../../src/utils/CommonFetch';
import $ from "jquery";
//import { CommonPost } from '../../utils/CommonFetch';
//import { GetUser } from "../../../utils/GetUser";
//import { Permission } from '../../../utils/Permission';
import DatePicker from 'react-datepicker';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
const screenId = 100;

//class Claim extends Component {
export class Policy extends Component {
    displayName = Policy.name

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
     
        loading: false,
        loadPolicyCoverageDetail: true,
        loadPolicyCoverageResult: true,
        isRecordsHidden: false,

        messageModal: {
            messageType: '',
            messageDescription: '',
            isModalHidden: true
        },
        action: '',
        pageLoad: false,
        redirect: false,
    };

    componentWillMount() {

       
        $("#policyCoverageDetail").hide();
         
        //Permission(screenId)
        //    .then(data => {
        //        if (data.data == undefined || data.data.length == 0) {
        //            this.setState({
        //                pageLoad: true,
        //                redirect: true
        //            });
        //        } else {
        //            //this.getData();
        //            this.setState({
        //                pageLoad: false,
        //                redirect: false,
        //            })
        //        }
        //    });
    }
    componentDidMount() {
        this.getData();

    }

    getData = () => {

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

        CommonGet('Policy/GetPolicyNo', '')
            //  CommonPost('Beta/SaveBeta', null, formData)
            .then(data => {
                
                this.setState({
                    policyNo: data.data,
                    loading: false,
                });
            })
            .then(() => {

            });
    //    this.addPolicyCoverageToTabel(this.state.policyNo);
  
    }
    formValidations = () => {
     
        let isValid = true;
     
      
        var inputVal = document.getElementById("policyCoverageType");
       
        if (inputVal.value === '0' || inputVal.value === '' ) {
          
            isValid = false;
            document.getElementById("errpolicyCoverageType").innerHTML = 'Please enter policy coverage type ex: OPD'; 
        }

        inputVal = document.getElementById("maxAmount");
      
        if (inputVal.value === '0' || inputVal.value === '') {
           
            isValid = false;
            document.getElementById("errmaxAmount").innerHTML = 'Please enter max amount'; 
        }



        return isValid;
    }

    formNextBtnValidations = () => {
        let isValid = true;

        var inputVal = document.getElementById("policyType");
     
        if (inputVal.value === '0') {
          
            isValid = false;
            document.getElementById("errpolicyType").innerHTML = 'Please select policy type';
        }

        inputVal = document.getElementById("insuranceCompanyId");
        if (inputVal.value === '0') {
            isValid = false;
            document.getElementById("errinsuranceCompanyId").innerHTML = 'Please select insuarance company';
        }
        inputVal = document.getElementById("policyName");
      
        if (inputVal.validity.valueMissing) {

            isValid = false;
            document.getElementById("errpolicyName").innerHTML = 'Please enter policy name';
        }


        return isValid;
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

            formData["policyCoverageId"] = 0;
            console.log(JSON.stringify(formData));
            CommonPost('Policy/PolicyCoverageCreate', null, formData)
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
                        this.formAddBtnResetHandler();
                        this.addPolicyCoverageToTabel(this.state.policyNo);
                    }

                    modifiedMsgModal.isModalHidden = false;
                    this.setState({
                        messageModal: modifiedMsgModal,
                    })
                })

        }
    }

    formNextHandler = (event) => {
        event.preventDefault();

        let isValid = this.formNextBtnValidations();

        if (isValid) {

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

            formData["policyId"] = 0;
            console.log(JSON.stringify(formData));
            CommonPost('Policy/Create', null, formData)
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
                        this.formDisableHandler();
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
           
            var queryString = "policyNo=" + this.state.policyNo;
            CommonGet('Policy/GetPlanId', queryString)
                //  CommonPost('Beta/SaveBeta', null, formData)
                .then(data => {

                    this.setState({
                        planId: data.data,
                        loading: false,
                    });
                })
                .then(() => {

                });
        }
    }

    formResetHandler = () => {

        this.setState({
     
            policyId: 0,
            policyName: "",
            policyType: 0,
            policyDescription: "",
            insuranceCompanyId: 0,
            policyNo: "",

            createdBy: "",
            createdDate: 0,
            ModifiedBy: "",
            ModifiedDate: 0,
            isActive: true

        })
    }
    formAddBtnResetHandler = () => {

        this.setState({

            policyCoverageId: 0,
            policyCoverageType: '',
            minAmount: '',
            maxAmount: '',
            createdBy: 1,
            createdDate: moment(),
            modifiedBy: null,
            modifiedDate: null,
            isActive: this.state.isActive

        })

        var queryString = "policyNo=" + this.state.policyNo;
        CommonGet('Policy/GetPlanId', queryString)
            //  CommonPost('Beta/SaveBeta', null, formData)
            .then(data => {

                this.setState({
                    planId: data.data,
                    loading: false,
                });
            })
            .then(() => {

            });

    }
    formDisableHandler = () => {

        document.getElementById('policyName').readOnly = true;
        document.getElementById("policyType").disabled = true;
        document.getElementById('policyDescription').readOnly = true;
        document.getElementById("insuranceCompanyId").disabled = true;
        
    }
    modalDismissHandler = () => {
        const modalToDismiss = this.state.messageModal;
        modalToDismiss.isModalHidden = true;
        this.setState({
            messageModal: modalToDismiss
        })
    }

    planIdHandler = () => {
       
        this.setState({
            planId: this.state.planId+1,
        })
    }

    handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [event.target.name]: value });
    }


    addPolicyCoverageToTabel = (id) => {


        var queryString = "PolicyNo=" + id;

        CommonGet('Policy/GetPolicyCoverageByPolicyNo', queryString)
            .then(data => {
                this.setState({
                    policyCoverageList: data.data
                });
               
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
                    

                    </tr>
                );
            })
        );
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="table-responsive row-top-gap">
                        <table id="example" className="display dataTable no-footer">
                            <thead>
                                <tr>
                                    <th>Policy Coverage Type</th>
                                    <th>Min Amount</th>
                                    <th>Max Amount</th>
                                    <th>Plan Id</th>

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
    renderDropDowninsuaranceCompany(insuaranceCompanyList) {
        console.log('list');
        console.log(JSON.stringify(insuaranceCompanyList));
        let dropDown = insuaranceCompanyList === undefined ? null : (
            insuaranceCompanyList.map((data) => {

                return (
                    <option value={data.insuranceCompanyId}> {data.insuranceCompanyName} </option>
                );

            }));

        return (
            <select id="insuranceCompanyId" name="insuranceCompanyId" class="form-control mandatory" onChange={this.handleChange} >
                <option value="0"> Please Select </option>
                {dropDown}
            </select>
        );

    }

    renderDropDownproductType(policyTypeList) {
      //  console.log(JSON.stringify(productTypeList));
        let dropDown = policyTypeList === undefined ? null : (
            policyTypeList.map((data) => {

                return (
                    <option value={data.policyTypeId}> {data.name} </option>
                );

            }));

        return (
            <select id="policyType" name="policyType" class="form-control mandatory" onChange={this.handleChange} >
                <option value="0"> Please Select </option>
                {dropDown}
            </select>
        );

    }
    render() {
        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}
        let insuaranceCompanyList = this.renderDropDowninsuaranceCompany(this.state.insuaranceCompanyList);
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
                                <span id="errpolicyType" className="text text-danger"></span>

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
                                checked />
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
                            <input type="submit" className="btn btn-primary" value="Next" onClick={this.formNextHandler} />
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

                                &nbsp;<a title="View " onClick={(event) => this.planIdHandler(event, this.state.planId)}><i className="fa fa-plus fa-2x icon-green"></i> </a>
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
                            <input type="submit" className="btn btn-primary" value="Add" onClick={this.formSubmitHandler} />
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

                                        <Link className="btn btn-info pull-right" to="/policy/index"><i className="fas fa-arrow-left"></i> All Policies</Link>

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

//export default Claim;
     //////<MessageModal
                            //    hidden={this.state.messageModal.isModalHidden}
                            //    messageType={this.state.messageModal.messageType}
                            //    messageDescription={this.state.messageModal.messageDescription}
                            //    clicked={this.modalDismissHandler}
                            ///>