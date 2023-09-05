import SwapExchange from "./SwapExchange";
import { motion } from "framer-motion";
import Swap_Label from "./Swap_page/Components/Swap_Label";
import LiquidityButton from "./Swap_page/Components/LiquidityButton";

function Swap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main"
    >
      <div className="swap_main">
        <div className="main_header">
          <Swap_Label></Swap_Label>
        </div>
        <SwapExchange></SwapExchange>
      </div>
      <LiquidityButton></LiquidityButton>
    </motion.div>
  );
} // return the sub-title of Swap

export default Swap;
