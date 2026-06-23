import React, { useState } from 'react';
import { toastSuccess, toastError } from '../../../utils/Helpers/ToastHelpers';
import Card from '../../../components/Card';
import Heading from '../../../components/Heading';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

// Import Custom Hooks React Query
import { useFetchUsers, useUpdateUser } from '../../../utils/hooks/useUsers';

// Daftar Permission yang tersedia (Master Data)
const AVAILABLE_PERMISSIONS = [
  { key: 'manage_users', label: 'Kelola User' },
  { key: 'manage_dosen', label: 'Kelola Dosen' },
  { key: 'manage_matakuliah', label: 'Kelola Mata Kuliah' },
  { key: 'view_modul', label: 'Lihat Modul' },
];

const Users = () => {
  // Gunakan Custom Hooks untuk Fetch Data
  const { data: users, isLoading, isError } = useFetchUsers();
  const updateMutation = useUpdateUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: '', permissions: [] });

  // Handle Change Text/Select
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Change Checkbox Permission
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setForm({ ...form, permissions: [...form.permissions, value] });
    } else {
      setForm({ ...form, permissions: form.permissions.filter(p => p !== value) });
    }
  };

  // Open Edit Modal
  const openEdit = (user) => {
    setEditData(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions || []
    });
    setIsModalOpen(true);
  };

  // Submit Update menggunakan Mutation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateMutation.mutate(
      { 
        id: editData.id, 
        data: {
          name: form.name,
          role: form.role,
          permissions: form.permissions
        }
      },
      {
        onSuccess: () => {
          toastSuccess("Role & Permission berhasil diupdate");
          setIsModalOpen(false);
        },
        onError: () => {
          toastError("Gagal update data");
        }
      }
    );
  };

  // Loading State
  if (isLoading) return <p className="p-8 text-center text-gray-500">Memuat data user...</p>;
  
  // Error State
  if (isError) return <p className="p-8 text-center text-red-500">Gagal memuat data user.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Heading level="h1">Manajemen User & Hak Akses</Heading>
      </div>

      <Card>
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-sm font-semibold">Nama</th>
              <th className="p-3 text-sm font-semibold">Username</th>
              <th className="p-3 text-sm font-semibold">Role</th>
              <th className="p-3 text-sm font-semibold">Permissions</th>
              <th className="p-3 text-sm font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </td>
                <td className="p-3">{u.username}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                    u.role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {u.permissions && u.permissions.map(p => (
                      <span key={p} className="bg-gray-100 text-gray-600 px-2 py-0.5 text-xs rounded">
                        {p.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <Button variant="warning" onClick={() => openEdit(u)}>
                    Edit Akses
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal Edit Role & Permission */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <Heading level="h2" className="mb-4">Edit Role & Permission</Heading>
            <p className="text-sm text-gray-500 mb-4">User: <strong>{editData?.username}</strong></p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Nama" name="name" value={form.name} onChange={handleChange} />
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Role</label>
                <select 
                  name="role" 
                  value={form.role} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Permissions</label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <label key={perm.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={perm.key}
                        checked={form.permissions.includes(perm.key)}
                        onChange={handlePermissionChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" variant="primary">Simpan Perubahan</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Users;