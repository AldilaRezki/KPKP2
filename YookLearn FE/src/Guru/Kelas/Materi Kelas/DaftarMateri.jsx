import React, { useEffect, useState } from "react";
import HeaderGuru from "../../HeaderGuru";
import HeaderKelas from "../HeaderKelas";
import BoxDaftarMateri from "./BoxDaftarMateri";
import Header from "../../Header";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../../../Common/services/Auth";
import { fetchAllMateri } from "../../services/GuruAPI";

function DaftarMateri() {
  const navigate = useNavigate();
  const { idMapel } = useParams();
  const login = isAuthenticated("guru");
  const [dataMateri, setMateri] = useState([]);

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllMateri(idMapel);
      setMateri(data);
      // setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <HeaderGuru></HeaderGuru>
      <HeaderKelas idMapel = {idMapel}></HeaderKelas>
      <div className="flex mt-10 mx-10 p-2 justify-between">
        <h1 className="my-auto text-xl font-medium text-biru">Daftar Materi</h1>
        <a
          className="tombolTambahForum  flex flex-row justify-between text-white bg-biru w-fit rounded-full py-3"
          href={`/guru/mapel/${idMapel}/materi/tambah-materi`}
        >
          <span className="px-5">+</span>
          <span className="pr-6"> Tambah Materi</span>
        </a>
      </div>
      <div>
        {dataMateri.map((materi) => (
          <BoxDaftarMateri
            key={materi.id}
            idMateri={materi.id}
            idMapel={idMapel}
            judulMateri={materi.judul_materi}
            uploadMateri={materi.created_at}
          />
        ))}
      </div>
    </div>
  );
}

export default DaftarMateri;
