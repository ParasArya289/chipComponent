import "./UserList.css";

export const UserList = ({ users, selectUser }) => {
  return users.map((user) => (
    <button
      tabIndex="0"
      key={user.id}
      className="user"
      onClick={() => selectUser(user)}
    >
      <div className="user-info">
        <div className="user-column">
          <img src={user.profilePic} height="30" width="30" alt="Profile" />
          <span>{user.name}</span>
        </div>
        <span className="user-email">{user.email}</span>
      </div>
    </button>
  ));
};
