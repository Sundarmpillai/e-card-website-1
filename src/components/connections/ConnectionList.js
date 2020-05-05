import React from "react";
import Connection from "./Connection";
import { Link } from "react-router-dom";

const ConnectionList = ({ profiles }) => {
  return (
    <div>
      <Link
        to={"/profile/" + profiles.id}
        key={profiles.id}
        style={{ textDecoration: "none" }}
      >
        <Connection profile={profiles} />
      </Link>
    </div>
  );
};

export default ConnectionList;
