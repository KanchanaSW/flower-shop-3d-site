import { ArrowUpRight } from "@phosphor-icons/react";
import NavBar from "./NavBar";

export default function HeroOverlay() {
  return (
    <div className="hero-overlay">
      <NavBar />
      <div className="hero-copy">
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
  );
}
