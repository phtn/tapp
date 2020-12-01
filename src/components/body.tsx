import React from "react";
import { SimpleGrid, Box, HStack, Button } from "@chakra-ui/core";

type BodyProps = {
  height: number;
  balance: number;
  loggedIn: boolean;
};
const Body = (props: BodyProps) => {
  const { height, loggedIn } = props;
  return (
    <SimpleGrid minChildWidth="120px" spacing="0px">
      <Box bg="blue" height="80px">
        <Box textAlign="center" fontSize="xl">
          <HStack p={5}>
            {loggedIn ? (
              <Button>{height}</Button>
            ) : (
              <Button
                isLoading={!loggedIn}
                loadingText={"Connecting..."}
                colorScheme="red"
              >
                {loggedIn}
              </Button>
            )}
          </HStack>
        </Box>
      </Box>
    </SimpleGrid>
  );
};

export default Body;
