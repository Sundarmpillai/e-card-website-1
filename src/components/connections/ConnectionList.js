import React from "react";
import Connection from "./Connection";
import { Link } from "react-router-dom";
const ConnectionList = ({ profiles }) => {
  // list of connection from the database
  return (
    <div className="connection-list section">
      <Link to={"/project/" + profiles.id} key={profiles.id}>
        <Connection profile={profiles} />
      </Link>
    </div>
  );
};

export default ConnectionList;
