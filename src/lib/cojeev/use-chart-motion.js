"use client";;
import { motionTokens, useChoreography } from "../cojeev-motion/choreography.js";
import { getSettingsSnapshot } from "../cojeev-motion/settings.js";

/** Data dimensions cannot overshoot below zero as decorative springs can. */
export function useChartMotion() {
  const choreography = useChoreography();
  const geometryTransition = {
    type: "tween",
    duration: choreography.quiet ? 0 : motionTokens.duration.enter / getSettingsSnapshot().flow.speed,
    ease: motionTokens.ease.enter,
  };
  return { ...choreography, geometryTransition };
}
