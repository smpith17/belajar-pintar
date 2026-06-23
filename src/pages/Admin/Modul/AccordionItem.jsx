import React from 'react';

const AccordionItem = ({ module, isOpen, onToggle, onComplete, onAsk }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center p-4 text-left transition-colors ${isOpen ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-3">
          <span className={`text-lg ${module.completed ? 'text-green-500' : 'text-gray-400'}`}>
            {module.completed ? '✅' : '📖'}
          </span>
          <span className={`font-medium ${module.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {module.title}
          </span>
        </div>
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-600 mb-4">{module.description}</p>
          <div className="flex gap-3">
            <button
              onClick={onComplete}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                module.completed 
                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {module.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
            </button>
            <button
              onClick={() => onAsk(module.title)}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg text-sm font-medium transition-colors"
            >
              Tanya Dosen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;