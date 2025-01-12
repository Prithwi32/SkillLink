import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { SessionList } from "../components/HelperComponents/SessionList";
import { TabNavigation } from "../components/HelperComponents/TabNavigation";
import SessionForm from "@/components/Forms/SessionForm";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function SessionPage() {
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { backendUrl } = useAuth();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  const getAllSessions = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        backendUrl + "/api/sessions/my-sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setSessions(data.sessions);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllSessions();
  }, []);

  const filteredSessions = sessions.filter(
    (session) => session.status === activeTab
  );

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

        {!showForm && (
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {showForm ? (
          <div className="mb-8">
            <SessionForm
              setShowForm={setShowForm}
              onCancel={() => setShowForm(false)}
              getAllSessions={getAllSessions}
            />
          </div>
        ) : (
          !isLoading &&
          (filteredSessions.length > 0 ? (
            <SessionList
              sessions={filteredSessions}
              getAllSessions={getAllSessions}
            />
          ) : (
            <p className="flex items-center justify-center font-semibold text-slate-400">
              No Sessions Found
            </p>
          ))
        )}
        {isLoading && (
          <p className="flex items-center justify-center font-semibold text-slate-400">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}
