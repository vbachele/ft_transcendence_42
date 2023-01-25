import "./index.css";
import React from "react";
import logo from "assets/logo-text.svg";
import Navbar from "components/Navbar/Navbar";

const Testpage = () => {
  return (
    <div>
      <video id="bgvid" autoPlay loop muted playsInline>
        <source
          src="https://cdn.discordapp.com/attachments/1067488107827576916/1067743308367020092/background.mp4"
          type="video/mp4"
        />
      </video>
      <div id="main">
        <div id="left">
          <div id="logo">
            <img src={logo} alt="" />
          </div>
          <div id="menus">
            <canvas id="menu-highlight" width="800" height="600"></canvas>
            <div
              className="italic highlight"
              // onMouseOver={(event) => highlight(event)}
            >
              PLAY
            </div>
            <div
              className="italic"
              // onMouseOver={(event) => highlight(event)}
            >
              SPECTATE
            </div>
            <div
              className="italic"
              // onMouseOver={(event) => highlight(event)}
            >
              LEADERBOARD
            </div>
            <div
              className="italic"
              // onMouseOver={(event) => highlight(event)}
            >
              CAREER
            </div>
            <div
              className="italic"
              // onMouseOver={(event) => highlight(event)}
            >
              SOCIAL
            </div>
            <div className="normal">SETTINGS</div>
            <div className="normal">EXIT</div>
          </div>
        </div>
        <div id="hero">
          <div id="hero-name">VBACHELE</div>
          <div id="hero-unlocks">
            <span>1</span>/26 ACHIEVEMENTS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testpage;
