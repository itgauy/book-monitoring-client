import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// pages
import Connect from './pages/Connect'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import UserData from './pages/UserData'
import BookData from './pages/BookData'
import ActivityLog from './pages/ActivityLog'
import ActionButtons from './chef/ActionButtons'
import ErrorPage from './pages/ErrorPage'

// components

// routes
import Auth from "./routes/Auth"
import Guest from './routes/Guest'

function App() {
  // Set the target date and time here (YYYY, MM-1, DD, HH, MM, SS)
  // Note: Month is 0-based (0 = January, 11 = December)
  const TARGET_DATE = new Date(2025, 4, 10, 13, 30, 0); // May 10, 2025, 1:30 PM

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Check if current time has passed the target time
    const checkTime = () => {
      const currentTime = new Date();
      if (currentTime >= TARGET_DATE) {
        setShouldRedirect(true);
      }
    };

    // Check immediately
    checkTime();

    // Then check every minute
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Wrapper component to handle redirection
  const RouteWrapper = ({ children }) => {
    // If we've hit the target time and we're not already on error page, redirect
    if (shouldRedirect && window.location.pathname !== '/error') {
      return <Navigate to="/error" replace />;
    }

    // Otherwise render children normally
    return children;
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              {/* Error Page */}
              <Route path="/error" element={<ErrorPage />} />

              {/* GLOBAL */}
              <Route path="/" element={
                <RouteWrapper>
                  <Home />
                </RouteWrapper>
              } />

              {/* GUEST */}
              <Route path="/login" element={
                <RouteWrapper>
                  <Guest><Login /></Guest>
                </RouteWrapper>
              } />
              <Route path="/connect" element={
                <RouteWrapper>
                  <Guest><Connect /></Guest>
                </RouteWrapper>
              } />

              {/* AUTH */}
              <Route path="/admin" element={
                <RouteWrapper>
                  <Auth><Admin /></Auth>
                </RouteWrapper>
              }>
                <Route path="userdata" element={<UserData />} />
                <Route path="bookdata" element={<BookData />} />
                <Route path="log" element={<ActivityLog />} />
              </Route>
              <Route path="/ab" element={
                <RouteWrapper>
                  <Auth><ActionButtons /></Auth>
                </RouteWrapper>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App