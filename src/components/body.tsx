import React, { useState } from "react";
import { SimpleGrid, Box, HStack, Button, IconButton } from "@chakra-ui/core";
import { BiLogInCircle } from "react-icons/bi";

type BodyProps = {
  height: number;
  balance: number;
  loggedIn: boolean;
  installed: boolean;
};
const Body = (props: BodyProps) => {
  const { height, loggedIn, installed } = props;
  const [loadingText] = useState("Log in to Tronlink");

  return installed ? (
    <SimpleGrid minChildWidth="120px" spacing="0px">
      <Box bg="blue" height={height}>
        <Box textAlign="center" fontSize="xl">
          <HStack p={5}>
            {loggedIn ? (
              <Button> Tronlink Connected</Button>
            ) : (
              <Button
		leftIcon={<BiLogInCircle/>}
		
             >
		Login to Tronlink
		</Button>
		
            )}
          </HStack>
        </Box>
      </Box>
    </SimpleGrid>
  ) : (
    <Box>
      <code>Checking Tronlink extension ... </code>
    </Box>
  );
};

export default Body;
