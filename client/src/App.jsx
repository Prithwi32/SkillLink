import { Route, Routes } from "react-router-dom";
// import axios from "axios";
import AppLayout from "./layout/AppLayout";
import { SignupCard } from "./components/Auth/SignupCard";
import { LoginCard } from "./components/Auth/LoginCard";
import ReportUserForm from "./components/Forms/ReportUserForm";
import EventCreationForm from "../src/components/HelperComponents/EventCreation";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./components/ProtectedRoutes";
import UserProfilePage from "./pages/UserProfilePage"
import LandingPage from "./pages/LandingPage";
import UsersPage from "./components/AllUsersPage";

// axios.defaults.baseURL = "http://localhost:5000"
// axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              // <div className="flex flex-col mx-auto my-auto justify-center items-center w-full gap-10">
              //   <h1 className="text-3xl text-blue-800">Sample Heading</h1>
              //   <Button className="text-base">Click here</Button>
              // </div>
              <LandingPage/>
            }
          />

          {/* Public routes */}
          <Route path="signup" element={<SignupCard />} />
          <Route path="login" element={<LoginCard />} />
          <Route path="reportuser" element={<ReportUserForm />} />
          <Route path="users" element={<UsersPage />} />

          {/* Protected routes */}
          {/* <Route
            path="createEvent"
            element={<ProtectedRoute element={<EventCreationForm />} />}
          /> */}
          <Route
            path="createEvent"
            element={<EventCreationForm />}
          />
        <Route
            path="userDashboard"
            element={<UserProfilePage />}
          />
      </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;

