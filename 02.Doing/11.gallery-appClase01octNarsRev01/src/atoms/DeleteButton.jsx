import PropTypes from 'prop-types';
import { BUTTON_SIZES } from "../utils/constants";
import "./Button.css";

export default function DeleteButton({ onClick, disabled = false, size = BUTTON_SIZES.MEDIUM, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--delete btn--${size}`}
      aria-label="Delete item"
    >
      {children || (
        <span className="btn-icon">🗑️</span>
      )}
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([BUTTON_SIZES.SMALL, BUTTON_SIZES.MEDIUM, BUTTON_SIZES.LARGE]),
  children: PropTypes.node
};

DeleteButton.defaultProps = {
  disabled: false,
  size: BUTTON_SIZES.MEDIUM,
  children: null
};
