import Button from "../button/Button";

const ModalMain = ({children}) => {

    return(

        <div>
            <div className="modal fade" id="basicModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default ModalMain;