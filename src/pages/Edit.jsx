import React, {useContext, useState, useEffect} from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Editor from '../components/Editor'
import { useParams, useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App'
import { DiaryStateContext } from '../App'

const Edit = () => {
    const {onDelete,onUpdate} = useContext(DiaryDispatchContext)
    const data = useContext(DiaryStateContext)
    const params = useParams()
    const nav = useNavigate()

    const [curDiaryItem, setCurDiaryItem] = useState(null)

    useEffect(()=>{
      const currentDiaryItem = data.find(
        (item)=>String(item.id)===String(params.id)
      )
      if(!currentDiaryItem){
        window.alert('존재하지 않는 일기입니다.')
        nav('/', {replace:true})
      }

      setCurDiaryItem(currentDiaryItem)

    }, [params.id, data, nav])

    const onSubmit = (input)=>{
      if(window.confirm('일기를 정말 수정할까요?')){
        onUpdate(
          params.id,
          input.createdDate.getTime(),
          input.emotionId,
          input.content
        )
        nav('/', {replace:true})
      }
    }

    const onClickDelete=()=>{
      if(window.confirm('일기를 정말 삭제할까요?')){
        onDelete(params.id)
        nav('/', {replace:true})
      }
    }

  return (
    <div>
      <Header
      title={'일기 수정하기'}
      leftChild={<Button
        onClick={()=>nav(-1)}
        text={'< 뒤로 가기'}/>}
      righttChild={<Button
      type={'NEGATIVE'}
        text={'삭제하기'}
        onClick={onClickDelete}/>}
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit}/>
    </div>
  )
}

export default Edit