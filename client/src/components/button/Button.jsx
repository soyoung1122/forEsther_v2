import propTypes from 'prop-types';

const Button = ({buttonClass, buttonId, buttonName, onClick, dataBsToggle, dataBsTarget, dataBsDismiss, ariaLabel}) => {

    return(
        <button 
            type="button" 
            className={`btn ${buttonClass}`}
            id={buttonId} 
            data-bs-toggle={dataBsToggle} 
            data-bs-target={dataBsTarget} 
            data-bs-dismiss={dataBsDismiss} 
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {buttonName}
        </button>
    );

}


Button.propTypes = {
    buttonClass: propTypes.string,
    buttonId: propTypes.string,
    buttonName: propTypes.string,
    onClick: propTypes.func,
    dataBsToggle: propTypes.string,
    dataBsTarget: propTypes.string,
    dataBsDismiss: propTypes.string,
    ariaLabel: propTypes.string,
}

Button.defaultProps = {
    buttonClass: "btn-primary",
    buttonId: "",
    buttonName: "",
    onClick: () => {},
    dataBsToggle: "",
    dataBsTarget: "",
    dataBsDismiss: "",
    ariaLabel: "",
}

export default Button;