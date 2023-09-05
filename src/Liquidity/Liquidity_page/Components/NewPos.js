import { Link } from "react-router-dom";

function NewPos() {
  return (
    <div className="new_pos_btn_div">
      <Link to="/Liquidity/add_position">
        <button></button>
      </Link>
    </div>
  );
} // return the link to the Add Position website

export default NewPos;
