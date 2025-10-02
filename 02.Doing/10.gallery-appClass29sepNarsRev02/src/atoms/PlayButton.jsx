import PropTypes from "prop-types";

export default function PlayButton({onClick,
  isPlaying = false,
  disabled= false,
  size='md'}){
    return(<button
    type="button" className=""
    onClick={onClick} disabled = {disabled}>
      <span className = "btn-icon">{isPlaying? '⏸':'⏯'}</span>
      </button>);
}

PlayButton.propTypes = {
  onClick:PropTypes.func.isRequired,
  isPlaying:PropTypes.bool,
  disabled:PropTypes.bool,
  size:PropTypes.string
}