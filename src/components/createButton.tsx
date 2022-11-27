import { serverUrl } from "..";
import axios from "axios";
import React, { useState } from "react";

const CreateForm = (props: { cancel: Function; parentDir: string }) => {
  const [created, setCreated] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [inputFolderName, setInputFolderName] = useState("");
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    axios
      .post(`${serverUrl}/${props.parentDir}/${inputFolderName}`)
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
    <div className="form-container">
      <form className="form">
        <h4>Add a folder to the "{props.parentDir}" directory:</h4>
        <input
          style={{ width: "100%", height: 40, padding: 5, borderRadius: 10 }}
          type="text"
          name="inputName"
          value={inputFolderName}
          placeholder="Enter your folder name...."
          onChange={(e) => setInputFolderName(e.target.value)}
          required
        />
        <div>
          <button className="button" onClick={(e) => props.cancel(e, false)}>
            Cancel
          </button>
          <button
            className="button"
            disabled={inputFolderName.length > 0 ? false : true}
            onClick={(e) => handleSubmit(e)}
          >
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
