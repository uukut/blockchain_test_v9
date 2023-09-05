import { useState } from "react";

function Left_side_inp({ left_inp_val }) {
  const [left_value, setLeft_value] = useState(1);

  return (
    <>
      <input
        className="user_input"
        id="left_input"
        type="text"
        placeholder="0"
        value={left_value}
        autoComplete="off"
        onChange={(e) => {
          left_inp_val(e.target.value);
          setLeft_value(e.target.value);
        }}
      ></input>
    </>
  );
}

export default Left_side_inp;
