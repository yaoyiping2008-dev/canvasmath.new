export interface LabModule {
  id: string;
  title: string;
  slug: string;
  moduleEndpoint: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
}

// 补全缺失的分类常量，契合重构后的学术化文案
export const LAB_CATEGORIES = ["Matrix", "Logic", "Applied", "Interactive"] as const;

export const labsData: LabModule[] = [
  {
    id: "1",
    title: "Vector Motion Lab",
    slug: "vector-motion-lab",
    moduleEndpoint: "https://example.com/modules/vector-motion-lab",
    category: "Matrix",
    seoTitle: "Vector Motion Lab - Interactive Mathematics Simulation | CanvasMath",
    seoDescription: "Explore vector mathematics and motion dynamics through visual simulations in the CanvasMath K-12 interactive workspace."
  },
  {
    id: "2",
    title: "Block Matrix Explorer",
    slug: "block-matrix-explorer",
    moduleEndpoint: "https://example.com/modules/block-matrix-explorer",
    category: "Matrix",
    seoTitle: "Block Matrix Explorer - Linear Algebra Visual Tool | CanvasMath",
    seoDescription: "An advanced visual exploration workspace for matrix block operations, alignment, and algebraic transformations designed for STEM training."
  },
  {
    id: "3",
    title: "Probability Logic Simulator",
    slug: "probability-logic-simulator",
    moduleEndpoint: "https://example.com/modules/probability-logic-simulator",
    category: "Logic",
    seoTitle: "Probability Logic Simulator - Interactive Math Labs | CanvasMath",
    seoDescription: "Analyze statistical mathematical models and probability distributions using discrete logic modeling tools in a sandboxed educational framework."
  },
  {
    id: "4",
    title: "Applied Geometry Workspace",
    slug: "applied-geometry-workspace",
    moduleEndpoint: "https://example.com/modules/applied-geometry-workspace",
    category: "Applied",
    seoTitle: "Applied Geometry Workspace - Visual Geometric Processing | CanvasMath",
    seoDescription: "Interactive coordinate systems and spatial geometric projection labs for K-12 engineering and mathematical visualization foundations."
  },
  {
    id: "5",
    title: "Discrete Linear Systems",
    slug: "discrete-linear-systems",
    moduleEndpoint: "https://example.com/modules/discrete-linear-systems",
    category: "Logic",
    seoTitle: "Discrete Linear Systems Simulator - Advanced Mathematics | CanvasMath",
    seoDescription: "Investigate discrete equations, coordinate matrices, and structural algorithmic mathematics via our visual sandbox architecture."
  }
];

/**
 * 补全缺失的辅助查询函数
 * 根据 URL 中的 slug 查出对应的模块数据
 */
export const getLabBySlug = (slug: string): LabModule | undefined => {
  return labsData.find(lab => lab.slug === slug);
};