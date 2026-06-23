import React, { useState } from 'react';
import { toastSuccess, toastError } from '../../../Utils/Helpers/ToastHelpers';
import { confirmDelete } from '../../../Utils/Helpers/SwalHelpers';
import Card from '../../../components/Card';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

// Import Custom Hooks React Query
import { 
  useFetchMatakuliah, 
  useAddMatakuliah, 
  useUpdateMatakuliah, 
  useDeleteMatakuliah 
} from '../../../Utils/hooks/useMatakuliah';

const MataKuliah = () => {
  // 1. Fetching Data dengan React Query
  const { data: mataKuliahs, isLoading, isError } = useFetchMatakuliah();
  
  // 2. Mutations
  const addMutation = useAddMatakuliah();
  const updateMutation = useUpdateMatakuliah();
  const deleteMutation = useDeleteMatakuliah();

  // Local State for Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({ kode: '', nama: '', sks: '' });

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setEditData(null);
    setForm({ kode: '', nama: '', sks: '' });
    setIsModalOpen(true);
  };

  const openEdit = (data) => {
    setEditData(data);
    setForm({ kode: data.kode, nama: data.nama, sks: data.sks });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Payload: pastikan SKS angka
    const payload = { ...form, sks: Number(form.sks) };

    if (editData) {
      // Update Logic
      updateMutation.mutate(
        { id: editData.id, data: payload },
        {
          onSuccess: () => {
            toastSuccess("Data Mata Kuliah berhasil diupdate");
            setIsModalOpen(false);
          },
          onError: () => toastError("Gagal update data")
        }
      );
    } else {
      // Add Logic
      addMutation.mutate(payload, {
        onSuccess: () => {
          toastSuccess("Data Mata Kuliah berhasil ditambahkan");
          setIsModalOpen(false);
        },
        onError: () => toastError("Gagal menambahkan data")
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDelete("Mata Kuliah ini");
    if (confirmed) {
      deleteMutation.mutate(id, {
        onSuccess: () => toastSuccess("Data berhasil dihapus"),
        onError: () => toastError("Gagal menghapus")
      });
    }
  };

  // Loading & Error State
  if (isLoading) return <p className="p-8 text-center text-gray-500">Memuat data mata kuliah...</p>;
  if (isError) return <p className="p-8 text-center text-red-500">Gagal memuat data.</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Heading level="h1">Manajemen Mata Kuliah</Heading>
        <Button onClick={openAdd}>+ Tambah MK</Button>
      </div>

      {/* Table */}
      <Card>
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-600">Kode</th>
              <th className="p-3 text-sm font-semibold text-gray-600">Nama MK</th>
              <th className="p-3 text-sm font-semibold text-gray-600">SKS</th>
              <th className="p-3 text-sm font-semibold text-gray-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mataKuliahs?.map((mk) => (
              <tr key={mk.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3">{mk.kode}</td>
                <td className="p-3">{mk.nama}</td>
                <td className="p-3">{mk.sks}</td>
                <td className="p-3 text-center space-x-2">
                  <Button variant="warning" onClick={() => openEdit(mk)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(mk.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <Heading level="h2" className="mb-4">{editData ? 'Edit' : 'Tambah'} Mata Kuliah</Heading>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                label="Kode MK" 
                name="kode" 
                value={form.kode} 
                onChange={handleChange} 
                placeholder="Contoh: A11.4421"
                required 
              />
              <Input 
                label="Nama MK" 
                name="nama" 
                value={form.nama} 
                onChange={handleChange} 
                placeholder="Nama Mata Kuliah"
                required 
              />
              <Input 
                label="SKS" 
                name="sks" 
                type="number" 
                value={form.sks} 
                onChange={handleChange} 
                placeholder="Jumlah SKS"
                required 
              />
              
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" variant="primary">
                  Simpan
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MataKuliah;