export const boundedCount = (n, fallback, max) => Math.max(1, Math.min(max, Math.round(Number.isFinite(n) ? n : fallback)));
export const boundedNumber = (n, fallback, min, max) => Math.max(min, Math.min(max, Number.isFinite(n) ? n : fallback));
export function makeSwarm(count) {
  return Array.from({ length: boundedCount(count, 18, 64) }, (_, i) => ({ x: Math.cos(i * 2.4) * 25, y: Math.sin(i * 2.4) * 25, vx: 0, vy: 0 }));
}
/** Bounded semi-implicit springs; a long background-tab delta cannot explode the simulation. */
export function stepSwarm(points, target, milliseconds, time, spread) {
  const dt = boundedNumber(milliseconds / 1000, .016, 0, .033);
  points.forEach((p, i) => {
    const angle = i * 2.39996 + time * (.55 + i % 3 * .09);
    const radius = boundedNumber(spread, 28, 0, 160) * (.3 + (i % 7) / 9);
    const x = target.x + Math.cos(angle) * radius, y = target.y + Math.sin(angle) * radius;
    p.vx = (p.vx + (x - p.x) * 48 * dt) * Math.exp(-7 * dt);
    p.vy = (p.vy + (y - p.y) * 48 * dt) * Math.exp(-7 * dt);
    p.x += p.vx * dt; p.y += p.vy * dt;
  });
}
export function orbitPoint(progress, width, height) {
  const angle = ((progress % 1 + 1) % 1) * Math.PI * 2;
  return { x: width / 2 + Math.cos(angle) * Math.max(0, width / 2 - 48), y: height / 2 + Math.sin(angle) * Math.max(0, height / 2 - 42) };
}
export function rippleOffset(x, y, waves, time) {
  let dx = 0, dy = 0;
  for (const wave of waves) {
    const age = time - wave.time;
    if (age < 0 || age > 1.6) continue;
    const distance = Math.hypot(x - wave.x, y - wave.y), envelope = Math.exp(-Math.pow((distance - age * 230) / 65, 2));
    const amount = Math.sin(distance * .085 - age * 16) * envelope * (1 - age / 1.6) * 12;
    dx += (x - wave.x) / Math.max(1, distance) * amount; dy += (y - wave.y) / Math.max(1, distance) * amount;
  }
  return { x: dx, y: dy };
}
