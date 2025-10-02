import PropTypes from "prop-types";

export default function TagButton({label, 
  onClick,
  active=false, size = 'md'}){
  return( <button type="button"
    onClick={onClick}
    >
    <span>#</span>
    <span>{label}</span>
     
    </button>);   
}

TagButton.protoTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  size:PropTypes.string
}