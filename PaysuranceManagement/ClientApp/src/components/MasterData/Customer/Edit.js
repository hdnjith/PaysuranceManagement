
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


    export class CustomerEdit extends Component {

        displayName = CustomerEdit.name

    state = {

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




        boxtypeData: {},
        insuaranceCompanyList: [],
        productList: [],
        // insuranceCompanyId: "",
     
        customerTypeList: [
            { CustomerTypeId: "Retail", name: "Retail Customer" },
            { CustomerTypeId: "Corparate", name: "Corparate Customer" }
        ],

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

        var queryString = "customerId=" + id;
      
        CommonGet('Customer/GetById', queryString)
            .then(data => {
                this.setState({
                    boxtypeData: data.data
                });
            })
            .then(() => {
             
                let newData = this.state.boxtypeData;
             //   var today = new Date();
   
                this.setState({
                    customerId: newData.customerId,
                    customerName: newData.customerName,
                    customerType: newData.customerType, 
                    identificationNo: newData.identificationNo,
                    adress: newData.adress,
                    contact: newData.contact,
                    email: newData.email,
                    emergencyContactName: newData.emergencyContactName,
                    emergencyContactNumber: newData.emergencyContactNumber,
                    insuranceCompanyId: newData.insuranceCompanyId,
                    productId: newData.productId,
                    customerSheet: newData.customerSheet,
                   

                    createdBy: 1,
                    createdDate: moment(newData.createdDate),
                    //createdDate: today.toDateString(),
                    modifiedBy: null,
                    modifiedDate: null,
                    isActive: newData.isActive

                })
            });



            CommonGet('product/GetAll', 'activeStatusEnum=1')
                //  CommonPost('Beta/SaveBeta', null, formData)
                .then(data => {

                    this.setState({
                        productList: data.data,
                        loading: false,
                    });
                })
                .then(() => {

                });

            CommonGet('insuranceCompany/GetAll', 'activeStatusEnum=1')
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
        
                customerId: this.state.customerId,
                customerName: this.state.customerName,
                customerType: this.state.customerType,
                identificationNo: this.state.identificationNo,
                adress: this.state.adress,
                contact: this.state.contact,
                email: this.state.email,
                emergencyContactName: this.state.emergencyContactName,
                emergencyContactNumber: this.state.emergencyContactNumber,
                insuranceCompanyId: Number(this.state.productId),
                productId: Number(this.state.productId),
                customerSheet: this.state.customerSheet,

                createdBy: 1,
                createdDate: moment(this.state.createdDate),
                //createdDate: today.toDateString(),
                modifiedBy: 1,
                modifiedDate: moment(),
                isActive: this.state.isActive
            }

            this.setState({
                loading: true
            });

            //CommonPost('/api/Boxtype/UpdateBoxtype', null, formData)
            CommonPost('Customer/Update', null, formData)
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

            customerId: 0,
            customerName: "",
            customerType: "",
            identificationNo:"",
            adress: "",
            contact: "",
            email: "",
            emergencyContactName: "",
            emergencyContactNumber: "",
            insuranceCompanyId: 0,
            productId: 0,
            customerSheet: "",

            createdBy: "",
            createdDate: 0,
            ModifiedBy: "",
            ModifiedDate: 0,
            isActive: true

        })
        document.getElementById("isActive").checked = false;
    }
  
        ////////

        //////////
        renderDropDowncustomerType(customerTypeList) {

          
            let dropDown = customerTypeList === undefined ? null : (
                customerTypeList.map((data) => {
                
                    if (data.CustomerTypeId === this.state.customerType) {
                        return (
                            <option value={data.CustomerTypeId} selected> {data.name} </option>
                        );
                    }
                    else {
                        return (
                            <option value={data.CustomerTypeId}> {data.name} </option>
                        );
                    }

                }));

            return (
                <select id="customerType" name="customerType" class="form-control mandatory" onChange={this.handleChange} >
                    <option value="-1"> Please Select </option>
                    {dropDown}
                </select>
            );
        }

        renderDropDowninsuaranceCompany(insuaranceCompanyList) {

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
                <select id="insuranceCompanyId" name="insuranceCompanyId" class="form-control mandatory" onChange={this.handleChange} >
                    <option value="-1"> Please Select </option>
                    {dropDown}
                </select>
            );

        }
        renderDropDownproduct(productList) {

            let dropDown = productList === undefined ? null : (
                productList.map((data) => {

                  
                    if (data.insuranceCompanyId === this.state.insuranceCompanyId) {
                        return (
                            <option value={data.productId} selected> {data.productName} </option>
                        );
                    }
                    else {
                        return (
                            <option value={data.productId}> {data.productName} </option>
                        );

                    }
                }));

            return (
                <select id="productId" name="productId" class="form-control mandatory" onChange={this.handleChange} >
                    <option value="-1"> Please Select </option>
                    {dropDown}
                </select>
            );

        }
   
    render() {
        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}
        let customerTypeList = this.renderDropDowncustomerType(this.state.customerTypeList);
        let insuaranceCompanyList = this.renderDropDowninsuaranceCompany(this.state.insuaranceCompanyList);
        let productList = this.renderDropDownproduct(this.state.productList);
        let form = (
            //<form onSubmit={this.formSubmitHandler} >

            //</form>
            <div>
            

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Customer Name</label>
                            <input type="text"
                                className="form-control mandatory"
                                value={this.state.customerName}
                                name="customerName"
                                id="insuranceCompanyName"
                                onChange={this.handleChange}
                                required />
                            <span id="errinsuranceCompanyName" className="text text-danger"></span>

                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Customer Type</label>
                            {customerTypeList}
                            <span id="errcustomerType" className="text text-danger"></span>

                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Identification No</label>
                            <input type="text" className="form-control" value={this.state.identificationNo} name="identificationNo" id="identificationNo" onChange={this.handleChange} />
                            <span id="erridentificationNo" className="text text-danger"></span>
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
                            <span id="erradress" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" className="form-control" value={this.state.contact} name="contact" id="contact" onChange={this.handleChange} />
                            <span id="errcontact" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" value={this.state.email} name="email" id="email" onChange={this.handleChange} />
                            <span id="erremail" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Emergency Contact Name</label>
                            <input type="text" className="form-control" value={this.state.emergencyContactName} name="emergencyContactName" id="emergencyContactName" onChange={this.handleChange} />
                            <span id="erremergencyContactName" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Emergency Contact Number</label>
                            <input type="text" className="form-control" value={this.state.emergencyContactNumber} name="emergencyContactNumber" id="emergencyContactNumber" onChange={this.handleChange} />
                            <span id="erremergencyContactNumber" className="text text-danger"></span>
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
                            <label>Product</label>
                            {productList}
                            <span id="errinsuranceCompanyId" className="text text-danger"></span>

                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="">
                            <label>Customer Sheet</label>
                            <input type="file" onChange={this.fileChange} name="customerSheet" id="customerSheet" />
                            <span id="errcustomerSheet" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="">&nbsp;</div>
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
                                        <h5 className="title">Customer</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">

                                        <Link className="btn btn-info pull-right" to="/customer/index"><i className="fas fa-arrow-left"></i> All Customer</Link>

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