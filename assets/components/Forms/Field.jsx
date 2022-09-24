import React from 'react'

const Field = ({ name, label, value, onChange, type = "text", error = "", placeholder, togglePassword }) => {
    return (
        <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                forhtml={name}>{label}</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                type={type}
                placeholder={placeholder || label}
                value={value}
                onChange={onChange}
                name={name} />                
        </div>
    );
}

export default Field;