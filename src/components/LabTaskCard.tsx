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
    <Button
      key={lab.title}
      variant="ghost"
      onClick={handleOpen}
      // 💡 修复重点：将原本不稳定的 h-auto aspect-square 规范化，强制 w-full 并在外层包裹占位
      className="lab-glow group relative w-full aspect-square cursor-pointer overflow-hidden rounded-md bg-card p-0 text-left transition duration-200 hover:scale-[1.02] hover:bg-card focus-visible:ring-2"
    >
      {/* 💡 修复重点：通过 absolute + inset-0 强制图片不管在什么加载阶段，都绝对拉伸撑满整个正方形卡片，防止高度坍塌为0 */}
      <img
        src={lab.image}
        alt={`${lab.title} simulation preview`}
        width={600}
        height={600}
        loading={index < 6 ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:brightness-110"
        // 💡 增加一个容错机制：如果图片真挂了，显示半透明占位，不至于纯黑
        onError={(e) => {
          (e.target as HTMLImageElement).style.opacity = "0.3";
        }}
      />
      <span className="absolute inset-x-0 bottom-0 truncate bg-background/80 px-2.5 py-2 text-xs font-semibold backdrop-blur-sm z-10">
        {lab.title}
      </span>
    </Button>
  );
}