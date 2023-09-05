import { useState, useRef } from "react";
//고유한 id값 부여하기 위해
import { v4 as uuidv4 } from 'uuid';
import { addToast as add, removeToast } from '../store/toastSlice';
//위의 add라는 함수를 호출하기 위해 필요함 
import { useDispatch } from "react-redux";

const useToast = () => {
    //토스트 구현
    //const [toasts, setToasts] = useState([]);
    //값이 바로바로 반영 되도록 useRef 사용
    const toasts = useRef([]);
    //컴포넌트 함수에서만 useState, useEffect, useRef 등등을 사용 할 수 있음..
    //이걸 해결하기 위해서 커스텀 훅 만들어 사용


    //useRef사용시 리렌더링을 따로 해줘야 함
    const [toastRerender, setToastRerender] = useState(false);

    const dispatch = useDispatch();

    

     //addToast 에서 실행하기 위해 addToast보다 순서 먼저로 바꿈
    //토스트 클릭시 화면에서 사라지기
    const deleteToast = (id) => {
        //console.log(id);
        // const filteredToasts = toasts.current.filter(toast => {
        //     return toast.id !== id;
        // });
        //Redux로 대체

        //setToasts(filteredToasts);
        // toasts.current = filteredToasts;
        // setToastRerender(prev => !prev);
        //Redux로 대체

        //Redux 이용
        dispatch(removeToast(id));
    
    }

    //삭제 버튼 눌렀을 때 토스트 배열에 토스트 내용 추가
    const addToast = (toast) => {
        const id = uuidv4();
        const toastWithId = {
            //스프레드 연산자로 있던 값 가져오기
            ...toast,
            //고유한 id값 toast에 부여하기 => 삭제할 때 어떤 토스트를 삭제할 것인지 선택하기 위해
            id,

        }

        //원래 배열 안에 새로운 toast 추가하기
        //스프레드를 이용해서 새로운 값 배열에 추가하기
        //setToasts(prev => [...prev, toast]);
        //setToasts(prev => [...prev, toastWithId]);
        //toasts.current = [...toasts.current, toastWithId];
        //setToastRerender(prev => !prev);
        //Redux를 이용하기 때문에 더 이상 사용하지 않음
        //action.payload로 인해 파라미터가 전달 돼서 slice안에 있는 toasts배열안에 추가 됨
        dispatch(add(toastWithId));
        

        //3초 뒤에 토스트 창 사라지게 하기
        setTimeout(() => {
            deleteToast(id);
        }, 3000);
    }

    //객체로 선언
    //배열로써 리턴하면 순서가 강요되기 때문에 객체로 변환
    // return [
    return {
        //Redux사용으로 필요 없어짐
        //toast.current
        addToast,
        deleteToast,
    }
    // ];



}

export default useToast;