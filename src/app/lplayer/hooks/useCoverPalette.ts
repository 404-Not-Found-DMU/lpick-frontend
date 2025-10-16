'use client';

import { useEffect, useState } from 'react';

type Palette = {
  primary: string; // main dominant
  secondary: string; // softer bg
  accent: string; // UI accent (buttons/progress)
};

function clamp(n: number, min = 0, max = 255) {
  return Math.max(min, Math.min(max, n));
}

function toHex(n: number) {
  const v = clamp(Math.round(n));
  return v.toString(16).padStart(2, '0');
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max - min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  let r = l, g = l, b = l;
  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function buildAccentFromRGB(r: number, g: number, b: number) {
  // Boost saturation and moderate lightness for UI accents
  const { h, l } = rgbToHsl(r, g, b);
  const s = 0.7; // fixed high saturation
  const targetL = Math.min(0.62, Math.max(0.38, l));
  const { r: rr, g: gg, b: bb } = hslToRgb(h, s, targetL);
  return rgbToHex(rr, gg, bb);
}

export function useCoverPalette(src?: string): Palette {
  const [palette, setPalette] = useState<Palette>({ primary: '#6d28d9', secondary: '#f5f3ff', accent: '#7c3aed' });

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const maxDim = 64; // downscale for speed
        const ratio = Math.max(1, Math.max(img.width, img.height) / maxDim);
        const w = Math.max(1, Math.round(img.width / ratio));
        const hScaled = Math.max(1, Math.round(img.height / ratio));
        canvas.width = w; canvas.height = hScaled;
        ctx.drawImage(img, 0, 0, w, hScaled);
        const { data } = ctx.getImageData(0, 0, w, hScaled);
        // Simple average with lightness weighting
        let rSum = 0, gSum = 0, bSum = 0, weightSum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 16) continue; // skip transparent
          const { l } = rgbToHsl(r, g, b);
          const wgt = 0.5 + l; // prefer mid/high lights
          rSum += r * wgt; gSum += g * wgt; bSum += b * wgt; weightSum += wgt;
        }
        if (weightSum === 0) return;
        const rAvg = rSum / weightSum, gAvg = gSum / weightSum, bAvg = bSum / weightSum;
        const primary = rgbToHex(rAvg, gAvg, bAvg);
        const accent = buildAccentFromRGB(rAvg, gAvg, bAvg);
        // Secondary: lighten and desaturate
        const { h: hue, s, l } = rgbToHsl(rAvg, gAvg, bAvg);
        const { r: rs, g: gs, b: bs } = hslToRgb(hue, Math.max(0, s * 0.15), Math.min(0.95, l * 1.2));
        const secondary = rgbToHex(rs, gs, bs);
        if (!cancelled) {
          setPalette({ primary, secondary, accent });
        }
      } catch {
        // ignore failures, keep default
      }
    };
    img.src = src;
    return () => { cancelled = true; };
  }, [src]);

  return palette;
}


