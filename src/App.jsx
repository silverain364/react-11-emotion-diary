import './App.css'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import Notfound from './pages/Notfound'
import Header from './components/Header'
import Button from './components/Button'
import { useState, useReducer, useRef, useEffect, useContext, createContext } from 'react'

const mockData = [
  {
    id:1,
    createdDate:new Date('2025-04-02').getTime(),
    emotionId:2,
    content:'1번 일기의 내용'
  },
  {
    id:2,
    createdDate:new Date('2025-04-01').getTime(),
    emotionId:3,
    content:'2번 일기의 내용'
  },
  {
    id:3,
    createdDate:new Date('2025-03-25').getTime(),
    emotionId:4,
    content:'3번 일기의 내용'
  }
]

function reducer(state, action){
  switch(action.type){
    case "INIT" :
      return action.data
    case "CREATE":
      return [action.data ,...state]
    case "UPDATE":
      return state.map((item)=>
        String(item.id) === String(action.data.id) ? action.data : item
      )
    case "DELETE":
      return state.filter(
        (item)=>String(item.id)!==String(action.id)
      )
      default:
        return state
      }
      return state
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function App() {

  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    dispatch({
      type:"INIT",
      data:mockData
    })

    setIsLoading(true)
  }, [])

  const onCreate = (createdDate, emotionId, content)=> {
    dispatch({type:'CREATE',
      data:{
        id:idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }

  const onUpdate = (id, createdDate, emotionId, content)=> {
    dispatch({
      type:"UPDATE",
      data:{
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  const onDelete =(id)=>{
    dispatch({
      type:"DELETE",
        id
    })
  }

  if(!isLoading){
    return <div>데이터를 불러오는 중입니다.</div>
  }else {
    return (
      <div>
        <DiaryStateContext.Provider value={data}>  
          <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/diary/:id' element={<Diary/>}></Route>
          <Route path='/edit/:id' element={<Edit/>}></Route>
          <Route path='/new' element={<New/>}></Route>
          <Route path='/*' element={<Notfound/>}></Route>
        </Routes>
        </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </div>
    )
  }
  
}

export default App
