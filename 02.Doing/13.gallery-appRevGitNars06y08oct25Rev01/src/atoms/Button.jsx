import PropTypes from "prop-types";
import { BUTTON_SIZES } from "../utils/constants";
import "./Button.css";

export default function Button({
  children,
  onClick,
  disabled = false,
  size = BUTTON_SIZES.MEDIUM,
  variant = "default",
  type = "button",
  className = "",
  ariaLabel,
}) {
  const baseClass = "btn";
  const sizeClass = `btn--${size}`;
  const variantClass = variant !== "default" ? `btn--${variant}` : "";
  const disabledClass = disabled ? "btn--disabled" : "";

  const buttonClass = [
    baseClass,
    sizeClass,
    variantClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE,
  ]),
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "danger",
    "success",
    "warning",
    "info",
    "ghost",
    "edit",
    "delete",
    "view",
    "play",
    "tag",
  ]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};
