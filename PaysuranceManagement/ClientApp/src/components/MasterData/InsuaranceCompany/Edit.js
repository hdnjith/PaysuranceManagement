
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MessageModal from './../../UI/Modal/MessageModal';
import { CommonGet, CommonPost } from './../../../../src/utils/CommonFetch';
//import { CommonPost } from '../../utils/CommonFetch';
//import { GetUser } from "../../../utils/GetUser";
//import { Permission } from '../../../utils/Permission';
import DatePicker from 'react-datepicker';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";



const screenId = 100;


    export class InsuaranceCompanyEdit extends Component {

        displayName = InsuaranceCompanyEdit.name

    state = {
        insuranceCompanyId: "",
        insuranceCompanyName: "",
        adress: "",
        hotline: "",
        representiveName: "",
        representiveContact: "",
        paysuaranceContactPersonId: "",
        mouDocument: "",
        mouDocumentStartDate: moment(),
        mouDocumentExpiryDate: moment(),
      

        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,

        paysuaranceContactList: [
            { paysuaranceContactId: 1, name: "Mysore" },
            { paysuaranceContactId: 2, name: "Lucknow" }
        ],



        boxtypeData: {},

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

        var queryString = "insuranceCompanyId=" + id;
        CommonGet('InsuranceCompany/GetById', queryString)
            .then(data => {
                this.setState({
                    boxtypeData: data.data
                });
            })
            .then(() => {
           
                let newData = this.state.boxtypeData;
             //   var today = new Date();
                this.setState({

                    insuranceCompanyId: newData.insuranceCompanyId,
                    insuranceCompanyName: newData.insuranceCompanyName,
                    adress: newData.adress,
                    hotline: newData.hotline,
                    representiveName: newData.representiveName,
                    representiveContact: newData.representiveContact,
                    paysuaranceContactPersonId: newData.paysuaranceContactPersonId,
                    mouDocument: newData.mouDocument,
                    mouDocumentStartDate: moment(newData.mouDocumentStartDate),
                    mouDocumentExpiryDate: moment(newData.mouDocumentExpiryDate),
                
                    createdBy: newData.createdBy,
                    createdDate: newData.createdDate,
                    modifiedBy:"",
                    modifiedDate: "",

                    isActive: newData.isActive,

                })
            });
    }

    formValidations = () => {
        let isValid = true;

        //var inputVal = document.getElementById("categoryCode");
        //if (inputVal.validity.valueMissing) {

        //    isValid = false;
        //    document.getElementById("errcategoryCode").innerHTML = inputVal.validationMessage;
        //}

        //inputVal = document.getElementById("categoryValue");
        //if (inputVal.validity.valueMissing) {
        //    isValid = false;
        //    document.getElementById("errcategoryValue").innerHTML = inputVal.validationMessage;
        //}



        return isValid;
    }


    formSubmitHandler = (event) => {
        event.preventDefault();

        let isValid = this.formValidations();

        if (isValid) {
            var today = new Date();
            let formData = {

                insuranceCompanyId: this.state.insuranceCompanyId,
                insuranceCompanyName: this.state.insuranceCompanyName,
                adress: this.state.adress,
                hotline: this.state.hotline,
                representiveName: this.state.representiveName,
                representiveContact: this.state.representiveContact,
                paysuaranceContactPersonId: Number(this.state.paysuaranceContactPersonId),
                mouDocument: this.state.mouDocument,
                mouDocumentStartDate: this.state.mouDocumentStartDate,
                mouDocumentExpiryDate: this.state.mouDocumentExpiryDate,
          
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
            CommonPost('insuranceCompany/Update', null, formData)
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
            insuranceCompanyId: 0,
            insuranceCompanyName: "",
            adress: "",
            hotline: "",
            representiveName: "",
            representiveContact: "",
            paysuaranceContactPersonId: 0,
            mouDocument: "",
            mouDocumentStartDate: moment(),
            mouDocumentExpiryDate: moment(),
        
            createdBy: "",
            createdDate: 0,
            ModifiedBy: "",
            ModifiedDate: 0,
            isActive: true

        })
        document.getElementById("isActive").checked = false;
    }
  
        ////////

        renderDropDownpaysuaranceContactPerson(paysuaranceContactList) {
            let dropDown = paysuaranceContactList === undefined ? null : (
                paysuaranceContactList.map((data) => {
                    if (data.manufactureID === this.state.paysuaranceContactId) {
                        return (
                            <option value={data.paysuaranceContactId} selected> {data.name} </option>
                        );
                    }
                    else {
                        return (
                            <option value={data.paysuaranceContactId}> {data.name} </option>
                        );
                    }
                }));

            return (
                <select id="paysuaranceContactPersonId" name="paysuaranceContactPersonId" class="form-control mandatory" onChange={this.handleChange}>
                    <option value="-1"> Please Select </option>
                    {dropDown}
                </select>
            );

        }

      
        //////////
   
    render() {
        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}

     
        let PaysuaranceContactPersonList = this.renderDropDownpaysuaranceContactPerson(this.state.paysuaranceContactList);
   
        let form = (
            //<form onSubmit={this.formSubmitHandler} >

            //</form>
            <div>
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Insurance Company Name</label>
                                <input type="text"
                                    className="form-control mandatory"
                                    value={this.state.insuranceCompanyName}
                                    name="insuranceCompanyName"
                                    id="insuranceCompanyName"
                                    onChange={this.handleChange}
                                    required />

                                <span id="errinsuranceCompanyName" className="text text-danger"></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Adress</label>
                            <input type="text" className="form-control" value={this.state.adress} name="adress" id="adress" onChange={this.handleChange} />
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
                            <label>Hotline</label>
                            <input type="text" className="form-control" value={this.state.hotline} name="hotline" id="hotline" onChange={this.handleChange} />
                            <span id="errcontactHome" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Representive Name</label>
                            <input type="text" className="form-control" value={this.state.representiveName} name="representiveName" id="representiveName" onChange={this.handleChange} />
                            <span id="errcontactHome" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Representive Contact</label>
                            <input type="text" className="form-control" value={this.state.representiveContact} name="representiveContact" id="representiveContact" onChange={this.handleChange} />
                            <span id="errcontactHome" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Paysuarance Contact Person</label>
                            {PaysuaranceContactPersonList}
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
                            <label>MouDocument</label>
                            <input type="text" className="form-control" value={this.state.mouDocument} name="mouDocument" id="mouDocument" onChange={this.handleChange} />
                            <span id="errcontactHome" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>





                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>MouDocument Start Date</label>

                            <DatePicker
                                className="form-control date"
                                readOnly="true"
                                todayButton={"Today"}
                                showYearDropdown
                                showMonthDropdown
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.mouDocumentStartDate}
                                onChange={(date) => this.setState({ mouDocumentStartDate: date })}
                            />


                            <span id="errmouDocumentStartDate" className="text text-danger"></span>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>MouDocument Expiry Date </label>

                            <DatePicker
                                className="form-control date"
                                readOnly="true"
                                todayButton={"Today"}
                                showYearDropdown
                                showMonthDropdown
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.mouDocumentExpiryDate}
                                onChange={(date) => this.setState({ mouDocumentExpiryDate: date })}
                            />


                            <span id="errmouDocumentExpiryDate" className="text text-danger"></span>
                        </div>

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
                                        <h5 className="title">Hospital</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">

                                        <Link className="btn btn-info pull-right" to="/insuaranceCompany/index"><i className="fas fa-arrow-left"></i> All Companies</Link>

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