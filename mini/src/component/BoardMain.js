import Board from "./Board";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Pagination from "./Pagination";
import boardlist from "../db/data.json";
import { useState,useEffect, useContext } from "react";
import axios from 'axios';
import userContext from './context/userContext';

export default function BoardMain() {
  const {isLogin, boardlist2} = useContext(userContext);
  const userid = localStorage.getItem('userid');
  const boardList = boardlist2;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const boardcontent = boardList;
  const boardname = boardlist.boardType;
  
  
  const login = () => {
    if(isLogin || userid != null || userid != ''){
      navigate('/Write');
    }else{
      alert("로그인이 필요한 서비스 입니다. \n 로그인을 먼저 해주세요!!");
      navigate('/Login');
    }
  }

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>게시판</h2>
      <Board 
        boardlist={currentPosts(boardList)}
        boardname={boardname}/>
      <Pagination 
        postsPerPage={postsPerPage}
        totalPosts={boardList.length}
        pagination={setCurrentPage}/>

        <button className="board-write-btn" onClick={login} style={{marginLeft:"85%", marginTop:"5%",}}>글작성</button>
    </>
  );
}
