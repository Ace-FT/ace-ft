import NavBar from "./components/Navbar";
import SendForm from "./components/SendForm";

function App() {
  return (
    <div className="app h-screen bg-black text-white">
      <div className="mx-auto">
        <NavBar />
        <main className="max-w-7xl mx-auto">
          <div className="mt-16 mx-8">
            <SendForm />
          </div> 
        </main>
      </div>
    </div>
  );
}

export default App;
