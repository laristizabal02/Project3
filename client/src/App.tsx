//import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Footer from './components/footer';
//import Login from './components/login';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="container mt-5">
       <Header />
      <h1 className="text-center">Welcome to Course Registration</h1>
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;