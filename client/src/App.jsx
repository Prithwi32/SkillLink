import { Button } from "./components/ui/button";
// import LandingPage from "./pages/LandingPage";
function App() {
  return (
    <div className="flex flex-col mx-auto my-auto justify-center items-center w-full h-screen gap-10">
      {/* Tailwind usage example */}
      <h1 className="text-3xl text-blue-800">Sample Heading</h1>
      {/* shadcn component usage example */}
      <Button className="text-base">Click here</Button>
      {/* <LandingPage/> */}
    </div>
  );
}

export default App;
