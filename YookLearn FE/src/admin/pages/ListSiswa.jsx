import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faAngleLeft,
  faFileImport,
  faGreaterThan,
  faLessThan,
  faMagnifyingGlass,
  faPen,
  faPersonChalkboard,
  faPlus,
  faTrash,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { fetchAll, removeAccount } from "../../Admin/services/AdminAPI";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Common/services/Auth";
import NavGuru from "../components/NavGuru";
import LoadingPage from "../../Siswa/pages/LoadingPage";

function Daftar() {
  const navigate = useNavigate();
  const login = isAuthenticated("admin");
  const [dataSiswa, setSiswa] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = searchResults.slice(startIndex, endIndex);

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAll("siswa");
      setSiswa(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredSiswa = dataSiswa.filter((siswa) =>
      Object.values(siswa).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSearchResults(filteredSiswa);
  }, [dataSiswa, searchQuery]);

  const handleRemove = async (id) => {
    try {
      setIsRemoving(true);

      const isSuccess = await removeAccount(id);

      if (isSuccess) {
        console.log("Siswa removed successfully");
        setSiswa((prevSiswa) => prevSiswa.filter((siswa) => siswa.id !== id));
      } else {
        console.log("Failed to remove siswa");
      }
    } catch (error) {
      console.log("Error removing siswa:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <NavGuru />
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          <a href="/admin/homepage">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-[#1A1F5A] text-3xl ml-2 pr-3"
            />
          </a>
          <h1 className="text-2xl font-bold text-[#1A1F5A] mb-4">List Siswa</h1>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center">
            <div className="bg-gray-200 p-4 rounded-t-md">
              <FontAwesomeIcon
                icon={faUserTie}
                className="text-[#1A1F5A] text-3xl ml-2"
              />
              <span className=" ml-2 mr-4 font-bold text-xl text-[#1A1F5A]">
                Siswa
              </span>
            </div>
            <div className="p-4 rounded-t-md">
              <a href="/admin/listguru">
                <FontAwesomeIcon
                  icon={faPersonChalkboard}
                  className="text-gray-500 text-2xl"
                />
                <span className=" ml-2 font-bold text-lg text-gray-500">
                  Guru
                </span>
              </a>
            </div>
            <div className="p-4 rounded-t-md">
              <a href="/admin/listakun">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="text-gray-500 text-2xl"
                />
                <span className=" ml-2 font-bold text-lg text-gray-500">
                  Akun
                </span>
              </a>
            </div>
          </span>

          <span className="flex items-center">
            {/* <div className="bg-gray-200 p-2 rounded-md m-2">
              <button
                type="button"
                className=" text-white px-10 rounded-md "
                onClick={handleImportClick}
              >
                <FontAwesomeIcon
                  icon={faFileImport}
                  className="text-[#1A1F5A] text-3xl ml-2"
                />
                <span className=" ml-2 mr-4 font-bold text-xl text-[#1A1F5A]">
                  Import
                </span>
              </button>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div> */}
            <div className="bg-gray-200 p-2 rounded-md">
              <a href="/admin/daftarsiswa">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[#1A1F5A] text-3xl ml-2"
                />
                <span className=" ml-2 mr-4 font-bold text-xl text-[#1A1F5A]">
                  Tambahkan Siswa
                </span>
              </a>
            </div>
          </span>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-none">
          <div className="p-2 bg-gray-200">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[#1A1F5A] px-2 pr-4"
            />
            <input
              className="w-11/12 border rounded-lg px-4 py-2"
              type="text"
              placeholder="Cari Siswa"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  NISN Peserta
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  L/P
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Agama
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Lengkap
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th> */}
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedResults.map((student, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.nisn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.jenis_kelamin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.agama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.nama_lengkap}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.username}
                  </td> */}
                  <td className="pl-2 pr-1">
                    <a href={`/admin/siswa/edit/${student.id}`}>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="text-[#1A1F5A]"
                      />
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemove(student.id)}
                      disabled={isRemoving}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-[#1A1F5A]"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center py-4">
            <div className="px-2">
              <FontAwesomeIcon icon={faLessThan} className="text-[#1A1F5A]" />
            </div>
            {Array.from(
              { length: Math.ceil(searchResults.length / itemsPerPage) },
              (_, index) => (
                <div
                  key={index + 1}
                  className={`px-2 ${
                    currentPage === index + 1 ? "font-bold" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </div>
              )
            )}
            <div className="px-2">
              <FontAwesomeIcon
                icon={faGreaterThan}
                className="text-[#1A1F5A]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daftar;
