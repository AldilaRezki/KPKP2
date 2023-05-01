import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { BsList } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import MapelCard from '../components/MapelCard';

const Mapel = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the search term
    console.log(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div>
        <Header />
        <Nav />
      </div>
      <div className='flex flex-col justify-start'>
        <div className='mt-16 ml-10 w-1/2 flex'>
          <BsList className='text-[#1A1F5A] text-2xl' />
          <h1 className='text-xl ml-5 text-slate-400 font-bold'>Daftar Mata Pelajaran</h1>
        </div>
        <div className='flex justify-end mr-10'>
          <form onSubmit={handleSubmit} className='flex items-center'>
            <input
              type='text'
              placeholder='Cari'
              value={searchTerm}
              onChange={handleChange}
              className=' rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
              type='submit'
              className='px-4 py-2 bg-[#1A1F5A] text-white rounded-r-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 mt-10 mx-10'>
        <div>
          <MapelCard namaMapel='Bahasa Indonesia' namaPengajar='Lorem Ipsum S.Pd' jadwal='Selasa, 09.00 - 11.00' />
        </div>
        <div>
          <MapelCard namaMapel='Matematika' namaPengajar='Lorem Ipsum S.Pd' jadwal='Selasa, 09.00 - 11.00' />
        </div>
        <div>
          <MapelCard namaMapel='Bahasa Inggris' namaPengajar='Lorem Ipsum S.Pd' jadwal='Selasa, 09.00 - 11.00' />
        </div>
        <div>
          <MapelCard namaMapel='Fisika' namaPengajar='Lorem Ipsum S.Pd' jadwal='Selasa, 09.00 - 11.00' />
        </div>
        <div>
          <MapelCard namaMapel='Kimia' namaPengajar='Lorem Ipsum S.Pd' jadwal='Selasa, 09.00 - 11.00' />
        </div>
        <div>
          <MapelCard namaMapel='Biologi' namaPengajar='Lorem Ipsum S.Pd' jadwal='Selasa, 09.00 - 11.00' />
        </div>
      </div>
    </>
  );
};

export default Mapel;