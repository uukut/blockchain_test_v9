import { Link } from "react-router-dom";

function AddHeader() {
  return (
    <div className="add_header">
      <Link to="/Liquidity">
        <button>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUaRkxz12HvV_ooB_mDJWIq_4qP9ZpPLVBpw&usqp=CAU"
            alt="add"
          ></img>
        </button>
      </Link>
      <h2>Back to Mangement</h2>
    </div>
  );
} // return the add position page's header

export default AddHeader;
