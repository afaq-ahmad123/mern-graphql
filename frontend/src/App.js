
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './components/Home';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import DetailPage from './components/PostDetail';
import Register from './components/Register';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path='/' element={<AuthRoute><Home /></AuthRoute>} />
            <Route exact path='/post/:postId' element={<AuthRoute><DetailPage /></AuthRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
