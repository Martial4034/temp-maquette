import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Main from './views/Main';

function App() {
    return (
        <BrowserRouter>
            <div className="MainContainer">
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                closeButton={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </BrowserRouter>
    );
}

export default App;
