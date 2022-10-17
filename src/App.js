import NavBar from "./components/Navbar";
import SendForm from "./components/SendForm";

function App() {
  return (
    <div className="app bg-black text-white">
      <NavBar />
      <h1 class="text-5xl">Hello World!</h1>
      <SendForm />
    </div>
  );
}

export default App;
