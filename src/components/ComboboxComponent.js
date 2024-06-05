import React from 'react';
import './ComboboxComponent.css'; // Make sure to import the CSS file

const ComboboxComponent = (props) => {
    const {options, onSelect, label} = props;

    return (
        <div className="comboboxComponent">
            {label && <label className="comboboxLabel">{label}</label>}
            <select className="comboboxSelect" onChange={(e) => onSelect(e.target.value)}>
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
