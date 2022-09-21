import React from 'react';
import './boardEdit.css';
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import App from '../../App';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/userContext';
import { useContext } from 'react';

export default function BoardEdit({conlen}) {
    // const {userid} = useContext(userContext);
    const userid = localStorage.getItem('userid');
    const isLogin = localStorage.getItem('isLogin');
    const navigate = useNavigate();

    const [total, setTotal] = useState({
        title:'',
        content:''
    })

    const getValue = e => {
        const {name, value} = e.target;
        setTotal({
            ...total,
            [name]: value
        })
        console.log(total);
    }

    console.log("len:" + conlen);
    let now = new Date();
    let year = now.getFullYear();
    let todayMonth = now.getMonth() + 1 ;
    let todayDate = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let secounds = now.getSeconds();
    let todaystr = year+"년"+todayMonth + '월' + todayDate + '일' + hours+":"+minutes;
    console.log(todaystr);

    const nullcheck = () => {
        let titleend = total.title.trim();
        let contentend = total.content.trim();
        console.log(titleend);
        console.log(contentend);
        if(titleend == "" || contentend == ""){
            alert("제목과 내용을 전부 적어주세요!!");
        }else{
            axios.post("http://192.168.2.72:8080/setContent", {
                        "contentNum":conlen+1,
                        "title":total.title,
                        "content":total.content,
                        "userId":userid,
                        "time":todaystr
                    },
                    { withCredintials: true}
                    )
                    .then(res => {
                        alert("작성되었습니다");
                        navigate('/');
                    }).catch(error => {alert("작성 실패")});
        }
    }

    return(
        <div className='App'>
            <div className='form-wrapper'>
                <label>제목</label><br></br>
                <input className='title-input' type='text' placeholder='제목' onChange={getValue} name ='title' />
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setTotal({
                            ...total,
                            content: data
                        })
                        console.log(total);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            <button className='submit-button' onClick={nullcheck}>작성</button>
        </div>
    )
};