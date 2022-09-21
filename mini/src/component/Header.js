import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import "./css/Header.css";
import userContext from './context/userContext';

function Navbar() {
    const {setuserid, isLogin, setIsLogin} = useContext(userContext);
    const userid = localStorage.getItem('userid');
    console.log(userid);
    console.log(isLogin);
    let button;

    const logout = () => {
        setIsLogin(false);
        localStorage.clear();
        setuserid('');
    }

    useEffect(() => {
       if(userid == '' || userid == null){
        setIsLogin(false);
       }else{
        setIsLogin(true);
       }
      },[userid]);

    if(isLogin){
        return (
            <>

            <nav className = 'header'>
                <div className = 'container'>
                    <Link to="/"><h2 className='logo' >HelloWorld</h2> </Link>  {/*클릭시 첫 화면*/}
                    <h4>{userid}</h4>
                    <button className='sign-btn' onClick={logout}>Logout</button>
                </div>
            </nav>

            </>
        );
    }else{
        return (
            <>

            <nav className = 'header'>
                <div className = 'container'>
                    <Link to="/"><h2 className='logo' >HelloWorld</h2> </Link>  {/*클릭시 첫 화면*/}
                    <p>{userid}</p>
                    <Link to="/Login"><button className='sign-btn'>Sign up</button></Link>
                </div>
            </nav>

            </>
        );
    }
}

export default Navbar