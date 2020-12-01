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
  Avatar,
  IconButton,
} from "@chakra-ui/core";
import { FaWallet, FaUnlink, FaLink, FaDizzy } from "react-icons/fa";

type NavbarProps = {
  loggedIn: boolean;
  walletName: string;
  walletAddress: string;
  balance: number;
};

const Navbar = (props: NavbarProps) => {
  const { loggedIn, walletName, walletAddress, balance } = props;
  return (
    <Flex borderBottom={"2px solid rgba(0,0,0,0.2)"}>
      <Box padding="4" bg="rgba(0,0,0,0.1)" flex={1} style={styles.nav}>
        <HStack>
          {/* FIRST */}
          <Flex flex={1} justifyContent="left">
            <VStack>
              <Badge ml="2" fontSize="1em" color="black" style={styles.logo}>
                cartesian
              </Badge>
            </VStack>
          </Flex>
          {/* SECOND */}
          <Flex align="center" justify="center">
            <Menu>
              <MenuButton
                // minW={loggedIn ? "75px" : 0}
                minW={50}
                as={IconButton}
                backgroundColor="rgba(0,0,0,0.2)"
                isLoading={!loggedIn}
                icon={
                  loggedIn ? (
                    <FaWallet color="teal" />
                  ) : (
                    <FaUnlink color="#fd5c63" />
                  )
                }
                disabled={loggedIn ? false : true}
                _hover={
                  loggedIn
                    ? { bg: "rgba(0,0,0,0.7)" }
                    : { bg: "rgba(0,0,0,0.2)" }
                }
                _expanded={{ bg: "gray.100" }}
                color={"#0085ad"}
                px={4}
                py={2}
                transition="all 0.2s"
              >
                {/* {walletName.toUpperCase()} */}
              </MenuButton>
              <MenuList>
                <MenuGroup title={walletName.toUpperCase()}>
                  <MenuItem style={styles.menuItem}>
                    <Avatar size="sm" name="TRX" src="" />
                    <Text style={styles.balance}>{balance * 0.000001}</Text>
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
          </Flex>
          {/* THIRD */}
          <Flex>
            {/* <Button
              rightIcon={
                loggedIn ? (
                  <FaLink color={"teal"} size={12} />
                ) : (
                  <FaDizzy color={"#fd5c63"} size={22} />
                )
              }
              minW="0px"
              backgroundColor={"rgba(0,0,0,0.2)"}
              disabled={loggedIn ? false : true}
              _hover={{ bg: "rgba(0,0,0,0.7)" }}
              _expanded={{ bg: "green.500" }}
              color={"#0085ad"}
            >
              {loggedIn
                ? walletAddress.substr(0, 4) +
                  " · · · " +
                  walletAddress.substr(walletAddress.length - 4)
                : ""}
            </Button> */}
            <IconButton
              min={50}
              backgroundColor={"rgba(0,0,0,0.2)"}
              disabled={loggedIn ? false : true}
              _hover={{ bg: "rgba(0,0,0,0.7)" }}
              _expanded={{ bg: "green.500" }}
              color={"#0085ad"}
              aria-label="Tron"
              icon={loggedIn ? <FaLink /> : <FaDizzy color={"#fd5c63"} />}
            />
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
    // minWidth: "200px",
  },
  walletAddress: {
    // minWidth: "200px",
  },
  logo: {
    // padding: "4px 50px",
    backgroundColor: "transparent",
    color: "teal",
  },
  logoDesc: {
    fontSize: 9,
    marginTop: "-10px",
  },
  menuItem: {
    // height: 20,
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
  balance: {
    marginLeft: 100,
    fontSize: 16,
  },
};

export default Navbar;
