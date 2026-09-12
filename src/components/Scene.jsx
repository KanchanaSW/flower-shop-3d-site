import { Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { FlowerWall } from "./FlowerWall";
import { VideoPortal } from "./VideoPortal";
import { PetalParticles } from "./PetalParticles";
import { PETAL_TEXTURE, ROSE_TEXTURES } from "../lib/assets";
import { scrollState } from "../lib/scrollState";
import { lerp } from "../lib/math";

function CameraRig() {
  useFrame(({ camera, clock }) => {
    const p = scrollState.progress;
    const reduced = scrollState.reducedMotion;
    const t = clock.elapsedTime;

    const zStart = 7.15;
    const zEnd = 1.55;
    const eased = p * p * (3 - 2 * p);
    const z = reduced ? zStart : lerp(zStart, zEnd, eased);

    const breatheX = reduced ? 0 : Math.sin(t * 0.33) * 0.055;
    const breatheY = reduced ? 0 : Math.sin(t * 0.27 + 0.4) * 0.045;

    const targetX = breatheX + scrollState.mouseX * 0.16;
    const targetY = breatheY + scrollState.mouseY * 0.1;

    camera.position.x = lerp(camera.position.x, targetX, 0.045);
    camera.position.y = lerp(camera.position.y, targetY, 0.045);
    camera.position.z = lerp(camera.position.z, z, 0.07);
    camera.lookAt(0, 0.05, 0);
  });
  return null;
}

function Lights() {
  return (
    <>
      <color attach="background" args={["#14080e"]} />
      <fogExp2 attach="fog" args={["#14080e", 0.018]} />
      <hemisphereLight
        color="#f7d0da"
        groundColor="#5a1830"
        intensity={0.9}
      />
      <ambientLight intensity={0.55} color="#ffd6c8" />
      <directionalLight
        position={[2.4, 3.8, 5.2]}
        intensity={1.35}
        color="#ffd9c2"
      />
      <directionalLight
        position={[-4.2, 1.2, 2.4]}
        intensity={0.55}
        color="#e11d74"
      />
    </>
  );
}

function SceneContent() {
  const roses = useTexture(ROSE_TEXTURES);
  const petal = useTexture(PETAL_TEXTURE);

  useLayoutEffect(() => {
    const list = Array.isArray(roses) ? roses : [roses];
    list.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      tex.needsUpdate = true;
    });
    petal.colorSpace = THREE.SRGBColorSpace;
    petal.anisotropy = 4;
    petal.needsUpdate = true;
  }, [roses, petal]);

  const maps = Array.isArray(roses) ? roses : [roses];

  return (
    <>
      <Lights />
      <CameraRig />
      <FlowerWall side="left" maps={maps} />
      <FlowerWall side="right" maps={maps} />
      <VideoPortal />
      <PetalParticles map={petal} />
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom
          luminanceThreshold={0.28}
          luminanceSmoothing={0.32}
          intensity={0.85}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.28} darkness={0.58} />
      </EffectComposer>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.6]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.08, 7.15], fov: 34, near: 0.1, far: 40 }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
