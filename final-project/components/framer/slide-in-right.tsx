"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/dist/client/components/navigation";

interface Props {
  children: React.ReactNode;
}
export function SlideInRight({ children, ...props }: Props) {
  const pathname = usePathname();
  return (
    // <AnimatePresence mode="wait">
    // <motion.div
    //   key={pathname}
    //   initial={{ x: "100%", opacity: 1 }}
    //   animate={{ x: 0, opacity: 1 }}
    //   exit={{ x: "-100%", opacity: 1 }}
    //   transition={{ duration: 0.5 }}
    // >
    <motion.div
      key={pathname}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      // exit={{ x: "-100%" }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
    // </AnimatePresence>
  );
}
