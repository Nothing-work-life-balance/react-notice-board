import axios from "axios";
import {React, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './css/botanical.css'
import userContext from './context/userContext';

function Login(){
    const navigate = useNavigate();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const {setuserid, setIsLogin} = useContext(userContext);
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickLogin = () => {
        console.log("click login");
        axios.post('http://192.168.2.72:8080/users', 
        {
            "userId": inputId,
            "pw": inputPw
        },
        { withCredintials: true}
        )
        .then(res => {
            if(res.data){
            setuserid(inputId);
            setIsLogin(true);
            localStorage.setItem('userid',inputId);
            navigate('/');
            }else{
            console.log(inputId);
            console.log(inputPw);
            alert('아이디와 비밀번호를 확인하세요!!');
            }
        })
        .catch(error => {console.log(error)
            console.log(inputId);
            console.log(inputPw);
            alert('아이디와 비밀번호를 확인하세요!!');
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
            <Link to="/Regist"><p>회원 가입</p></Link>
        </div>
    )
}

export default Login;