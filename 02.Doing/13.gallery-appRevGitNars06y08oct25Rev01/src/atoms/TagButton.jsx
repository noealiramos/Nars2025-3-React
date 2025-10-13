import PropTypes from 'prop-types';
import { BUTTON_SIZES } from "../utils/constants";
import Button from "./Button";

export default function TagButton({ label, onClick, active = false, size = BUTTON_SIZES.SMALL }) {
  const className = active ? "active" : "";

  return (
    <Button
      onClick={onClick}
      size={size}
      variant="tag"
      className={className}
      ariaLabel={`Tag: ${label}`}
    >
      <span className="tag-hash">#</span>
      <span className="tag-text">{label}</span>
    </Button>
  );
}

TagButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  size: PropTypes.oneOf([BUTTON_SIZES.SMALL, BUTTON_SIZES.MEDIUM, BUTTON_SIZES.LARGE])
};
