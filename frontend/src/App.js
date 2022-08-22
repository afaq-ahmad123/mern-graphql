
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './components/Home';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
