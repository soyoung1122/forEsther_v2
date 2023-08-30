import Button from "../button/Button";

const ModalHeader = ({children}) => {

    return (
        <div className="modal-header">
            {children}
            <Button buttonClass={"btn-close"} dataBsDismiss={"modal"} aria-label={"Close"} />
        </div>
    );

}


export default ModalHeader;