import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MessageModal from './../../UI/Modal/MessageModal';
import { CommonPost, CommonGet } from './../../../../src/utils/CommonFetch';

//import { CommonPost } from '../../utils/CommonFetch';
//import { GetUser } from "../../../utils/GetUser";
//import { Permission } from '../../../utils/Permission';
import DatePicker from 'react-datepicker';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
const screenId = 100;

//class Claim extends Component {
export class Customer extends Component {
    displayName = Customer.name

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
       
        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,
        insuaranceCompanyList:[],
        productList:[],
        // insuranceCompanyId: "",
       // insuaranceCompanyList: [],
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
        redirect: false,
    };

    componentWillMount() {
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
        CommonGet('Product/GetAll', 'activeStatusEnum=1')
            //  CommonPost('Beta/SaveBeta', null, formData)
            .then(data => {

                this.setState({
                    productList: data.data,
                    loading: false,
                });
            })
            .then(() => {

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
                createdDate: moment(),
                //createdDate: today.toDateString(),
                modifiedBy: null,
                modifiedDate: null,
                isActive: this.state.isActive

              


            }
            this.setState({
                loading: true
            });

            formData["customerId"] = 0;

            CommonPost('Customer/Create', null, formData)
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

            createdBy: "",
            createdDate: 0,
            ModifiedBy: "",
            ModifiedDate: 0,
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
    }

    renderDropDowncustomerType(customerTypeList) {
        console.log(JSON.stringify(customerTypeList));
        let dropDown = customerTypeList === undefined ? null : (
            customerTypeList.map((data) => {
               
                return (
                    <option value={data.CustomerTypeId}> {data.name} </option>
                );

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

                return (
                    <option value={data.insuranceCompanyId}> {data.insuranceCompanyName} </option>
                );

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

                return (
                    <option value={data.productId}> {data.productName} </option>
                );

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
     
        let CustomerTypeList = this.renderDropDowncustomerType(this.state.customerTypeList);
        let insuaranceCompanyList = this.renderDropDowninsuaranceCompany(this.state.insuaranceCompanyList);
        let productList = this.renderDropDownproduct(this.state.productList);
        let form = (
            //<form onSubmit={this.formSubmitHandler} >

            //</form>
            <div>
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Customer Name</label>
                                <input type="text"
                                    className="form-control mandatory"
                                    value={this.state.customerName}
                                    name="customerName"
                                    id="customerName"
                                    onChange={this.handleChange}
                                    required />

                                <span id="errcustomerName" className="text text-danger"></span>
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
                            <label>Customer Type</label>
                            {CustomerTypeList}
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

                <div className="row row-top-gap" hidden="true" >
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
                                <div className="col-md-6">
                                    <div className="card-header">
                                        <h5 className="title">Customer</h5>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">

                                        <Link className="btn btn-info pull-right" to="/customer/index"><i className="fas fa-arrow-left"></i> All Customers</Link>
                                        &nbsp;&nbsp;
                                        
                                      
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
//<Link className="btn btn-info pull-right" to="/customerbulk/create"><i className="fas fa-upload"></i> Upload</Link>