/** Keep the first valid occurrence of each ID without mutating caller data. */
export function normalizePointerPoints(points) {
  const seen = new Set();
  return points.flatMap(point => {
    if (!point.id.trim() || seen.has(point.id) || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return [];
    seen.add(point.id);
    return [{ ...point, x: Math.min(1, Math.max(0, point.x)), y: Math.min(1, Math.max(0, point.y)) }];
  });
}

/** Omitted selection uses the first valid point; an unknown selection stays empty. */
export function resolvePointerPoint(points, activeId) {
  const normalized = normalizePointerPoints(points);
  return activeId === undefined ? normalized[0] : normalized.find(point => point.id === activeId);
}
