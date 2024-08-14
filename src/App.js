import "./assets/styles/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useState } from "react";

import About from "./components/common/About.js";
import Board from "./components/comparision_board/ComparisionBoard.js";
import Chatbot from "./components/ChatBot.js";
import CompanyInfo from "./components/company_detail/CompanyInfo.js";
import Footer from "./components/common/Footer.js";
import Forum from "./components/forum/Forum.js";
import Header from "./components/common/Header.js";
import HomePage from "./components/common/HomePage.js";
import LoginPage from "./components/auth/LoginPage.js";
import MyForumPublish from "./components/forum/MyFormPublish.js";
import PostDetails from "./components/forum/PostDetails.js";
import Signup from "./components/auth/Signup.js";
import SubmitPost from "./components/forum/SubmitPost.js";
import TermOfService from "./components/auth/TermOfService.js";
import TopCompany from "./components/TopCompany.js";

function App() {
  const [globalIsLogin, setGlobalIsLogin] = useState(false);
  const [globalUserInfo, setGlobalUserInfo] = useState({});

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div>
        <BrowserRouter>
          <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
            <Header
              globalIsLogin={globalIsLogin}
              setGlobalIsLogin={setGlobalIsLogin}
              globalUserInfo={globalUserInfo}
              setGlobalUserInfo={setGlobalUserInfo}
            />
          </div>
          <Routes>
            {/* <Route path="/" element={<TopCompany />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/top" element={<TopCompany />} />
            <Route path="/compare" element={<Board />} />
            <Route path="/company_info/:symbol" element={<CompanyInfo />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  globalIsLogin={globalIsLogin}
                  setGlobalIsLogin={setGlobalIsLogin}
                  setGlobalUserInfo={setGlobalUserInfo}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  globalIsLogin={globalIsLogin}
                  setGlobalIsLogin={setGlobalIsLogin}
                  setGlobalUserInfo={setGlobalUserInfo}
                />
              }
            />
            <Route path="/forum" element={<Forum />} />
            <Route path="/about" element={<About />} />

            <Route path="/terms-of-service" element={<TermOfService />} />
            <Route
              path="/my-publish"
              element={<MyForumPublish globalUserInfo={globalUserInfo} />}
            />
            <Route
              path="/submit-post"
              element={<SubmitPost globalUserInfo={globalUserInfo} />}
            />
            <Route
              path="/post/:postId"
              element={<PostDetails globalUserInfo={globalUserInfo} />}
            />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
