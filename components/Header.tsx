import { AppShell, Burger, Group, Text, Button, Avatar } from "@mantine/core";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  openCreateJob: () => void;
}

export default function Header({ opened, toggle, openCreateJob }: HeaderProps) {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Avatar
            src="/placeholder.svg?height=40&width=40"
            alt="Logo"
            size="md"
            radius="sm"
          />
          <Group gap={40} visibleFrom="sm">
            <Text fw={500}>Home</Text>
            <Text fw={500}>Find Jobs</Text>
            <Text fw={500}>Find Talents</Text>
            <Text fw={500}>About us</Text>
            <Text fw={500}>Testimonials</Text>
          </Group>
        </Group>
        <Button onClick={openCreateJob} radius="xl" size="md" color="violet">
          Create Jobs
        </Button>
      </Group>
    </AppShell.Header>
  );
}
