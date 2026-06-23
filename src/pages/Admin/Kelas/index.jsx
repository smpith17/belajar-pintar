import React, { useState } from 'react';
// Import Hook yang sudah diperbaiki
import { useFetchKelas, useDeleteKelas } from '../../../utils/hooks/useKelas';
import { useFetchDosens } from '../../../utils/hooks/useDosen';
import { useFetchMatakuliah } from '../../../utils/hooks/useMatakuliah';

import Card from '../../../components/Card';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import ModalKelas from './ModalKelas';
import ModalAssignMahasiswa from './ModalAssignMahasiswa';

// Import Helper Toast & Swal
import { toastSuccess, toastError } from '../../../Utils/Helpers/ToastHelpers';
import { confirmDelete } from '../../../Utils/Helpers/SwalHelpers'; // <--- IMPORT FUNGSI INI

const Kelas = () => {
  // Fetching Data
  const { data: kelasList, isLoading } = useFetchKelas();
  const deleteMutation = useDeleteKelas();

  // State untuk Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);

  // --- FUNGSI HAPUS DENGAN SWAL ---
  const handleDelete = async (id, namaKelas) => {
    // 1. Panggil konfirmasi dari SwalHelpers
    const isConfirmed = await confirmDelete(namaKelas);

    // 2. Jika user klik "Ya, Hapus"
    if (isConfirmed) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          toastSuccess("Data kelas berhasil dihapus");
        },
        onError: () => {
          toastError("Gagal menghapus data");
        }
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Heading as="h2" className="text-2xl font-bold">Manajemen Kelas</Heading>
        <Button onClick={() => setShowAddModal(true)}>+ Tambah Kelas</Button>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-4">Nama Kelas</th>
              <th className="p-4">Mata Kuliah</th>
              <th className="p-4">Dosen</th>
              <th className="p-4">SKS</th>
              <th className="p-4">Mahasiswa</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6" className="text-center p-8">Loading...</td></tr>
            ) : (
              kelasList?.map(kelas => (
                <tr key={kelas.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{kelas.namaKelas}</td>
                  <td className="p-4">{kelas.mataKuliah?.nama || '-'}</td>
                  <td className="p-4">{kelas.dosen?.nama || '-'}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                      {kelas.mataKuliah?.sks || 0}
                    </span>
                  </td>
                  <td className="p-4">{kelas.mahasiswaIds?.length || 0} Mahasiswa</td>
                  
                  <td className="p-4 text-center space-x-1">
                    <Button 
                      variant="secondary" 
                      className="bg-green-100 text-green-700 hover:bg-green-200 text-xs"
                      onClick={() => setSelectedKelas(kelas)}
                    >
                      👥 Atur Mhs
                    </Button>
                    
                    {/* TOMBOL HAPUS */}
                    <Button 
                      variant="danger" 
                      className="text-xs"
                      onClick={() => handleDelete(kelas.id, kelas.namaKelas)}
                      disabled={deleteMutation.isPending}
                    >
                      🗑️ Hapus
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Modal Tambah */}
      {showAddModal && <ModalKelas onClose={() => setShowAddModal(false)} />}

      {/* Modal Assign Mahasiswa */}
      {selectedKelas && (
        <ModalAssignMahasiswa 
          kelas={selectedKelas} 
          onClose={() => setSelectedKelas(null)} 
        />
      )}
    </div>
  );
};

export default Kelas;