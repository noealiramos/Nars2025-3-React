import PropTypes from 'prop-types';
import { BUTTON_SIZES } from "../utils/constants";
import Button from "./Button";

export default function PlayButton({ onClick, isPlaying = false, disabled = false, size = BUTTON_SIZES.MEDIUM }) {
  const className = isPlaying ? "playing" : "";
  const ariaLabel = isPlaying ? "Pause" : "Play";

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant="play"
      className={className}
      ariaLabel={ariaLabel}
    >
      <span className="btn-icon">{isPlaying ? "⏸️" : "▶️"}</span>
    </Button>
  );
}

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf([BUTTON_SIZES.SMALL, BUTTON_SIZES.MEDIUM, BUTTON_SIZES.LARGE])
};
