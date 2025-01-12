import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { SignupCard } from "./components/Auth/SignupCard";
import { LoginCard } from "./components/Auth/LoginCard";
import ReportUserForm from "./components/Forms/ReportUserForm";
import EventCreationForm from "./components/Forms/EventCreation";
import { useAuth } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoutes";
import MyUserProfilePage from "./pages/MyUserProfilePage";
import LandingPage from "./pages/LandingPage";
import UsersPage from "./components/AllUsersPage";
import UserProfilePage from "./pages/UserProfilePage";
import EventListPage from "./pages/EventListPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllSuggestedLearningPage from "./pages/AllSuggestedLearningPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import ProfileSection from "./components/profile/ProfileSection";
import EventPage from "./pages/EventPage";
import SessionPage from "./pages/SessionPage";
import { useEffect, useState } from "react";
import axios from "axios";
import RentingPage from "./pages/RentingPage";
import RestrictedRoute from "./pages/RestrictedRoute";
import ReviewSection from "./components/profile/ReviewSection";
import { Toaster } from "react-hot-toast";

function App() {
  const { backendUrl, setToken } = useAuth();
  const localStorageToken = localStorage.getItem("token");
  const [loading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    if (localStorageToken) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          backendUrl + "/auth/check",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorageToken}`,
            },
          },
        );

        if (data.success) {
          setToken(localStorageToken);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />

          {/* Public routes */}
          <Route
            path="signup"
            element={
              <RestrictedRoute>
                <SignupCard />
              </RestrictedRoute>
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute>
                <LoginCard />
              </RestrictedRoute>
            }
          />
          <Route path="events" element={<EventListPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="blogs" element={<BlogListPage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="rent" element={<RentingPage />} />

          {/*Protected routes with AppLayout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/users/:userId" element={<UserProfilePage />} />
            <Route path="reportuser" element={<ReportUserForm />} />
            <Route
              path="/userDashboard/:eventId"
              element={<EventDetailsPage />}
            />
            <Route
              path="/users/allRecommendUsers"
              element={<AllSuggestedLearningPage />}
            />
          </Route>
        </Route>

        {/* Protected routes with no AppLayout*/}
        <Route element={<ProtectedRoute />}>
          <Route path="createEvent" element={<EventCreationForm />} />
          <Route path="userDashboard" element={<MyUserProfilePage />}>
            {/* Nested routes */}
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<ProfileSection />} />
            <Route path="events" element={<EventPage />} />
            <Route path="session" element={<SessionPage />} />
            <Route path="review" element={<ReviewSection/>}/>
          </Route>
        </Route>

        {/* 404 Page for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
