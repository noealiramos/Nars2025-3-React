import PropTypes from "prop-types";


export default function ConfirmDialog({
    title, 
    message, 
    confirmText, 
    cancelText,
    onConfirm, 
    onCancel, 
    isOpen,
    type="danger",
}){

    if(!isOpen) return null; //se controla con stilos = css

    return (
        <div className ="confirm-dialog-overlay">
            <div className={`confirm-dialog confirm-dialog--${type}`}>
                <div className="confirm-dialog__header">
                    <div className ="confirm-dialog__icon">
                        {type === "danger" && "🚨"}
                        {type === "info" && "🚨"}
                        {type === "warning" && "🚨"}
                    </div>
                    <h3 className="confirm-dialog__title">{title}</h3>
                </div>            
                <div className="confirm-dialog__body">
                    <p className="confirm-dialog__message">{message}</p>
                </div>
                <div className="confirm-dialog__footer">
                    <button onClick={()=>onConfirm()}>{confirmText}
                    </button>
                    <button onClick={()=>onCancel()}>{cancelText}
                    </button>
                </div>
            </div>            
        </div>
    );
}
//<button>{confirmText || 'ok'}</button>

ConfirmDialog.propTypes={
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    
    onConfirm:PropTypes.func.isRequired,
    onCancel:PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(["danger","warning","info"]),
};