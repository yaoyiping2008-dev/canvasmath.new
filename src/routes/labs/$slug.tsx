import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLabBySlug } from "@/lib/labs-data";

const SITE_DESCRIPTION =
  "An advanced interactive mathematical workspace and visual simulation platform designed for K-12 student engagement and STEM training.";

export const Route = createFileRoute("/labs/$slug")({
  head: ({ params }) => {
    const lab = getLabBySlug(params.slug);
    const title = lab
      ? `${lab.title} — CanvasMath`
      : "Module Not Found — CanvasMath";

    return {
      meta: [
        { title },
        { name: "description", content: SITE_DESCRIPTION },
        { property: "og:title", content: title },
        { property: "og:description", content: SITE_DESCRIPTION },
      ],
    };
  },
  component: LabWorkspace,
});

function LabWorkspace() {
  const { slug } = Route.useParams();
  const lab = getLabBySlug(slug);

  if (!lab) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-foreground">
        <h1 className="font-display text-2xl font-bold">Module not found</h1>
        <p className="text-sm text-muted-foreground">
          The requested simulation module does not exist or has been moved.
        </p>
        <Button asChild variant="default">
          <Link to="/">Return to Interactive Math Labs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      <header className="flex shrink-0 items-center gap-3 border-b border-border px-3 py-2 md:px-4">
        <Button asChild variant="ghost" size="icon" aria-label="Back to all simulations">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>
        <FlaskConical className="size-5 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold md:text-base">{lab.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {lab.category} · Math Assignment Workspace
          </p>
        </div>
      </header>
      
      {/* 💡 核心修复：外层包裹一个 flex-1 relative 容器，死死锁定剩余屏幕的所有宽高 */}
      <div className="w-full flex-1 relative bg-card">
        <iframe
          src={lab.moduleEndpoint}
          title={`${lab.title} simulation`}
          // 💡 修复 1：改用最高兼容性的 fullscreen 策略
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          // 💡 修复 2：放开 Referrer 限制，允许大厂和 PhET 服务器校验访问来源，彻底解决黑屏拦截
          referrerPolicy="strict-origin-when-cross-origin"
          // 💡 修复 3：保留最安全的沙箱权限
          sandbox="allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-fullscreen allow-same-origin"
          // 💡 修复 4：用 absolute top-0 铺满父容器，物理防塌陷，画面百分之百点亮！
          className="absolute top-0 left-0 w-full h-full border-0 m-0 p-0"
        />
      </div>
    </div>
  );
}
