import React, { Component } from 'react';
//class MessageModal extends Component {
//    render() {
//        return (
//            <div class={this.props.modalClass}>
//                <button type="button" aria-hidden="true" class="close">
//                    <i class="now-ui-icons ui-1_simple-remove"></i>
//                </button>
//                <span>
//                    <b> {this.props.messageType} - </b> {this.props.messageDescription}</span>
//            </div>
//            );
//    }
//}

const messageModal = (props) => {
    let modalClass = null;
    switch (props.messageType) {
        case ('Info'):
            modalClass = "alert alert-info"
            break;
        case ('Success'):
            modalClass = "alert alert-success"
            break;
        case ('Warning'):
            modalClass = "alert alert-warning"
            break;
        case ('Error'):
            modalClass = "alert alert-danger"
            break;
        default:
            modalClass = "alert alert-info"
    }
    return (
        <div className={modalClass} hidden={props.hidden}>
            <button type="button" aria-hidden="true" className="close">
                <i className="now-ui-icons ui-1_simple-remove" onClick={props.clicked}></i>
            </button>
            <span>
                <b> {props.messageType} - </b> {props.messageDescription}</span>
        </div>
    );
}
//export default MessageModal;
export default messageModal;
