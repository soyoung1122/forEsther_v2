import propTypes from 'prop-types'; 

                        //함수 전달 이유 : 데이터 원본이 밖에 있기 때문에 데이터를 가져오려면 함수를 전달 받아야 함
const Toast = ({toasts, deleteToast}) => {
    return (
        <div className="position-fixed bottom-0 end-0">
            {/* 배열      객체 */}
            { toasts.map(toast => {
                return (
                    <div 
                        //토스트의 고유한 id 값을 가지고 삭제
                        key={toast.id}
                        onClick={ () => {deleteToast(toast.id)}}
                        className={`alert alert-${toast.type || 'success'} m-0 py-2 mt-2`}>
                        {toast.text}
                    </div> 
                )
            })}
        </div>
    );
}

Toast.propTypes = {
    //배열 안에 객체를 넣고 객체 안에 내용 => toast 를 여러개 띄위기 위해
    toasts: propTypes.arrayOf(propTypes.shape({
        text: propTypes.string,
        type: propTypes.string
    })).isRequired,

    //함수로써 전달받음
    deleteToast: propTypes.func.isRequired
}


Toast.defaultProps = {
    //default 값은 배열로
    toasts: []
}

export default Toast;