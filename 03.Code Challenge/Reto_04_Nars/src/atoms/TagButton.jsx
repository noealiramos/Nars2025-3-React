import PropTypes from 'prop-types';

export default function TagButton({label, onClick}){
  return (
    <button className="btn btn-tag" onClick={onClick}>{label}</button>
  );
}

TagButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
