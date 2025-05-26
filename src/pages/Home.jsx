import React , {useState, useContext}from 'react'
import { DiaryDispatchContext, DiaryStateContext } from '../App'
import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'

const Home = () => {

  const [pivotDate, SetpivotDate] = useState(new Date())
  const data = useContext(DiaryStateContext)

  const getMonthlyDate = (pivotDate, data)=> {
    const beginTime=new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth(),
      1,
      0,
      0,
      0
    ).getTime()
    const endTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth()+1,
      0,
      23,
      59,
      59
    ).getTime()

    return data.filter(
      (item)=> beginTime <= item.createdDate && item.createdDate<=endTime
    )
  }

  const onIncreaseMonth = () => {
    SetpivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1)
    )
  }
  const onDecreaseMonth = () => {
    SetpivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1)
    )
  }

  const monthlyData = getMonthlyDate(pivotDate, data)

  return (
    <div>
      <Header
      title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
      leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
      rightChild={<Button text={">"}onClick={onIncreaseMonth}/>}
      />
      <DiaryList data={monthlyData}/>
    </div>
  )
}

export default Home