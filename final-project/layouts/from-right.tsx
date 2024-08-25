import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, FC } from "react";

interface ILayoutProps {
  children: ReactNode;
}

export const FromRight: FC<ILayoutProps> = ({ children }) => {
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
            x: "100%",
          },
          animateState: {
            x: 0,
          },
          exitState: {
            x: "-100%",
          },
        }}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
