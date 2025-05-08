import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import UserData from './pages/UserData'
import BookData from './pages/BookData'
import ActivityLog from './pages/ActivityLog'
import ActionButtons from './chef/ActionButtons'

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
              <Route path="/admin" element={<Auth><Admin /></Auth>}>
                <Route path="userdata" element={<UserData />} />
                <Route path="bookdata" element={<BookData />} />
                <Route path="log" element={<ActivityLog />} />
              </Route>
              <Route path="/ab" element={<Auth><ActionButtons /></Auth>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
