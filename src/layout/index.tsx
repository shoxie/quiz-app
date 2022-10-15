import Header from "./Header";
import NotificationContainer from "@/components/Notification";
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { headerHeightAtom } from "@/app/states";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut'
    },
  },
  out: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  },
  in: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [headerHeight] = useAtom(headerHeightAtom);

  const { asPath } = useRouter()

  return (
    <>
      <Box position="fixed" right="10" top="20" zIndex="100">
        <NotificationContainer />
      </Box>
      <Header />
      <AnimatePresence initial={false} mode="wait">
        <Box
          as={motion.main}
          initial="in"
          animate="inactive"
          exit="out"
          variants={variants}
          transition={{ type: "linear" }}
          style={{
            paddingTop: `${headerHeight}px`,
          }}
          key={asPath}
        >
          {children}
        </Box>
      </AnimatePresence>
    </>
  );
}
