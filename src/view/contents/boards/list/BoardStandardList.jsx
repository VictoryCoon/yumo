import React, {useState, useEffect} from 'react';
import ReactRouterDom, { Link } from "react-router-dom";
import axios from 'axios';
import
{ FaArrowAltCircleRight
, FaArrowAltCircleLeft
, FaUserCircle 
, FaRegUserCircle
} from 'react-icons/fa';
import
{ RiNumber0
, RiNumber1
, RiNumber2
, RiNumber3
, RiNumber4
, RiNumber5
, RiNumber6
, RiNumber7
, RiNumber8
, RiNumber9
} from 'react-icons/ri';
const BoardStandardList = (props) => {
    const [list, setList] = useState([])
    const [totalCnt, setTotalCnt] = useState(0)
    useEffect(()=>{        
        async function fetch(){
            const res = await axios.get('/selectBoardList?boardKindCode='+props.types+'&boardSearchType='+props.boardSearchType+'&boardSearchString='+props.boardSearchString)
            if(res.data.code != "1000"){
                alert(`${res.data.code} : ${res.data.desc}`)
            }else{
                setList(res.data.boardList)
                setTotalCnt(res.data.totalCnt)
            }
        }
        fetch()
    },[props])
    return (
        <>
        <div className="BoardList">
        {
            list ? list.map((item, idx) => {
                return (
                        <ul className="EachUl" key={idx}>
                            <li className="EachLi"><img className="EachThumbnail" src={item.boardExtsnFileName}/></li>
                            <li className="EachLi"><Link className="LinkLiStyle" to={`/detail/${item.boardSid}`}>{ item.boardTitle }</Link></li>
                            <li className="EachLi"><span>{item.userNick}</span></li>
                            <li className="EachLi"><span>{item.regDate}</span></li>
                            <li className="EachLi"><span>{item.boardViewCnt}</span></li>
                        </ul>
                )
            }) : ''
        }
        </div>
        <div className="PageNav">
          <span className="ArrowButtonL"> <FaArrowAltCircleLeft/> </span>
          <span className="PageNumberList"><RiNumber0/> | <RiNumber1/> | <RiNumber2/> | <RiNumber3/> | <RiNumber4/> | <RiNumber5/> | <RiNumber6/> | <RiNumber7/> | <RiNumber8/> | <RiNumber9/></span>
          <span className="ArrowButtonR"> <FaArrowAltCircleRight/> </span>
        </div>
        </>
    )
}

export default BoardStandardList;