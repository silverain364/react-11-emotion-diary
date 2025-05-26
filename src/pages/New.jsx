import React, {useContext}from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Editor from '../components/Editor'
import {useNavigate} from 'react-router-dom'
import { DiaryDispatchContext } from '../App'


const New = () => {
  
  const nav = useNavigate()
  const {onCreate} = useContext(DiaryDispatchContext)
  
  //에디터에 정보를 전달해주는 함수
  const onSubmit = (input)=> {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    )
    nav('/', {replace:true})
  }
  return (
    <div>
      <Header
      leftChild={<Button
        onClick={()=> nav(-1)} 
        text={"< 뒤로 가기"}/>}
      title={"새 일기 쓰기"}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New