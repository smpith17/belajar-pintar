import React, { useState } from 'react';
import { toastSuccess, toastError } from '../../../Utils/Helpers/ToastHelpers';
import { useAddKelas, getDosenSks } from '../../../Utils/hooks/useKelas';
import { useFetchDosens } from '../../../Utils/hooks/useDosen';
import { useFetchMatakuliah } from '../../../Utils/hooks/useMatakuliah';
import Card from '../../../components/Card';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const ModalKelas = ({ onClose }) => {
  const [form, setForm] = useState({ namaKelas: '', mataKuliahId: '', dosenId: '' });
  
  const addMutation = useAddKelas();

  // PERBAIKAN PAGINATION DOSEN
  const { data: dosenResponse } = useFetchDosens(1, 100); 
  const dosens = dosenResponse?.data || []; 

  const { data: mataKuliahs } = useFetchMatakuliah();

  const selectedMK = mataKuliahs?.find(m => m.id === Number(form.mataKuliahId));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.namaKelas || !form.mataKuliahId || !form.dosenId) return toastError("Lengkapi form!");

    try {
      const currentDosenSks = await getDosenSks(form.dosenId);
      const dosenData = dosens?.find(d => d.id === Number(form.dosenId));
      const dosenMax = dosenData?.maxSks || 0;

      if (currentDosenSks + (selectedMK?.sks || 0) > dosenMax) {
        return toastError(`Dosen sudah mencapai batas maksimal SKS (${dosenMax} SKS)!`);
      }

      addMutation.mutate({
        ...form,
        mataKuliahId: Number(form.mataKuliahId),
        dosenId: Number(form.dosenId),
        mahasiswaIds: []
      }, { 
        onSuccess: () => { 
          toastSuccess("Berhasil menambah kelas!"); 
          onClose(); 
        },
        onError: () => {
          toastError("Gagal menyimpan data");
        }
      });
      
    } catch (err) {
      console.error(err);
      toastError("Terjadi error pada validasi SKS");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <Heading as="h3" className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
            Tambah Kelas Baru
          </Heading>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Nama Kelas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kelas
              </label>
              <Input 
                type="text"
                placeholder="Masukkan Nama Kelas"
                value={form.namaKelas}
                onChange={(e) => setForm({...form, namaKelas: e.target.value})}
                // PERBAIKAN: Tambahkan styling agar sama dengan select di bawah
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>

            {/* Select Mata Kuliah */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mata Kuliah
              </label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                value={form.mataKuliahId}
                onChange={(e) => setForm({...form, mataKuliahId: e.target.value})}
              >
                <option value="">-- Pilih Mata Kuliah --</option>
                {mataKuliahs?.map(mk => (
                  <option key={mk.id} value={mk.id}>
                    {mk.nama} ({mk.sks} SKS)
                  </option>
                ))}
              </select>
            </div>

            {/* Select Dosen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosen Pengampu
              </label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                value={form.dosenId}
                onChange={(e) => setForm({...form, dosenId: e.target.value})}
              >
                <option value="">-- Pilih Dosen --</option>
                {dosens?.map(dosen => (
                  <option key={dosen.id} value={dosen.id}>
                    {dosen.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Tambahan */}
            {selectedMK && (
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                Mata kuliah ini memiliki <strong>{selectedMK.sks} SKS</strong>.
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 pt-4 border-t mt-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                disabled={addMutation.isPending}
              >
                {addMutation.isPending ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ModalKelas;