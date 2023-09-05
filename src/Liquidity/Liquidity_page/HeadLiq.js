import Management_Label from "./Components/Management_Label";
import NewPos from "./Components/NewPos";

function HeadLiq() {
  return (
    <div className="liquidity">
      <Management_Label></Management_Label>
      <NewPos></NewPos>
    </div>
  );
} // return the header of the Liquidity

export default HeadLiq;
