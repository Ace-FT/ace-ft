import NavBar from "./components/Navbar";
import SendForm from "./components/SendForm";

function App() {
  return (
    <div className="app h-full bg-black text-white">
      <div className="w-4/5 mx-auto">
        <NavBar />
        <SendForm />
      </div>
    </div>
  );
}

export default App;
