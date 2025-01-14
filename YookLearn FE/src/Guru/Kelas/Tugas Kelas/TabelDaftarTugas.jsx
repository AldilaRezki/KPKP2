import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { fetchTugas, removeTugas } from "../../services/GuruAPI";

function TabelDaftarTugas({ idMapel, idTugas, dataTugas, setTugas }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (id) => {
    try {
      setIsRemoving(true);

      const isSuccess = await removeTugas(idMapel, id);

      if (isSuccess) {
        console.log("Tugas removed successfully");
        setTugas((prevTugas) => prevTugas.filter((tugas) => tugas.id !== id));
      } else {
        console.log("Failed to remove Tugas");
      }
    } catch (error) {
      console.log("Error removing Tugas:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col ml-10 mt-14 mr-10 border-[0.3px] py-2 px-5 shadow-md">
        <table className="border-separate border-spacing-y-5">
          <thead>
            <tr className="bg-tosca">
              <th className="py-2 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru">
                Judul
              </th>
              <th className="py-2 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru">
                Batas Unggah
              </th>
              <th className="py-2 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru">
                Jumlah Pengunggah
              </th>
              <th className="py-2 border-l-[1px] border-t-[1px] border-b-[1px] border-r-[1px] shadow-md border-biru">
                Edit/Hapus
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTugas.map((tugas) => (
              <tr key={tugas.id} className="border-[0.3px] shadow-md">
                <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                  <a
                    href={`/guru/mapel/${idMapel}/tugas/${tugas.id}/detail-tugas`}
                    className="block"
                  >
                    {tugas.judul_tugas}
                  </a>
                </td>
                <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                  {tugas.deadline}
                </td>
                <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                  {tugas.total}
                </td>
                <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] border-r-[1px] shadow-md border-biru text-center">
                  <a href={`/guru/mapel/${idMapel}/edit-tugas/${tugas.id}`}>
                    <MdModeEditOutline className="text-2xl mr-2 inline-block" />
                  </a>
                  <button>
                    <MdDeleteOutline
                      className="text-2xl inline-block mb-[1px]"
                      onClick={() => handleRemove(tugas.id)}
                      disabled={isRemoving}
                    />
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr className="border-[0.3px] shadow-md">
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                Tugas Lorem Ipsum
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                12-03-2023 23:59:59
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                23/35
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] border-r-[1px] shadow-md border-biru text-center">
                <MdModeEditOutline className="text-2xl mr-2 inline-block"></MdModeEditOutline>
                <MdDeleteOutline className="text-2xl inline-block mb-[1px]"></MdDeleteOutline>
              </td>
            </tr>
            <tr className="border-[0.3px] shadow-md">
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                Tugas Lorem Ipsum
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                12-03-2023 23:59:59
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                23/35
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] border-r-[1px] shadow-md border-biru text-center">
                <MdModeEditOutline className="text-2xl mr-2 inline-block"></MdModeEditOutline>
                <MdDeleteOutline className="text-2xl inline-block mb-[1px]"></MdDeleteOutline>
              </td>
            </tr>
            <tr className="border-[0.3px] shadow-md">
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                Tugas Lorem Ipsum
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                12-03-2023 23:59:59
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                23/35
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] border-r-[1px] shadow-md border-biru text-center">
                <MdModeEditOutline className="text-2xl mr-2 inline-block"></MdModeEditOutline>
                <MdDeleteOutline className="text-2xl inline-block mb-[1px]"></MdDeleteOutline>
              </td>
            </tr>
            <tr className="border-[0.3px] shadow-md">
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                Tugas Lorem Ipsum
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                12-03-2023 23:59:59
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] shadow-md border-biru text-center">
                23/35
              </td>
              <td className="py-2 px-3 border-l-[1px] border-t-[1px] border-b-[1px] border-r-[1px] shadow-md border-biru text-center">
                <MdModeEditOutline className="text-2xl mr-2 inline-block"></MdModeEditOutline>
                <MdDeleteOutline className="text-2xl inline-block mb-[1px]"></MdDeleteOutline>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelDaftarTugas;
