import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Heading from '../../components/Heading';
import Button from '../../components/Button';

// Import Recharts Components
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Import Custom Hooks
import { useFetchModuls } from '../../utils/hooks/useModul';
import { useFetchDosens } from '../../utils/hooks/useDosen';
import { useFetchMatakuliah } from '../../utils/hooks/useMatakuliah';
import { useFetchMahasiswas } from '../../utils/hooks/useMahasiswa'; // Ganti useUsers dengan useMahasiswa

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Fetch all data
  const { data: moduls } = useFetchModuls();
  
  // PERBAIKAN 1: Ambil totalCount untuk Dosen
  // Hook ini return { data: [...], totalCount: N }
  const { data: dosenResponse } = useFetchDosens(1, 1); // Fetch sedikit data, kita cuma butuh totalCount
  const totalDosen = dosenResponse?.totalCount || 0;

  const { data: mataKuliahs } = useFetchMatakuliah();
  const { data: mahasiswas } = useFetchMahasiswas(); // Ambil data mahasiswa

  // --- DATA PREPARATION FOR CHARTS ---

  // 1. Data untuk Pie Chart (Status Modul)
  const completedCount = moduls?.filter(m => m.completed).length || 0;
  const pendingCount = moduls?.length - completedCount;
  const pieData = [
    { name: 'Selesai', value: completedCount },
    { name: 'Belum Selesai', value: pendingCount }
  ];
  const COLORS = ['#00C49F', '#FF8042']; // Green & Orange

  // 2. Data untuk Bar Chart (Ringkasan Total Data)
  const summaryData = [
    { name: 'Dosen', total: totalDosen }, // Gunakan variabel totalDosen
    { name: 'Mata Kuliah', total: mataKuliahs?.length || 0 },
    { name: 'Mahasiswa', total: mahasiswas?.length || 0 }, // Ganti Users jadi Mahasiswa
    { name: 'Modul', total: moduls?.length || 0 },
  ];

  // 3. Data untuk Bar Chart (Distribusi SKS)
  const sksData = mataKuliahs?.map(mk => ({ name: mk.nama, sks: mk.sks })) || [];

  return (
    <div className="space-y-8">
      
      {/* Header Profil */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <p className="text-blue-100 text-lg font-medium mb-1">Selamat datang kembali 👋</p>
          <h1 className="text-3xl font-extrabold tracking-tight">{user.name || 'Mahasiswa'}</h1>
          <div className="mt-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">NIM</span>
              <span className="font-medium">{user.nim || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">Email</span>
              <span className="font-medium">{user.email || 'email@domain.com'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Pie Chart (Status Modul) */}
        <Card className="p-6">
          <Heading level="h3" className="mb-4 text-gray-700">Status Modul</Heading>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Bar Chart (Ringkasan Data) */}
        <Card className="p-6">
          <Heading level="h3" className="mb-4 text-gray-700">Ringkasan Data</Heading>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3B82F6" name="Jumlah" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 3: Bar Chart (Distribusi SKS) - Full Width */}
        <Card className="p-6 lg:col-span-2">
          <Heading level="h3" className="mb-4 text-gray-700">Distribusi SKS Mata Kuliah</Heading>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sksData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sks" fill="#82ca9d" name="Jumlah SKS" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Action Button */}
      <Link to="/admin/kelas">
        <Button variant="primary" className="w-full py-3 mt-4">
          Mulai Belajar Sekarang
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;