// Shared SVG filters & gradients: hand-painted texture + champagne-gold foil.
export default function Defs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        {/* Thick brush-stroke edges */}
        <filter id="paint" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="3" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.25" result="ga" />
          <feComposite in="d" in2="ga" operator="in" result="tex" />
          <feBlend in="tex" in2="d" mode="multiply" />
        </filter>
        {/* Softer variant for skies / clouds */}
        <filter id="paintSoft" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="4" seed="11" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Deckled paper edge */}
        <filter id="torn" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" seed="5" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Water shimmer */}
        <filter id="water">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.18" numOctaves="3" seed="2" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="12" />
        </filter>
        {/* Soft glow for lights & stars */}
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Embossed wax */}
        <filter id="emboss" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="5" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.2" result="b" />
          <feSpecularLighting in="b" surfaceScale="3" specularConstant="0.9" specularExponent="18" lightingColor="#fff6dc" result="s">
            <feDistantLight azimuth="225" elevation="45" />
          </feSpecularLighting>
          <feComposite in="s" in2="d" operator="in" result="sp" />
          <feComposite in="d" in2="sp" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
        </filter>

        {/* Champagne-gold foil */}
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6a3a" />
          <stop offset="0.28" stopColor="#e9d49f" />
          <stop offset="0.5" stopColor="#b08d57" />
          <stop offset="0.72" stopColor="#f4e6bd" />
          <stop offset="1" stopColor="#8a6a3a" />
        </linearGradient>
        <linearGradient id="goldV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4e6bd" />
          <stop offset="0.5" stopColor="#b08d57" />
          <stop offset="1" stopColor="#7d5f32" />
        </linearGradient>
        <radialGradient id="seal" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#f3e2b0" />
          <stop offset="0.45" stopColor="#c9a466" />
          <stop offset="1" stopColor="#7a5a2c" />
        </radialGradient>

        {/* Blush & ivory rose petals */}
        <radialGradient id="petal" cx="50%" cy="85%" r="95%">
          <stop offset="0" stopColor="#b8626f" />
          <stop offset="0.4" stopColor="#e8bcbf" />
          <stop offset="1" stopColor="#fbf1ec" />
        </radialGradient>
        <radialGradient id="petalWhite" cx="50%" cy="85%" r="95%">
          <stop offset="0" stopColor="#cfae94" />
          <stop offset="0.35" stopColor="#f3e7da" />
          <stop offset="1" stopColor="#fffdf8" />
        </radialGradient>
        <radialGradient id="roseCore" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#8e3f4f" />
          <stop offset="0.6" stopColor="#c27884" />
          <stop offset="1" stopColor="#efcfcf" />
        </radialGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7d9474" />
          <stop offset="0.55" stopColor="#36543f" />
          <stop offset="1" stopColor="#173025" />
        </linearGradient>
        <linearGradient id="satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf6ec" />
          <stop offset="0.45" stopColor="#e6d6bb" />
          <stop offset="0.6" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#cdb48a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
