import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import UserData from './pages/UserData'
import BookData from './pages/BookData'
import ActivityLog from './pages/ActivityLog'

// components

// routes
import Auth from "./routes/Auth"
import Guest from './routes/Guest'


function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>

              {/* GLOBAL */}
              <Route path="/" element={<Home />} />


              {/* GUEST */}
              <Route path="/login" element={<Guest><Login /></Guest>} />


              {/* AUTH */}
              <Route path="/userdata" element={<Auth><UserData /></Auth>} />
              <Route path="/bookdata" element={<Auth><BookData /></Auth>} />
              <Route path="/log" element={<Auth><ActivityLog /></Auth>} />

            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
