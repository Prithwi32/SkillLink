import { useContext, useEffect } from "react";
import { AdminContext } from "./context/AdminContext";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SkillPage from "./pages/SkillPage";
import EventsPage from "./pages/EventsPage";
import UsersPage from "./pages/UsersPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import Loader from "./pages/Loader";

function App() {
  const { isLoading, isLoggedIn, checkAuth } = useContext(AdminContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <Navbar />

          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/login" element={<Navigate to="/home" />} />

              {/* Protected Routes */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/skills"
                element={
                  <ProtectedRoute>
                    <SkillPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <EventsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UsersPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
