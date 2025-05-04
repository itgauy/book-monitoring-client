import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'

// components

// routes


function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>

              {/* GLOBAL */}
              <Route path="/" element={<Home />} />

            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
