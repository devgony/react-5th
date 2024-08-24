"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/dist/client/components/navigation";

interface Props {
  children: React.ReactNode;
}
export function EaseInBottom({ children, ...props }: Props) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      {children}
    </motion.div>
    // <AnimatePresence mode="wait">
    //   <motion.div
    //     key={pathname}
    //     initial={{ x: "100%", opacity: 0 }}
    //     animate={{ x: 0, opacity: 1 }}
    //     exit={{ x: "-100%", opacity: 0 }}
    //     transition={{ duration: 0.5 }}
    //   >
    //     {children}
    //   </motion.div>
    // </AnimatePresence>
  );
}
