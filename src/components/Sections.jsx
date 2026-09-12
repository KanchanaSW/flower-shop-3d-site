import { EnvelopeSimple, InstagramLogo, MapPin } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const COLLECTIONS = [
  {
    name: "Magenta garden",
    note: "A wrapped armful of saturated garden roses.",
    image: "/images/bouquet-hot-pink.jpg",
    span: "featured",
  },
  {
    name: "Tissue blush",
    note: "Soft pink roses in crinkled tissue.",
    image: "/images/bouquet-blush-right.jpg",
    span: "tall",
  },
  {
    name: "Cloud hydrangea",
    note: "Cream heads, orchids, a pale cool.",
    image: "/images/bouquet-cream-hydrangea.jpg",
    span: "wide",
  },
  {
    name: "Nude hatbox",
    note: "Tight cream roses in a blush box.",
    image: "/images/bouquet-peach-hatbox.jpg",
    span: "tall",
  },
];

const fadeUp = (reduce, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.28 },
        transition: {
          duration: 0.7,
          delay,
          ease: [0.32, 0.72, 0, 1],
        },
      };

export default function Sections() {
  const reduce = useReducedMotion();

  return (
    <div className="page-rest">
      <section id="collections" className="section collections">
        <motion.div className="section-intro" {...fadeUp(reduce)}>
          <h2>Our collections</h2>
          <p>
            Four signatures from the cooler. Tell us a colour, a room, a date.
            We build the rest.
          </p>
        </motion.div>

        <div className="collection-grid">
          {COLLECTIONS.map((item, i) => (
            <motion.article
              key={item.name}
              className={`collection-card span-${item.span}`}
              {...fadeUp(reduce, i * 0.06)}
              whileHover={reduce ? undefined : { y: -12 }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="card-shell">
                <div className="card-core">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>
              <div className="card-meta">
                <h3>{item.name}</h3>
                <p>{item.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="atelier" className="section atelier">
        <motion.h2 className="atelier-title" {...fadeUp(reduce)}>
          From the cooler to the door.
        </motion.h2>

        <motion.article className="step-browse" {...fadeUp(reduce, 0.05)}>
          <img
            src="/textures/rose-gate-open.jpg"
            alt="Rose walls opening onto stacked bouquets and hatboxes"
          />
          <div className="step-browse-copy">
            <h3>Browse</h3>
            <p>
              Walk the rose gate. The cooler is stacked daily with garden roses,
              hydrangea, and hatboxes in blush and nude.
            </p>
          </div>
        </motion.article>

        <motion.article className="step-order" {...fadeUp(reduce, 0.08)}>
          <h3>Order</h3>
          <p>
            Send a note with the date, the palette, and who it is for. We confirm
            stems the same morning and wrap in the atelier.
          </p>
        </motion.article>

        <motion.article className="step-delivered" {...fadeUp(reduce, 0.1)}>
          <div className="step-delivered-copy">
            <h3>Delivered</h3>
            <p>
              City couriers leave the shop by noon. Hatboxes travel upright.
              Wrapped bouquets arrive cool, with a handwritten card.
            </p>
          </div>
          <div className="card-shell delivered-still">
            <div className="card-core">
              <img
                src="/images/bouquet-magenta-box.jpg"
                alt="A round box of magenta roses"
              />
            </div>
          </div>
        </motion.article>
      </section>

      <footer id="visit" className="footer">
        <div className="footer-brand">
          <p className="nav-mark">Rubis</p>
          <p className="footer-lede">
            A small rose atelier behind the flower wall.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <p className="footer-label">Visit</p>
            <p>
              <MapPin size={16} weight="light" />
              48 Willow Lane, Studio 2
            </p>
            <p>Tue to Sun, 10 to 19</p>
          </div>
          <div>
            <p className="footer-label">Write</p>
            <p>
              <a href="mailto:hello@maisonrubis.com">
                <EnvelopeSimple size={16} weight="light" />
                hello@maisonrubis.com
              </a>
            </p>
            <p>
              <a href="https://instagram.com" rel="noreferrer" target="_blank">
                <InstagramLogo size={16} weight="light" />
                @maisonrubis
              </a>
            </p>
          </div>
          <div className="footer-cta-wrap">
            <a href="mailto:hello@maisonrubis.com" className="btn-primary">
              <span>Write to us</span>
              <span className="btn-icon" aria-hidden="true">
                <EnvelopeSimple size={16} weight="light" />
              </span>
            </a>
          </div>
        </div>
        <p className="footer-fine">Maison Rubis. Roses, arranged as rooms.</p>
      </footer>
    </div>
  );
}
