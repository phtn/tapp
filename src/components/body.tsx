import React from "react";
import {
  Button,
  Grid,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  SimpleGrid,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/core";
import { FaLink } from "react-icons/fa";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

type BodyProps = {
  height: number;
  balance: number;
};
const Body = (props: BodyProps) => {
  const { height, balance } = props;
  return (
    <SimpleGrid minChildWidth="120px" spacing="0px">
      <Box
        bg="rgba(0,0,0,0.0)"
        borderRight={"2px solid rgba(0,0,0,0.2)"}
        height={height - 75}
        w={"40%"}
      ></Box>
      <Box bg="blue" height="80px">
        <Box textAlign="center" fontSize="xl">
          <HStack p={5}>
            <p>{balance}</p>
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default Body;
