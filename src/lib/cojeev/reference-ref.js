"use client";
import * as React from "react";
import { assignMotionRef } from "../cojeev-motion/refs.js";

/** Preserve caller refs while the effect observes the same DOM element. */
export function useReferenceRef(hostRef, forwardedRef) {
  return React.useCallback((node) => {
    hostRef.current = node;
    const cleanup = assignMotionRef(forwardedRef, node);
    return () => { hostRef.current = null; cleanup(); };
  }, [hostRef, forwardedRef]);
}
