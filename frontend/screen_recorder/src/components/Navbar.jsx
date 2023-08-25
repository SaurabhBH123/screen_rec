import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Flex
        justify={"space-around"}
        boxShadow="md"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box>
          <Link to="/">
            <Heading size={"md"}>Dashboard</Heading>
          </Link>
        </Box>
        <Box>
          <Link to="/signup">
            <Heading size={"md"}>Signup</Heading>
          </Link>
        </Box>
        <Box>
          <Link to="/login">
            <Heading size={"md"}>Login</Heading>
          </Link>
        </Box>
      </Flex>
    </div>
  );
};

export default Navbar;
