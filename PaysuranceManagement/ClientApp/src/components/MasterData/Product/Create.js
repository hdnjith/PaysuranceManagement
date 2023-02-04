import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MessageModal from './../../UI/Modal/MessageModal';
import { CommonPost } from './../../../../src/utils/CommonFetch';
//import { CommonPost } from '../../utils/CommonFetch';
//import { GetUser } from "../../../utils/GetUser";
//import { Permission } from '../../../utils/Permission';
import DatePicker from 'react-datepicker';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
const screenId = 100;

//class Claim extends Component {
export class Product extends Component {
    displayName = Product.name

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
        // insuranceCompanyId: "",
       // insuaranceCompanyList: [],
        productTypeList: [
            { productTypeId: "Retail", name: "Retail" },
            { productTypeId: "Coperate", name: "Coperate" }
        ],
        insuaranceCompanyList: [
            { insuranceCompanyId: 1, name: "A" },
            { insuranceCompanyId: 2, name: "B" }
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

   
        //this.setState({
           
        //   // dateOfAdmission: moment(),
        //});
      
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
          
                productId: this.state.productId,
                productType: this.state.productType,
                productName: this.state.productName,
                productDescription: this.state.productDescription,
                insuranceCompanyId: Number(this.state.insuranceCompanyId),
                policyNo: this.state.policyNo,
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

            formData["productId"] = 0;

            CommonPost('Product/Create', null, formData)
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
            productId: 0,
            productType: 0,
            productName:"",
            productDescription: "",
            insuranceCompanyId: 0,
            policyNo: "",
          

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


    renderDropDowninsuaranceCompany(insuaranceCompanyList) {
     //   console.log(JSON.stringify(paysuaranceContactList));
        let dropDown = insuaranceCompanyList === undefined ? null : (
            insuaranceCompanyList.map((data) => {

                return (
                    <option value={data.insuranceCompanyId}> {data.name} </option>
                );

            }));

        return (
            <select id="insuranceCompanyId" name="insuranceCompanyId" class="form-control mandatory" onChange={this.handleChange} >
                <option value="0"> Please Select </option>
                {dropDown}
            </select>
        );

    }

    renderDropDownproductType(productTypeList) {
      //  console.log(JSON.stringify(productTypeList));
        let dropDown = productTypeList === undefined ? null : (
            productTypeList.map((data) => {

                return (
                    <option value={data.productTypeId}> {data.name} </option>
                );

            }));

        return (
            <select id="productType" name="productType" class="form-control mandatory" onChange={this.handleChange} >
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
        let productTypeList = this.renderDropDownproductType(this.state.productTypeList);
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
                                        <h5 className="title">Policy</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">

                                        <Link className="btn btn-info pull-right" to="/policy/index"><i className="fas fa-arrow-left"></i> All Products</Link>

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