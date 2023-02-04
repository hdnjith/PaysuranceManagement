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
export class Ailment extends Component {
    displayName = Ailment.name

    state = {

        ailmentId: "",
        ailmentName: "",
        ailmentDescription: "",
        createdBy: "",
        createdDate: Date.now,
        modifiedBy: "",
        modifiedDate: Date.now,
        isActive: true,
        // insuranceCompanyId: "",
       // insuaranceCompanyList: [],
     


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

                ailmentId: this.state.ailmentId,
                ailmentName: this.state.ailmentName,
                ailmentDescription: this.state.ailmentDescription,
                createdBy: 1,
                createdDate:  moment(),
                //createdDate: today.toDateString(),
                modifiedBy: null,
                modifiedDate: null,
                isActive: this.state.isActive


              
              


            }
            this.setState({
                loading: true
            });

            formData["ailmentId"] = 0;

            CommonPost('Ailment/Create', null, formData)
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
        
            ailmentId: 0,
            ailmentName: "",
            ailmentDescription:"",
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
                        <div className="form-group">
                            <label>Aliment Name</label>
                            <input type="text" className="form-control" value={this.state.ailmentName} name="ailmentName" id="ailmentName" onChange={this.handleChange} />
                            <span id="errailmentName" className="text text-danger"></span>
                        </div>
                    </div>
                    <div className="col-md-6 pl-1">
                        <div className="form-group">&nbsp;</div>
                    </div>
                </div>

                <div className="row row-top-gap">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Aliment description</label>
                            <input type="text" className="form-control" value={this.state.ailmentDescription} name="ailmentDescription" id="ailmentDescription" onChange={this.handleChange} />
                            <span id="errailmentDescription" className="text text-danger"></span>
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
                                        <h5 className="title">Ailment</h5>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">

                                        <Link className="btn btn-info pull-right" to="/ailment/index"><i className="fas fa-arrow-left"></i> All Aliments</Link>

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