import "./Pill.css";

export const Pill = ({
  user,
  backSpaceCount,
  selectedUserArray,
  deleteUser,
  index,
}) => {
  return (
    <>
      <span
        className={`pill ${
          backSpaceCount === 1 && index === selectedUserArray.length - 1
            ? " highlight"
            : ""
        }`}
      >
        <img src={user.profilePic} height="27" width="27" alt="Profile" />
        {user.name}
        <svg
          onClick={() => deleteUser(user.id)}
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
          fill="currentColor"
        >
          <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
        </svg>
      </span>
    </>
  );
};
