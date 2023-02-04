import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MessageModal from './..//UI/Modal/MessageModal';
import { CommonPost, CommonGet } from '../../utils/CommonFetch';

//import { GetUser } from "../../../utils/GetUser";
//import { Permission } from '../../../utils/Permission';
import DatePicker from 'react-datepicker';
import moment from "moment";
import { ReactSession } from 'react-client-session';
import "react-datepicker/dist/react-datepicker.css";
const screenId = 100;

//class Claim extends Component {
export class Claim extends Component {
    displayName = Claim.name

    state = {
        claimId: "",
        claimRef: "",
        insuranceCompanyId: "",
        claimType: "",
        coperateId: "",
        policyId: "",
        hospitalId: "",
        ailmentId: "",
        customerId: "",
        supportiveDocumentLink: "",
        dateOfAdmission: moment(),
        dateOfDischarge: moment(),
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
        insuaranceCompanyList: [],
        hospitalList: [],
        ailmentList: [],
        policyCoverageList: [],


        loading: false,
        isRecordsHidden: false,

        messageModal: {
            messageType: '',
            messageDescription: '',
            isModalHidden: true
        },
        action: '',
        pageLoad: false,
        redirect: false,
        customerData: {},
        lblCustomerName:'',
        lblInsuaranceCompany:'',
        lblCif:'',
        lblPolicyNo:'',
        lblPlanId:''
    };
  
    componentWillMount() {


        var id = ReactSession.get("customerCifSession"); 
       // const id = localStorage.getItem("customerIdSession");
      //  const id = window.sessionStorage.getItem("customerIdSession");
       
        console.log(id);
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

        var id = ReactSession.get("customerCifSession"); 
       
        var queryString = "cif=" + id;
        CommonGet('claim/GetPreClaimDetailByCif', queryString)
       
            .then(data => {

                this.setState({
                    customerData: data.data,
                    loading: false,
                });
            })
            .then(() => {
                console.log('GetPreClaimDetailByCif');
                console.log(JSON.stringify(this.state.customerData));
                this.setState({
                    lblCustomerName: this.state.customerData.customerBulkUpload.insuredName,
                    lblCif: this.state.customerData.customerBulkUpload.cif ,
                    lblInsuaranceCompany: this.state.customerData.insuranceCompany.insuranceCompanyName,
                    lblPolicyNo: this.state.customerData.policy.policyNo,
                    lblPlanId: this.state.customerData.customerBulkUpload.planId,
                });
                
            })
        
        .then(() => {
              
      
           // var queryString = "PolicyNo=" + this.state.lblPolicyNo + "&planId=" + this.state.lblPlanId;
            var queryString = "PolicyNo=" + this.state.lblPolicyNo;


            CommonGet('Policy/GetPolicyCoverageByPolicyNo', queryString)
                //  CommonPost('Beta/SaveBeta', null, formData)
                .then(data => {

                    this.setState({
                        policyCoverageList: data.data,
                        loading: false,
                    });
                })
                .then(() => {

                });
                
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

        CommonGet('hospital/GetAll', 'activeStatusEnum=1')
            //  CommonPost('Beta/SaveBeta', null, formData)

            .then(data => {

                this.setState({
                    hospitalList: data.data,
                    loading: false,
                });

             
            })
            .then(() => {

            });

        CommonGet('ailment/GetAll', 'activeStatusEnum=1')
            //  CommonPost('Beta/SaveBeta', null, formData)
            .then(data => {

                this.setState({
                    ailmentList: data.data,
                    loading: false,
                });
            })
            .then(() => {

            });


    
    }

    formValidations = () => {
        //let isValid = true;

        //var inputVal = document.getElementById("name");
        //if (inputVal.validity.valueMissing) {

        //    isValid = false;
        //    document.getElementById("errname").innerHTML = inputVal.validationMessage;
        //}

        //inputVal = document.getElementById("address");
        //if (inputVal.validity.valueMissing) {
        //    isValid = false;
        //    document.getElementById("erraddress").innerHTML = inputVal.validationMessage;
        //}



        //return isValid;
    }

    formSubmitHandler = (event) => {
        event.preventDefault();

        let isValid = this.formValidations();

        if (true) {

            var today = new Date();

            let formData = {

                claimId: this.state.claimId,
                claimRef:0,
                cif: this.state.lblCif,
                insuranceCompanyId: Number(this.state.insuranceCompanyId),
               // insuranceCompanyId: 1,
                claimType: this.state.claimType,
                //coperateId: this.state.coperateId,
                coperateId: Number(this.state.coperateId),
               // policyId: this.state.policyId,
                policyId: Number(this.state.policyId),
                hospitalId: Number(this.state.hospitalId),
              //  hospitalId: this.state.hospitalId,
              //  ailmentId: this.state.ailmentId,
                ailmentId: Number(this.state.ailmentId),
                customerId: Number(this.state.customerId),
                supportiveDocumentLink: this.state.supportiveDocumentLink,
                dateOfAdmission: this.state.dateOfAdmission,
                dateOfDischarge: this.state.dateOfDischarge,
              //  amountClaimed: this.state.amountClaimed,
                amountClaimed: Number(this.state.amountClaimed),
               // amountDeducted: this.state.amountDeducted,
                amountDeducted: Number(this.state.amountDeducted),
             //   amountSettled: this.state.amountSettled,
                amountSettled: Number(this.state.amountSettled),


                createdBy: 1,
                createdDate: moment(),
                //createdDate: today.toDateString(),
                modifiedBy: null,
                modifiedDate: null,
                isActive: this.state.isActive

              


            }
            this.setState({
                loading: true
            });

            formData["claimId"] = 0;

            CommonPost('Beta/SaveBeta', null, formData)
                .then((data) => {
                
                    console.log(JSON.stringify(data));

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
                        this.formResetHandler();
                    }

                    modifiedMsgModal.isModalHidden = false;
                    this.setState({
                        messageModal: modifiedMsgModal,
                    })
                })

        }
    }

    formResetHandler = () => {

        this.setState({
            claimId: 0,
            claimRef: "",
            insuranceCompanyId: 0,
            claimType: "",
            coperateId: 0,
            policyId: 0,
            hospitalId: 0,
            ailmentId: 0,
            customerId: 0,
            supportiveDocumentLink: "",
            dateOfAdmission: 0,
            dateOfDischarge: 0,
            amountClaimed: 0,
            amountDeducted: 0,
            amountSettled: 0,
            createdBy: "",
            createdDate: "",
            ModifiedBy: "",
            ModifiedDate: "",
            isActive: true

        })
    }

    modalDismissHandler = () => {
        const modalToDismiss = this.state.messageModal;
        modalToDismiss.isModalHidden = true;
        this.setState({
            messageModal: modalToDismiss
        })
    }

    handleChange = (event) => {

        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [event.target.name]: value });
        if (event.target.name === 'policyCoverageId') {

            
            var queryString = "cif=" + this.state.lblCif + "&policyCoverageId="+ value;

            CommonGet('Policy/GetPolicyCoverageDetailAmountsByCif', queryString)
                //  CommonPost('Beta/SaveBeta', null, formData)
                .then(data => {
                  
                    this.setState({
                        amountSettled: data.data.policyCoverageMaxAMount,
                        amountClaimed: data.data.alreadyUtilizedAmount,
                        loading: false,
                    });
                })
                .then(() => {

                });
        }
    }


    renderDropDownInsuaranceCompany(insuaranceCompanyList) {
        console.log(JSON.stringify(insuaranceCompanyList));
        let dropDown = insuaranceCompanyList === undefined ? null : (
            insuaranceCompanyList.map((insuaranceCompany) => {

                return (
                    <option value={insuaranceCompany.insuranceCompanyId}> {insuaranceCompany.insuranceCompanyName} </option>
                );

            }));

        return (
            <select id="insuranceCompanyId" name="insuranceCompanyId" class="form-control mandatory" onChange={this.handleChange} >
                <option value="-1"> Please Select </option>
                {dropDown}
            </select>
        );

    }

    renderDropDownHospital(hospitalList) {
      
        let dropDown = hospitalList === undefined ? null : (
            hospitalList.map((data) => {

                return (
                    <option value={data.hospitalId}> {data.hospitalName} </option>
                );
           
            }));

        return (
            <select id="hospitalId" name="hospitalId" class="form-control mandatory" onChange={this.handleChange} >
                <option value="-1"> Please Select </option>
                {dropDown}
            </select>
        );

    }

    renderDropDownAilment(ailmentList) {
     
        let dropDown = ailmentList === undefined ? null : (
            ailmentList.map((data) => {

                return (
                    <option value={data.ailmentId}> {data.ailmentName} </option>
                );
         
            }));

        return (
            <select id="ailmentId" name="ailmentId" class="form-control mandatory" onChange={this.handleChange} >
                <option value="-1"> Please Select </option>
                {dropDown}
            </select>
        );

    }

    renderDropDownPolicyCoverage(policyCoverageList) {
       
        let dropDown = policyCoverageList === undefined ? null : (
            policyCoverageList.map((data) => {

                return (
                    <option value={data.policyCoverageId}> {data.policyCoverageType} </option>
                );
 
            }));

        return (
            <select id="policyCoverageId" name="policyCoverageId" class="form-control mandatory" onChange={this.handleChange} >
                <option value="-1"> Please Select </option>
                {dropDown}
            </select>
        );

    }
    render() {
        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}
        let InsuaranceCompanyList = this.renderDropDownInsuaranceCompany(this.state.insuaranceCompanyList);
        let HospitalList = this.renderDropDownHospital(this.state.hospitalList);
        let AilmentList = this.renderDropDownAilment(this.state.ailmentList);
        let PolicyCoverageList = this.renderDropDownPolicyCoverage(this.state.policyCoverageList);
        let form = (
            //<form onSubmit={this.formSubmitHandler} >

            //</form>
            <div>
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Customer Cif</label>
                                <input type="text"
                                    className="form-control mandatory"
                                    value={this.state.lblCif}
                                    name="cif"
                                    id="cif"
                                    onChange={this.handleChange}
                                    disabled
                                    required />

                                <span id="errname" className="text text-danger"></span>
                                <label> {this.state.lblCustomerName}</label>
                            </div>
                        </div>
                        <div className="col-md-6 pl-1">
                            <div className="form-group">&nbsp;</div>
                        </div>
                    </div>
                   
                </div>
                <div className="row row-top-gap" hidden = "true">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Claim Ref</label>
                            <input type="text" className="form-control" value={this.state.claimRef} name="claimRef" id="claimRef" onChange={this.handleChange} />
                            <span id="erraddress" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>claim Type</label>
                            <input type="text" className="form-control" value={this.state.claimType} name="claimType" id="claimType" onChange={this.handleChange} />
                            <span id="errcontactHome" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Insuarance Company :</label>
                        </div>
                    </div>
                    <div className="col-md-9 pl-1">
                        <div className="form-group">  <label> {this.state.lblInsuaranceCompany}</label> </div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Coperate</label>
                            {InsuaranceCompanyList}
                            <span id="errcoperateId" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Policy No :</label>
                        </div>
                    </div>
                    <div className="col-md-9 pl-1">
                        <div className="form-group">  <label>{this.state.lblPolicyNo}  Plan Id {this.state.lblPlanId}</label> </div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Policy Coverage Type</label>
                            {PolicyCoverageList}
                            <span id="errpolicyCoverageId" className="text text-danger"></span>

                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Hospital</label>
                            {HospitalList}
                            <span id="errhospitalId" className="text text-danger"></span>

                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Ailment.</label>
                            {AilmentList}
                            <span id="errailmentId" className="text text-danger"></span>

                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Supportive Document Link</label>
                            <input type="text" className="form-control" value={this.state.supportiveDocumentLink} name="supportiveDocumentLink" id="supportiveDocumentLink" onChange={this.handleChange} />
                            <span id="errsupportiveDocumentLink" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

               
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Admission Date</label>

                            <DatePicker
                                className="form-control date"
                                readOnly="true"
                                todayButton={"Today"}
                                showYearDropdown
                                showMonthDropdown
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.dateOfAdmission}
                                onChange={(date) => this.setState({ dateOfAdmission: date })}
                            />


                            <span id="errdateOfAdmission" className="text text-danger"></span>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Discharge Date </label>

                            <DatePicker
                                className="form-control date"
                                readOnly="true"
                                todayButton={"Today"}
                                showYearDropdown
                                showMonthDropdown
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.dateOfDischarge}
                                onChange={(date) => this.setState({ dateOfDischarge: date })}
                            />


                            <span id="errdateOfDischarge" className="text text-danger"></span>
                        </div>

                    </div>
                </div>
              
  
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Amount Claimed</label>
                            <input type="text" className="form-control" value={this.state.amountClaimed} name="amountClaimed" id="amountClaimed" onChange={this.handleChange} />
                            <span id="erramountClaimed" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Amount Deducted</label>
                            <input type="text" className="form-control" value={this.state.amountDeducted} name="amountDeducted" id="amountDeducted" onChange={this.handleChange} />
                            <span id="erramountDeducted" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Amount Settled</label>
                            <input type="text" className="form-control" value={this.state.amountSettled} name="amountSettled" id="amountSettled" onChange={this.handleChange} />
                            <span id="erramountSettled" className="text text-danger"></span>
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
                            <input type="submit" className="btn btn-primary" value="Save" onClick={this.formSubmitHandler} />
                        </div>
                    </div>
                    <div className="col-md-10 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
            </div>
        );

     
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

                                        <Link className="btn btn-info pull-right" to="/counter1"><i className="fas fa-arrow-left"></i> All Claim</Link>

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