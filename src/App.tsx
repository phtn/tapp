import React, { useState, useEffect, useCallback } from "react";
// import { FaWallet } from "react-icons/fa";

// @ts-ignore
import TronGrid from "trongrid";
// @ts-ignore
import TronWeb from "tronweb";

import { ChakraProvider, CSSReset, Container } from "@chakra-ui/core";

// Components
import Navbar from "./components/navbar";

import theme from "@chakra-ui/theme";
import Body from "./components/body";
import Footer from "./components/footer";

declare global {
  interface Window {
    tronWeb: any;
    userAgent: any;
  }
}

declare global {
  interface Navigator {
    userAgent: any;
  }
}

interface IDefaultAddress {
  hex: string;
  base58: string;
  name: string;
}

interface IAsset {
  address: string;
  balance: number;
}

export const App = () => {
  const HttpProvider = TronWeb.providers.HttpProvider;
  const fullNode = new HttpProvider("https://api.trongrid.io");
  const solidityNode = new HttpProvider("https://api.trongrid.io");
  const eventServer = new HttpProvider("https://api.trongrid.io");
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

  const tronGrid = new TronGrid(tronWeb);
  // Get TRX Assets
  const getTRX = useCallback(
    async function (address: string) {
      if (address !== "") {
        const addr = address;

        const options = {
          showAssets: true,
          onlyConfirmed: true,
        };

        const account = await tronGrid.account.get(addr, options);
        const data = await account.data;
        const [resource] = data;
        const balance = resource.balance;
        const trc20 = resource.trc20;
        setBalance(balance);
        const [sunAddress] = trc20;
        const key = Object.keys(sunAddress);
        console.log("key: " + key);
        console.log(sunAddress[key] * 0.000000000000000001);
        setTrc20(sunAddress[key]);
        console.log(balance);
      }
    },
    [tronGrid.account]
  );

  const [tron, setTron] = useState<IDefaultAddress>({
    hex: "",
    base58: "",
    name: "",
  });

  const [wallet, setWallet] = useState("···");
  const [base58, setBase58] = useState("address");
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);
  const [trc20, setTrc20] = useState(0);
  const [installed, setInstalled] = useState(false);
  const [userAgent] = useState(window.navigator.userAgent);

  function gettronweb() {
    window.addEventListener("load", () => {
      let tronlinkInterval = setInterval(async () => {
        if (!!window.tronWeb) {
          setInstalled(true);
          clearInterval(tronlinkInterval);
          console.log("Tronlink is installed");
          const ready = await window.tronWeb.defaultAddress.hex;
          console.log(ready ? "logged in" : "not logged in");
          console.log(userAgent);

          if (ready) {
            setLoggedIn(true);
            const walletName = window.tronWeb.defaultAddress.name;
            setWallet(walletName);
            setTron(window.tronWeb.defaultAddress);
            // getTRX(tron.base58);
          } else {
            setWallet("");
          }
        } else {
          console.log("Tronlink not installed");
        }
      }, 500);
    });
  }

  useEffect(() => {
    gettronweb();
    setBase58(tron.base58);
    // getAssets("TT48X5wLJ14P4qu3KF24Fjw72wwyPmWtVJ");
    try {
      getTRX(tron.base58);
    } catch (err) {
      console.log(err.message);
    }

    // if (base58 !== "") {
    //   console.log(tronWeb.trx.getAccount(base58));
    // }
    // console.log(balance);
  }, [tron.base58, getTRX, gettronweb]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Navbar
        walletName={wallet}
        loggedIn={loggedIn}
        walletAddress={base58}
        balance={balance}
        trc20={trc20}
      />
      <Container maxW="x1">
        <Body
          installed={installed}
          loggedIn={loggedIn}
          height={window.innerHeight - 200}
          balance={balance}
        />
      </Container>
      <Container>
        <Footer />
      </Container>
    </ChakraProvider>
  );
};
