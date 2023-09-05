import { Link } from "react-router-dom";

function LiquidityButton() {
  return (
    <div className="corner_div">
      <Link to="/Liquidity">
        <button className="change_liquidity_pages">Liquidity &#8594;</button>
      </Link>
    </div>
  );
} // return the button link to Liquidity

export default LiquidityButton;
