import React from "react";
import { Flex, Box, HStack, Center, Button } from "@chakra-ui/core";
import { FaWallet } from "react-icons/fa";

type NavbarProps = {
  walletName: string;
};

const Navbar = (props: NavbarProps) => {
  const { walletName } = props;
  return (
    <Flex p={10}>
      <Box padding="4" bg="rgba(0,0,0,0.5)" flex={1} h={100} style={styles.nav}>
        <HStack>
          <Center p={4}>
            <Button
              leftIcon={<FaWallet />}
              // variantColor="blue"
              variant="outline"
              style={styles.walletName}
            >
              {walletName.toUpperCase()}
            </Button>
          </Center>
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
    textDecoration: "uppercase",
  },
};

export default Navbar;
