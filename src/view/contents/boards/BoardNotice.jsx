import React, {Component, useState} from 'react';
import axios from 'axios';

const BoardNotice = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const onChangeUserId = ({ target : { value } }) => setUserId(value);
  const onChangeUserPw = ({ target : { value } }) => setUserPw(value);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/insertUserInfo',
    '{"userId":+"'+userId+'"+,"userNick":"노인"}'
    )
    .then(function (response) {
        if(response.data.code != "1000"){   // Fail
          alert(response.data.code + " - " + response.data.desc)
          return;
        }else{                              //Success
          console.log("??? : "+response.data);
          alert(response.data);
        }
    })
    .catch(function (error) {
        console.log("ERR : "+error.data)
    })
  };
    return (
      <div className="BodyContent">
        <form onSubmit={handleSubmit}>
          <input type="userId" name="userId" value={userId} onChange={onChangeUserId}/><br/>
          <input type="userPw" name="userPw" value={userPw} onChange={onChangeUserPw}/><br/>
          <button type="submit">Log - In</button>
        </form>  
      </div>
    )
}

export default BoardNotice;