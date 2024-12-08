import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import AppLayout from "./layout/AppLayout";
import { SignupCard } from "./components/Auth/SignupCard";
import { LoginCard } from "./components/Auth/LoginCard";
import ReportUserForm from "./components/ReportUserForm";
// import EventCreationForm from "./components/EventCreation";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfilePage from "./pages/UserProfilePage"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <div className="flex flex-col mx-auto my-auto justify-center items-center w-full gap-10">
                <h1 className="text-3xl text-blue-800">Sample Heading</h1>
                <Button className="text-base">Click here</Button>
              </div>
            }
          />

          {/* Routes that require authentication context */}
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/login" element={<LoginCard />} />

          {/* Other routes */}
          <Route path="/reportuser" element={<ReportUserForm />} />
          <Route path="/userDashboard" element={<UserProfilePage />} />

          {/* ProtectedRoute example
          <Route
            path="/createEvent"
            element={
              <ProtectedRoute>
                <EventCreationForm />
              </ProtectedRoute>
            }
          /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
