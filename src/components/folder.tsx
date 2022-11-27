import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "..";
import { CreateForm } from "./createButton";
import { FolderContainer } from "./FolderContainer";

type FolderProps = {
  parentDir: string;
  type: string;
  folderName: string;
  id: string;
};
function Folder({ parentDir, type, folderName, id }: FolderProps) {
  const [renderContainer, setRenderContainer] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleExpand = () => {
    setRenderContainer(!renderContainer);
  };
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
      }, 2000);
    });
  };
  const handleCreate = (e: React.MouseEvent, boolVal: boolean) => {
    e.preventDefault();
    setShowForm(boolVal);
  };
  return (
    <>
      <div style={{ display: "flex", border: "1px solid red" }}>
        <button className="button" onClick={handleExpand}>
          {">"}
        </button>
        <p style={{ height: 44, padding: "13px 25px" }}> {folderName} </p>
        <div style={{ marginLeft: "auto" }}>
          {type !== "root" && (
            <button className="button" onClick={() => handleDelete(id)}>
              D
            </button>
          )}
          <button
            className="button"
            style={{ marginLeft: 5 }}
            onClick={(e) => handleCreate(e, true)}
          >
            new +
          </button>
        </div>
        {showMsg && (
          <p
            style={{
              background: "black",
              textAlign: "center",
              color: "red",
              fontSize: 30,
              position: "fixed",
              top: 0,
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
        {type === "root" && showForm && (
          <CreateForm cancel={handleCreate} parentDir="root" />
        )}
        {type !== "root" && showForm && (
          <CreateForm
            cancel={handleCreate}
            parentDir={`${parentDir}/${folderName}`}
          />
        )}
      </div>
      <div style={{ paddingLeft: 10 }}>
        {renderContainer && type === "root" && (
          <FolderContainer parentDir="root" />
        )}
      </div>
      <div
        style={{
          paddingLeft: `${parentDir}/${folderName}`.split("/").length * 5,
        }}
      >
        {renderContainer && type !== "root" && (
          <FolderContainer parentDir={`${parentDir}/${folderName}`} />
        )}
      </div>
    </>
  );
}

export { Folder };
