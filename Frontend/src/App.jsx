import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Conversation from "./Pages/Conversation";
import { Toaster } from "react-hot-toast";
import MSideBarConversation from "./Pages/MSideBarConversation";
import MChatSpaceConversation from "./Pages/MChatSpaceConversation";

const App = () => {
  return (
    <>
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
        />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route
            path="/msidebarconversation"
            element={<MSideBarConversation />}
          />
          <Route
            path="/mchatspaceconversation"
            element={<MChatSpaceConversation />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
