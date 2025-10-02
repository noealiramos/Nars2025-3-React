import PropTypes from 'prop-types';
import { BUTTON_SIZES } from "../utils/constants";
import "./Button.css";

export default function TagButton({ label, onClick, active = false, size = BUTTON_SIZES.SMALL }) {
  return (
    <button
      className={`btn btn--tag btn--${size} ${active ? 'active' : ''}`}
      onClick={onClick}
      type="button"
      aria-label={`Tag: ${label}`}
    >
      <span className="tag-hash">#</span>
      <span className="tag-text">{label}</span>
    </button>
  );
}

TagButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  size: PropTypes.oneOf([BUTTON_SIZES.SMALL, BUTTON_SIZES.MEDIUM, BUTTON_SIZES.LARGE])
};
