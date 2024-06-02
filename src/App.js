import './App.css';
import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} Component={MainLayout}>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/payment"} element={<PaymentPage/>}/>
                <Route path={"/info"} element={<AboutPage/>}/>
                <Route path={"*"} element={<ErrorPage/>}/>
            </Route>
            <Route path={'/login'} Component={AuthPage}/>
        </Routes>
    </div>
  );
}

export default App;
