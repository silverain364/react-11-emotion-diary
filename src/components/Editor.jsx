import React, {useState, useEffect} from 'react'
import './Editor.css'
import Button from './Button'
import EmotionItem from './EmotionItem'
import { useNavigate } from 'react-router-dom'
import { getStringedDate } from '../util/getStringedDate'
import { emotionList } from '../util/constants'

const Editor = ({onSubmit, initData}) => {

    const [input, setInput] = useState({
        createdDate:new Date(),
        emotionId:2,
        content:''
    })

    const nav = useNavigate()

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData,
                createdDate : new Date(Number(initData.createdDate))
            })
        }
    }, [initData])

    const onChangeInput=(e)=>{
        let name = e.target.name
        let value = e.target.value
        
        if(name==='createDate'){
            value = new Date(value)
        }

        setInput({
            ...input,
            [name]:value
        })
    }

    const onSubmitButtonClick=()=>{
        onSubmit(input)
    }
  return (
    <div className='Editor'>
        <section className="date_section">
            <h4>오늘의 날짜</h4>
            <input
            onChange={onChangeInput}
            value={getStringedDate(input.createdDate)}
            type="date"
            name="createdDate"/>
        </section>
        <section className="emotion_section">
            <h4>오늘의 감정</h4>
            <section className="emotion_list_wrapper">
                {emotionList.map((item)=>(
                    <EmotionItem
                    onClick={()=>
                        onChangeInput({
                            target:{
                                name:'emotionId',
                                value:item.emotionId
                            }
                        })
                    }
                    key={item.emotionId}
                    {...item}
                    isSelected={item.emotionId===input.emotionId}/>
                ))}
            </section>
        </section>
        <section className="content_section">
            <h4>오늘의 일기</h4>
            <textarea
            name='content'
            value={input.content}
            onChange={onChangeInput}
            placeholder='오늘은 어땠나요?'></textarea>
        </section>
        <section className="button_section">
        <Button text={"취소하기"} onClick={()=>nav(-1)}/>
        <Button
        onClick={onSubmitButtonClick}
        text={"작성 완료"}
        type={"POSITIVE"}/>
        </section>
    </div>
  )
}

export default Editor