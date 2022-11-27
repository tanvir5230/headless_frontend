import "./index.css";
import * as DOM from "react-dom";
import { Folder } from "./components/folder";
// import { useState } from "react";

export const serverUrl = "https://headless-backend.onrender.com";

const root = document.getElementById("root");

function App() {
  return (
    <>
      <div className="container">
        <h2 style={{ textAlign: "center", height: "10vh", paddingTop: "10px" }}>
          Folder Structure
        </h2>
        <div className="folder-container">
          <Folder parentDir="root" type="root" folderName="root" id="" />
        </div>
      </div>
    </>
  );
}

DOM.render(<App />, root);
