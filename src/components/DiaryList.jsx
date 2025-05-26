import React, {useState }from 'react'
import './DiaryList.css'
import {useNavigate } from 'react-router-dom'
import DiaryItem from './DiaryItem'
import Button from './Button'


const DiaryList = ({ data }) => {
  const [sortType, setSortType]= useState("latest")
  const nav = useNavigate()

  const onChangeSortType=(e)=>{
    setSortType(e.target.value)
  }

  //날짜별 리스트 정리
  const getSortedData=()=>{
    return data.toSorted((a, b)=>{
      if(sortType==="oldest"){
        return Number(a.createdDate)-Number(b.createdDate)
      }else{
        return Number(b.createdDate)-Number(a.createdDate)
      }
    })//정렬 메소드
  }
  
  //출력값을 변수로 저장
  const sortData = getSortedData()
  return (
    <div className='DiaryList'>
      <div className="menu_bar">
        <select
        value={sortData}
        onChange={onChangeSortType}
        >
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된순</option>
        </select>
        <Button
          onClick={() => nav(`/new`)}
          text={"새 일기 쓰기"} type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {data.map((item) => (
          <DiaryItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default DiaryList