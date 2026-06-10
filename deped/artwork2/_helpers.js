/* Shared canvas helpers for DepEd hero artwork — eval'd inside run_script */
(() => {
  const W = 1200, H = 840;
  const AMBER = '#FACC15', CYAN = '#22D3EE', CYANDK = '#06B6D4',
        GOLD = '#F59E0B', WHITE = '#EEF2FF', INK = 'rgba(199,210,254,0.85)';

  function newArt() {
    const c = createCanvas(W, H);
    const x = c.getContext('2d');
    const g = x.createRadialGradient(W * 0.78, H * 0.30, 80, W * 0.60, H * 0.50, W * 0.95);
    g.addColorStop(0, '#2A2566');
    g.addColorStop(0.55, '#1E1B4B');
    g.addColorStop(1, '#13102E');
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);
    return [c, x];
  }

  function dotGrid(x, alpha, step) {
    alpha = alpha || 0.10; step = step || 64;
    x.save();
    x.fillStyle = 'rgba(165,180,252,' + alpha + ')';
    for (let j = step / 2, row = 0; j < H; j += step, row++) {
      const off = (row % 2) ? step / 2 : 0;
      for (let i = step / 2; i < W; i += step) {
        x.beginPath(); x.arc(i + off, j, 1.6, 0, 7); x.fill();
      }
    }
    x.restore();
  }

  function glow(x, color, blur) { x.shadowColor = color; x.shadowBlur = blur; }
  function unglow(x) { x.shadowColor = 'transparent'; x.shadowBlur = 0; }

  function glowLine(x, x1, y1, x2, y2, color, w, blur, dash) {
    x.save(); glow(x, color, blur == null ? 18 : blur);
    x.strokeStyle = color; x.lineWidth = w; x.lineCap = 'round';
    if (dash) x.setLineDash(dash);
    x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2);
    x.stroke(); x.stroke();
    x.restore();
  }

  function glowPath(x, fn, color, w, blur, dash, fill) {
    x.save(); glow(x, color, blur == null ? 18 : blur);
    x.strokeStyle = color; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round';
    if (dash) x.setLineDash(dash);
    x.beginPath(); fn(x);
    if (fill) { x.fillStyle = fill; x.fill(); }
    if (w > 0) { x.stroke(); x.stroke(); }
    x.restore();
  }

  function glowDot(x, cx, cy, r, color, blur) {
    x.save(); glow(x, color, blur == null ? 22 : blur);
    x.fillStyle = color;
    x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.fill();
    x.restore();
  }

  function mathFont(px) { return 'italic 600 ' + px + 'px Georgia, "Times New Roman", serif'; }
  function numFont(px)  { return '600 ' + px + 'px Georgia, "Times New Roman", serif'; }

  function glowText(x, str, px, cx, cy, color, blur, font, align) {
    x.save(); glow(x, color, blur == null ? 16 : blur);
    x.fillStyle = color;
    x.font = font || mathFont(px);
    x.textAlign = align || 'center'; x.textBaseline = 'middle';
    x.fillText(str, cx, cy); x.fillText(str, cx, cy);
    x.restore();
  }

  function arrowHead(x, tipX, tipY, ang, size, color, blur) {
    x.save(); glow(x, color, blur == null ? 14 : blur);
    x.fillStyle = color;
    x.beginPath();
    x.moveTo(tipX, tipY);
    x.lineTo(tipX - size * Math.cos(ang - 0.42), tipY - size * Math.sin(ang - 0.42));
    x.lineTo(tipX - size * Math.cos(ang + 0.42), tipY - size * Math.sin(ang + 0.42));
    x.closePath(); x.fill();
    x.restore();
  }

  function angleArc(x, cx, cy, r, a0, a1, color, w, blur) {
    x.save(); glow(x, color, blur == null ? 12 : blur);
    x.strokeStyle = color; x.lineWidth = w || 3; x.lineCap = 'round';
    x.beginPath(); x.arc(cx, cy, r, a0, a1); x.stroke(); x.stroke();
    x.restore();
  }

  /* soft elliptical drop shadow under a floating object */
  function softShadow(x, cx, cy, rx, ry, alpha) {
    x.save();
    const g = x.createRadialGradient(cx, cy, 1, cx, cy, rx);
    g.addColorStop(0, 'rgba(5,3,20,' + (alpha == null ? 0.45 : alpha) + ')');
    g.addColorStop(1, 'rgba(5,3,20,0)');
    x.translate(cx, cy); x.scale(1, ry / rx); x.translate(-cx, -cy);
    x.fillStyle = g;
    x.beginPath(); x.arc(cx, cy, rx, 0, 7); x.fill();
    x.restore();
  }

  function fadeLeft(x, frac) {
    frac = frac || 0.34;
    x.save();
    x.globalCompositeOperation = 'destination-out';
    const g = x.createLinearGradient(0, 0, W * frac, 0);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(0.45, 'rgba(0,0,0,0.72)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, W * frac, H);
    x.restore();
  }

  async function finish(c, x, name) {
    fadeLeft(x);
    await saveFile('artwork/' + name, c);
  }

  Object.assign(globalThis, {
    W, H, AMBER, CYAN, CYANDK, GOLD, WHITE, INK,
    newArt, dotGrid, glow, unglow, glowLine, glowPath, glowDot,
    mathFont, numFont, glowText, arrowHead, angleArc, softShadow, fadeLeft, finish
  });
})();
