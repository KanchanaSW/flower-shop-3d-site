import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const dummy = new THREE.Object3D();
const COUNT = 96;

/**
 * Ambient rose fragments drifting through the gate with simplex-noise motion.
 *
 * TEXTURE: public/textures/petal.png
 * A small oval PNG with alpha reads as a petal at this scale.
 * Replace that file to swap in a photographed petal.
 */
export function PetalParticles({ map }) {
  const mesh = useRef();
  const noise3D = useMemo(() => createNoise3D(), []);

  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const n = (v) => {
          const s = Math.sin((i + 1) * v) * 43758.5453;
          return s - Math.floor(s);
        };
        return {
          x: (n(12.9) * 2 - 1) * 4.2,
          y: n(47.1) * 8 - 3.2,
          z: (n(91.2) * 2 - 1) * 5.5,
          speed: 0.12 + n(3.7) * 0.22,
          spin: (n(8.1) * 2 - 1) * 0.6,
          size: 0.08 + n(19.4) * 0.14,
          phase: n(5.5) * Math.PI * 2,
        };
      }),
    [],
  );

  useLayoutEffect(() => {
    const inst = mesh.current;
    if (!inst) return;
    seeds.forEach((s, i) => {
      dummy.position.set(s.x, s.y, s.z);
      dummy.scale.setScalar(s.size);
      dummy.rotation.set(0, 0, s.phase);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
  }, [seeds]);

  useFrame(({ clock }, dt) => {
    const inst = mesh.current;
    if (!inst) return;
    if (scrollState.reducedMotion) return;

    const t = clock.elapsedTime;
    seeds.forEach((s, i) => {
      const n = noise3D(s.x * 0.25, t * 0.12 + s.phase, s.z * 0.25);
      s.y += s.speed * dt * 0.35;
      s.x += n * dt * 0.35;
      s.z += Math.sin(t * 0.2 + s.phase) * dt * 0.12;
      if (s.y > 4.8) s.y = -4.4;
      if (s.x > 5) s.x = -5;
      if (s.x < -5) s.x = 5;

      dummy.position.set(s.x, s.y, s.z);
      dummy.rotation.set(
        Math.sin(t * 0.4 + s.phase) * 0.5,
        t * s.spin * 0.15,
        t * s.spin + n,
      );
      dummy.scale.setScalar(s.size);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
  });

  if (!map) return null;

  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, COUNT]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1.25]} />
      <meshBasicMaterial
        map={map}
        transparent
        depthWrite={false}
        opacity={0.82}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
