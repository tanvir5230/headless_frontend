import { useState } from "react";
import axios from "axios";
import { serverUrl } from "..";
export const DeleteButton = (props: { id: string; name: string }) => {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const handleDelete = (id: string) => {
    axios.delete(`${serverUrl}/delete/${id}`).then((response) => {
      if (response.data.status) {
        setDeleted(true);
        setShowMsg(true);
      } else {
        setDeleted(false);
        setShowMsg(true);
      }
      setTimeout(() => {
        setShowMsg(false);
        setOpen(false);
      }, 1000);
    });
  };
  return (
    <>
      <button className="button-icon" onClick={() => setOpen(true)}>
        <img
          src={require("../icons/trash.png")}
          alt="delete icon"
          width={30}
          height={30}
        />
      </button>
      {open && (
        <div className="form-container">
          <form className="form">
            <h4>Delete the form {props.name}</h4>
            <div>
              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                style={{ marginLeft: "5px" }}
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(props.id);
                }}
              >
                Delete
              </button>
            </div>
          </form>
          {showMsg && (
            <p
              style={{
                background: "black",
                textAlign: "center",
                color: "red",
                fontSize: 30,
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20 0",
              }}
            >
              {deleted
                ? "The folder was deleted."
                : "The folder couldnot be deleted."}
            </p>
          )}
        </div>
      )}
    </>
  );
};
