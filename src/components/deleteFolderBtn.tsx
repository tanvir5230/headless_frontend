const DeleteFolder = (props: { id: string; handleDelete: Function }) => {
  return (
    <>
      <button className="delete" onClick={() => props.handleDelete(props.id)}>
        X
      </button>
    </>
  );
};
export default DeleteFolder;
