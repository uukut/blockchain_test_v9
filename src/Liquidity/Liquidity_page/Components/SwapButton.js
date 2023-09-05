import { Link } from "react-router-dom";

function SwapButton() {
  return (
    <div className="corner_div">
      <Link to="/">
        <button className="change_swap_pages">Swap &#8594;</button>
      </Link>
    </div>
  );
} // return the button link to Swap

export default SwapButton;
