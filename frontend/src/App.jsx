import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import UserRouter from './Routes/UserRouter';
import AdminRouter from './Routes/AdminRouter';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading && (<div className='spinner-parent'>
        <div class="spinner-border text-primary" role="status">
        </div>
      </div>)}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/*' element={<UserRouter />} />
        <Route path='/admin/*' element={<AdminRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
