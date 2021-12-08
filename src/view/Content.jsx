import React, {Component, useState} from 'react';
import ReactRouterDom, { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import '../css/Content.css';
import Home from './Home';
import BoardNotice  from './contents/boards/BoardNotice';
import BoardStandard  from './contents/boards/BoardStandard';
import BoardAnonymous  from './contents/boards/BoardAnonymous';
import BoardFAQ  from './contents/boards/BoardFAQ';
import BoardCustomer  from './contents/boards/BoardCustomer';
import BoardDetail from './contents/boards/details/BoardStandardDetail';
import Posting from './contents/boards/posts/Posting';
import
{ FaUserCircle 
, FaRegUserCircle
} from 'react-icons/fa';

const Content = () => {
  return(
    <BrowserRouter>
    <div className="Header">
        <div className="ButtonL">
        <FaUserCircle/>
        </div>
        <div className="TitleBar">
          <Link className="mButton" to="/home" >$HOME</Link>
          <div className="MenuBar">
            <Link className="mButton" to="/notice"   >공지사항</Link>
            <Link className="mButton" to="/standard" >자유게시판</Link>
            <Link className="mButton" to="/anonymous">익명게시판</Link>
            <Link className="mButton" to="/faq"      >FAQ</Link>
            <Link className="mButton" to="/customer" >고객센터</Link>
            <Routes>
              <Route exact path="/home"                    element={<Home/>}          />
              <Route exact path="/notice"                  element={<BoardNotice/>}   />
              <Route exact path="/standard"                element={<BoardStandard/>} />
              <Route exact path="/anonymous"               element={<BoardAnonymous/>}/>
              <Route exact path="/faq"                     element={<BoardFAQ/>}      />
              <Route exact path="/customer"                element={<BoardCustomer/>} />
              <Route exact path="/posting/:boardKindCode"  element={<Posting/>}       />
              <Route exact path="/detail/:boardSid"        element={<BoardDetail/>}   />
            </Routes>
          </div>
        </div>
        <div className="ButtonR">
          <FaRegUserCircle/>
        </div>
    </div>
    </BrowserRouter>
  )
}

export default Content;