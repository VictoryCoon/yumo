import React, {useState, useEffect} from 'react';
import '../../../../css/BoardDetail.css';
import ReactRouterDom, { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import {FaRegGrinAlt,FaRegGrimace} from 'react-icons/fa'
import BoardStandardReReply from '../replys/BoardStandardReReply'
import emptyImg from '../../../../img/empty.png';

const BoardStandardReply = (props) => {
    const boardSid = props.boardSid
    
    const [replyList, setReplyList] = useState([])
    const [reReplyList, setReReplyList] = useState([])

    useEffect(()=>{
        async function fetch(){
            const res = await axios.get('/selectBoardReplyList?boardSid='+boardSid)
            if(res.data.code != "1000"){
                alert(`${res.data.code} : ${res.data.desc}`)
            }else{
                setReplyList(res.data.boardReplyList)
                setReReplyList(res.data.boardReReReplyList)
            }
        }
        fetch()
    },[props])
    return (
        <>
        {
            replyList ? replyList.map((item, idx) => {
                return (
                    <div className="ReplyRowGroup">
                        <ul className="Reply" key={idx}>
                            <li className="Author">{item.userNick}</li>
                            <li className="Controll">
                                <button onClick={""}>수정</button>
                                <button onClick={""}>삭제</button>
                                <button onClick={""}>신고</button>
                            </li>
                            <li className="Content">
                                {item.boardReplyContent}
                            </li>
                            <li className="LikeAndHate">
                                <span><FaRegGrimace/> {item.boardReplyHateCnt} </span>
                                <span><FaRegGrinAlt/> {item.boardReplyLikeCnt} </span>
                            </li>
                        </ul>
                        <div className="ReReplyToggle">
                            <BoardStandardReReply boardSid={boardSid} boardReplySid={item.boardReplySid}/>
                        </div>
                    </div>
                )
            }) : ''
        }
        </>
    )
}

export default BoardStandardReply;