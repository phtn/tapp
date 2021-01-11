import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  HStack,
  Badge,
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
  Link,
} from "@chakra-ui/core";
import { FaWallet, FaUnlink, FaLink } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

type NavbarProps = {
  loggedIn: boolean;
  walletName: string;
  walletAddress: string;
  balance: number;
  trc20: number;
};

const Navbar = (props: NavbarProps) => {
  const { loggedIn, walletName, walletAddress, balance, trc20 } = props;

  const [spin, setSpin] = useState(loggedIn);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSpin(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex borderBottom={"2px solid rgba(0,0,0,0.2)"}>
      <Box padding="4" bg="rgba(0,0,0,0.1)" flex={1} style={styles.nav}>
        <HStack>
          {/* FIRST */}
          <Flex flex={1} justifyContent="left">
            <VStack>
              <Badge ml="2" fontSize="1em" color="black" style={styles.logo}>
                <Link style={styles.title} href="/">
                  cartesian
                </Link>
              </Badge>
            </VStack>
          </Flex>

          <Flex>
            <ColorModeSwitcher color="red" justifySelf="flex-end" />
          </Flex>

          {/* SECOND */}
          <Flex align="center" justify="center">
            <Menu>
              <MenuButton
                // minW={loggedIn ? "75px" : 0}
                // minW={50}
                as={IconButton}
                backgroundColor="rgba(0,0,0,0.2)"
                //

                isLoading={loggedIn ? !spin : spin}
                //

                icon={
                  spin ? (
                    <FaWallet color="teal" />
                  ) : (
                    <BiLogInCircle color="#fd5c63" />
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
                    <Avatar
                      size="sm"
                      name="TRX"
                      src="https://bit.ly/tron_logo"
                    />
                    <Text style={styles.balance}>{balance * 0.000001}</Text>
                  </MenuItem>
                  <MenuItem style={styles.menuItem}>
                    <Avatar size="sm" name="SUN" src="" colorScheme="yellow" />
                    <Text style={styles.balance}>
                      {(trc20 * 0.000000000000000001).toFixed(7)}
                    </Text>
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup
                  title={
                    walletAddress.substr(0, 4) +
                    " · · · " +
                    walletAddress.substr(walletAddress.length - 4)
                  }
                >
                  <MenuItem>
                    <Avatar name="B W" />
                  </MenuItem>
                  <MenuItem>
                    <Avatar name="E N" />
                  </MenuItem>
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
              icon={loggedIn ? <FaLink /> : <FaUnlink color={"#fd5c63"} />}
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
  title: {
    textDecoration: "none",
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
