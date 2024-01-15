import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./frontend/components/chat";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
