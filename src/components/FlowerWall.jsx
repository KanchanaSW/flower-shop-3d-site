import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";
import { lerp } from "../lib/math";

const dummy = new THREE.Object3D();

/**
 * One vertical rose wall, built from overlapping instanced flower planes.
 *
 * TEXTURES: pass an array of loaded THREE.Textures (see assets.js / ROSE_TEXTURES).
 * Drop replacement PNGs into public/textures/rose-01.png ... rose-14.png.
 * Soft circular alpha + packed garden-rose photos match the rose-wall look.
 */
export function FlowerWall({
  side = "left",
  maps,
  cols = 7,
  rows = 22,
  layers = 5,
}) {
  const group = useRef();
  const meshRefs = useRef([]);
  const sign = side === "left" ? -1 : 1;
  const variantCount = Math.max(1, maps?.length ?? 1);

  const layouts = useMemo(() => {
    const perVariant = Array.from({ length: variantCount }, () => []);
    let i = 0;
    for (let layer = 0; layer < layers; layer += 1) {
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          // Deterministic jitter so walls stay stable across renders.
          const seed = Math.sin((i + 1) * 12.9898 + sign * 78.233) * 43758.5453;
          const jx = (seed - Math.floor(seed)) * 2 - 1;
          const jy =
            (Math.sin((i + 3) * 91.17) * 43758.5453 -
              Math.floor(Math.sin((i + 3) * 91.17) * 43758.5453)) *
              2 -
            1;
          const jz =
            (Math.sin((i + 7) * 23.41) * 43758.5453 -
              Math.floor(Math.sin((i + 7) * 23.41) * 43758.5453)) *
              2 -
            1;

          const innerX = 2.08;
          const x = sign * (innerX + col * 0.4 + jx * 0.1);
          const y = -5.1 + row * 0.46 + jy * 0.14;
          const z = 0.25 - layer * 1.2 + jz * 0.22;
          const scale = 0.88 + Math.abs(jx) * 0.32;
          const rotZ = jx * 0.45;
          const rotY = sign * (0.18 + jy * 0.06);
          perVariant[i % variantCount].push({
            x,
            y,
            z,
            scale,
            rotZ,
            rotY,
          });
          i += 1;
        }
      }
    }
    return perVariant;
  }, [cols, rows, layers, sign, variantCount]);

  useLayoutEffect(() => {
    layouts.forEach((items, v) => {
      const mesh = meshRefs.current[v];
      if (!mesh) return;
      items.forEach((item, idx) => {
        dummy.position.set(item.x, item.y, item.z);
        dummy.rotation.set(0, item.rotY, item.rotZ);
        dummy.scale.setScalar(item.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [layouts]);

  useFrame(() => {
    if (!group.current) return;
    const mx = scrollState.mouseX;
    const my = scrollState.mouseY;
    const p = scrollState.progress;
    // Walls parallax faster than the video portal, and peel outward as the camera dollies in.
    const targetX = mx * 0.42 * sign * -0.35 + sign * p * 0.55;
    const targetY = my * 0.18;
    group.current.position.x = lerp(group.current.position.x, targetX, 0.06);
    group.current.position.y = lerp(group.current.position.y, targetY, 0.06);
  });

  if (!maps?.length) return null;

  return (
    <group ref={group}>
      {layouts.map((items, v) => (
        <instancedMesh
          key={side + v}
          ref={(el) => {
            meshRefs.current[v] = el;
          }}
          args={[null, null, items.length || 1]}
          frustumCulled={false}
          castShadow={false}
          receiveShadow={false}
        >
          <planeGeometry args={[1.22, 1.22]} />
          <meshBasicMaterial
            map={maps[v]}
            transparent
            alphaTest={0.08}
            depthWrite
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </instancedMesh>
      ))}
    </group>
  );
}
