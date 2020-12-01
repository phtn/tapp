import React from "react";
import { SimpleGrid, Box, HStack } from "@chakra-ui/core";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

type BodyProps = {
  height: number;
  balance: number;
};
const Body = (props: BodyProps) => {
  const { height, balance } = props;
  const computedBalance = balance * 0.000001;
  return (
    <SimpleGrid minChildWidth="120px" spacing="0px">
      {/* <Box
        bg="rgba(0,0,0,0.0)"
        borderRight={"2px solid rgba(0,0,0,0.2)"}
        height={height - 75}
        w={"40%"}
      ></Box> */}
      <Box bg="blue" height="80px">
        <Box textAlign="center" fontSize="xl">
          <HStack p={5}>
            <p>{computedBalance.toFixed(6)} TRX</p>
            <ColorModeSwitcher justifySelf="flex-end" />
          </HStack>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default Body;
