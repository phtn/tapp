import React, { useState, useEffect, useCallback } from "react";
// import { FaWallet } from "react-icons/fa";

// @ts-ignore
import TronGrid from "trongrid";
// @ts-ignore
import TronWeb from "tronweb";

import {
  ChakraProvider,
  CSSReset,
  Container,
  Box,
  VStack,
  Grid,
  HStack,
  SimpleGrid,
} from "@chakra-ui/core";

// Components
import Navbar from "./components/navbar";

import theme from "@chakra-ui/theme";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import Body from "./components/body";

declare global {
  interface Window {
    tronWeb: any;
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
    // async (address: string) => {
    //   if (address !== "") {
    //     // console.log(tronWeb.trx);
    //     const assets = await tronWeb.trx
    //       .getAccount(address)
    //       // .then((res: any) => res);
    //       .then((result: IAsset) => setBalance(result.balance * 0.000001));

    //     // console.log(assets);
    //     return assets;
    //   }
    // },

    function (address: string) {
      if (address !== "") {
        console.log(address);
        tronGrid.account.get(address, (options: any) => {
          console.log(options);
        });
      }
    },
    [tronGrid.asset]
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

  function gettronweb() {
    window.addEventListener("load", () => {
      let tronlink = setInterval(async () => {
        if (!!window.tronWeb) {
          clearInterval(tronlink);
          console.log("tronWeb is installed");
          const ready = await window.tronWeb.defaultAddress.hex;
          console.log(ready ? "logged in" : "not logged in");

          if (ready) {
            setLoggedIn(true);
            const walletName = window.tronWeb.defaultAddress.name;
            setWallet(walletName);
            setTron(window.tronWeb.defaultAddress);
            // getTRX(tron.base58);
          } else {
            setWallet("Not Connected");
          }
        }
      }, 500);
    });
  }

  useEffect(() => {
    gettronweb();
    setBase58(tron.base58);
    // getAssets("TT48X5wLJ14P4qu3KF24Fjw72wwyPmWtVJ");
    getTRX(tron.base58);

    // if (base58 !== "") {
    //   console.log(tronWeb.trx.getAccount(base58));
    // }
    // console.log(balance);
  }, [tron.base58, getTRX]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Navbar walletName={wallet} loggedIn={loggedIn} walletAddress={base58} />
      <Container maxW="x1">
        <Body height={window.innerHeight} />
      </Container>
    </ChakraProvider>
  );
};
