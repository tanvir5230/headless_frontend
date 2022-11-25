import { MouseEvent, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const CreateBtn = (props: {
  parent: string;
  setCreated: Function;
  created: boolean;
}) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [inputFolderName, setInputFolderName] = useState("");
  const ShowOrHideModal = () => setOpen(!open);
  const submitFolder = (ev: MouseEvent) => {
    if (inputFolderName.length > 0) {
      ev.preventDefault();
      const url = `${serverUrl}/${props.parent}/${inputFolderName}`;
      axios.post(url).then((response) => {
        props.setCreated(response.data.status);
        setSuccessMsg(response.data.message);
        setInputFolderName("");
        setTimeout(() => {
          props.setCreated(false);
        }, 1000);
      });
    }
  };
  return (
    <>
      <button onClick={ShowOrHideModal} className="flex-center">
        <span className="plus">+</span>
        <p>new</p>
      </button>
      {open && (
        <div className="modal">
          <form>
            <h2>Add folder in '{`${props.parent}`}'</h2>
            <input
              type="text"
              name="folderName"
              value={inputFolderName}
              onChange={(e) => setInputFolderName(e.target.value)}
              required
              placeholder="enter the folder name."
            />
            <div>
              <button onClick={ShowOrHideModal}>Cancel</button>
              <button
                disabled={inputFolderName.length > 0 ? false : true}
                onClick={(e) => submitFolder(e)}
              >
                Create
              </button>
            </div>
            {props.created && <p>{successMsg}</p>}
          </form>
        </div>
      )}
    </>
  );
};

export default CreateBtn;
