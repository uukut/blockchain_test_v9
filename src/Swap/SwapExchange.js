import { useState } from "react";
import Web3 from "web3";
import Generateleft from "./Swap_page/GenerateLeft";
import GenerateRight from "./Swap_page/GenerateRight";

function SwapExchange() {
  // const [ava_data] = useState([]);
  // const [left, setLeft] = useState(false);
  // const [leftContent, setLeftContent] = useState(0);
  // const [rightContent, setRightContent] = useState(0);
  const [left_index, setLeft_index] = useState(0);
  const [right_index, setRight_index] = useState(1);
  const [swap, setSwap] = useState(false);
  const [switched, setSwitched] = useState(true);
  const [result, setResult] = useState(0);
  const data = [
    {
      key: 1,
      name: "TBNB",
      icon: "https://etherscan.io/images/main/empty-token.png",
      id: 0,
      element: "WBNB_data",
      describe: "Wrapped BNB",
      ratio: 1,
      contract: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    },
    {
      key: 2,
      name: "TSP",
      element: "TSP_data",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76GLWQuV45A8nbFVO4r3KrozwOy6zyh6UfA&usqp=CAU",
      id: 1,
      describe: "TSP",
      ratio: 24.3231,
      contract: "0x63cd42c0fB5593CE13FDF81c10087167332EA13E",
    },
    // {
    //   key: 3,
    //   name: "BTCB",
    //   id: 2,
    //   element: "BTCB_data",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    //   describe: "Bitcoin BEP2",
    //   ratio: 1 / 0.512803,
    //   contract: "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8",
    // },
    // {
    //   key: 4,
    //   name: "WETH",
    //   id: 3,
    //   element: "KC2023_data",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
    //   describe: "Wrapped Ether",
    //   ratio: 1 / 1.29954,
    //   contract: "0x1EFf851e51C58A92Cb18e5e8B87bBbC3670A01Bf",
    // },
    // {
    //   key: 5,
    //   name: "DAI",
    //   element: "DAI_data",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
    //   id: 4,
    //   describe: "DAI",
    //   ratio: 1 / 4.87322,
    //   contract: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
    // },
    // {
    //   key: 6,
    //   name: "ETH",
    //   element: "ETH_data",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    //   id: 5,
    //   describe: "Ethereum",
    //   ratio: 1 / 0.023036,
    //   contract: "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378",
    // },
    // {
    //   key: 7,
    //   name: "USDC",
    //   element: "USDC_data",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    //   id: 6,
    //   describe: "USD Coin",
    //   ratio: 1 / 1.48588,
    //   contract: "0x64544969ed7ebf5f083679233325356ebe738930",
    // },
    // {
    //   key: 8,
    //   name: "USDT",
    //   element: "USDT_data",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    //   id: 7,
    //   describe: "Tether USD",
    //   ratio: 1 / 1.2727,
    //   contract: "0x221c5b1a293aac1187ed3a7d7d2d9ad7fe1f3fb0",
    // },
  ]; // static data set of the tokens
  const [left_inp] = useState(
    Number(localStorage.getItem("left_input_value")) || 0
  );
  const [trade, setTrade] = useState(false);
  const ABI = require("../swap.json"); // abi of the contract used
  const address = "0x9a489505a00cE272eAa5e07Dba6491314CaE3796"; // address of the contract used
  const ratioABI = require("../abi.json");
  const ratio_address = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
  const deadline = 1697000000; // the deadline of the contract

  // const TokenAdd = (side) => {
  //   document.querySelector(".token_added_div").style.transition =
  //     "visibility 0.25s";
  //   document.querySelector(".token_added_div").style.visibility = "visible";
  //   document.querySelector(".center_div").style.transition = "visibility 0.25s";
  //   document.querySelector(".center_div").style.visibility = "visible";
  //   side ? setLeft(true) : setLeft(false);
  // }; //pop a UI for adding tokens

  // function Generate() {
  //   while (ava_data.length) {
  //     ava_data.pop();
  //   }
  //   for (var i = 0; i < data.length; i++) {
  //     if (i !== left_index && i !== right_index) {
  //       ava_data.push(data[i]);
  //     }
  //   }
  //   return ava_data.map((items) => {
  //     var ratio = items.ratio.toFixed(2);
  //     return (
  //       <div className="token_choice_div">
  //         <button
  //           id={items.element}
  //           onClick={() => {
  //             Close();
  //             left ? setLeft_index(items.id) : setRight_index(items.id);
  //           }}
  //         >
  //           <div className="button_choice_div">
  //             <div>
  //               <div>
  //                 <img src={items.icon} alt="icon"></img>
  //                 {items.name} - {items.describe}
  //               </div>
  //             </div>
  //             <div>{data.indexOf(items) ? `Rate: 1 - ${ratio}` : <></>}</div>
  //           </div>
  //         </button>
  //       </div>
  //     );
  //   });
  // } // Generate the inner token choices

  function Close() {
    document.querySelector(".token_added_div").style.visibility = "hidden";
    document.querySelector(".center_div").style.visibility = "hidden";
  } // Close the UI once user finish changing

  function Switching() {
    setSwitched(!switched);
    setLeft_index(1 - Number(left_index));
    setRight_index(1 - Number(right_index));
  } // switch two tokens div

  async function swaping() {
    const your_acc = localStorage.getItem("acc");
    const web3 = new Web3(window.ethereum);
    var current_bnb;
    if (switched) {
      current_bnb = Number(localStorage.getItem("left_input_value"));
    } else {
      current_bnb = 0;
    }
    const contract_used = new web3.eth.Contract(ABI, address, {
      from: your_acc,
    });
    const swap = contract_used.methods.swapExactTokensForTokens(
      web3.eth.abi.encodeParameter(
        "uint256",
        web3.utils.toWei(
          Number(localStorage.getItem("left_input_value")),
          "ether"
        )
      ),
      web3.eth.abi.encodeParameter("uint256", web3.utils.toWei("0", "ether")),
      [data[left_index].contract, data[right_index].contract],
      your_acc,
      deadline
    );
    await swap
      .send({
        value: web3.eth.abi.encodeParameter(
          "uint256",
          web3.utils.toWei(current_bnb, "ether")
        ),
      })
      .then(() => alert("Transition completed!"))
      .catch((err) => alert("Transition failed!"));
  } // Swap function (not yet done)

  function switching() {
    setSwap(!swap);
  } // switch the tokens

  function Trade() {
    return (
      <div className="trade_info">
        <div className="trade_content">
          <div className="trade_element">
            <div>Max slippage</div>
            <div>
              <select defaultValue={0.5}>
                <option>0.1%</option>
                <option value={0.5}>0.5%</option>
                <option>1%</option>
                <option>1.5%</option>
              </select>
            </div>
          </div>
          <div className="trade_element">
            <div>LP Fee</div>
            <div>Less than $0.0000001</div>
          </div>
          <div className="trade_element">
            <div>Rate</div>
            <div className="trade_rate">
              <div className="left_token">
                <div style={{ marginRight: "5px" }}>1</div>
                <div>
                  {!swap ? (
                    <div>{data[left_index].name}</div>
                  ) : (
                    <div>{data[right_index].name}</div>
                  )}
                </div>
              </div>
              <button>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpimXJzajN4wt4YpHVbFdUTtYFeN8qhi74JQ&usqp=CAU"
                  alt="none"
                  onClick={() => switching()}
                ></img>
              </button>
              <div className="right_token">
                <div style={{ marginRight: "5px" }}>
                  {swap ? Number(result).toFixed(4) : (1 / result).toFixed(4)}
                </div>
                <div>
                  {swap ? (
                    <div>{data[left_index].name}</div>
                  ) : (
                    <div>{data[right_index].name}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="trade_element">
            <div>Minimum Receive</div>
            <div className="receiving">
              {!swap ? (
                <>
                  {0}
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[right_index].icon}
                    alt=""
                  ></img>
                </>
              ) : (
                <>
                  {0}
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[left_index].icon}
                    alt=""
                  ></img>
                </>
              )}
            </div>
          </div>
          <div className="trade_element">
            <div>Price impact</div>
            <div className="special">
              0.01%
              {!swap ? (
                <>
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[right_index].icon}
                    alt=""
                  ></img>
                </>
              ) : (
                <>
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[left_index].icon}
                    alt=""
                  ></img>
                </>
              )}
            </div>
          </div>
          <div className="trade_element">
            <div>Fee</div> <div>$0</div>
          </div>
        </div>
        <div className="trade_details">
          <button
            onClick={() => {
              setTrade(false);
            }}
          >
            <div>&#8592; Trade Details</div>
          </button>
        </div>
      </div>
    );
  } // return the details of the tokens

  async function Ratio() {
    const your_acc = localStorage.getItem("acc");
    const web3 = new Web3(window.ethereum);
    const ratio_contract = new web3.eth.Contract(ratioABI, ratio_address, {
      from: your_acc,
    });
    try {
      var x = await ratio_contract.methods
        .getAmountsOut(
          web3.eth.abi.encodeParameter(
            "uint256",
            web3.utils.toWei(left_inp, "ether")
          ),
          [data[0].contract, data[1].contract]
        )
        .call();
    } catch {}
    try {
      setResult((Number(x[1].toString().slice(0)) / 1e18).toFixed(4));
    } catch (err) {
      setResult(0);
    }
  } // handle input change to render the info

  Ratio();

  return (
    <div className="main_trade">
      {!trade ? (
        <div>
          <div className="swap_label">
            <div className="inner_swap_container">
              <Generateleft props={switched}></Generateleft>
            </div>
            <div className="convert_div">
              <button className="swap_btn" onClick={() => Switching()}>
                <img
                  title="swap"
                  className="convert"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1svB9Ngre0z1T_L1A13Ncgmc3r1YtE3tVQ&usqp=CAU"
                  alt="converter"
                ></img>
              </button>
            </div>
            <div className="inner_swap_container">
              <GenerateRight props={switched} t_ratio={result}></GenerateRight>
            </div>
          </div>
          <div className="outer_trade">
            <div className="Trade">
              <div>
                <button className="confirm_trade_btn" onClick={() => swaping()}>
                  Confirm
                </button>
              </div>
              <div>
                <button
                  className="trade_btn"
                  onClick={() => {
                    setTrade(true);
                  }}
                >
                  Trade Details &#8594;
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Trade></Trade>
      )}
      <div className="center_div">
        <div className="center_inner_div">
          <div>Change Tokens</div>
          <div>
            <button onClick={() => Close()}>X</button>
          </div>
        </div>
      </div>
      <div className="token_added_div"></div>
    </div>
  ); //return the two tokens div
}
export default SwapExchange;
