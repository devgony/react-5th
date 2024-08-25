import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, FC } from "react";

interface ILayoutProps {
  children: ReactNode;
}

export const FromBottom: FC<ILayoutProps> = ({ children }) => {
  const path = usePathname();

  return (
    <AnimatePresence mode={"wait"}>
      <motion.div
        key={path}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          type: "tween",
          duration: 0.5,
        }}
        variants={{
          initialState: {
            y: "100%",
          },
          animateState: {
            y: 0,
          },
          exitState: {
            y: "-100%",
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
