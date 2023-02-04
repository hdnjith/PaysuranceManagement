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
import axios from "axios";
const screenId = 100;

//class Claim extends Component {
export class CustomerBulkUpload extends Component {
    displayName = CustomerBulkUpload.name

    state = {

   
        customerId: "",
        customerName: "",
        customerType: "",
        identificationNo: "",
        adress: "",
        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,
        file: "",
        fileName: "",
     

        loading: false,
        isRecordsHidden: false,

        messageModal: {
            messageType: '',
            messageDescription: '',
            isModalHidden: true
        },
        action: '',
        pageLoad: false,
        uploadProgress: true,
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
                   

                })
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
            console.log(this.state.file);
            console.log(this.state.fileName);
            let formDataFile = {
                FormFile: this.state.file,
                FileName: this.state.fileName
            }
            const formData = new FormData();
            formData.append("formFile", this.state.file);
            formData.append("fileName", this.state.fileName);
            formData.append("createdBy",1);
            formData.append("isActive",true);
            formData.append("ChannelId","CUSBULK");
            formData.append("customerId", this.state.customerId);
            try {
                const res = axios.post("https://localhost:44326/CustomerBulkUpload/UploadFile", formData);
                console.log(res);
            } catch (ex) {
                console.log(ex);
            }
        }


        if (true) {
            this.setState({
                loading: true,
                uploadProgress: false,
            });
            //////////////////////rrrrrrrrrrrrrrrrrrrr
            setTimeout(() => {

                var myStr = this.state.fileName; // space at both end
              
                const prettySentence = myStr
                    .split(' ') // ["One", "", "Two", "", "", "Three", "Four", "", "", ""]
                    .filter(word => word) // ["One", "Two", "Three", "Four"]
                    .join('');
                console.log(prettySentence);

                var queryString = "status=S" + "&fileName=" + myStr;

                CommonGet('FileUploadHandler/GetUploadResponse', queryString)
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
                            uploadProgress: true,
                        })
                    })
            }
                , 10000);
          

            //////////////////////rrrrrrrrrrrrrrrrrrrrr
         

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
    fileChange = (e) => {
        console.log(e.target.files[0]);
        this.setState({ file: e.target.files[0] });
        this.setState({ fileName: e.target.files[0].name });
    }
  
    render() {
        //if (this.state.redirect) {
        //    return <Redirect to='/unauthorized' />
        //}
     

        let form = (
            //<form onSubmit={this.formSubmitHandler} >

            //</form>
            <div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="text">
                            <label>{this.state.customerName} {this.state.identificationNo} </label>
                            
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="text">
                            <label></label>

                        </div>
                    </div>
                </div>


                <div className="row row-top-gap">
                    <div className="col-md-2">
                        <div className="">
                            <label>Customer Sheet</label>
                           
                        </div>
                    </div>
                    <div className="col-md-10 pl-1">
                        <div className=""> <input type="file" onChange={this.fileChange} name="customerSheet" id="customerSheet" />
                            <span id="errcustomerSheet" className="text text-danger"></span></div>

                        <div hidden={this.state.uploadProgress} >
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
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

                                        <Link className="btn btn-info pull-right" to="/customer/index"><i className="fas fa-arrow-left"></i> All Customers</Link>

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