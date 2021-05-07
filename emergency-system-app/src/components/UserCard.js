import React from "react";
import "./UserCard.scss";

const UserCard = ({ id, username }) => {
  return (
    <div className="user-card">
      <div className="user-card-info">
        <p className="user-card-content">
          <strong>
            #{id} {username}
          </strong>
        </p>
        {/* <p></p> */}
      </div>
    </div>
  );
};

export default UserCard;
