import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { db } from './firebase';

import { getTelegram } from './packages/mini-app/utils';
import Main from './views/Main';

interface TelegramUserInfo {
    allows_write_to_pm: boolean;
    first_name: string;
    last_name: string;
    username: string;
    id: number;
    language_code: string;
    photo_url: string;
    is_premium: boolean;
}

function App() {
    const addDataToFirestore = async (userInfo: TelegramUserInfo) => {
        try {
            let isExisted = false;
            const querySnapshot = await getDocs(collection(db, 'users'));
            querySnapshot.forEach((doc) => {
                if (doc.data().id === userInfo.id) {
                    isExisted = true;
                }
            });
            if (!isExisted) {
                const docRef = await addDoc(collection(db, 'users'), userInfo);
                console.log('Document written with ID: ', docRef.id);
            }
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    useEffect(() => {
        const telegramApp = (window as any).Telegram.WebApp.initData;
        const params = new URLSearchParams(telegramApp);

        const telegram = getTelegram();

        telegram?.requestFullscreen?.();

        const user = params.get('user');

        if (user) {
            const userInfo: TelegramUserInfo = JSON.parse(user);
            addDataToFirestore(userInfo);
        }
    }, []);

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
