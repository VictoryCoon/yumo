import React, {Component, useState, useEffect, map} from 'react';
import BoardStandardList from './list/BoardStandardList';
import {BsSearch} from 'react-icons/bs';
import {AiOutlinePlusSquare} from 'react-icons/ai'
import ReactRouterDom, { BrowserRouter, Switch, Route, Link} from "react-router-dom";

const BoardStandard = () => {
  const types = "02"
  const [boardSearchType, setBoardSearchType] = useState("")
  const [boardSearchString, setBoardSearchString] = useState("")
  const [disableAt, setDisableAt] = useState(true)
  const [holdText, setHoldText] = useState("Inactivate")
  const handleSubmit = (e) => {
    e.prventDefault()
  }

  const handleChangeType = ({target:{value}}) => {
    if(value == "00"){
      setDisableAt(true)
      setHoldText("Inactivate")
      setBoardSearchString("")
    }else{
      setDisableAt(false)
      setHoldText("Activate")
    }
    setBoardSearchType(value)
  }
  const handleChangeString = ({target:{value}}) => {
    setBoardSearchString(value)
  }

  const Lists = () => {
    return (
      <BoardStandardList types={types} boardSearchType={boardSearchType} boardSearchString={boardSearchString}/>
    )
  }
    return (
      
      <div className="BodyContent">
        <div className="Banner">
          <h1>자유게시판</h1>
        </div>
        <form className="SearchTab" onSubmit={handleSubmit}>
          <select type="boardSearchType" name="boardSearchType" onChange={handleChangeType}>
            <option value="00">(선택)</option>
            <option value="10">제목</option>
            <option value="11">작성자</option>
            <option value="12">내용</option>
            <option value="13">제목+내용</option>
          </select>
          <input type="text" placeholder={holdText} name="boardSearchString" onChange={handleChangeString}  disabled={disableAt} value={boardSearchString}/>
          {/* <button onClick={Lists}><BsSearch/></button> */}
        </form>
        <div className="PostTab">
          <Link to={`/posting/${types}`}><AiOutlinePlusSquare/></Link>
        </div>
        <div className="BoardListSet">
          <ul className="BarEachUl">
            <li className="BarEachLi">Thumbs</li>
            <li className="BarEachLi">Title</li>
            <li className="BarEachLi">Author</li>
            <li className="BarEachLi">Date</li>
            <li className="BarEachLi">views</li>
          </ul>
        </div>
        <Lists/>
      </div>
      
    )
}

export default BoardStandard;