"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}
export function SlideInRight({ children, ...props }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
