import React from 'react'
import {useAuth} from '../store/auth'

export default function Marks() {
  const {namedone,setNamedone, marks, setMarks}=useAuth()
    
  return (
    <div>
        <h1>YOUR MARKS ARE</h1>
      <h2>{marks} OUT of 10</h2>
    </div>
  )
}
