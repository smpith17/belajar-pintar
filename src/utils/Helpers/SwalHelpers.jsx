import Swal from 'sweetalert2';

export const confirmLogout = async () => {
  const result = await Swal.fire({
    title: 'Logout?',
    text: 'Anda yakin ingin keluar dari aplikasi?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  });
  return result.isConfirmed;
};

// Fungsi ini yang hilang, sekarang ditambahkan
export const confirmDelete = async (itemName) => {
  const result = await Swal.fire({
    title: 'Hapus Data?',
    text: `Data "${itemName}" akan dihapus permanen.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal'
  });
  return result.isConfirmed;
};