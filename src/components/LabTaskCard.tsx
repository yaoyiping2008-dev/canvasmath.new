import { useNavigate } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import type { LabModule } from "@/lib/labs-data";

type LabTaskCardProps = {
  lab: LabModule;
  index: number;
};

export function LabTaskCard({ lab, index }: LabTaskCardProps) {
  const navigate = useNavigate();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    void navigate({ to: "/labs/$slug", params: { slug: lab.slug } });
  };

  return (
    // 💡 核心修复：用一个标准的块级 div 充当外壳，雷打不动地锁死 w-full 和正方形比例！
    <div className="relative w-full aspect-square block">
      <Button
        key={lab.title}
        variant="ghost"
        onClick={handleOpen}
        // 💡 按钮不再负责比例，直接使用 w-full h-full 绝对定位（absolute inset-0）铺满外壳 div
        className="lab-glow group absolute inset-0 h-full w-full cursor-pointer overflow-hidden rounded-md bg-card p-0 text-left transition duration-200 hover:scale-[1.02] hover:bg-card focus-visible:ring-2"
      >
        <img
          src={lab.image}
          alt={`${lab.title} simulation preview`}
          width={600}
          height={600}
          loading={index < 6 ? "eager" : "lazy"}
          // 💡 图片同样无条件铺满按钮
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:brightness-110"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0.3";
          }}
        />
        <span className="absolute inset-x-0 bottom-0 truncate bg-background/80 px-2.5 py-2 text-xs font-semibold backdrop-blur-sm z-10">
          {lab.title}
        </span>
      </Button>
    </div>
  );
}