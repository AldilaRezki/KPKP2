import React from "react";
import { GrDocumentText } from "react-icons/gr";

function BoxDaftarMateri({ idMapel, idMateri, judulMateri, uploadMateri }) {
  return (
    <a href={`/guru/mapel/${idMapel}/materi/${idMateri}/isi-materi`}>
      <div className="flex justify-between border-[0.3px] my-10 p-8 shadow-md mx-40">
        <div className="flex gap-x-4 px-8">
          <div className="bg-tosca text-xl p-3 rounded-full my-auto">
            <GrDocumentText></GrDocumentText>
          </div>
          <span className="p-3 text-xl">{judulMateri}</span>
        </div>
        <div className="py-2 px-7">
          <span className="opacity-80">Diunggah: {uploadMateri}</span>
        </div>
      </div>
    </a>
  );
}

export default BoxDaftarMateri;
