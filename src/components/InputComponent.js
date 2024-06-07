import React from 'react';

import './InputComponent.css';
const InputComponent = (props) => {
    const inputType = props.type || 'text';
    const value = props.value || '';



    return (
        <div className={`${props.className} inputComponent `}>
            <label className={"defaultLabel"} htmlFor={props.id}>{props.label}</label>
            <input className={"defaultInput"} type={inputType} id={props.id} name={props.name} required={props.required} placeholder={props.placeholder} onChange={props.onChange} value={value}/>
            {
                props.valid ? null : <div className={"errorMessage"}>{props.error}</div>
            }
        </div>
    );
};

export default InputComponent;