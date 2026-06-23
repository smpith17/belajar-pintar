import React, { useState } from 'react';
import { toastSuccess, toastError } from '../../../utils/Helpers/ToastHelpers';
import { confirmDelete } from '../../../utils/Helpers/SwalHelpers';
import Card from '../../../components/Card';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Pagination from '../../../components/Pagination'; // Import Pagination

// Import Hooks
import { 
  useFetchDosens, 
  useAddDosen, 
  useUpdateDosen, 
  useDeleteDosen 
} from '../../../utils/hooks/useDosen';

const LIMIT = 5; // Jumlah item per halaman

const Dosen = () => {
  const [page, setPage] = useState(1);
  
  // Gunakan Hook dengan Pagination
  const { data, isLoading, isError } = useFetchDosens(page, LIMIT);
  const addMutation = useAddDosen();
  const updateMutation = useUpdateDosen();
  const deleteMutation = useDeleteDosen();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({ nama: '', nidn: '', mataKuliah: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => {
    setEditData(null);
    setForm({ nama: '', nidn: '', mataKuliah: '' });
    setIsModalOpen(true);
  };

  const openEdit = (data) => {
    setEditData(data);
    setForm({ nama: data.nama, nidn: data.nidn, mataKuliah: data.mataKuliah });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      updateMutation.mutate(
        { id: editData.id, newData: form },
        { onSuccess: () => { toastSuccess("Berhasil diupdate"); setIsModalOpen(false); }
        }
      );
    } else {
      addMutation.mutate(form, {
        onSuccess: () => { toastSuccess("Berhasil ditambah"); setIsModalOpen(false); }
      });
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirmDelete("Data Dosen");
    if (isConfirmed) {
      deleteMutation.mutate(id, { onSuccess: () => toastSuccess("Berhasil dihapus") });
    }
  };

  // Hitung Total Halaman
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / LIMIT);

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;
  if (isError) return <p className="p-8 text-center text-red-500">Error loading data.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Heading level="h1">Manajemen Dosen</Heading>
        <Button onClick={openAdd}>+ Tambah Dosen</Button>
      </div>

      <Card>
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-sm font-semibold">Nama</th>
              <th className="p-3 text-sm font-semibold">NIDN</th>
              <th className="p-3 text-sm font-semibold">Mata Kuliah</th>
              <th className="p-3 text-sm font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((d) => ( // Perhatikan: data sekarang ada di data.data
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.nama}</td>
                <td className="p-3">{d.nidn}</td>
                <td className="p-3">{d.mataKuliah}</td>
                <td className="p-3 text-center space-x-2">
                  <Button variant="warning" onClick={() => openEdit(d)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(d.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Tambahkan Komponen Pagination */}
      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Modal Form (Sama seperti sebelumnya) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <Heading level="h2" className="mb-4">{editData ? 'Edit' : 'Tambah'} Dosen</Heading>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Nama" name="nama" value={form.nama} onChange={handleChange} required />
              <Input label="NIDN" name="nidn" value={form.nidn} onChange={handleChange} required />
              <Input label="Mata Kuliah" name="mataKuliah" value={form.mataKuliah} onChange={handleChange} required />
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" variant="primary">Simpan</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dosen;