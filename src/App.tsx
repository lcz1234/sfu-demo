import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { JoinMeetingPage } from './components/JoinMeetingPage'
import { EmceePage } from './EmceePage'

const App = () => {
  return (
    <div className="container">
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/emcee" element={<EmceePage />} />
            <Route path="/" element={<JoinMeetingPage />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </div>
  )
}

export default App
