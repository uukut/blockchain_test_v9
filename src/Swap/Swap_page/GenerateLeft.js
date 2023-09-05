import { useState } from "react";
import Web3 from "web3";

function Generateleft({ props }) {
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
  ]; // static data set of the tokens
  const [leftContent, setLeftContent] = useState("");
  const ratioABI = require("../../abi.json");
  const ratio_address = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";

  function handleChange(e) {
    localStorage.setItem("left_input_value", Number(e.target.value));
    setLeftContent(e.target.value);
  }

  function calDec(value) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  }

  async function Ratio() {
    var x;
    const your_acc = localStorage.getItem("acc");
    const web3 = new Web3(window.ethereum);
    const ratio_contract = new web3.eth.Contract(ratioABI, ratio_address, {
      from: your_acc,
    });
    try {
      if (props) {
        x = await ratio_contract.methods
          .getAmountsOut(
            web3.eth.abi.encodeParameter(
              "uint256",
              web3.utils.toWei(Number(leftContent), "ether")
            ),
            [data[0].contract, data[1].contract]
          )
          .call();
        localStorage.setItem("right_input_value", Number(x[1]) / 1e18);
      } else {
        x = await ratio_contract.methods
          .getAmountsOut(
            web3.eth.abi.encodeParameter(
              "uint256",
              web3.utils.toWei(Number(leftContent), "ether")
            ),
            [data[1].contract, data[0].contract]
          )
          .call();
        localStorage.setItem("right_input_value", Number(x[1]) / 1e18);
      }
    } catch {}
  }

  Ratio();

  return (
    <>
      {props ? (
        <div className="inner_swap">
          <div className="swap_label_div">
            <div>
              <label>{data[0].name} Payment</label>
            </div>
            <div></div>
          </div>
          <div className="swap_exchange_div">
            <div className="exchange">
              <div className="inner_exchange">
                <img
                  src={data[0].icon}
                  height={"30px"}
                  width={"30px"}
                  alt=""
                ></img>
                {data[0].name}
              </div>
              <div>
                <input
                  className="inner_input"
                  id="left"
                  type="text"
                  placeholder="0"
                  value={leftContent}
                  autoComplete="off"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                ></input>
              </div>
            </div>
            <div className="exchange">
              <div>{data[0].describe}</div>
              <div>~ ${((64.07 / 0.2664) * leftContent).toFixed(2)} USD</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="inner_swap">
          <div className="swap_label_div">
            <div>
              <label>{data[1].name} Payment</label>
            </div>
            <div></div>
          </div>
          <div className="swap_exchange_div">
            <div className="exchange">
              <div className="inner_exchange">
                <img
                  src={data[1].icon}
                  height={"30px"}
                  width={"30px"}
                  alt=""
                ></img>
                {data[1].name}
              </div>
              <div>
                <input
                  className="inner_input"
                  id="left"
                  type="text"
                  placeholder="0"
                  value={leftContent}
                  autoComplete="off"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                ></input>
              </div>
            </div>
            <div className="exchange">
              <div>{data[1].describe}</div>
              <div>~ ${((64.07 / 0.2664) * leftContent).toFixed(2)} USD</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} // Generate left token div

export default Generateleft;
