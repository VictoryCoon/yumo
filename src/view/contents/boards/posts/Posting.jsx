import React, {useState, useEffect} from 'react'
import '../../../../css/Posting.css'
import axios from 'axios'

const handleSubmit = (e) => {
    e.prventDefault()
}
const Posting = (props) => {
    console.log("=====")
    console.log(props)
    console.log("=====")
    const boardKindCode = props.match.params.boardKindCode
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const changeTitle = (e) =>{
        setTitle(e.target.value)
    }

    const changeContent = (e) =>{
        setContent(e.target.value)
    }

    const DoPosting = () =>{
        alert(title+"/"+content)
        alert("1")
        if(title.length == 0){
            alert("제목을 입력하세요.")
            return
        }
        alert("2")
        if(content.length == 0){
            alert("내용을 입력하세요.")
            return
        }
        alert("3")
        axios.post('/insertBoardInfo',{
            boardTitle : title,
            boardContent : content,
            boardKindCode : boardKindCode,
            userId : 'Admin'
        }).then(function(res){
            alert(res.data)
        }).catch(function(err){
            alert(err.data)
        }).finally(function(res){
            alert(res.data)
        })
    }
    return (
        <div className="BodyContent">
            <div className="Banner">
                <h1>게시글등록</h1>
            </div>
            <div className="ContentInput">
                <form className="PostingTab" onSubmit={handleSubmit}>
                    <input name="boardTitle" type="text" placeholder="제목" onChange={changeTitle}/><br/>
                    <input name="boardContent" type="textarea" placeholder="내용" onChange={changeContent}/>
                    <button onClick={DoPosting}>등록</button>
                </form>
            </div>
        </div>
    )
}

export default Posting;