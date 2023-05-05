import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Editakun from './components/Editakun';
import { CgProfile } from 'react-icons/cg';
import Listtugas from './components/Listtugas';

function Homepage() {
  return (
    <div>
      <Header />
      <Nav />
      <div className='flex flex-row justify-between'>
        <div className='mt-16 ml-10 bg-[#EEF4FA] rounded-lg shadow-md text-xl w-1/2'>
          <h1 className='font-bold text-center'>SELAMAT DATANG</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quia corporis aliquam. Autem, quae explicabo corporis quos soluta laudantium
            fugiat minima eligendi sequi eius iusto nobis! Error eius libero fuga?
          </p>
        </div>
      </div>

      <div className='flex justify-end px-10 pt-8'>
        <Editakun />
      </div>
      <div className='flex justify-end mt-1.5 mr-10 px-10 mb-20'>
        <Listtugas />
      </div>
    </div>
  );
}

export default Homepage;
