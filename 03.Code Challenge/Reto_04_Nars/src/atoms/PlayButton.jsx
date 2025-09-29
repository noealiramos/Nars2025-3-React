import PropTypes from 'prop-types';

export default function PlayButton({onClick, isPlaying=false}){
  return (
    <button className={`btn btn-play ${isPlaying ? 'active':''}`} onClick={onClick}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
}

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool
};
