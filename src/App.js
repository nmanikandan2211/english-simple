import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Practice from './pages/Practice/Practice';
import Profile from './pages/Profile/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/practice' element={<Practice />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
};
export default App;