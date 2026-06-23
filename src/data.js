// src/data.js
export const db = {
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "admin123",
      "name": "Yobby Azriel Iqdhi Vianta",
      "nim": "A11.2023.14890",
      "email": "yobby@mahasiswa.dinus.ac.id",
      "role": "admin",
      "permissions": ["manage_users", "manage_dosen", "manage_matakuliah"]
    },
    {
      "id": 2,
      "username": "student",
      "password": "student123",
      "name": "Ani Lestari",
      "nim": "A11.2022.54321",
      "email": "ani@mahasiswa.dinus.ac.id",
      "role": "user",
      "permissions": ["view_modul"]
    }
  ],
  "dosens": [
    {"id": 1, "nama": "Dr. Ahmad Subhan", "nidn": "0012345678", "mataKuliah": "Pemrograman Web", "maxSks": 10},
    {"id": 2, "nama": "Prof. Budi Santoso", "nidn": "0098765432", "mataKuliah": "Basis Data", "maxSks": 12},
    {"id": 3, "nama": "Bapak Joko", "nidn": "00083924832", "mataKuliah": "Pemrograman Sisi Klien", "maxSks": 8},
    {"id": 4, "nama": "Dr. Citra Dewi", "nidn": "0011223344", "mataKuliah": "Algoritma", "maxSks": 14},
    {"id": 5, "nama": "Prof. Eka Pratama", "nidn": "0055667788", "mataKuliah": "Jaringan Komputer", "maxSks": 10},
    {"id": 6, "nama": "Dr. Fitri Handayani", "nidn": "1122334455", "mataKuliah": "Kecerdasan Buatan", "maxSks": 9},
    {"id": 7, "nama": "Dr. Gita Nirmala", "nidn": "2233445566", "mataKuliah": "Data Mining", "maxSks": 11},
    {"id": 8, "nama": "Prof. Hasan Ali", "nidn": "3344556677", "mataKuliah": "Cloud Computing", "maxSks": 12},
    {"id": 9, "nama": "Dr. Irna Setiawati", "nidn": "4455667788", "mataKuliah": "Sistem Operasi", "maxSks": 10},
    {"id": 10, "nama": "Prof. Joko Widodo", "nidn": "5566778899", "mataKuliah": "Statistika", "maxSks": 14},
    {"id": 11, "nama": "Dr. Kartika Sari", "nidn": "6677889900", "mataKuliah": "Mobile Programming", "maxSks": 8},
    {"id": 12, "nama": "Prof. Leo Firmansyah", "nidn": "7788990011", "mataKuliah": "Rekayasa Perangkat Lunak", "maxSks": 9},
    {"id": 13, "nama": "Dr. Maya Putri", "nidn": "8899001122", "mataKuliah": "Sistem Informasi", "maxSks": 12},
    {"id": 14, "nama": "Prof. Nandan Kumar", "nidn": "9900112233", "mataKuliah": "Keamanan Siber", "maxSks": 10},
    {"id": 15, "nama": "Dr. Ophelia", "nidn": "1010202030", "mataKuliah": "Internet of Things", "maxSks": 11}
  ],
  "mataKuliahs": [
    {"id": 1, "kode": "A11.4421", "nama": "Pemrograman Web", "sks": 3},
    {"id": 2, "kode": "A11.4422", "nama": "Basis Data", "sks": 4},
    {"id": 3, "kode": "A11.4423", "nama": "Algoritma & Pemrograman", "sks": 4},
    {"id": 4, "kode": "A11.4424", "nama": "Jaringan Komputer", "sks": 3},
    {"id": 5, "kode": "A11.4425", "nama": "Mobile App Development", "sks": 3},
    {"id": 6, "kode": "A11.4426", "nama": "Kecerdasan Buatan", "sks": 3},
    {"id": 7, "kode": "A11.4427", "nama": "Data Mining", "sks": 3},
    {"id": 8, "kode": "A11.4428", "nama": "Cloud Computing", "sks": 3},
    {"id": 9, "kode": "A11.4429", "nama": "Sistem Operasi", "sks": 2},
    {"id": 10, "kode": "A11.4430", "nama": "Statistika", "sks": 2},
    {"id": 11, "kode": "A11.4431", "nama": "Sistem Informasi Manajemen", "sks": 3},
    {"id": 12, "kode": "A11.4432", "nama": "Etika Profesi", "sks": 2}
  ],
  "mahasiswas": [
    {"id": 1, "nim": "A11.2023.14890", "nama": "Yobby Azriel Iqdhi Vianta", "maxSks": 24},
    {"id": 2, "nim": "A11.2022.54321", "nama": "Ani Lestari", "maxSks": 21},
    {"id": 3, "nim": "A11.2021.11111", "nama": "Budi Hartono", "maxSks": 18},
    {"id": 4, "nim": "A11.2020.22222", "nama": "Dewi Puspita", "maxSks": 24},
    {"id": 5, "nim": "A11.2023.33333", "nama": "Eko Prasetyo", "maxSks": 20},
    {"id": 6, "nim": "A11.2023.44444", "nama": "Farah Diba", "maxSks": 22}
  ],
  "kelas": [
    {
      "id": 1, "namaKelas": "TI-A Pagi", "mataKuliahId": 1, "dosenId": 1, "mahasiswaIds": [1, 2],
      "dosen": {"id": 1, "nama": "Dr. Ahmad Subhan", "nidn": "0012345678", "mataKuliah": "Pemrograman Web", "maxSks": 10},
      "mataKuliah": {"id": 1, "kode": "A11.4421", "nama": "Pemrograman Web", "sks": 3},
      "mahasiswaList": [{"id": 1, "nim": "A11.2023.14890", "nama": "Yobby Azriel Iqdhi Vianta", "maxSks": 24}, {"id": 2, "nim": "A11.2022.54321", "nama": "Ani Lestari", "maxSks": 21}, {"id": 3, "nim": "A11.2021.11111", "nama": "Budi Hartono", "maxSks": 18}]
    },
    {
      "id": 2, "namaKelas": "TI-B Pagi", "mataKuliahId": 2, "dosenId": 3, "mahasiswaIds": [1, 2, 3],
      "dosen": {"id": 3, "nama": "Bapak Joko", "nidn": "00083924832", "mataKuliah": "Pemrograman Sisi Klien", "maxSks": 8},
      "mataKuliah": {"id": 2, "kode": "A11.4422", "nama": "Basis Data", "sks": 4},
      "mahasiswaList": []
    },
    {
      "id": 3, "namaKelas": "TI-C Pagi", "mataKuliahId": 3, "dosenId": 11, "mahasiswaIds": [1, 2, 3, 4],
      "dosen": {"id": 11, "nama": "Dr. Kartika Sari", "nidn": "6677889900", "mataKuliah": "Mobile Programming", "maxSks": 8},
      "mataKuliah": {"id": 3, "kode": "A11.4423", "nama": "Algoritma & Pemrograman", "sks": 4},
      "mahasiswaList": []
    }
  ],
  "moduls": [
    {"id": 1, "title": "Pengenalan React JS", "description": "Konsep dasar React, JSX, Virtual DOM.", "completed": true},
    {"id": 2, "title": "Component & Props", "description": "Functional vs Class Component, Props.", "completed": false},
    {"id": 3, "title": "State & Lifecycle", "description": "useState Hook, Lifecycle Methods.", "completed": false},
    {"id": 4, "title": "Handling Events", "description": "Event handling, Synthetic Events.", "completed": false},
    {"id": 5, "title": "Conditional Rendering", "description": "Ternary operators, logical &&.", "completed": false},
    {"id": 6, "title": "Lists & Keys", "description": "Rendering lists, key prop importance.", "completed": false},
    {"id": 7, "title": "Forms", "description": "Controlled vs Uncontrolled components.", "completed": false},
    {"id": 8, "title": "Hooks Rules", "description": "Rules of Hooks, Custom Hooks intro.", "completed": false},
    {"id": 9, "title": "React Router", "description": "Routing, Link, useParams.", "completed": false},
    {"id": 10, "title": "Context API", "description": "Context Provider, Consumer.", "completed": false},
    {"id": 11, "title": "Redux Basic", "description": "Store, Actions, Reducers.", "completed": false}
  ]
};