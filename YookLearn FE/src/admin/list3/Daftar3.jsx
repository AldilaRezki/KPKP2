import React from "react";
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

function Daftar3() {
  const students = [
    { id: 1, name: "Harper Lee", status: "Guru" },
    { id: 2, name: "Logan Cole", status: "Guru" },
    { id: 3, name: "Ava Grace", status: "Murid" },
    { id: 4, name: "Lily Grace", status: "Murid" },
    { id: 5, name: "Ethan James", status: "Admin" },
    { id: 6, name: "Olivia Mae", status: "Admin" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-blue-950 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold font-mono">YookLearn</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          <a href="/">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-blue-950 text-3xl ml-2 pr-3"
            />
          </a>
          <h1 className="text-2xl font-bold text-blue-950 mb-4">Daftar Akun</h1>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center">
            <div className="p-3 rounded-t-md">
              <a href="/list/">
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="text-gray-500 text-2xl"
                />
                <span className=" ml-2 font-bold text-lg text-gray-500">
                  Siswa
                </span>
              </a>
            </div>
            <div className="p-3 rounded-t-md">
              <a href="/list2/">
                <FontAwesomeIcon
                  icon={faPersonChalkboard}
                  className="text-gray-500 text-2xl"
                />
                <span className=" ml-2 font-bold text-lg text-gray-500">
                  Guru
                </span>
              </a>
            </div>
            <div className="bg-gray-200 p-4 rounded-t-md">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="text-blue-950 text-3xl ml-2"
              />
              <span className=" ml-2 mr-4 font-bold text-xl text-blue-950">
                Akun
              </span>
            </div>
          </span>
          <span className="flex items-center">
            <div className="bg-gray-200 p-2 rounded-md m-2">
              <a href="">
                <FontAwesomeIcon
                  icon={faFileImport}
                  className="text-blue-950 text-3xl ml-2"
                />
                <span className=" ml-2 mr-4 font-bold text-xl text-blue-950">
                  Import
                </span>
              </a>
            </div>
            <div className="bg-gray-200 p-2 rounded-md">
              <a href="/ltadmin/">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-blue-950 text-3xl ml-2"
                />
                <span className=" ml-2 mr-4 font-bold text-xl text-blue-950">
                  Tambahkan Admin
                </span>
              </a>
            </div>
          </span>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-none">
          <div className="p-2 bg-gray-200">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-blue-950 px-2 pr-4"
            />
            <input
              type="text"
              className="w-11/12 border rounded-lg px-4 py-2"
              placeholder="Cari Guru"
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
                  Nama Lengkap
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.status}
                  </td>
                  <td className="pl-2 pr-1">
                    <FontAwesomeIcon icon={faPen} className="text-blue-950" />
                  </td>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faTrash} className="text-blue-950" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center py-4">
            <div className="px-2">
              <FontAwesomeIcon icon={faLessThan} className="text-blue-950" />
            </div>
            <div className="px-2">1</div>
            <div className="px-2">2</div>
            <div className="px-2">3</div>
            <div className="px-2">...</div>
            <div className="px-2">9</div>
            <div className="px-2">10</div>
            <div className="px-2">
              <FontAwesomeIcon icon={faGreaterThan} className="text-blue-950" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Daftar3;
