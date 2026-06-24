export function DecorativeShapes() {
  return (
    <div className="homepage-decor inset-0 overflow-hidden" aria-hidden="true">
      {/* Ring */}
      <div
        className="absolute right-[12%] top-[8%] size-16 rounded-full border-[6px] border-violet-200/80 bg-gradient-to-br from-violet-100/60 to-transparent shadow-sm md:size-20"
        style={{ transform: "rotateX(55deg) rotateZ(-18deg)" }}
      />
      {/* Rounded cube */}
      <div
        className="absolute left-[8%] top-[18%] size-12 rounded-xl bg-gradient-to-br from-sky-200/90 to-blue-300/50 shadow-md md:size-14"
        style={{ transform: "rotate(-12deg) rotateX(12deg)" }}
      />
      {/* Faceted sphere */}
      <div
        className="absolute right-[22%] top-[28%] size-10 rounded-full bg-gradient-to-br from-cyan-100 to-sky-300/70 shadow-md md:size-12"
        style={{
          boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.7), 2px 6px 14px rgba(60,100,180,0.15)",
        }}
      />
      {/* Crystal */}
      <div
        className="absolute bottom-[18%] left-[14%] size-9 bg-gradient-to-br from-amber-100/90 to-orange-200/50 md:size-11"
        style={{
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          transform: "rotate(8deg)",
        }}
      />
    </div>
  );
}
