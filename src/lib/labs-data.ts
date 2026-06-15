export interface LabModule {
  id: string;
  title: string;
  slug: string;
  moduleEndpoint: string;
  image: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
}

export const LAB_CATEGORIES = ["All", "Matrix", "Logic", "Applied", "Interactive"] as const;

export const labsData: LabModule[] = [
  {
    id: "1",
    title: "Vector Motion Simulator",
    slug: "vector-motion-lab",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_all.html",
    image: "https://img.gamedistribution.com/5f7957774bb94e6399bd66c7eb07b9eb-512x512.jpg",
    category: "Matrix",
    seoTitle: "Vector Motion Lab - Interactive Mathematics Simulation | CanvasMath",
    seoDescription: "Explore vector mathematics and motion dynamics through visual simulations."
  },
  {
    id: "2",
    title: "Block Matrix Explorer",
    slug: "block-matrix-explorer",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra_all.html",
    image: "https://img.gamedistribution.com/f947bf970cc5482fa816cb03d2b0e6df-512x512.jpg",
    category: "Matrix",
    seoTitle: "Block Matrix Explorer - Linear Algebra Visual Tool | CanvasMath",
    seoDescription: "An advanced visual exploration workspace for matrix block operations."
  },
  {
    id: "3",
    title: "Probability Logic Simulator",
    slug: "probability-logic-simulator",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability_all.html",
    image: "https://img.gamedistribution.com/495fbf51be0d4c828062092c47864c3c-512x512.jpg",
    category: "Logic",
    seoTitle: "Probability Logic Simulator - Interactive Math Labs | CanvasMath",
    seoDescription: "Analyze statistical mathematical models and probability distributions."
  },
  {
    id: "4",
    title: "Applied Geometry Workspace",
    slug: "applied-geometry-workspace",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_all.html",
    image: "https://img.gamedistribution.com/9796ff0b6fa54cf5b292e9dbb186b24d-512x512.jpg",
    category: "Applied",
    seoTitle: "Applied Geometry Workspace - Visual Geometric Processing | CanvasMath",
    seoDescription: "Interactive coordinate systems and spatial geometric projection labs."
  },
  {
    id: "5",
    title: "Discrete Linear Systems",
    slug: "discrete-linear-systems",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/expression-exchange/latest/expression-exchange_all.html",
    image: "https://img.gamedistribution.com/8db632d4323c4a2db7fa3c1c4b75eb75-512x512.jpg",
    category: "Logic",
    seoTitle: "Discrete Linear Systems Simulator – Advanced Mathematics",
    seoDescription: "Investigate discrete equations, coordinate matrices, and variables."
  },
  {
    id: "6",
    title: "Capybara Meow: Math Adventure",
    slug: "capybara-meow-math",
    moduleEndpoint: "https://chinhnt2k3.github.io/capybara-meow-game/",
    image: "https://img.gamedistribution.com/79ee55b2591642c6b45396590b561c27-512x512.jpeg",
    category: "Applied",
    seoTitle: "Capybara Meow: Math Adventure - K-12 Mental Math Game",
    seoDescription: "An endless runner educational game helping kids aged 6-12 train mental math."
  },
  {
    id: "7",
    title: "PhET Arithmetic Challenge",
    slug: "phet-arithmetic",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_all.html",
    image: "https://img.gamedistribution.com/95fb77e5d5904d999052b6507c577014-512x512.jpg",
    category: "Interactive",
    seoTitle: "PhET Arithmetic Challenge - Interactive Math Simulation",
    seoDescription: "Master multiplication, division, and factoring through standard visual models."
  },
  {
    id: "8",
    title: "Fractions Matcher Visual",
    slug: "fractions-matcher-visual",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    image: "https://img.gamedistribution.com/be8c6171f11c4228965f3d4ef684b06f-512x512.jpg",
    category: "Interactive",
    seoTitle: "Fractions Matcher - Visual Fraction Learning",
    seoDescription: "Interactive tool designed for school Chromebooks to master fraction concepts."
  },
  {
    id: "9",
    title: "2048 Number Logic Evolution",
    slug: "2048-number-logic-evolution",
    moduleEndpoint: "https://sc940.github.io/2048/",
    image: "https://img.gamedistribution.com/e211833da6714080922856f6b553e18a-512x512.jpg",
    category: "Logic",
    seoTitle: "2048 Number Logic - Powers of Two Puzzle",
    seoDescription: "Train your mathematical foresight and number sense by combining tiles."
  },
  {
    id: "10",
    title: "Sudoku Logic Master Pro",
    slug: "sudoku-logic-master-pro",
    moduleEndpoint: "https://pocketjoso.github.io/sudokuJS/",
    image: "https://img.gamedistribution.com/5bf8479e015d487f9be6ed93c44c5f93-512x512.jpg",
    category: "Logic",
    seoTitle: "Sudoku Logic Master - Deductive Reasoning Puzzle",
    seoDescription: "Classic matrix sudoku to enhance logical deduction and reasoning skills."
  },
  {
    id: "11",
    title: "Spatial Geometry Tangram",
    slug: "spatial-geometry-tangram",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_all.html",
    image: "https://img.gamedistribution.com/4666cf4049fc496da998592318ef18f7-512x512.jpg",
    category: "Matrix",
    seoTitle: "Spatial Geometry Tangram - Area and Perimeter Lab",
    seoDescription: "Interactive building blocks to study area, perimeter, and grid mapping."
  },
  {
    id: "12",
    title: "Function Quadrant Grapher",
    slug: "kinetic-trajectory-billiards",
    // 💡 替换独立新链：PhET 坐标系象限与函数图像打靶器
    moduleEndpoint: "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_all.html",
    image: "https://img.gamedistribution.com/001476ca80df4e2ea413997db8392cf1-512x512.jpg",
    category: "Applied",
    seoTitle: "Function Quadrant Grapher - Linear Trajectories",
    seoDescription: "Plot linear functions and predict intersection slope coordinates in real time."
  },
  {
    id: "13",
    title: "Hexagonal Fraction Sandbox",
    slug: "hexagonal-grid-topology",
    // 💡 替换独立新链：PhET 空间多边形分数切片平衡
    moduleEndpoint: "https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality_all.html",
    image: "https://img.gamedistribution.com/264be16a5b2848bda9f47a61fbfd2547-512x512.jpg",
    category: "Logic",
    seoTitle: "Hexagonal Fraction Sandbox - Spatial Connection",
    seoDescription: "Examine ratio constraints across complex polygonal spatial layouts."
  },
  {
    id: "14",
    title: "Function Balance Scales",
    slug: "function-balance-scales",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_all.html",
    image: "https://img.gamedistribution.com/5df16a7eb2694e9f90cf9fa4c7b80145-512x512.jpg",
    category: "Interactive",
    seoTitle: "Function Balance Scales - Algebraic Equality",
    seoDescription: "Visual interactive scale system to master equations and algebra basics."
  },
  {
    id: "15",
    title: "Hexagonal Number Puzzle",
    slug: "mathematical-merge-puzzle",
    // 💡 替换独立新链：GitHub 开源纯净六边形数字连线
    moduleEndpoint: "https://michaelfbastos.github.io/hex puzzle/",
    image: "https://img.gamedistribution.com/62c5b369a6564e9a8f2e22616a9a7a93-512x512.jpg",
    category: "Logic",
    seoTitle: "Hexagonal Number Puzzle - Dynamic Alignment",
    seoDescription: "Calculate steps and space constraints to link hexagonal numeric sequences."
  },
  {
    id: "16",
    title: "HTML5 Hextris Operator",
    slug: "deductive-matrix-sudoku",
    // 💡 替换独立新链：经典 GitHub 开源纯净六边形俄罗斯方块 Hextris
    moduleEndpoint: "https://hextris.github.io/hextris/",
    image: "https://img.gamedistribution.com/bfd9e9e1bb344be69be293967d643867-512x512.jpg",
    category: "Logic",
    seoTitle: "Hextris Operator - Algorithmic Rotation Matrix",
    seoDescription: "Examine discrete spatial rotation limits through logical constraints."
  },
  {
    id: "17",
    title: "Ratio and Proportion Labs",
    slug: "ratio-proportion-labs",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/proportions-3d/latest/proportions-3d_all.html",
    image: "https://img.gamedistribution.com/f04c601db5fa43bba1bcfec64299b9cf-512x512.jpg",
    category: "Interactive",
    seoTitle: "Ratio and Proportion Labs - 3D Visual Constants",
    seoDescription: "Engage with dynamic 3D linear ratios to grasp scaling constants."
  },
  {
    id: "18",
    title: "Grid Optimization Matrix",
    slug: "binary-logic-operator",
    // 💡 替换独立新链：GitHub 开源高赞矩阵网格填充路线
    moduleEndpoint: "https://stared.github.io/matrix-game/",
    image: "https://img.gamedistribution.com/834273df1ea04d70bb8555e09be0beea-512x512.jpg",
    category: "Logic",
    seoTitle: "Grid Optimization Matrix - Discrete Array Game",
    seoDescription: "Optimize grid transformation steps to calculate target numerical patterns."
  },
  {
    id: "19",
    title: "Calculus Derivative Grapher",
    slug: "stochastic-matrix-game",
    // 💡 替换独立新链：PhET 微积分导数与切线变化模拟器
    moduleEndpoint: "https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_all.html",
    image: "https://img.gamedistribution.com/97486e921fc949fe9eb050ef7773fba8-512x512.jpg",
    category: "Logic",
    seoTitle: "Calculus Derivative Grapher - Continuous Functions",
    seoDescription: "Calculate mathematical derivative transformations and slope integrals dynamically."
  },
  {
    id: "20",
    title: "Dynamic Fluid Simulation",
    slug: "dynamic-fluid-simulation",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_all.html",
    image: "https://img.gamedistribution.com/c994dfbf3bbf4ee4b868ef61f89311fe-512x512.jpg",
    category: "Applied",
    seoTitle: "Dynamic Fluid Simulation - Hydrodynamic Trajectories",
    seoDescription: "Simulate particle physics, vectors, and temperature constraints in real time."
  },
  {
    id: "21",
    title: "Velocity Runner Calculus",
    slug: "velocity-runner-calculus",
    moduleEndpoint: "https://chinhnt2k3.github.io/capybara-meow-game/",
    image: "https://img.gamedistribution.com/109c95b060fa41a995db304dfdf12a58-512x512.jpg",
    category: "Applied",
    seoTitle: "Velocity Runner Calculus - Kinematics and Speed",
    seoDescription: "An endless velocity challenge testing real-time operational math calculation."
  },
  {
    id: "22",
    title: "Statistical Data Grapher",
    slug: "statistical-data-grapher",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability_all.html",
    image: "https://img.gamedistribution.com/4cc1da1430034a2e87c07da196df5886-512x512.jpg",
    category: "Interactive",
    seoTitle: "Statistical Data Grapher - Plinko Probability Lab",
    seoDescription: "Master bell curves and binomial distributions with falling grid arrays."
  },
  {
    id: "23",
    title: "Fraction Segment Matcher",
    slug: "fraction-segment-matcher",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    image: "https://img.gamedistribution.com/791c107e3a394fb288d672dfb704fb36-512x512.jpg",
    category: "Interactive",
    seoTitle: "Fraction Segment Matcher - Geometry Division",
    seoDescription: "A visual sandbox demonstrating fractional area mapping and matching."
  },
  {
    id: "24",
    title: "Algebraic Graphing Workspace",
    slug: "exponential-number-logic",
    // 💡 替换独立新链：PhET 代数方程式图像与斜率截距变幻器
    moduleEndpoint: "https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics_all.html",
    image: "https://img.gamedistribution.com/565d75cbdf0647c490ff6697b0e176b8-512x512.jpg",
    category: "Logic",
    seoTitle: "Algebraic Graphing Workspace - Coordinate Curves",
    seoDescription: "Explore quadratic equations, exponential variations, and parabola constants."
  },
  {
    id: "25",
    title: "Number Line Integers Lab",
    slug: "combinatorial-latin-square",
    // 💡 替换独立新链：PhET 离散正负数绝对值数轴实验室
    moduleEndpoint: "https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers_all.html",
    image: "https://img.gamedistribution.com/cb0be9fa39fb4a45906806a748c9bf39-512x512.jpg",
    category: "Logic",
    seoTitle: "Number Line Integers Lab - Absolute Vector Values",
    seoDescription: "Solve integer placement and scale operations on an interactive vector number line."
  },
  {
    id: "26",
    title: "Vector Addition Matrix",
    slug: "discrete-graph-matrix",
    // 💡 替换独立新链：PhET 二维向量加减法与矩阵力学合成实验室
    moduleEndpoint: "https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_all.html",
    image: "https://img.gamedistribution.com/eef1108efca84000b05b76f254e0078a-512x512.jpg",
    category: "Logic",
    seoTitle: "Vector Addition Matrix - Coordinate Intersections",
    seoDescription: "Discover array coordinate outputs and force composition laws visually."
  }
];

export const getLabBySlug = (slug: string): LabModule | undefined => {
  return labsData.find((lab) => lab.slug === slug);
};