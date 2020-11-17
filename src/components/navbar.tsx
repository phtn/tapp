import React from "react";
import {
  Flex,
  Box,
  HStack,
  Badge,
  Button,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/core";
import { FaWallet, FaUnlink, FaLink, FaDizzy } from "react-icons/fa";

type NavbarProps = {
  loggedIn: boolean;
  walletName: string;
  walletAddress: string;
};

const Navbar = (props: NavbarProps) => {
  const { loggedIn, walletName, walletAddress } = props;
  return (
    <Flex borderBottom={"2px solid rgba(0,0,0,0.2)"}>
      <Box padding="4" bg="rgba(0,0,0,0.1)" flex={1} style={styles.nav}>
        <HStack>
          <Flex align="center" justify="center">
            <Menu>
              <MenuButton
                minW="150px"
                as={Button}
                // variantColor="pink"
                backgroundColor="rgba(0,0,0,0.2)"
                leftIcon={
                  loggedIn ? <FaWallet /> : <FaUnlink color="#fd5c63" />
                }
                disabled={loggedIn ? false : true}
                _hover={{ bg: "rgba(0,0,0,0.7)" }}
                _expanded={{ bg: "gray.100" }}
                color={"#0085ad"}
                px={4}
                py={2}
                transition="all 0.2s"
              >
                {walletName.toUpperCase()}
              </MenuButton>
              <MenuList>
                <MenuGroup title="Assets">
                  <MenuItem style={styles.menuItem}>
                    <span style={styles.assetName}>TRX</span> ≈{" "}
                    <b style={styles.tronValue}>
                      270,156<span style={styles.tronDecimals}>.9834</span>
                    </b>
                    <b style={styles.dollar}>$</b> 6,753.90
                  </MenuItem>
                  <MenuItem style={styles.assetName}>SUN </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Strength">
                  <MenuItem>Bandwidth</MenuItem>
                  <MenuItem>Energy</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>

            {/* <Button
              leftIcon={loggedIn ? <FaWallet /> : <FaUnlink />}
              // variantColor="blue"
              variant="outline"
              style={styles.walletName}
              disabled={true}
            >
              {walletName.toUpperCase()}
            </Button> */}
          </Flex>
          <Flex flex={5} align="center" justify="center">
            <VStack>
              <Badge ml="2" fontSize="1em" color="black" style={styles.logo}>
                cartesian
              </Badge>
              <Text style={styles.logoDesc}>S&middot;O&middot;V</Text>
            </VStack>
          </Flex>
          <Flex>
            <Button
              rightIcon={
                loggedIn ? (
                  <FaLink color={"papayawhip"} />
                ) : (
                  <FaDizzy color={"#fd5c63"} />
                )
              }
              minW="200px"
              backgroundColor={"rgba(0,0,0,0.2)"}
              // style={styles.walletAddress}
              disabled={loggedIn ? false : true}
              _hover={{ bg: "rgba(0,0,0,0.7)" }}
              _expanded={{ bg: "green.500" }}
              color={"#0085ad"}
            >
              {loggedIn
                ? walletAddress.substr(0, 4) +
                  " ··· " +
                  walletAddress.substr(walletAddress.length - 4)
                : ""}
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
    // color: "teal",
    // backgroundColor: "rgba(0,0,0,0.4)",
    minWidth: "200px",
  },
  logo: {
    padding: "4px 50px",
    backgroundColor: "transparent",
    color: "teal",
  },
  logoDesc: {
    fontSize: 9,
    marginTop: "-10px",
  },
  menuItem: {
    height: 20,
    fontSize: 10,
  },
  assetName: {
    marginRight: 10,
    color: "#fd5c63",
    fontWeight: 700,
  },
  dollar: {
    marginRight: 3,
    marginLeft: 10,
  },
  tronValue: {
    marginLeft: 10,
  },
  tronDecimals: {
    color: "rgba(0,0,0,0.45)",
  },
};

export default Navbar;
