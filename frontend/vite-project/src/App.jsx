import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Routers,Routes,Route} from 'react-router-dom'

import Login from './Components/Login.jsx'
import Menu from './Components/Menu.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Routers>
      <Routes>
            {/* <Route path='/' element={ <Menu/>}/> {/* "/Menu" */}
            <Route path='/' element={ <Login/>}/>
      </Routes>
      </Routers>
      
    </>
  )
}

export default App
