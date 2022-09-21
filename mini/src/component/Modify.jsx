import React from 'react';
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

export default function BoardEdit({board}) {
    const navigate = useNavigate();
    const { num } = useParams();
    const boardmodi = board.filter((id) => id.contentNum === num);
    const [total, setTotal] = useState({
        title:boardmodi[0].title,
        content:boardmodi[0].content
    })
    console.log(boardmodi[0].userId);
    const getValue = e => {
        const {name, value} = e.target;
        setTotal({
            ...total,
            [name]: value
        })
        console.log(total);
    }
    console.log(board);

    const nullcheck = () => {
        let titleend = total.title.trim();
        let contentend = total.content.trim();
        console.log(titleend);
        console.log(contentend);
        if(titleend == "" || contentend == ""){
            alert("제목과 내용을 전부 적어주세요!!");
        }else{
            axios.post("http://192.168.2.72:8080/putContent", {
                "id":boardmodi[0].id,
                "contentNum":boardmodi[0].contentNum,
                "title":total.title,
                "content":total.content,
                "userId":boardmodi[0].userId,
                "time":boardmodi[0].time
               },
               { withCredintials: true}
               )
               .then(res => {
                alert("수정되었습니다");
                navigate('/');
               }).catch(error => {alert("수정 실패")});
        }
    }

    return(
        <div className='App'>
            <div className='form-wrapper'>
                <label>제목</label><br></br>
                <input className='title-input' type='text' placeholder='제목' onChange={getValue} name ='title' value={boardmodi[0].title}/>
                <CKEditor
                    editor={ClassicEditor}
                    data={boardmodi[0].content}
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
            <button className='submit-button' onClick={nullcheck}>수정</button>
        </div>
    )
};