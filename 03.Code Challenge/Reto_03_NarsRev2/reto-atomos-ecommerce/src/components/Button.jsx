
import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

export default function Button({ children, onClick, disabled = false, variant = "primary", type = "button" }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "error", "warning"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};
