import { serverUrl } from "..";
import axios from "axios";
import React, { useState } from "react";

const CreateForm = (props: { cancel: Function; parentDir: string }) => {
  const [created, setCreated] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [inputFolderNmae, setInputFolderName] = useState("");
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    axios
      .post(`${serverUrl}/${props.parentDir}/${inputFolderNmae}`)
      .then((response) => {
        if (response.data.status) {
          setCreated(true);
          setInputFolderName("");
          setShowMessage(response.data.message);
        } else {
          setCreated(false);
          setShowMessage("failed to create the folder.");
        }
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        position: "fixed",
        zIndex: 100,
        left: "0",
        top: "0",
        bottom: "0",
        right: 0,
      }}
    >
      <form style={{ width: 300, height: 300 }}>
        <input
          style={{ width: "100%", height: 40, padding: 5, borderRadius: 10 }}
          type="text"
          name="inputName"
          value={inputFolderNmae}
          placeholder="Enter your folder name...."
          onChange={(e) => setInputFolderName(e.target.value)}
          required
        />
        <div style={{ paddingTop: 10 }}>
          <button className="button" onClick={(e) => props.cancel(e, false)}>
            Cancel
          </button>
          <button className="button" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </div>
      </form>
      {created && <p style={{ color: "green", fontSize: 30 }}>{showMessage}</p>}
      {!created && <p style={{ color: "red", fontSize: 30 }}>{showMessage}</p>}
    </div>
  );
};

export { CreateForm };
