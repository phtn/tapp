import React from "react";
import { Flex, Box, HStack, Badge, Button } from "@chakra-ui/core";
import { FaWallet, FaUnlink, FaRegCopy, FaLink } from "react-icons/fa";

type NavbarProps = {
  loggedIn: boolean;
  walletName: string;
  walletAddress: string;
};

const Navbar = (props: NavbarProps) => {
  const { loggedIn, walletName, walletAddress } = props;
  return (
    <Flex>
      <Box padding="4" bg="rgba(0,0,0,0.1)" flex={1} h={75} style={styles.nav}>
        <HStack>
          <Flex align="flex-start" justify="center" flex={1} minW={200}>
            <Button
              leftIcon={loggedIn ? <FaWallet /> : <FaUnlink />}
              // variantColor="blue"
              variant="outline"
              style={styles.walletName}
              disabled={true}
            >
              {walletName.toUpperCase()}
            </Button>
          </Flex>
          <Flex flex={5} align="center" justify="center">
            <Badge ml="2" fontSize="1em" color="black" style={styles.logo}>
              cartesian
            </Badge>
          </Flex>
          <Flex align="flex-end" flex={1}>
            <Button
              rightIcon={loggedIn ? <FaRegCopy /> : <FaLink />}
              // variantColor="blue"
              // variantColor="green"
              style={styles.walletAddress}
              disabled={false}
            >
              {loggedIn
                ? walletAddress.substr(0, 4) +
                  " ··· " +
                  walletAddress.substr(walletAddress.length - 4)
                : "TRONLINK"}
            </Button>
          </Flex>
        </HStack>
      </Box>
    </Flex>
  );
};

const styles = {
  nav: {
    borderRadius: 5,
  },
  walletName: {
    // textDecoration: "uppercase",
    minWidth: "200px",
  },
  walletAddress: {
    color: "teal",
    backgroundColor: "rgba(0,0,0,0.1)",
    minWidth: "200px",
  },
  logo: {
    padding: "4px 50px",
  },
};

export default Navbar;
