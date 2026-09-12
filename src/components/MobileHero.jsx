import { ArrowUpRight } from "@phosphor-icons/react";
import { MOBILE_FALLBACK_STILL, VIDEO_SRC } from "../lib/assets";
import NavBar from "./NavBar";

/**
 * Small-screen fallback: static rose-wall still + autoplay portrait video.
 * The 3D flower walls are skipped entirely below 768px.
 *
 * STILL: public/textures/rose-wall-fallback.jpg
 * VIDEO: public/flower-loop.mp4
 */
export default function MobileHero() {
  return (
    <section className="mobile-hero" id="top">
      <img
        className="mobile-hero-still"
        src={MOBILE_FALLBACK_STILL}
        alt="A packed wall of magenta garden roses"
      />
      <div className="mobile-hero-scrim" />
      <NavBar />
      <div className="mobile-hero-stage">
        <div className="mobile-video-frame">
          <video
            className="mobile-video"
            src={VIDEO_SRC}
            poster={MOBILE_FALLBACK_STILL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className="mobile-hero-copy">
          <p className="hero-brand">Maison Rubis</p>
          <h1>
            The rose
            <br />
            gate opens.
          </h1>
          <p className="hero-sub">
            Garden roses packed wall to wall, arranged to order in the city.
          </p>
          <a href="#collections" className="btn-primary">
            <span>See collections</span>
            <span className="btn-icon" aria-hidden="true">
              <ArrowUpRight size={16} weight="light" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
