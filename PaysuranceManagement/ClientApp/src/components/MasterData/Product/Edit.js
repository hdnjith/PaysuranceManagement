
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


    export class ProductEdit extends Component {

        displayName = ProductEdit.name

    state = {
        productId: "",
        productType: "",
        productName: "",
        productDescription: "",
        insuranceCompanyId: "",
        policyNo: "",

        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,

        productTypeList: [
            { productTypeId: "Retail", name: "Retail" },
            { productTypeId: "Coperate", name: "Coperate" }
        ],
        insuaranceCompanyList: [
            { insuranceCompanyId: 1, name: "A" },
            { insuranceCompanyId: 2, name: "B" }
        ],



        productData: {},

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

        var queryString = "productId=" + id;
        alert(id);
        CommonGet('Product/GetById', queryString)
            .then(data => {
                this.setState({
                    productData: data.data
                });
            })
            .then(() => {
             //   alert(JSON.stringify(this.state.productData));
                let newData = this.state.productData;
             //   var today = new Date();
                this.setState({

                    productId: newData.productId,
                    productType: newData.productType,
                    productName: newData.productName,
                    productDescription: newData.productDescription,
                    insuranceCompanyId: newData.insuranceCompanyId,
                    policyNo: newData.policyNo,
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

                productId: this.state.productId,
                productType: this.state.productType,
                productName: this.state.productName,
                productDescription: this.state.productDescription,
                insuranceCompanyId: this.state.insuranceCompanyId,
                policyNo: this.state.policyNo,

                productId: Number(this.state.productId),
                productType: this.state.productType,
                productName: this.state.productName,
                productDescription: this.state.productDescription,
                insuranceCompanyId: Number(this.state.insuranceCompanyId),
                policyNo: this.state.policyNo,
               
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
            CommonPost('Product/Update', null, formData)
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
            productId: 0,
            productType: "0",
            productName: "",
            productDescription: "",
            insuranceCompanyId: 0,
            policyNo: "",


            createdBy: "",
            createdDate: 0,
            ModifiedBy: "",
            ModifiedDate: 0,
            isActive: true

        })
        document.getElementById("isActive").checked = false;
    }
  
        ////////

        renderDropDownproductType(productTypeList) {
            let dropDown = productTypeList === undefined ? null : (
                productTypeList.map((data) => {
                    if (data.productType === this.state.productType) {
                        return (
                            <option value={data.productType} selected> {data.name} </option>
                        );
                    }
                    else {
                        return (
                            <option value={data.productType}> {data.name} </option>
                        );
                    }
                }));

            return (
                <select id="productType" name="productType" class="form-control mandatory" onChange={this.handleChange}>
                    <option value="-1"> Please Select </option>
                    {dropDown}
                </select>
            );

        }

        renderDropDowninsuaranceCompanyList(insuaranceCompanyList) {
            let dropDown = insuaranceCompanyList === undefined ? null : (
                insuaranceCompanyList.map((data) => {
                    if (data.insuranceCompanyId === this.state.insuranceCompanyId) {
                        return (
                            <option value={data.insuranceCompanyId} selected> {data.name} </option>
                        );
                    }
                    else {
                        return (
                            <option value={data.insuranceCompanyId}> {data.name} </option>
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
   
    render() {
        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}

     
        let productTypeList = this.renderDropDownproductType(this.state.productTypeList);
        let insuaranceCompanyList = this.renderDropDowninsuaranceCompanyList(this.state.insuaranceCompanyList);
        let form = (
            //<form onSubmit={this.formSubmitHandler} >

            //</form>
            <div>
                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>product Type</label>
                            {productTypeList}
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
                            <label>Product Name</label>
                            <input type="text" className="form-control" value={this.state.productName} name="productName" id="productName" onChange={this.handleChange} />
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
                            <label>product Description</label>
                            <input type="text" className="form-control" value={this.state.productDescription} name="productDescription" id="productDescription" onChange={this.handleChange} />
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
                            <input type="text" className="form-control" value={this.state.policyNo} name="policyNo" id="policyNo" onChange={this.handleChange} />
                            <span id="errcontactHome" className="text text-danger"></span>
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
                                        <h5 className="title">Product</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">

                                        <Link className="btn btn-info pull-right" to="/product/index"><i className="fas fa-arrow-left"></i> All Product</Link>

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