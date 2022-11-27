import { Folder } from "./folder";
import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "..";

type FolderContainerProps = { parentDir: string };
const FolderContainer = ({ parentDir }: FolderContainerProps) => {
  console.log(parentDir);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFolders = () => {
    axios.get(`${serverUrl}/${parentDir}`).then((response) => {
      setFolders(response.data.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchFolders();
  }, []);
  return (
    <>
      {loading && <p>loading...</p>}
      {!loading && folders.length === 0 && <p>{"-- "}No folders.</p>}
      {!loading &&
        folders.length > 0 &&
        folders.map((folder, ind) => {
          const { parent, name, _id } = folder;
          return (
            <Folder
              key={ind}
              type="child"
              folderName={name}
              parentDir={parent}
              id={_id}
            />
          );
        })}
    </>
  );
};
export { FolderContainer };
