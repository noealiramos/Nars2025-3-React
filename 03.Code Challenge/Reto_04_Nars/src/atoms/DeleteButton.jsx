import PropTypes from 'prop-types';

export default function DeleteButton({onClick, disabled=false}){
  return (
    <button className={`btn btn-danger ${disabled ? 'is-disabled':''}`} onClick={onClick} disabled={disabled}>
      Delete
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
