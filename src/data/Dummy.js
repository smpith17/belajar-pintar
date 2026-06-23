// src/data/Dummy.js

export const dummyUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "Yobby Azriel Iqdhi Vianta",
    nim: "A11.2023.14890", // Tambahkan NIM
    email: "yobby@mahasiswa.dinus.ac.id", // Tambahkan Email
    role: "user"
  },
  {
    id: 2,
    username: "student",
    password: "student123",
    name: "Ani Lestari",
    nim: "A11.2022.54321",
    email: "ani@mahasiswa.dinus.ac.id",
    role: "user"
  }
];

export const dummyModules = [
  { 
    id: 1, 
    title: "Pengenalan React JS", 
    description: "Mempelajari konsep dasar React.js termasuk pengertian library, keunggulan Single Page Application (SPA), cara kerja Virtual DOM dalam meningkatkan performa, serta praktik penulisan sintaks JSX untuk membangun struktur UI yang dinamis dan modular.", 
    completed: false 
  },
  { 
    id: 2, 
    title: "Component & Props", 
    description: "Mendalami teknik pemecahan User Interface menjadi komponen-komponen kecil yang reusable (dapat digunakan kembali). Materi mencakup perbedaan Functional dan Class Component, serta cara komunikasi data antar komponen menggunakan Props untuk membangun aplikasi yang terstruktur.", 
    completed: false 
  },
  { 
    id: 3, 
    title: "State & Lifecycle", 
    description: "Memahami konsep State sebagai memori lokal komponen yang dapat berubah seiring interaksi user. Materi meliputi penggunaan useState Hook, perbedaan stateful dan stateless component, serta pemahaman Lifecycle methods pada Class Component untuk kontrol efek samping.", 
    completed: false 
  },
  { 
    id: 4, 
    title: "Handling Events", 
    description: "Praktik menangani interaksi pengguna seperti klik tombol, submit form, dan input keyboard. Materi mencakup penulisan Event Handler, penggunaan Synthetic Event di React, binding method pada class component, serta best practice dalam manipulasi DOM secara deklaratif.", 
    completed: false 
  },
];