import Swap from "../Swap/Swap";
import Liquidity from "../Liquidity/Liquidity";
import AddPosition from "../Liquidity/AddPosition";
import { NavLink, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatBalance, formatChainAsNum } from "../utils";
import detectEthereumProvider from "@metamask/detect-provider";
import TranSwap from "./TranSwap";
import Agree_Header from "./Agree_Header";
import Agree_Content from "./Agree_Content";

const list = [
  { item: "Swap", link: "/", ahref: "header_swap" },
  { item: "Liquidity", link: "/Liquidity", ahref: "header_liquidity" },
]; // Link to pages

function Header() {
  const [Agreement, setAgreement] = useState(false);
  const [passAgree, setPassAgree] = useState(0);
  const [hasPassed] = useState(Number(localStorage.getItem("Pass")) || 0);
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const metamask_icon =
    "data:image/png;base64,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";

  function Generate() {
    return list.map((items) => {
      return (
        <div className="nav-item">
          <NavLink to={items.link} className="nav-item-link" id={items.ahref}>
            {items.item}
          </NavLink>
        </div>
      );
    });
  } // Generate links to Swap and Liquidity

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
        localStorage.setItem("acc", accounts[0]);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await !window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await !window.ethereum.request({
      method: "eth_chainId",
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setError(false);
        updateWallet(accounts);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
    setIsConnecting(false);
  };

  const disableConnect = Boolean(wallet) && isConnecting;

  setInterval(() => {
    if (
      (window.location.href.indexOf("Liquidity") > -1) |
      (window.location.href.indexOf("add_position") > -1)
    ) {
      try {
        document.getElementById("header_liquidity").style.color = "purple";
        document.getElementById("header_swap").style.color = "#C3C5C8";
      } catch (error) {}
    } else {
      try {
        document.getElementById("header_swap").style.color = "purple";
        document.getElementById("header_liquidity").style.color = "#C3C5C8";
      } catch (error) {}
    }
  }, 100); // change the color of the header if it is in different pages

  const connect = () => {
    var btn = document.querySelector(".connect");
    if (hasPassed) {
      if (passAgree === 1) {
        handleConnect();
        btn.innerHTML = `Click to show account number`;
        btn.style.backgroundColor = "white";
        btn.style.color = "black";
        btn.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
        setPassAgree(2);
      } else {
        setPassAgree(1);
        btn.style.backgroundColor = "white";
        btn.style.boxShadow = "none";
        btn.innerHTML = `<div className="metamask"><img src=${metamask_icon} height="50px"></img> ${wallet.accounts[0].substring(
          0,
          6
        )}...${wallet.accounts[0].slice(-3)}</div>`;
      }
    } else {
      if (!passAgree) {
        setAgreement(false);
        document.getElementById("test").style.transition = "0.15s";
        document.getElementById("test").style.visibility = "visible";
        document.getElementById("agreement").style.visibility = "visible";
      } else if (passAgree === 1) {
        handleConnect();
        btn.innerHTML = `Click to show account number`;
        btn.style.backgroundColor = "white";
        btn.style.color = "black";
        btn.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
        setPassAgree(2);
      } else {
        setPassAgree(1);
        btn.style.boxShadow = "none";
        btn.innerHTML = `<div className="metamask"><img src=${metamask_icon} height="50px"></img> ${wallet.accounts[0].substring(
          0,
          6
        )}...${wallet.accounts[0].slice(-3)}</div>`;
      }
    }
    document.querySelector("body").style.overflowY = "hidden";
  }; // set the agreement to visible

  const close_page = () => {
    document.getElementById("test").style.transition = "0.15s";
    document.getElementById("test").style.visibility = "hidden";
    document.getElementById("agreement").style.visibility = "hidden";
    document.querySelector("body").style.overflowY = "scroll";
  }; // set the agreement to hidden

  const accept = () => {
    close_page();
    setPassAgree(1);
    localStorage.setItem("Pass", 1);
    document.querySelector("body").style.overflowY = "scroll";
  }; // accept button onclick event

  const checkagree = (event) => {
    const accept_btn = document.querySelector(".accept_btn");
    setAgreement(event.target.checked);
    if (Agreement) {
      accept_btn.style.backgroundColor = "white";
      accept_btn.style.pointerEvents = "none";
    } else {
      accept_btn.style.backgroundColor = "yellow";
      accept_btn.style.pointerEvents = "visible";
      accept_btn.style.cursor = "pointer";
    }
  }; // checkbox of the agreement

  return (
    <div>
      <nav className="header">
        <TranSwap></TranSwap>
        <div className="link_div">
          <Generate></Generate>
        </div>
        <div className="connect_div">
          <button
            onClick={() => {
              connect();
            }}
            className="connect"
          >
            Connect Metamask
          </button>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<Swap></Swap>}></Route>
        <Route path="/liquidity" element={<Liquidity></Liquidity>}></Route>
        <Route
          path="/liquidity/add_position"
          element={<AddPosition></AddPosition>}
        ></Route>
      </Routes>
      <div className="agreement_div" id="agreement">
        <Agree_Header></Agree_Header>
        <Agree_Content></Agree_Content>
        <div className="checkbox_div">
          <input
            type="checkbox"
            checked={Agreement}
            onChange={checkagree}
          ></input>
          <p>
            I confirm that I have read, understand and accept the Terms of Use.
          </p>
        </div>
        <div className="btn_div">
          <div className="btn_container">
            <div className="btn_div_2">
              <button
                className="decline_btn"
                onClick={() => {
                  close_page();
                }}
              >
                Decline
              </button>
            </div>
            <div className="btn_div_2">
              <button
                className="accept_btn"
                onClick={() => {
                  accept();
                }}
                disabled={!Agreement}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="cover" id="test"></div>
    </div>
  );
} // return the Header of the website

export default Header;
