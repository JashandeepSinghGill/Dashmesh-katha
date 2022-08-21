import React from "react";

const Part = (props) => {
  return (
    <div
      className="btn btn-dark btn-block m-1"
      onClick={() => props.changeSong(props.title)}
    >
      {props.title}
    </div>
  );
};
export default Part;
