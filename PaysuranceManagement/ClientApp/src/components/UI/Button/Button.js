import React from 'react';
import classes from './Button.css'

const button = (props) => (
    <div className="row">
        <div className="col-md-12 pr-1">
            <div className="form-group">
                <button
                    disabled={props.disabled}
                    className={props.btnClass}
                    onClick={props.clicked}>{props.children}</button>
            </div>
        </div>
    </div>

);

export default button;