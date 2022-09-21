import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import BoardMain from './component/BoardMain';
import BoardView from './component/BoardView';
import Header from './component/Header';
import BoardEdit from './component/boardEdit/boardEdit';
import Login from './component/Login';
import "./App.css";
import PrivateRoute from './component/PrivateRoute';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Regist from './component/Regist';
import Modify from './component/Modify';

import userContext from './component/context/userContext';



function App() {

    const [isLogin, setIsLogin] = useState(false);
    const [userid, setuserid] = useState('');
    const [boardlist2, setboardlist] = useState([]);

  useEffect(() => {
    axios.get(
      "http://192.168.2.72:8080/listGet"
      ).then(res=>{
        setboardlist(res.data);
      });
  });
    
    return (
    <>
    <userContext.Provider value={{userid,  isLogin,setuserid, setIsLogin, boardlist2}}>
    <BrowserRouter>
    
    <Header/>
    
    <Routes>
        <Route exact path="/" element={<BoardMain 
            boardList={boardlist2}
            />} />
        <Route exact path="/content/:num" element={<BoardView boardList={boardlist2}/>} />
        <Route exact path="/Write" element={<BoardEdit 
            conlen={boardlist2.length}/>}/>
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Regist" element={<Regist />}/>
        <Route exact path="/Modify/:num" element={<Modify board={boardlist2}/>}/>
        <Route exact path="/DELETE/:num" element={<Modify board={boardlist2}/>}/>
    </Routes>
    
    </BrowserRouter>
    </userContext.Provider>
    </>
    );
}
export default App;