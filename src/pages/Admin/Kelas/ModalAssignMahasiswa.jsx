import React, { useState, useMemo } from 'react';
import { toastSuccess, toastError } from '../../../Utils/Helpers/ToastHelpers';
import { useUpdateKelas, useFetchKelas } from '../../../Utils/hooks/useKelas'; // Import useFetchKelas
import { useFetchMahasiswas } from '../../../Utils/hooks/useMahasiswa';
import Card from '../../../components/Card';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';

const ModalAssignMahasiswa = ({ kelas, onClose }) => {
  const [selectedIds, setSelectedIds] = useState(kelas.mahasiswaIds || []);
  
  const updateMutation = useUpdateKelas();
  const { data: mahasiswas, isLoading } = useFetchMahasiswas();
  
  // AMBIL SEMUA DATA KELAS UNTUK KALKULASI SKS
  const { data: allKelas } = useFetchKelas();

  const sksKelasIni = kelas.mataKuliah?.sks || 0;

  // Fungsi Hitung SKS yang sudah diambil mahasiswa (dari kelas lain)
  const calculateCurrentSks = (mhsId) => {
    if (!allKelas) return 0;
    
    // Cari semua kelas yang diikuti mahasiswa ini
    const kelasDiikuti = allKelas.filter(k => 
      k.mahasiswaIds?.includes(mhsId) && k.id !== kelas.id // Jangan hitung kelas saat ini (karena sedang diedit)
    );

    // Jumlahkan SKS-nya
    return kelasDiikuti.reduce((total, k) => {
      return total + (k.mataKuliah?.sks || 0);
    }, 0);
  };

  const handleToggle = (mhsId) => {
    const mhs = mahasiswas?.find(m => m.id === mhsId);
    const currentSks = calculateCurrentSks(mhsId);
    const maxSks = mhs?.maxSks || 24;
    const isSelected = selectedIds.includes(mhsId);

    if (!isSelected) {
      // Validasi Saat Menambah
      if (currentSks + sksKelasIni > maxSks) {
        toastError(`Tidak bisa menambahkan. SKS ${mhs.nama} akan melebihi batas (${maxSks} SKS).`);
        return;
      }
      setSelectedIds([...selectedIds, mhsId]);
    } else {
      // Saat Menghapus (Unchecked)
      setSelectedIds(selectedIds.filter(id => id !== mhsId));
    }
  };

  const handleSave = () => {
    updateMutation.mutate({
      id: kelas.id,
      data: { ...kelas, mahasiswaIds: selectedIds }
    }, {
      onSuccess: () => {
        toastSuccess("Berhasil update anggota kelas");
        onClose();
      },
      onError: () => toastError("Gagal update")
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <Heading as="h3" className="text-lg font-bold">
              Atur Mahasiswa: {kelas.namaKelas}
            </Heading>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl font-bold">&times;</button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            SKS Mata Kuliah: <span className="font-bold text-blue-600">{sksKelasIni}</span>
          </p>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? <p>Loading...</p> : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-3 text-left">Nama Mahasiswa</th>
                  <th className="p-3 text-center">SKS Diambil</th> {/* Ini yang penting */}
                  <th className="p-3 text-center">Max SKS</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswas?.map(mhs => {
                  const currentSks = calculateCurrentSks(mhs.id); // Hitung dinamis
                  const isSelected = selectedIds.includes(mhs.id);

                  return (
                    <tr key={mhs.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{mhs.nama}</td>
                      {/* TAMPILKAN JUMLAH SKS NYATA DI SINI */}
                      <td className="p-3 text-center font-bold text-blue-600">{currentSks}</td>
                      <td className="p-3 text-center">{mhs.maxSks}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleToggle(mhs.id)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                            isSelected 
                              ? 'bg-green-500 text-white hover:bg-green-600' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {isSelected ? 'Terpilih' : 'Pilih'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Batal</Button>
          <Button variant="primary" onClick={handleSave} disabled={updateMutation.isPending}>
            Simpan Perubahan
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ModalAssignMahasiswa;