import React from 'react';
import './ComboboxComponent.css'; // Make sure to import the CSS file

const ComboboxComponent = (props) => {
    const {options, onChange, label} = props;

    return (
        <div className="comboboxComponent">
            {label && <label className="comboboxLabel">{label}</label>}
            <select className="comboboxSelect" onChange={onChange}>
                {options && options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ComboboxComponent;
