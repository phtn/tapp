import React, { useState, useEffect, useCallback } from "react";
// import { FaWallet } from "react-icons/fa";

// @ts-ignore
// import TronGrid from "trongrid";
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
} from "@chakra-ui/core";

// Components
import Navbar from "./components/navbar";

import theme from "@chakra-ui/theme";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";

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
  const tronWeb = new TronWeb({
    fullHost: "https://api.trongrid.io",
  });
  // Get TRX Assets
  const getTRX = useCallback(
    async (address: string) => {
      if (address !== "") {
        // console.log(tronWeb.trx);
        const assets = await tronWeb.trx
          .getAccount(address)
          // .then((res: any) => res);
          .then((result: IAsset) => setBalance(result.balance * 0.000001));

        // console.log(assets);
        return assets;
      }
    },
    [tronWeb.trx]
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
          console.log("tronWeb is installed");
          const ready = await window.tronWeb.defaultAddress.hex;
          console.log(ready ? "logged in" : "not logged in");

          if (ready) {
            setLoggedIn(true);
            const walletName = window.tronWeb.defaultAddress.name;
            setWallet(walletName);
            setTron(window.tronWeb.defaultAddress);
            // setBase58(tron.base58);
          } else {
            setWallet("Not Connected");
          }
        }

        clearInterval(tronlink);
      }, 3);
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
        <Box textAlign="center" fontSize="xl">
          <HStack p={5}>
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>

          <Box>{balance}</Box>

          <Grid minH="100vh" p={4}>
            <VStack spacing={10}>
              <Logo h="50vmin" pointerEvents="none" />
            </VStack>
          </Grid>
        </Box>
      </Container>
    </ChakraProvider>
  );
};
