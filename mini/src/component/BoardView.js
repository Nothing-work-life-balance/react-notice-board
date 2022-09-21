import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';
// import parse from 'html-react-parser';
import "./css/BoardView.css";
import axios from 'axios';
import userContext from "./context/userContext";
import { useContext } from "react";


export default function BoardView() {
  // const {userid} = useContext(userContext);
  const userid = localStorage.getItem('userid');
  const{boardlist2} = useContext(userContext);
  const boardList = boardlist2;
  const { num } = useParams();
  const board = boardList.filter((id) => id.contentNum === num);
  const history = useNavigate();
  console.log(num);
  console.log(board);

  const deleteboard = () => {
    axios.get("http://192.168.2.72:8080/delete", {
        params:{
          "id":board[0].id,
                  "title":board[0].title
        } 
               },
               { withCredintials: true}
               )
               .then(res => {
                alert("삭제되었습니다");
                history('/');
               }).catch(error => {alert("삭제 실패")});
  }


  if(board[0].userId == userid){
    return (
      <>
        <h2 align="center">게시글 상세정보</h2>
  
        <div className="board">
          {board.map((con) => (
            <>
              <div className="board-row">
                <label>게시글 번호</label>
                <label>{con.contentNum}</label>
              </div>
              <div className="board-row">
                <label>제목</label>
                <label>{con.title}</label>
              </div>
              <div className="board-row">
                <label>작성일</label>
                <label>{con.time}</label>
              </div>
              <div className="board-row">
                <label>작성자</label>
                <label>{con.userId}</label>
              </div>
              <div className="board-row">
                <label>내용</label>
                <div>{ReactHtmlParser(con.content)}</div>
                {/* <div>{parse(con.content)}</div> */}
              </div>
            </>
          ))}
          <br />
          <button className="board-view-button" onClick={() => history(-1)}>
            목록으로 돌아가기
          </button>
          <button className="board-view-button" onClick={() => history(`/Modify/${board[0].contentNum}`)}>
            수정
          </button>
          <button className="board-view-button" onClick={deleteboard}>
            삭제
          </button>
        </div>
      </>
    );

  }else{
  return (
    <>
      <h2 align="center">게시글 상세정보</h2>

      <div className="board">
        {board.map((con) => (
          <>
            <div className="board-row">
              <label>게시글 번호</label>
              <label>{con.contentNum}</label>
            </div>
            <div className="board-row">
              <label>제목</label>
              <label>{con.title}</label>
            </div>
            <div className="board-row">
              <label>작성일</label>
              <label>{con.time}</label>
            </div>
            <div className="board-row">
              <label>작성자</label>
              <label>{con.userId}</label>
            </div>
            <div className="board-row">
              <label>내용</label>
              <div>{ReactHtmlParser(con.content)}</div>
              {/* <div>{parse(con.content)}</div> */}
            </div>
          </>
        ))}
        <br />
        <button className="board-view-button" onClick={() => history(-1)}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
        }
}
