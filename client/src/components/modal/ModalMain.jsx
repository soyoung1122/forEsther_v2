import Button from "../button/Button";

const ModalMain = ({show, modalClass, children}) => {

    return(
        <div className={`modal fade ${show ? 'show' : ''}`} id="basicModal" tabIndex="-1" aria-hidden="true">
            <div className={`modal-dialog modal-dialog-centered ${modalClass}`} role="document">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div> 

    );
}

export default ModalMain;