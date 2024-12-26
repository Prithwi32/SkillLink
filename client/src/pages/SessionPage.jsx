import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { SessionList } from "../components/HelperComponents/SessionList";
import { TabNavigation } from "../components/HelperComponents/TabNavigation";
import SessionForm from "@/components/Forms/SessionForm";

export default function SessionPage() {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const filteredSessions = sessions.filter(
    (session) => session.status === activeTab,
  );

  const handleAddSession = (formData) => {
    const newSession = {
      ...formData,
      id: Date.now().toString(),
      status: "scheduled",
    };
    setSessions([...sessions, newSession]);
    setShowForm(false)
  };

  const handleStatusChange = (id, status) => {
    setSessions(
      sessions.map((session) =>
        session.id === id ? { ...session, status } : session,
      ),
    );
  };

  const handleEdit = (id, updates) => {
    setSessions(
      sessions.map((session) =>
        session.id === id ? { ...session, ...updates } : session,
      ),
    );
  };

  const handleReview = (id, rating, text) => {
    setSessions(
      sessions.map((session) =>
        session.id === id
          ? { ...session, review: { rating, text }, status: "completed" }
          : session,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Session Management
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Session
          </button>
        </div>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {showForm? (<div className="mb-8">
             <SessionForm
              onSubmit={handleAddSession}
              onCancel={() => setShowForm(false)}
              getAllSessions={getAllSessions}
            />
          </div>) : (
            <SessionList
            sessions={filteredSessions}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onReview={handleReview}
          />
          )
      }
      </div>
    </div>
  );
}
