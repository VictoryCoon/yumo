import React, {useState, useEffect} from 'react';
import '../../../../css/BoardDetail.css';
import ReactRouterDom, { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import {FaRegGrinAlt,FaRegGrimace} from 'react-icons/fa'
import emptyImg from '../../../../img/empty.png';

const BoardStandardReReply = (props) => {
    const boardSid = props.boardSid
    const boardReplySid = props.boardReplySid
    
    const [reReplyList, setReReplyList] = useState([])

    useEffect(()=>{
        async function fetch(){
            const res = await axios.get('/selectBoardReReplyList?boardSid='+boardSid+'&boardReplySid='+boardReplySid)
            if(res.data.code != "1000"){
                alert(`${res.data.code} : ${res.data.desc}`)
            }else{
                setReReplyList(res.data.boardReReReplyList)
            }
        }
        fetch()
    },[props])
    return (
        <>
            {
                reReplyList ? reReplyList.map((subItem, idx) => {
                    return (
                        <ul className="ReReply" key={idx}>
                            <li className="Author">{subItem.userNick}</li>
                            <li className="Controll">
                                <button>수정</button>
                                <button>삭제</button>
                                <button>신고</button>
                            </li>
                            <li className="Content">
                                {subItem.boardReReplyContent}
                            </li>
                            <li className="LikeAndHate">
                                <span><FaRegGrimace/> {subItem.boardReReplyHateCnt} </span>
                                <span><FaRegGrinAlt/> {subItem.boardReReplyLikeCnt} </span>
                            </li>
                        </ul>
                    )
                }) : ''
            }
        </>
    )
}

export default BoardStandardReReply;