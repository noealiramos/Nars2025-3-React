import PropTypes from 'prop-types';
import { BUTTON_SIZES } from "../utils/constants";
import Button from "./Button";

export default function DeleteButton({
  onClick,
  disabled = false,
  size = BUTTON_SIZES.MEDIUM,
  children,
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant="delete"
      ariaLabel="Delete item"
    >
      {children || <span className="btn-icon">🗑️</span>}
    </Button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([
    BUTTON_SIZES.SMALL,
    BUTTON_SIZES.MEDIUM,
    BUTTON_SIZES.LARGE,
  ]),
  children: PropTypes.node,
};
