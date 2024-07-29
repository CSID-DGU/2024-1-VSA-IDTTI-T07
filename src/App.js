// import React,{useEffect, useState} from 'react';
// import './App.css';
// import Map from './components/Map/Map';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Map />
//       <Footer />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                {/* 다른 페이지 라우트를 여기에 추가합니다. */}
            </Routes>
        </Router>
    );
};

export default App;
