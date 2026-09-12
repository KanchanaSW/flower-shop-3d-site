import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroOverlay from "./components/HeroOverlay";
import MobileHero from "./components/MobileHero";
import Sections from "./components/Sections";
import { detectWebGL, useIsMobile } from "./hooks/useIsMobile";
import { scrollState } from "./lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

const Scene = lazy(() => import("./components/Scene"));

export default function App() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setWebgl(detectWebGL());
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      scrollState.reducedMotion = motionMq.matches;
      setReduced(motionMq.matches);
    };
    syncMotion();
    motionMq.addEventListener("change", syncMotion);
    return () => motionMq.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (isMobile || !webgl) return undefined;

    const onMove = (event) => {
      scrollState.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.85,
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          heroRef.current?.style.setProperty(
            "--hero-progress",
            String(self.progress),
          );
        },
      });
    }, heroRef);

    return () => {
      ctx.revert();
      window.removeEventListener("pointermove", onMove);
    };
  }, [isMobile, webgl]);

  const use3d = !isMobile && webgl;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {use3d ? (
        <section
          id="top"
          ref={heroRef}
          className={`hero-pin${reduced ? " is-static" : ""}`}
        >
          <div className="hero-sticky">
            <Suspense fallback={<div className="scene-fallback" />}>
              <Scene />
            </Suspense>
            <HeroOverlay />
          </div>
        </section>
      ) : (
        <MobileHero />
      )}
      <Sections />
    </>
  );
}
