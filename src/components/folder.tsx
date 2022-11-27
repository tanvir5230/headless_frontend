import axios from "axios";
import React, { useState } from "react";
import { serverUrl } from "..";
import { CreateForm } from "./createButton";
import { DeleteButton } from "./deleteButton";
import { FolderContainer } from "./FolderContainer";

type FolderProps = {
  parentDir: string;
  type: string;
  folderName: string;
  id: string;
};
function Folder({ parentDir, type, folderName, id }: FolderProps) {
  const [rotation, setRotation] = useState(0);
  const [renderContainer, setRenderContainer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleExpand = () => {
    setRenderContainer(!renderContainer);
    setRotation(rotation === 0 ? 90 : 0);
  };
  const handleCreate = (e: React.MouseEvent, boolVal: boolean) => {
    e.preventDefault();
    setShowForm(boolVal);
  };
  return (
    <>
      <div className="folder">
        <button onClick={handleExpand} className="button-icon">
          <img
            src={require("../icons/triangle.png")}
            alt=""
            style={{ rotate: `${rotation}deg` }}
          />
        </button>
        <p style={{ height: 44, padding: "13px 25px" }}> {folderName} </p>
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          {type !== "root" && <DeleteButton id={id} name={folderName} />}
          <button
            className="button"
            style={{ marginLeft: 5 }}
            onClick={(e) => handleCreate(e, true)}
          >
            new +
          </button>
        </div>
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
