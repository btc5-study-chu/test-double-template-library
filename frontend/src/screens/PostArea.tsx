import {userRepository} from "../repository/UserRepository.ts";
import {useState} from "react";


export const PostArea = () => {
    const [inputName, setInputName] = useState('')
    const [inputNickName, setInputNickName] = useState('')
    const [inputTerm, setInputTerm] = useState('')
    const [inputRemark, setInputRemark] = useState('')

    function sendInfo() {
        userRepository.submit(
            {
                name: inputName,
                nickName: inputNickName,
                term: inputTerm,
                remark: inputRemark
            }
        )
        setInputName('')
        setInputNickName('')
        setInputTerm('')
        setInputRemark('')
    }

    return (
        <>
            <div>名前</div>
            <input onChange={event => setInputName(event.target.value)} type="text" id='name' value={inputName}/>
            <div>ニックネーム</div>
            <input onChange={event => setInputNickName(event.target.value)} type="text" id='nickName'
                   value={inputNickName}/>
            <div>FND</div>
            <input onChange={event => setInputTerm(event.target.value)} type="text" id='term' value={inputTerm}/>
            <div>一言</div>
            <input onChange={event => setInputRemark(event.target.value)} type="text" id='remark' value={inputRemark}/>
            <button onClick={sendInfo}>投稿</button>
        </>)
}

