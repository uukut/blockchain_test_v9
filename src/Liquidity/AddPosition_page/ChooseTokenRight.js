import { useState } from "react";
import Money_value from "./Money_value";

function ChooseTokenRight({ props }) {
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
  ]; // real data set but not using api to set the real time ratio of the tokens

  const [right_input, setRight_input] = useState("");

  setInterval(() => {
    try {
      setRight_input(localStorage.getItem("right_input"));
    } catch {}
  }, 100);

  return (
    <div className="detail_div">
      <div>
        <div style={{ textAlign: "center" }}>
          <img className="token_icon" alt="token" src={data[1].icon}></img>
          {data[1].name}
        </div>
        <div>
          <input
            className="user_input"
            id="right_input"
            placeholder="0"
            autoComplete="off"
            defaultValue={0}
            value={Number(right_input).toFixed(4)}
          ></input>
        </div>
      </div>
      <div>
        <div>{data[1].describe}</div>
        <Money_value props={right_input / data[1].rate}></Money_value>
      </div>
    </div>
  );
} // generate right token chosen by the user

export default ChooseTokenRight;
