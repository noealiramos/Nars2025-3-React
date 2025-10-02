import PropTypes from "prop-types";

export default function DeleteButton(onClick,
  disabbled,size, children){
  return(<button type="button"
    onClick={onClick} disabled= {disabbled}
    className={`btn btn--delete btn--${size}`}>
      {children || (<span className="btn-icon">🗑</span>)}
      </button>);
      /* .btn--sm .btn--md .btn--*/
}

DeleteButton.protoTypes = {
  onClick: PropTypes.func.isRequired,
  disabbled:PropTypes.bool,
  size:PropTypes.string,
  children: PropTypes.node

}

DeleteButton.defaultProps = {
  disabled: false,
  size: 'md',
  children: null
}