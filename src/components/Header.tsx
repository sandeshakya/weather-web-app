import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export default function Header() {
  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.700"
        color="white"
      >
        <Heading>Weather Web App </Heading>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </div>
  );
}
