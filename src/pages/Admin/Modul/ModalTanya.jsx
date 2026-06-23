import React, { useState } from 'react';
import { toastSuccess } from '../../../Utils/Helpers/ToastHelpers';

const ModalTanya = ({ isOpen, onClose, moduleName }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    toastSuccess(`Pertanyaan untuk "${moduleName}" berhasil dikirim!`);
    setQuestion('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-yellow-500 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Tanya Dosen</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-gray-500 mb-2">Modul: <strong>{moduleName}</strong></p>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
            rows="4"
            placeholder="Tulis pertanyaanmu di sini..."
            required
          ></textarea>
          
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Batal</button>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600">Kirim</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTanya;