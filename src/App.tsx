import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Detail from "./pages/Detail";
import Main from "./pages/Main";

// https://restcountries.com/v3.1/region/{region}
// https://restcountries.com/v3.1/name/{name}

function App() {
  return (
    <main className="main">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="detail/:countryName" element={<Detail />} />
      </Routes>
    </main>
  );
}

export default App;
