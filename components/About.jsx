import { Stack } from "@chakra-ui/react";
import { Link } from "./Typography";
import { GitHubLogoIcon, PersonIcon } from "@radix-ui/react-icons";

const About = () => {
  return (
    <Stack spacing={4}>
      <Stack direction="row" alignItems="center">
        <GitHubLogoIcon />{" "}
        <Link href="https://github.com/zaymonoid/mac-os-key-repeat">
          View the source on GitHub
        </Link>
      </Stack>
      <Stack direction="row" alignItems="center">
        <PersonIcon />
        <Link href="https://zaymonoid.com">About me</Link>
      </Stack>
    </Stack>
  );
};

export default About;
