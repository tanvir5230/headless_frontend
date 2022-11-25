import CreateBtn from "./createBtn";
import DeleteFolder from "./deleteFolderBtn";
import OpenFolder from "./openFolderBtn";

type FolderProp = {
  name: string;
  parent: string;
  createdAt: Date;
  _id: string;
};

const FolderContainer = (props: {
  folder: FolderProp;
  handleDelete: Function;
  setCreated: Function;
  created: boolean;
}) => {
  const { name, parent, createdAt, _id } = props.folder;
  return (
    <div className="flex-center">
      <OpenFolder />
      <p>{name}</p>
      <DeleteFolder id={_id} handleDelete={props.handleDelete} />
      <CreateBtn
        parent={parent}
        setCreated={props.setCreated}
        created={props.created}
      />
    </div>
  );
};
export default FolderContainer;
