import { useState } from 'react'
import Navbar from './Components/Navbar'
import UsersList from './Components/UsersList'
import SearchUser from './Components/SearchUser'
import { Route, Routes } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
  <Routes>
<Route path="/" element={<UsersList/>} />
<Route path="/search" element={<SearchUser/>} />
</Routes>
    </>
  )
}

export default App
