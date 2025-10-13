import React from "react";
import "./Input.css";
import PropTypes from "prop-types";

export default function Input({ label, type = "text", value, onChange, placeholder, name, id }) {
  const inputId = id || name || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="input-group">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};
