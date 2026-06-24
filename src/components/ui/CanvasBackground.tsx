type CanvasBackgroundProps = {
  className?: string;
};

export function CanvasBackground({ className }: CanvasBackgroundProps) {
  return (
    <div className={className} aria-hidden="true">
      <div className="canvas-bg-layer">
        <div className="canvas-bg-radial" />
        <div className="canvas-bg-blob canvas-bg-blob--primary" />
        <div className="canvas-bg-blob canvas-bg-blob--secondary" />
        <div className="canvas-bg-blob canvas-bg-blob--tertiary" />
        <div className="canvas-bg-noise" />
        <div className="canvas-bg-shape canvas-bg-shape--ring" />
        <div className="canvas-bg-shape canvas-bg-shape--square" />
        <div className="canvas-bg-shape canvas-bg-shape--triangle" />
      </div>
    </div>
  );
}
