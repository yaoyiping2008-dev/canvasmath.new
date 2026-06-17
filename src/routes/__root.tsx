import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LayoutGrid, Layers, Lightbulb, Compass, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// 💡 1. 精准引入全站总母体的动态 LOGO.gif
import logoGif from "@/assets/LOGO.gif";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CanvasMath - Interactive Mathematics Workspace & Simulations for K-12" },
      {
        name: "description",
        content:
          "An advanced interactive mathematical workspace and visual simulation platform designed for K-12 student engagement and STEM training.",
      },
      { name: "author", content: "CanvasMath" },
      {
        property: "og:title",
        content: "CanvasMath - Interactive Mathematics Workspace & Simulations for K-12",
      },
      {
        property: "og:description",
        content:
          "An advanced interactive mathematical workspace and visual simulation platform designed for K-12 student engagement and STEM training.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#0b0f19" },
      {
        name: "twitter:title",
        content: "CanvasMath - Interactive Mathematics Workspace & Simulations for K-12",
      },
      {
        name: "twitter:description",
        content:
          "An advanced interactive mathematical workspace and visual simulation platform designed for K-12 student engagement and STEM training.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9f3117b9-6687-43c0-a36e-7be966fda60a/id-preview-fa57ffde--5b182b6e-8d99-430b-b931-c4cde31faec9.lovable.app-1781348633471.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9f3117b9-6687-43c0-a36e-7be966fda60a/id-preview-fa57ffde--5b182b6e-8d99-430b-b931-c4cde31faec9.lovable.app-1781348633471.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // 全局侧边栏菜单项配置
  const navItems = [
    { to: "/", label: "All Simulations", icon: LayoutGrid },
    { to: "/matrix", label: "Matrix", icon: Layers },
    { to: "/logic", label: "Logic", icon: Lightbulb },
    { to: "/applied", label: "Applied", icon: Compass },
    { to: "/interactive", label: "Interactive", icon: HelpCircle },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      {/* 💡 2. 全局基础弹性外壳：保证左侧侧边栏固定，右侧内容区自适应滚动 */}
      <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
        
        {/* 全局固定左侧侧边栏 */}
        <aside className="w-64 border-r border-border bg-card flex flex-col justify-between shrink-0">
          <div className="flex flex-col">
            
            {/* 💡 3. 左上角专属 LOGO 容器：点击返回首页 */}
            <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-border/50 hover:opacity-90 transition">
              {/* 一次性渲染动态 LOGO 替代旧文字，限制高度 h-8 (32px) */}
              <img 
                src={logoGif} 
                alt="CanvasMath Logo" 
                className="h-8 w-auto object-contain block" 
              />
            </Link>

            {/* 导航菜单列表 */}
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: "bg-primary text-primary-foreground font-medium" }}
                  inactiveProps={{ className: "text-muted-foreground hover:bg-muted hover:text-foreground" }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition duration-150"
                  )}
                >
                  <item.icon className="h-4 w-auto shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* 侧边栏底部版权区 */}
          <div className="p-4 border-t border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground/60">
              © 2026 CanvasMath Lab Collection
            </p>
          </div>
        </aside>

        {/* 右侧动态业务渲染核心区（游戏和网格列表在这里自适应变化） */}
        <main className="flex-1 h-full overflow-y-auto bg-background">
          <Outlet />
        </main>

      </div>
    </QueryClientProvider>
  );
}