import { motion } from "framer-motion";
import HeadLiq from "./Liquidity_page/HeadLiq";
import Mainliq from "./Liquidity_page/Mainliq";
import SwapButton from "./Liquidity_page/Components/SwapButton";

function liquidity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="liquidity_main"
    >
      <HeadLiq></HeadLiq>
      <Mainliq></Mainliq>
      <SwapButton></SwapButton>
    </motion.div>
  );
} // return liquidity page

export default liquidity;
