import React, {useState, useEffect} from 'react'
import '../../../../css/BoardDetail.css'
import ReactRouterDom, { BrowserRouter, Switch, Route, Link} from "react-router-dom"
import axios from 'axios'
import {FaRegGrinAlt,FaRegGrimace} from 'react-icons/fa'
import emptyImg from '../../../../img/empty.png'
import BoardStandardReply from '../replys/BoardStandardReply'

const BoardStandardDetail = (props) => {
    const boardSid = props.match.params.boardSid
    
    const [detail, setDetail] = useState([])
    const [contentList, setContentList] = useState([])
    useEffect(()=>{
        async function fetch(){
            const res = await axios.get('/selectBoardDetailView?boardSid='+boardSid)
            if(res.data.code != "1000"){
                alert(`${res.data.code} : ${res.data.desc}`)
            }else{
                setDetail(res.data.boardDetail)
                setContentList(res.data.boardContentList)
            }
        }
        fetch()
    },[props])
    return (
        <>
        {
            detail ? detail.map((item, idx) => {
                return (
                    <div className="BoardDetail">
                        <div className="Title">{item.boardTitle}</div>
                        <div className="Infos">{item.userNick} / {item.boardViewCnt} / <FaRegGrinAlt/> {item.boardLikeCnt} / <FaRegGrimace/> {item.boardHateCnt} / {item.regDate}</div>
                        <div className="MainContents">
                            <div>{item.boardContent}</div>
                            <div>
                            {
                                contentList ? contentList.map((item, idx) => {
                                    return (
                                        <ul className="EachUl" key={idx}>
                                            <li className="EachLi">
                                                <img className="EachThumbnail"
                                                    src={item.boardExtsnDirectoryRoute+item.boardExtsnFileName+item.boardExtsnFileExtsnNm}
                                                    //src={emptyImg}
                                                />
                                            </li>
                                        </ul>
                                    )
                                }) : ''
                            }
                            </div>
                        </div>
                        <div className="SubContents">
                            <BoardStandardReply boardSid={boardSid}/>
                        </div>
                    </div>
                )
            }) : ''
        }
        </>
    )
}

export default BoardStandardDetail;