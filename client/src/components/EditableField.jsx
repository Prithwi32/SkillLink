import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export function EditableField({ value, onSubmit, type = 'input', label }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSubmit = () => {
    onSubmit(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      {isEditing ? (
        <div className="flex gap-2 animate-fade-in">
          {type === 'textarea' ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              rows={4}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              autoFocus
            />
          )}
          <button
            onClick={handleSubmit}
            className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors duration-300 hover:scale-110 transform"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-300 hover:scale-110 transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
        >
          {type === 'textarea' ? (
            <p className="whitespace-pre-wrap">{value}</p>
          ) : (
            <p>{value}</p>
          )}
        </div>
      )}
    </div>
  );
}
