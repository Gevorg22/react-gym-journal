import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './pages/home/Home';
import Results from './pages/results/Results';

const App = () => {
    return (
        <div className="content">
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </div>
    );
};

export default App;
