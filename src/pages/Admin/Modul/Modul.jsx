import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import ModalTanya from './ModalTanya';

// Import Custom Hooks React Query
import { useFetchModuls, useToggleComplete } from '../../../Utils/hooks/useModul';

const Modul = () => {
  // Fetch data menggunakan Hook
  const { data: modules, isLoading, isError } = useFetchModuls();
  const toggleMutation = useToggleComplete();

  const [openId, setOpenId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState('');

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleAsk = (title) => {
    setSelectedModule(title);
    setModalOpen(true);
  };

  // Handle Toggle Complete
  const handleComplete = (id, currentStatus) => {
    toggleMutation.mutate({ id, currentStatus });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data modul...
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Gagal memuat data modul. Coba refresh halaman.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Materi</h1>
        <p className="text-gray-500 text-sm">Data diambil dari API (React Query).</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {modules?.length === 0 ? (
          <p className="text-center text-gray-400 py-8">Tidak ada materi tersedia.</p>
        ) : (
          modules?.map((mod) => (
            <AccordionItem
              key={mod.id}
              module={mod}
              isOpen={openId === mod.id}
              onToggle={() => handleToggle(mod.id)}
              onComplete={() => handleComplete(mod.id, mod.completed)}
              onAsk={handleAsk}
            />
          ))
        )}
      </div>

      <ModalTanya 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        moduleName={selectedModule} 
      />
    </div>
  );
};

export default Modul;