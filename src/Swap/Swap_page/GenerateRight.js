import { useState } from "react";

function GenerateRight({ props }) {
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

  const [right_input, setRight_input] = useState("");
  const [left_input, setLeft_input] = useState(0);

  setInterval(() => {
    try {
      setRight_input(localStorage.getItem("right_input_value"));
      setLeft_input(localStorage.getItem("left_input_value"));
    } catch {}
  }, 100);

  return (
    <>
      {props ? (
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
                  type="text"
                  id="right"
                  placeholder="0"
                  value={Number(right_input).toFixed(4)}
                  autoComplete="off"
                ></input>
              </div>
            </div>
            <div className="exchange">
              <div>{data[1].describe}</div>
              <div>~ ${((64.07 / 0.2664) * left_input).toFixed(2)} USD</div>
            </div>
          </div>
        </div>
      ) : (
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
                  type="text"
                  id="right"
                  placeholder="0"
                  value={Number(right_input).toFixed(4)}
                  autoComplete="off"
                ></input>
              </div>
            </div>
            <div className="exchange">
              <div>{data[0].describe}</div>
              <div>~ ${((64.07 / 0.2664) * left_input).toFixed(2)} USD</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} // Gnereate right token div

export default GenerateRight;
