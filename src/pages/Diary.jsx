import React from 'react'
import { replace, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import Viewer from '../components/Viewer'

const Diary = () => {
  const params = useParams()
  const nav = useNavigate()

  return (
    <div>
      <Header
      title={"yyyy-mm-dd 기록"}
      leftChild={<Button text={"< 뒤로 가기"}/>}
      rightChild={<Button
        onClick={()=>nav(`/edit/${params.id}`)}
        text={"수정하기"}/>}
      />
      <Viewer/>
    </div>
  )
}

export default Diary