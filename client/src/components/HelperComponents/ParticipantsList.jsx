import { useState } from 'react';
import { Check, X } from 'lucide-react';

function ParticipantRow({ participant, status, onApprove, onDecline }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <img
        src={participant.photo || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
        alt={participant.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{participant.name}</h3>
        <p className="text-sm text-gray-600">{participant.about}</p>
      </div>
      {status === 'pending' ? (
        <div className="flex gap-2">
          <button
            onClick={() => onApprove?.(participant.id)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
            title="Approve"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => onDecline?.(participant.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Decline"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
          Approved
        </span>
      )}
    </div>
  );
}

export function ParticipantsList({ pending, accepted, onApprove, onDecline }) {
  const [activeSection, setActiveSection] = useState('pending');

  return (
    <div className="space-y-6">
      {/* Section toggle buttons */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveSection('pending')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeSection === 'pending'
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending Requests
          {pending.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
              {pending.length}
            </span>
          )}
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform transition-transform ${
              activeSection === 'pending' ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </button>
        <button
          onClick={() => setActiveSection('accepted')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeSection === 'accepted'
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Accepted
          {accepted.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full">
              {accepted.length}
            </span>
          )}
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform transition-transform ${
              activeSection === 'accepted' ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </button>
      </div>

      {/* Content section */}
      <div className="transition-opacity duration-200">
        {activeSection === 'pending' && pending.length > 0 && (
          <div className="space-y-3">
            {pending.map((participant) => (
              <ParticipantRow
                key={participant.id}
                participant={participant}
                status="pending"
                onApprove={onApprove}
                onDecline={onDecline}
              />
            ))}
          </div>
        )}

        {activeSection === 'accepted' && accepted.length > 0 && (
          <div className="space-y-3">
            {accepted.map((participant) => (
              <ParticipantRow key={participant.id} participant={participant} status="accepted" />
            ))}
          </div>
        )}

        {/* Empty state messages */}
        {activeSection === 'pending' && pending.length === 0 && (
          <p className="text-gray-500 text-center py-8">No pending requests</p>
        )}
        {activeSection === 'accepted' && accepted.length === 0 && (
          <p className="text-gray-500 text-center py-8">No accepted participants yet</p>
        )}
      </div>
    </div>
  );
}
