export const useSegmentColor = (index: number, color: string, nbSegment: number) => {
     // the colest to the middle is closest to the product color, the more to the edges the more it changes
     const distance = Math.abs(index - nbSegment / 2);
     const maxDistance = nbSegment / 2;
     const maxHueChange = 20;
     const hueChange = (distance / maxDistance) * maxHueChange;
     return useTransformHue(hueChange, color);
}
