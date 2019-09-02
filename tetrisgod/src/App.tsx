import React from 'react';
import './css/App.css';
import Header from "./components/Header"
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";


const App: React.FC = () => {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}

export default App;
