import React from "react";

const Part = (props) => {
  return (
    <div
      className="btn btn-secondary btn-block"
      onClick={() => props.changeSong(props.title)}
    >
      {props.title}
    </div>
  );
};
export default Part;
