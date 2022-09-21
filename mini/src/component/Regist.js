import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Regist() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [checkpw, setcheckpw] = useState('');
    let check = false;
    const navigate = useNavigate();

    const handleInputId = (e) => {
        setInputId(e.target.value);
        axios.get("http://192.168.2.72:8080/checkUserId",{
            params:{
                "id": inputId
            }
        },
        { withCredintials: true}
        )
        .then(res => {
            console.log(res.data);
            if(res.data == false){
                check=false;
            } else {
                check=true;
            }
            console.log(check);
        })
        .catch()
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const handlecheckpw = (e) => {
        setcheckpw(e.target.value);
    }

    const onClickLogin = () => {
        console.log("click login");
        if(inputId.trim() == "" || inputPw.trim() == "" ){
            alert("아이디와 비밀번호를 전부 적어주세요!!");
        }else if(inputPw != checkpw){
            alert("비밀번호가 서로 다릅니다!!");
        }else{
        axios.post('http://192.168.2.72:8080/signupUser', 
        {
            "userId": inputId,
            "pw": inputPw
        },
        { withCredintials: true}
        )
        .then(res => {
            alert("회원 가입을 성공 하셨습니다.");
            navigate('/Login');
        })
        .catch(error => console.log(error))
    }
    }

    // const onClickIdCheck = () => {
        // console.log("checkID");
        // axios.get("http://localhost:8080/checkUserId",{
        //     params:{
        //         "id": inputId
        //     }
        // },
        // { withCredintials: true}
        // )
        // .then(res => {
        //     console.log(res.data);
        //     if(res.data == false){
        //         alert("Do not use Id");
        //     } else {
        //         alert("Can use Id")
        //     }
        // })
        // .catch()
    // }

    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="input_id">ID: </label>
                <input type="text" name="input_id" value={inputId} onChange={handleInputId}/>
            </div>
            <div>
                <label htmlFor="input_pw">PW: </label>
                <input type="password" name="input_pw" value={inputPw} onChange={handleInputPw}/>
            </div>
            <div>
                <label htmlFor="check_pw">CHECK_PW: </label>
                <input type="password" name="check_pw" value={checkpw} onChange={handlecheckpw}/>
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>회원 가입</button>
            </div>
        </div>
    );
}

export default Regist;