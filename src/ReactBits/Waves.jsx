// import { useEffect, useRef } from "react";
// import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

// const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

// const hexToRgb = (hex) => {
//   hex = hex.replace(/^#/, "");
//   if (hex.length === 3) {
//     hex = hex
//       .split("")
//       .map((c) => c + c)
//       .join("");
//   }
//   const int = parseInt(hex, 16);
//   const r = ((int >> 16) & 255) / 255;
//   const g = ((int >> 8) & 255) / 255;
//   const b = (int & 255) / 255;
//   return [r, g, b];
// };

// const vertex = /* glsl */ `
//   attribute vec3 position;
//   attribute vec4 random;
//   attribute vec3 color;

//   uniform mat4 modelMatrix;
//   uniform mat4 viewMatrix;
//   uniform mat4 projectionMatrix;
//   uniform float uTime;
//   uniform float uSpread;
//   uniform float uBaseSize;
//   uniform float uSizeRandomness;

//   varying vec4 vRandom;
//   varying vec3 vColor;

//   void main() {
//     vRandom = random;
//     vColor = color;

//     vec3 pos = position * uSpread;
//     pos.z *= 10.0;

//     vec4 mPos = modelMatrix * vec4(pos, 1.0);
//     float t = uTime;
//     mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
//     mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
//     mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

//     vec4 mvPos = viewMatrix * mPos;
//     gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
//     gl_Position = projectionMatrix * mvPos;
//   }
// `;

// const fragment = /* glsl */ `
//   precision highp float;

//   uniform float uTime;
//   uniform float uAlphaParticles;
//   varying vec4 vRandom;
//   varying vec3 vColor;

//   void main() {
//     vec2 uv = gl_PointCoord.xy;
//     float d = length(uv - vec2(0.5));

//     if(uAlphaParticles < 0.5) {
//       if(d > 0.5) {
//         discard;
//       }
//       gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
//     } else {
//       float circle = smoothstep(0.5, 0.4, d) * 0.8;
//       gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
//     }
//   }
// `;

// const Particles = ({
//   particleCount = 200,
//   particleSpread = 10,
//   speed = 0.1,
//   particleColors,
//   moveParticlesOnHover = false,
//   particleHoverFactor = 1,
//   alphaParticles = false,
//   particleBaseSize = 100,
//   sizeRandomness = 1,
//   cameraDistance = 20,
//   disableRotation = false,
//   className,
// }) => {
//   const containerRef = useRef(null);
//   const mouseRef = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const renderer = new Renderer({ depth: false, alpha: true });
//     const gl = renderer.gl;
//     container.appendChild(gl.canvas);
//     gl.clearColor(0, 0, 0, 0);

//     const camera = new Camera(gl, { fov: 15 });
//     camera.position.set(0, 0, cameraDistance);

//     const resize = () => {
//       const width = container.clientWidth;
//       const height = container.clientHeight;
//       renderer.setSize(width, height);
//       camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
//     };
//     window.addEventListener("resize", resize, false);
//     resize();

//     const handleMouseMove = (e) => {
//       const rect = container.getBoundingClientRect();
//       const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//       const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
//       mouseRef.current = { x, y };
//     };

//     if (moveParticlesOnHover) {
//       container.addEventListener("mousemove", handleMouseMove);
//     }

//     const count = particleCount;
//     const positions = new Float32Array(count * 3);
//     const randoms = new Float32Array(count * 4);
//     const colors = new Float32Array(count * 3);
//     const palette =
//       particleColors && particleColors.length > 0
//         ? particleColors
//         : defaultColors;

//     for (let i = 0; i < count; i++) {
//       let x, y, z, len;
//       do {
//         x = Math.random() * 2 - 1;
//         y = Math.random() * 2 - 1;
//         z = Math.random() * 2 - 1;
//         len = x * x + y * y + z * z;
//       } while (len > 1 || len === 0);
//       const r = Math.cbrt(Math.random());
//       positions.set([x * r, y * r, z * r], i * 3);
//       randoms.set(
//         [Math.random(), Math.random(), Math.random(), Math.random()],
//         i * 4
//       );
//       const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
//       colors.set(col, i * 3);
//     }

//     const geometry = new Geometry(gl, {
//       position: { size: 3, data: positions },
//       random: { size: 4, data: randoms },
//       color: { size: 3, data: colors },
//     });

//     const program = new Program(gl, {
//       vertex,
//       fragment,
//       uniforms: {
//         uTime: { value: 0 },
//         uSpread: { value: particleSpread },
//         uBaseSize: { value: particleBaseSize },
//         uSizeRandomness: { value: sizeRandomness },
//         uAlphaParticles: { value: alphaParticles ? 1 : 0 },
//       },
//       transparent: true,
//       depthTest: false,
//     });

//     const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

//     let animationFrameId;
//     let lastTime = performance.now();
//     let elapsed = 0;

//     const update = (t) => {
//       animationFrameId = requestAnimationFrame(update);
//       const delta = t - lastTime;
//       lastTime = t;
//       elapsed += delta * speed;

//       program.uniforms.uTime.value = elapsed * 0.001;

//       if (moveParticlesOnHover) {
//         particles.position.x = -mouseRef.current.x * particleHoverFactor;
//         particles.position.y = -mouseRef.current.y * particleHoverFactor;
//       } else {
//         particles.position.x = 0;
//         particles.position.y = 0;
//       }

//       if (!disableRotation) {
//         particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
//         particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
//         particles.rotation.z += 0.01 * speed;
//       }

//       renderer.render({ scene: particles, camera });
//     };

//     animationFrameId = requestAnimationFrame(update);

//     return () => {
//       window.removeEventListener("resize", resize);
//       if (moveParticlesOnHover) {
//         container.removeEventListener("mousemove", handleMouseMove);
//       }
//       cancelAnimationFrame(animationFrameId);
//       if (container.contains(gl.canvas)) {
//         container.removeChild(gl.canvas);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     particleCount,
//     particleSpread,
//     speed,
//     moveParticlesOnHover,
//     particleHoverFactor,
//     alphaParticles,
//     particleBaseSize,
//     sizeRandomness,
//     cameraDistance,
//     disableRotation,
//   ]);

//   return (
//     <div ref={containerRef} className={`relative w-full h-full ${className}`} />
//   );
// };

// export default Particles;

// ----------------------------------------------------------------

import { useRef, useEffect } from "react";

class Grad {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot2(x, y) {
    return this.x * x + this.y * y;
  }
}

class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ];
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }
  seed(seed) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      let v =
        i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255);
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }
  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
  perlin2(x, y) {
    let X = Math.floor(x),
      Y = Math.floor(y);
    x -= X;
    y -= Y;
    X &= 255;
    Y &= 255;
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
    const u = this.fade(x);
    return this.lerp(
      this.lerp(n00, n10, u),
      this.lerp(n01, n11, u),
      this.fade(y)
    );
  }
}

const Waves = ({
  lineColor = "black",
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = "",
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const noiseRef = useRef(new Noise(Math.random()));
  const linesRef = useRef([]);
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });

  const configRef = useRef({
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  });
  const frameIdRef = useRef(null);

  useEffect(() => {
    configRef.current = {
      lineColor,
      waveSpeedX,
      waveSpeedY,
      waveAmpX,
      waveAmpY,
      friction,
      tension,
      maxCursorMove,
      xGap,
      yGap,
    };
  }, [
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    ctxRef.current = canvas.getContext("2d");

    function setSize() {
      boundingRef.current = container.getBoundingClientRect();
      canvas.width = boundingRef.current.width;
      canvas.height = boundingRef.current.height;
    }

    function setLines() {
      const { width, height } = boundingRef.current;
      linesRef.current = [];
      const oWidth = width + 200,
        oHeight = height + 30;
      const { xGap, yGap } = configRef.current;
      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);
      const xStart = (width - xGap * totalLines) / 2;
      const yStart = (height - yGap * totalPoints) / 2;
      for (let i = 0; i <= totalLines; i++) {
        const pts = [];
        for (let j = 0; j <= totalPoints; j++) {
          pts.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }
        linesRef.current.push(pts);
      }
    }

    function movePoints(time) {
      const lines = linesRef.current,
        mouse = mouseRef.current,
        noise = noiseRef.current;
      const {
        waveSpeedX,
        waveSpeedY,
        waveAmpX,
        waveAmpY,
        friction,
        tension,
        maxCursorMove,
      } = configRef.current;
      lines.forEach((pts) => {
        pts.forEach((p) => {
          const move =
            noise.perlin2(
              (p.x + time * waveSpeedX) * 0.002,
              (p.y + time * waveSpeedY) * 0.0015
            ) * 12;
          p.wave.x = Math.cos(move) * waveAmpX;
          p.wave.y = Math.sin(move) * waveAmpY;

          const dx = p.x - mouse.sx,
            dy = p.y - mouse.sy;
          const dist = Math.hypot(dx, dy),
            l = Math.max(175, mouse.vs);
          if (dist < l) {
            const s = 1 - dist / l;
            const f = Math.cos(dist * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
          }

          p.cursor.vx += (0 - p.cursor.x) * tension;
          p.cursor.vy += (0 - p.cursor.y) * tension;
          p.cursor.vx *= friction;
          p.cursor.vy *= friction;
          p.cursor.x += p.cursor.vx * 2;
          p.cursor.y += p.cursor.vy * 2;
          p.cursor.x = Math.min(
            maxCursorMove,
            Math.max(-maxCursorMove, p.cursor.x)
          );
          p.cursor.y = Math.min(
            maxCursorMove,
            Math.max(-maxCursorMove, p.cursor.y)
          );
        });
      });
    }

    function moved(point, withCursor = true) {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    }

    function drawLines() {
      const { width, height } = boundingRef.current;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = configRef.current.lineColor;
      linesRef.current.forEach((points) => {
        let p1 = moved(points[0], false);
        ctx.moveTo(p1.x, p1.y);
        points.forEach((p, idx) => {
          const isLast = idx === points.length - 1;
          p1 = moved(p, !isLast);
          const p2 = moved(
            points[idx + 1] || points[points.length - 1],
            !isLast
          );
          ctx.lineTo(p1.x, p1.y);
          if (isLast) ctx.moveTo(p2.x, p2.y);
        });
      });
      ctx.stroke();
    }

    function tick(t) {
      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      const dx = mouse.x - mouse.lx,
        dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);
      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);
      container.style.setProperty("--x", `${mouse.sx}px`);
      container.style.setProperty("--y", `${mouse.sy}px`);

      movePoints(t);
      drawLines();
      frameIdRef.current = requestAnimationFrame(tick);
    }

    function onResize() {
      setSize();
      setLines();
    }
    function onMouseMove(e) {
      updateMouse(e.pageX, e.pageY);
    }
    function onTouchMove(e) {
      const touch = e.touches[0];
      updateMouse(touch.clientX, touch.clientY);
    }
    function updateMouse(x, y) {
      const mouse = mouseRef.current,
        b = boundingRef.current;
      mouse.x = x - b.left;
      mouse.y = y - b.top + window.scrollY;
      if (!mouse.set) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        mouse.set = true;
      }
    }

    setSize();
    setLines();
    frameIdRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
        ...style,
      }}
      className={`absolute top-0 left-0 w-full h-full overflow-hidden ${className} rounded-2xl`}
    >
      <div
        className="absolute top-0 left-0 bg-[#160000] rounded-full w-[0.5rem] h-[0.5rem]"
        style={{
          transform:
            "translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)",
          willChange: "transform",
        }}
      />
      <canvas ref={canvasRef} className=" w-full h-full" />
    </div>
  );
};

export default Waves;
