import Header from "./Header";
import NotificationContainer from "@/components/Notification";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box position="fixed" right="10" top="20" zIndex="100">
        <NotificationContainer />
      </Box>
      <Header />
      <main>{children}</main>
    </>
  );
}
