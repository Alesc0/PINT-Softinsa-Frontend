import "./App.css";
import LoginForm from "./components/loginForm/loginForm";

function App() {
  /* const [state, setState] = useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState((e) => !e);
  }; */

  return (
    <div className="App">
      {
        <LoginForm/>
      }
    </div>
  );
}

export default App;
