/** Omission inherits the nearest owner's corners; no preference state is created. */
export function controlRadiusStyle(radius) {
  if (!radius) return undefined;
  return {
    "--v-control-radius": { square: "0px", soft: "8px", round: "20px", pill: "999px" }[radius]
  };
}
