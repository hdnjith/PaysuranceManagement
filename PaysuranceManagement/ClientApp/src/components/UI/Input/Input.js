import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    let elementLabel = null;
    const inputClasses = ["form-control"];
    const outputDivClasses = ["col-md-10 pr-1"];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
    }

    if (props.shouldValidate.required) {
        inputClasses.push("mandatory");
    }

    if (props.elementConfig.hidden) {
        outputDivClasses.push("Hidden");
    }
    switch (props.elementType) {
        case ('input'):
            elementLabel = <label>{props.label}</label>
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            elementLabel = <label>{props.label}</label>
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            elementLabel = <label>{props.label}</label>
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('check'):
            inputElement = <div className="form-check">
                <label className="form-check-label">
                    <input
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed} />
                    <span className="form-check-sign">{props.label}</span>
                </label>
            </div>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className="row">
            <div className={outputDivClasses.join(' ')} >
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-3"> {elementLabel} </div>
                        <div className="col-md-7"> {inputElement} </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-3"> </div>
                        <p className="col-md-7 ErrorMsg"> {props.message} </p>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default input;