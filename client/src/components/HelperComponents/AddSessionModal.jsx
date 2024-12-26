import React, { useState } from 'react';
import { X } from 'lucide-react';

export function AddSessionModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    instructorName: '',
    skillsOffered: '',
    skillsAcquiring: '',
    sessionDate: '',
    sessionLink: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Session</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instructor Name
            </label>
            <input
              type="text"
              required
              value={formData.instructorName}
              onChange={(e) =>
                setFormData({ ...formData, instructorName: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills Offered
            </label>
            <input
              type="text"
              required
              value={formData.skillsOffered}
              onChange={(e) =>
                setFormData({ ...formData, skillsOffered: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills Acquiring
            </label>
            <input
              type="text"
              required
              value={formData.skillsAcquiring}
              onChange={(e) =>
                setFormData({ ...formData, skillsAcquiring: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Date
            </label>
            <input
              type="datetime-local"
              required
              value={formData.sessionDate}
              onChange={(e) =>
                setFormData({ ...formData, sessionDate: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Link
            </label>
            <input
              type="url"
              required
              value={formData.sessionLink}
              onChange={(e) =>
                setFormData({ ...formData, sessionLink: e.target.value })
              }
              className="input-field"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <button type="submit" className="btn-primary">
              Add Session
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
