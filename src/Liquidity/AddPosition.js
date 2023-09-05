import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddHeader from "./AddPosition_page/AddHeader";
import AddPair from "./AddPosition_page/AddPair";
import Web3 from "web3";
import ChooseTokenLeft from "./AddPosition_page/ChooseTokenLeft";
import ChooseTokenRight from "./AddPosition_page/ChooseTokenRight";

function AddPosition() {
  var btn_clicked = 0;
  const [chosen, setChosen] = useState(false);
  const [token_chosen] = useState([]);
  const [swaping, setSwaping] = useState(false);
  const [result, setResult] = useState(1);
  const deadline = 1697000000; // assigned a huge time for the timeout of the confirm on the payment of Metamask
  const [first] = useState(localStorage.getItem("first") || false);
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
      rate: 6.17322,
      contract: "0x63cd42c0fB5593CE13FDF81c10087167332EA13E",
    },
    // {
    //   key: 3,
    //   class: "BTCB_btn",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    //   name: "BTCB",
    //   apr: 1.229,
    //   describe: "Bitcoin BEP2",
    //   rate: 1 / 0.512803,
    //   contract: "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8",
    // },
    // {
    //   key: 4,
    //   class: "WETH_btn",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
    //   name: "WETH",
    //   apr: 2.151,
    //   describe: "Wrapped Ether",
    //   rate: 1 / 1.29954,
    //   contract: "0x1EFf851e51C58A92Cb18e5e8B87bBbC3670A01Bf",
    // },
    // {
    //   key: 5,
    //   class: "DAI_btn",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
    //   name: "DAI",
    //   apr: 1.0438,
    //   describe: "DAI",
    //   rate: 1 / 4.87322,
    //   contract: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
    // },
    // {
    //   key: 6,
    //   class: "ETH_btn",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    //   name: "ETH",
    //   apr: 2.2388,
    //   describe: "Ethereum",
    //   rate: 1 / 0.023036,
    //   contract: "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378",
    // },
    // {
    //   key: 7,
    //   class: "USDC",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    //   name: "USDC",
    //   apr: 1.4906,
    //   describe: "USD Coin",
    //   rate: 1 / 1.48588,
    //   contract: "0x64544969ed7ebf5f083679233325356ebe738930",
    // },
    // {
    //   key: 8,
    //   class: "USDT",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    //   name: "USDT",
    //   apr: 1.1708,
    //   describe: "Tether USD",
    //   rate: 1 / 1.2727,
    //   contract: "0x221c5b1a293aac1187ed3a7d7d2d9ad7fe1f3fb0",
    // },
  ]; // real data set but not using api to set the real time ratio of the tokens
  const ABI = require("../abi.json"); // abi for the addLiquidityEth
  const contract_address = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"; // smart contract address
  const approveABI = require("../swap.json");
  const approve_address = "0x9a489505a00cE272eAa5e07Dba6491314CaE3796";

  const swap = () => {
    setSwaping(!swaping);
  }; // swap the rate and pool supply

  function Close() {
    document.querySelector(".token_added_div").style.transition = "hidden 0.5s";
    document.querySelector(".center_div").style.transition = "hidden 0.5s";
    document.querySelector(".token_added_div").style.visibility = "hidden";
    document.querySelector(".center_div").style.visibility = "hidden";
    document.querySelector("body").style.overflowY = "scroll";
  } // Close the UI once user finish changing

  function Generate() {
    return data.map((items, index) => {
      if (index) {
        var ratio = items.rate.toFixed(4);
        return (
          <div className="token_choice_div">
            <button
              id={items.name}
              onClick={() => {
                document.getElementById(items.name).disabled = "disabled";
                document.getElementById(items.name).style.pointerEvents =
                  "none";
                btn_clicked++;
                token_chosen.push(index);
                if (btn_clicked === 1) {
                  Close();
                  btn_clicked = 0;
                  setChosen(true);
                }
              }}
            >
              <div className="button_choice_div">
                <div>
                  <div>
                    <img src={items.icon} alt="icon"></img>
                    {items.name} - {items.describe}
                  </div>
                </div>
                <div>Ratio: 1 - {Number(ratio).toFixed(4)}</div>
              </div>
            </button>
          </div>
        );
      }
      return <></>;
    });
  } // generate the tokens for the user to choose

  async function Apply() {
    const your_acc = localStorage.getItem("acc");
    const web3 = new Web3(window.ethereum);
    const contract_used = new web3.eth.Contract(ABI, contract_address, {
      from: your_acc,
    });
    const approve_contract = new web3.eth.Contract(
      approveABI,
      approve_address,
      { from: your_acc }
    );
    const TokenB = data[token_chosen[0]].contract;
    const AmountB = web3.utils.toWei(
      Number(localStorage.getItem("right_input")),
      "ether"
    );
    if (!first) {
      await approve_contract.methods
        .approveMax(data[1].contract)
        .send({
          value: web3.eth.abi.encodeParameter(
            "uint256",
            web3.utils.toWei(0, "ether")
          ),
        })
        .catch((err) => {});
      localStorage.setItem("first", true);
    }
    await contract_used.methods
      .addLiquidityETH(
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
          web3.utils.toWei(
            Number(localStorage.getItem("right_input")) / data[1].rate,
            "ether"
          )
        ),
      })
      .then(() => {
        alert("Transition complete!");
        localStorage.setItem("LQT", 1);
        localStorage.setItem(
          "TBNB",
          Number(localStorage.getItem("TBNB")) +
            Number(localStorage.getItem("right_input")) / data[1].rate
        );
        localStorage.setItem(
          "TSP",
          Number(localStorage.getItem("TSP")) +
            Number(localStorage.getItem("right_input"))
        );
      })
      .catch((err) => {
        alert("Transition failed!");
        localStorage.setItem("LQT", 0);
      });
  } // Add Liqiduity to the pool after clicking the Apply button

  function TokenDetail() {
    return (
      <div className="tk_detail">
        <div className="tk_detail_inner_div">
          <div>APR</div>
          <div>{(data[0].apr / data[token_chosen[0]].apr).toFixed(7)}%</div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Rate</div>
          <div style={{ display: "flex" }}>
            <div id="left_token">
              1 {!swaping ? data[0].name : data[token_chosen[0]].name}
            </div>
            <button>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpimXJzajN4wt4YpHVbFdUTtYFeN8qhi74JQ&usqp=CAU"
                alt="none"
                onClick={() => swap()}
              ></img>
            </button>
            <div id="right_token">
              {swaping
                ? (1 / data[1].rate).toFixed(4)
                : data[1].rate.toFixed(4)}{" "}
              {swaping ? data[0].name : data[token_chosen[0]].name}
            </div>
          </div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Slippage Tolerance</div>
          <div>
            <select defaultValue={0.5}>
              <option>0.1%</option>
              <option value={0.5}>0.5%</option>
              <option>1%</option>
              <option>1.5%</option>
            </select>
          </div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Created By</div> <div>You</div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Created At</div> <div>{new Date().toLocaleDateString()}</div>
        </div>
        <div className="apply_div">
          <div>
            <Link to="/Liquidity">
              <button className="apply_button" onClick={() => Apply()}>
                Apply
              </button>
            </Link>
          </div>
          <div>
            <Link to="/Liquidity">
              <button className="cancel_button">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } // generate the tokens detail

  function PairDetail() {
    return (
      <>
        {chosen ? (
          <div style={{ display: "block" }}>
            <div className="chosen_token">
              <ChooseTokenLeft props={result}></ChooseTokenLeft>
              <ChooseTokenRight props={result}></ChooseTokenRight>
            </div>
          </div>
        ) : null}
      </>
    );
  } // print the tokens detail to UI

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main position_main"
    >
      <div className="add_main">
        <AddHeader></AddHeader>
        <div className="main_add">{!chosen ? <AddPair></AddPair> : <></>}</div>
        <div>{chosen ? <PairDetail></PairDetail> : <></>}</div>
        <div className="container_tk">
          {chosen ? <TokenDetail></TokenDetail> : <></>}
        </div>
      </div>
      <div>
        <div className="center_div">
          <div className="center_inner_div">
            <div>Choose A Token</div>
            <div>
              <button onClick={() => Close()}> X </button>
            </div>
          </div>
          <Generate></Generate>
        </div>
        <div className="token_added_div"></div>
      </div>
    </motion.div>
  ); // return the UI of Add position
}

export default AddPosition;
