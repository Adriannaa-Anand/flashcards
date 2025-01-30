import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Flashcard from "./components/Flashcard";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
  };

  const list = [
    { id: 1, question: "ア", answer: "A", fact: "ア is the Katakana character for the 'A' sound.", example: "Example: アイス (ice)" },
    { id: 2, question: "ウ", answer: "U", fact: "ウ is the Katakana character for the 'U' sound.", example: "Example: ウサギ (rabbit)" },
    { id: 3, question: "イ", answer: "I", fact: "イ is the Katakana character for the 'I' sound.", example: "Example: イチゴ (strawberry)" },
    { id: 4, question: "オ", answer: "O", fact: "オ is the Katakana character for the 'O' sound.", example: "Example: オレンジ (orange)" },
    { id: 5, question: "エ", answer: "E", fact: "エ is the Katakana character for the 'E' sound.", example: "Example: エビ (shrimp)" },
  ];

  return (
    <Router>
      <div className="App">
        <Navbar userToken={userToken} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard userToken={userToken} setUserToken={setUserToken} />} />
            <Route path="/home" element={userToken ? <Home /> : <Navigate to="/login" />} />
            <Route path="/flashcards" element={userToken ? <Flashcard list={list} /> : <Navigate to="/login" />} />
            <Route path="/quiz" element={userToken ? <Quiz /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setUserToken={setUserToken} />} />
            <Route path="/register" element={<Register setUserToken={setUserToken} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
