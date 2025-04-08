"use client";
import { Avatar, Button, Group, Text } from "@mantine/core";
import { LOGO } from "../assets/index";
import { useAppContext } from "../context/AppContext";

function NavBar() {
  const { toggle, createJobOpened, closeCreateJob, openCreateJob } =
    useAppContext();
  return (
    <Group h="100%" px="lg" justify="space-between">
      <Group gap="xs" style={{ display: "flex", flexGrow: 1 }}>
        <Avatar src={LOGO.src} alt="Logo" size="md" radius="md" />
        <Group w={400} visibleFrom="sm" justify="space-around" flex={1}>
          {[
            "Home",
            "Find Jobs",
            "Find Talents",
            "About us",
            "Testimonials",
          ].map((text) => (
            <Text
              fw={500}
              key={text}
              c="gray.7"
              size="sm"
              style={{ cursor: "pointer" }}
              px={1}
            >
              {text}
            </Text>
          ))}
        </Group>
      </Group>

      <Button
        onClick={() => {
          openCreateJob();
        }}
        radius="xl"
        size="md"
        style={{
          background:
            "linear-gradient(to top, rgb(97, 0, 173),rgb(161 ,40, 255))",
          color: "white",
          fontWeight: 600,
        }}
      >
        Create Jobs
      </Button>
    </Group>
  );
}

export default NavBar;
