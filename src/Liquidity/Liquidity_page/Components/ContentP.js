import { useState } from "react";
import Web3 from "web3";

function ContentP() {
  const data = [
    {
      key: 1,
      class: "TBNB_btn",
      icon: "https://etherscan.io/images/main/empty-token.png",
      name: "TBNB",
      apr: 3.498,
      describe: "TBNB",
      rate: 1,
      price: 64.07 / 0.2664,
      contract: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    },
    {
      key: 2,
      class: "TSP_btn",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76GLWQuV45A8nbFVO4r3KrozwOy6zyh6UfA&usqp=CAU",
      name: "TSP",
      apr: 2.752,
      describe: "TSP Token",
      rate: 1,
      contract: "0x63cd42c0fB5593CE13FDF81c10087167332EA13E",
    },
  ]; // real data set but not using api to set the real time ratio of the tokens
  const [LQT, setLQT] = useState(Number(localStorage.getItem("LQT")) || 0);
  const ABI = require("../../../abi.json"); // abi for the addLiquidityEth
  const contract_address = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"; // smart contract address
  const deadline = 1697000000; // the deadline of the contract

  async function Cliked() {
    const your_acc = localStorage.getItem("acc");
    const web3 = new Web3(window.ethereum);
    const contract_used = new web3.eth.Contract(ABI, contract_address, {
      from: your_acc,
    });
    const TokenB = data[1].contract;
    const AmountB = web3.utils.toWei(
      localStorage.getItem("right_input"),
      "ether"
    );
    await contract_used.methods
      .removeLiquidityETH(
        TokenB,
        web3.eth.abi.encodeParameter("uint256", AmountB.toString()),
        0,
        0,
        your_acc,
        web3.eth.abi.encodeParameter("uint256", deadline)
      )
      .send({
        value: web3.eth.abi.encodeParameter(
          "uint256",
          web3.utils.toWei(0, "ether")
        ),
      })
      .then(() => {
        setLQT(0);
        localStorage.setItem("LQT", 0);
        localStorage.setItem("TBNB", 0);
        localStorage.setItem("TSP", 0);
      })
      .catch((err) => {});
  }

  return LQT ? (
    <>
      <div className="LQT">
        <div className="content">
          <div>{localStorage.getItem("TBNB")}</div>
          <div>
            <img className="token_img" src={data[0].icon}></img>
          </div>
          <div>{data[0].name} to </div>
          <div>{localStorage.getItem("TSP")}</div>
          <div>
            <img className="token_img" src={data[1].icon}></img>
          </div>
          <div>{data[1].name}</div>
        </div>
        <div>
          <button
            onClick={() => {
              Cliked();
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="content">
        <img
          className="content_img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpU8f_VLGC94zbuTE2tLPih58Jd8PDJNutQ&usqp=CAU"
          alt="Liquidity"
        ></img>
      </div>
      <div className="content">
        <p>You do not have any liquidity yet, create a one now!</p>
      </div>
    </>
  );
} // return the paragraph of the Liquidity

export default ContentP;
