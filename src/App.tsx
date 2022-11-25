import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import FolderContainer from "./components/folderComp";

export const serverUrl = "https://headless-backend.onrender.com";

function App() {
  const [folders, setFolders] = useState([]);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  function handleDelete(id: string) {
    const url = `${serverUrl}/delete/${id}`;
    axios.delete(url).then((response) => {
      setDeleted(response.data.status);
      setSuccessMsg(response.data.message);
      setTimeout(() => {
        setDeleted(false);
      }, 1000);
    });
  }
  useEffect(() => {
    axios.get(serverUrl).then((response) => {
      if (response.data) {
        setFolders(response.data.data);
      }
    });
  }, [deleted, created]);
  return (
    <div className="container dark-bg text-white">
      <h1 className="text-center pt-1">Folder Structure</h1>
      <div className="folder-container">
        {folders.length > 0 &&
          folders.map((folder, ind) => {
            return (
              <FolderContainer
                key={ind}
                folder={folder}
                handleDelete={handleDelete}
                setCreated={setCreated}
                created={created}
              />
            );
          })}
      </div>
      {deleted ? (
        <p style={{ height: "100px" }} className="modal">
          {successMsg}
        </p>
      ) : null}
    </div>
  );
}

export default App;
