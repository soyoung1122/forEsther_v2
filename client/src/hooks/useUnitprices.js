import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const useUnitprices = () => {
    const [list, setList] = useState([]);
    const head = [
        {
            key: 'no', 
            title: '#', 
            data: {
                class: ["a", "ab", "ccc"], 
            }
        }, 
        {
            key: 'sl', //필수
            title: 'Serial/Lot No', //필수
            currency: false, //선택
            class: [], //선택
            data: { //선택
                class: ["b", "bc"],
                link: { 
                    origin: "/unitprices",
                    id: "sl"
                }, 
                onClick: {}
            }}, 
        {
            key: 'pc', 
            title: '품목코드', 
        }, 
        {
            key: 'pn', 
            title: '품목명', 
            data: {
                class: ["b", "bc"], 
                onClick: {}
            }
        },  
        {
            key: 'sc', 
            title: '표준원가',
            currency: true, 
        }, 
        {
            key: 'pp', 
            title: '구매단가', 
            currency: true, 

        }, 
        {
            key: 'sp', 
            title: '판매단가', 
            currency: true, 
        }, 
    ];

    useEffect(() => {
        getUnitprices();
    }, [])

    const deleteUnitprice = (id) => {
        axios.delete(`unitprices/${id}`)
            .then(res => {
                getUnitprices();
            })
    }


    const updateUnitprice = (id) => {
        axios.put(`unitprices/${id}`)
            .then(res => {
                getUnitprices();
            })
    }

    const getUnitprice = (id) => {
        axios.get(`unitprices/${id}`)
            .then(res => {
                console.log(res);
            })
    }

    const getUnitprices = () => {
        axios.get("unitprices")
            .then(res => {
                setList([...res.data]);
            })
    }

    return {
        head,
        list,
        deleteUnitprice,
        updateUnitprice
    };
}

export default useUnitprices;