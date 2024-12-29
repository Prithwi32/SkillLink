import { Route, Routes } from "react-router-dom";
// import axios from "axios";
import AppLayout from "./layout/AppLayout";
import { SignupCard } from "./components/Auth/SignupCard";
import { LoginCard } from "./components/Auth/LoginCard";
import ReportUserForm from "./components/Forms/ReportUserForm";
import EventCreationForm from "./components/Forms/EventCreation";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
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
// import AboutPage from "./components/HelperComponents/AboutSection"
import ScrollToHash from "./components/HelperComponents/ScrollToHash";

// axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <ScrollToHash/>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />

          {/* Public routes */}
          <Route path="signup" element={<SignupCard />} />
          <Route path="login" element={<LoginCard />} />
          {/* <Route path="about" element={<AboutPage />} /> */}
          <Route path="events" element={<EventListPage />} />
          <Route path="users" element={<UsersPage />} />

          {/*Protected routes with AppLayout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/users/:userId" element={<UserProfilePage />} />
            <Route path="reportuser" element={<ReportUserForm />} />
            <Route path="/userDashboard/:eventId" element={<EventDetailsPage/>}/>
            <Route path="allRecommendUsers" element={<AllSuggestedLearningPage />}/>
          </Route>
        </Route>

        {/* Protected routes with no AppLayout*/}
        <Route element={<ProtectedRoute />}>
          <Route path="createEvent" element={<EventCreationForm />} />
          <Route path="userDashboard" element={<MyUserProfilePage />} />
        </Route>

        {/* 404 Page for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
