import React from "react";
import "./Badge.css";
import PropTypes from "prop-types";

export default function Badge({ text, variant = "success" }) {
  return <span className={`badge badge-${variant}`}>{text}</span>;
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "error", "warning", "info", "neutral"]),
};
