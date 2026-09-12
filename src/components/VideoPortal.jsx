import { useFrame } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { VIDEO_SRC } from "../lib/assets";
import { scrollState } from "../lib/scrollState";
import { lerp, smoothstep } from "../lib/math";

const PORTAL_H = 3.85;
const PORTAL_W = PORTAL_H * (9 / 16);

function VideoScreen() {
  const mat = useRef();
  // drei constructs a THREE.VideoTexture from the HTML video element.
  const texture = useVideoTexture(VIDEO_SRC, {
    unsuspend: "canplay",
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: "anonymous",
  });

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }, [texture]);

  useFrame(() => {
    texture.needsUpdate = true;
    const p = scrollState.progress;
    if (mat.current) {
      const fade = 1 - smoothstep(0.72, 0.96, p);
      mat.current.opacity = fade;
      mat.current.transparent = fade < 0.999;
    }
  });

  return (
    <mesh position={[0, 0, 0.02]} renderOrder={2}>
      <planeGeometry args={[PORTAL_W, PORTAL_H]} />
      <meshBasicMaterial
        ref={mat}
        map={texture}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Center-stage portrait "window" playing the shop video as a THREE.VideoTexture.
 *
 * VIDEO PATH: public/flower-loop.mp4
 * Swap in a compressed loop at that same path (or change VIDEO_SRC in src/lib/assets.js).
 * Source file in the repo root is flowers.mp4 (9:16, ~5s).
 */
export function VideoPortal() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const mx = scrollState.mouseX;
    const my = scrollState.mouseY;
    const reduced = scrollState.reducedMotion;
    const floatY = reduced ? 0 : Math.sin(t * 0.55) * 0.045;
    group.current.position.x = lerp(group.current.position.x, mx * 0.12, 0.05);
    group.current.position.y = lerp(group.current.position.y, my * 0.08 + floatY, 0.05);
  });

  return (
    <group ref={group} position={[0, 0, 0.05]}>
      <mesh position={[0, 0, -0.045]}>
        <planeGeometry args={[PORTAL_W + 0.18, PORTAL_H + 0.18]} />
        <meshStandardMaterial
          color="#c9a56a"
          metalness={0.82}
          roughness={0.28}
          emissive="#7a5a28"
          emissiveIntensity={0.22}
        />
      </mesh>
      <mesh position={[0, 0, -0.028]}>
        <planeGeometry args={[PORTAL_W + 0.06, PORTAL_H + 0.06]} />
        <meshStandardMaterial color="#1a0a10" metalness={0.4} roughness={0.5} />
      </mesh>

      <Suspense fallback={null}>
        <VideoScreen />
      </Suspense>

      <pointLight
        position={[0, 0.15, 1.25]}
        color="#f6d7b0"
        intensity={2.6}
        distance={8}
        decay={2}
      />
      <spotLight
        position={[0, 2.4, 2.2]}
        angle={0.4}
        penumbra={0.7}
        intensity={1.8}
        color="#ffd9c8"
      />
    </group>
  );
}
