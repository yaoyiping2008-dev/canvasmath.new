export interface LabModule {
  id: string;
  title: string;
  slug: string;
  moduleEndpoint: string;
  image: string; // 💡 补全 TypeScript 类型声明
  category: string;
  seoTitle: string;
  seoDescription: string;
}

// 补全缺失的分类常量，契合重构后的学术化文案
export const LAB_CATEGORIES = ["All", "Matrix", "Logic", "Applied", "Interactive"] as const;

export const labsData: LabModule[] = [
  {
    id: "1",
    title: "Sudoku Classic Logic",
    slug: "sudoku-classic-logic",
    moduleEndpoint: "https://html5games.com/game/Sudoku/",
    image: "https://img.gamedistribution.com/5bf8479e015d487f9be6ed93c44c5f93-512x512.jpg",
    category: "Logic",
    seoTitle: "Sudoku Classic Logic - Deductive Reasoning | CanvasMath",
    seoDescription: "Challenge your brain with classic grid matrix deduction and improve algebraic logical sequencing skills."
  },
  {
    id: "2",
    title: "Block Matrix Merge",
    slug: "block-matrix-merge",
    moduleEndpoint: "https://html5games.com/game/Merge-the-Numbers/",
    image: "https://img.gamedistribution.com/f947bf970cc5482fa816cb03d2b0e6df-512x512.jpg",
    category: "Matrix",
    seoTitle: "Block Matrix Merge - Number Alignment Tool | CanvasMath",
    seoDescription: "An advanced visual exploration workspace for matrix block operations, alignment, and algebraic transformations."
  },
  {
    id: "3",
    title: "Probability Pipe Flow",
    slug: "probability-pipe-flow",
    moduleEndpoint: "https://html5games.com/game/Plumber-Soda/",
    image: "https://img.gamedistribution.com/495fbf51be0d4c828062092c47864c3c-512x512.jpg",
    category: "Logic",
    seoTitle: "Probability Pipe Flow - Network Logic Modeling | CanvasMath",
    seoDescription: "Analyze flow connectivity and spatial logical networks using discrete topological pathfinding mechanics."
  },
  {
    id: "4",
    title: "Applied Spatial Tangram",
    slug: "applied-spatial-tangram",
    moduleEndpoint: "https://html5games.com/game/Kids-Tangram/",
    image: "https://img.gamedistribution.com/9796ff0b6fa54cf5b292e9dbb186b24d-512x512.jpg",
    category: "Applied",
    seoTitle: "Applied Spatial Tangram - Geometric Assembly | CanvasMath",
    seoDescription: "Interactive coordinate shapes and spatial geometric rotation labs for K-12 math foundations."
  },
  {
    id: "5",
    title: "Discrete Hexa Topology",
    slug: "discrete-hexa-topology",
    moduleEndpoint: "https://html5games.com/game/Make-Hexa-Puzzle/",
    image: "https://img.gamedistribution.com/8db632d4323c4a2db7fa3c1c4b75eb75-512x512.jpg",
    category: "Matrix",
    seoTitle: "Discrete Hexa Topology - Hexagonal Grid Logic",
    seoDescription: "Investigate hexagonal cell equations, coordinate matrices, and space optimization constraints."
  },
  {
    id: "6",
    title: "Arithmetic Tower Defense",
    slug: "arithmetic-tower-defense",
    moduleEndpoint: "https://html5games.com/game/King-Soldiers/",
    image: "https://img.gamedistribution.com/79ee55b2591642c6b45396590b561c27-512x512.jpeg",
    category: "Applied",
    seoTitle: "Arithmetic Tower Defense - Kinematic Trajectory Game",
    seoDescription: "Calculate projection angles and velocity paths to solve physics-based tactical equation simulations."
  },
  {
    id: "7",
    title: "Calculus Path Tracer",
    slug: "calculus-path-tracer",
    moduleEndpoint: "https://html5games.com/game/Draw-Line/",
    image: "https://img.gamedistribution.com/95fb77e5d5904d999052b6507c577014-512x512.jpg",
    category: "Interactive",
    seoTitle: "Calculus Path Tracer - Continuous Coordinate Lines",
    seoDescription: "Master functional graphing and geometric limits through standard vector tracking visual models."
  },
  {
    id: "8",
    title: "Fraction Sorting Logic",
    slug: "fraction-sorting-logic",
    moduleEndpoint: "https://html5games.com/game/Sort-It-Water-Sort-Puzzle/",
    image: "https://img.gamedistribution.com/be8c6171f11c4228965f3d4ef684b06f-512x512.jpg",
    category: "Interactive",
    seoTitle: "Fraction Sorting Logic - Volumetric Classification",
    seoDescription: "Interactive classification tool designed to master density, volume division, and fractional sorting concepts."
  },
  {
    id: "9",
    title: "Mathematical Flow Connector",
    slug: "mathematical-flow-connector",
    moduleEndpoint: "https://html5games.com/game/Flow-Lines/",
    image: "https://img.gamedistribution.com/e211833da6714080922856f6b553e18a-512x512.jpg",
    category: "Logic",
    seoTitle: "Mathematical Flow Connector - Non-crossing Graph Networks",
    seoDescription: "Train your mathematical graph theory and spatial topology sense by connecting discrete multi-colored matrix endpoints."
  },
  {
    id: "10",
    title: "Geometric Cut Master",
    slug: "geometric-cut-master",
    moduleEndpoint: "https://html5games.com/game/Slice-Food/",
    image: "https://img.gamedistribution.com/5bf8479e015d487f9be6ed93c44c5f93-512x512.jpg",
    category: "Applied",
    seoTitle: "Geometric Cut Master - Fractional Area Division",
    seoDescription: "Calculate precise slice percentages and ratio cuts to master visual geometric geometry distributions."
  },
  {
    id: "11",
    title: "Algorithmic Block Fill",
    slug: "algorithmic-block-fill",
    moduleEndpoint: "https://html5games.com/game/Elements-Blocks/",
    image: "https://img.gamedistribution.com/4666cf4049fc496da998592318ef18f7-512x512.jpg",
    category: "Matrix",
    seoTitle: "Algorithmic Block Fill - Bin Packing Space optimization",
    seoDescription: "Interactive combinatorial block layout system to study 2D array packing optimization rules."
  },
  {
    id: "12",
    title: "Vector Physics Trajectory",
    slug: "vector-physics-trajectory",
    moduleEndpoint: "https://html5games.com/game/Knife-Rain/",
    image: "https://img.gamedistribution.com/001476ca80df4e2ea413997db8392cf1-512x512.jpg",
    category: "Applied",
    seoTitle: "Vector Physics Trajectory - Velocity Intersections",
    seoDescription: "Simulate physics-based angular frequency calculation and temporal collision prediction variables."
  },
  {
    id: "13",
    title: "Binary Match Simulator",
    slug: "binary-match-simulator",
    moduleEndpoint: "https://html5games.com/game/10x10-Blocks-Match/",
    image: "https://img.gamedistribution.com/264be16a5b2848bda9f47a61fbfd2547-512x512.jpg",
    category: "Matrix",
    seoTitle: "Binary Match Simulator - 10x10 Matrix Array Blocks",
    seoDescription: "Deploy coordinate matrix reduction strategies on standard grid allocation rows and columns."
  },
  {
    id: "14",
    title: "Combinatorial Word Tree",
    slug: "combinatorial-word-tree",
    moduleEndpoint: "https://html5games.com/game/Word-Connect/",
    image: "https://img.gamedistribution.com/5df16a7eb2694e9f90cf9fa4c7b80145-512x512.jpg",
    category: "Interactive",
    seoTitle: "Combinatorial Word Tree - Permutations and Strings",
    seoDescription: "Visual permutations mapping tool to discover discrete string combinations and mathematical arrangements."
  },
  {
    id: "15",
    title: "Loop Network Operator",
    slug: "loop-network-operator",
    moduleEndpoint: "https://html5games.com/game/Loop-Hexa/",
    image: "https://img.gamedistribution.com/62c5b369a6564e9a8f2e22616a9a7a93-512x512.jpg",
    category: "Logic",
    seoTitle: "Loop Network Operator - Closed Loop Topologies",
    seoDescription: "Calculate rotation vectors and angles to create endless closed logic structures across hexagonal coordinates."
  },
  {
    id: "16",
    title: "Stochastic Bubble Path",
    slug: "stochastic-bubble-path",
    moduleEndpoint: "https://html5games.com/game/Smarty-Bubbles/",
    image: "https://img.gamedistribution.com/bfd9e9e1bb344be69be293967d643867-512x512.jpg",
    category: "Logic",
    seoTitle: "Stochastic Bubble Path - Color Code Matching Labs",
    seoDescription: "Examine random reflection angles, trajectories and cluster matching logic mechanics."
  },
  {
    id: "17",
    title: "Topological Bridge Builder",
    slug: "topological-bridge-builder",
    moduleEndpoint: "https://html5games.com/game/Bridge-Legends/",
    image: "https://img.gamedistribution.com/f04c601db5fa43bba1bcfec64299b9cf-512x512.jpg",
    category: "Applied",
    seoTitle: "Topological Bridge Builder - Physics Tension Constants",
    seoDescription: "Engage with variable-length linear structural ratio models to master bridge gap spans and physical vector forces."
  },
  {
    id: "18",
    title: "Recursive Merge Board",
    slug: "recursive-merge-board",
    moduleEndpoint: "https://html5games.com/game/Get-10/",
    image: "https://img.gamedistribution.com/834273df1ea04d70bb8555e09be0beea-512x512.jpg",
    category: "Logic",
    seoTitle: "Recursive Merge Board - Number Grid Evolution",
    seoDescription: "Combine adjacent equivalent integers to optimize matrix score limits and track exponential sequences."
  },
  {
    id: "19",
    title: "Arithmetic Math Runner",
    slug: "arithmetic-math-runner",
    moduleEndpoint: "https://html5games.com/game/Math-Whiz/",
    image: "https://img.gamedistribution.com/97486e921fc949fe9eb050ef7773fba8-512x512.jpg",
    category: "Interactive",
    seoTitle: "Arithmetic Math Runner - Real-time Formula Calculation",
    seoDescription: "Calculate arithmetic outputs under strict time constraints to develop rapid mental equation calculation skills."
  },
  {
    id: "20",
    title: "Geometric Stack Architect",
    slug: "geometric-stack-architect",
    moduleEndpoint: "https://html5games.com/game/Stack-Tower/",
    image: "https://img.gamedistribution.com/c994dfbf3bbf4ee4b868ef61f89311fe-512x512.jpg",
    category: "Applied",
    seoTitle: "Geometric Stack Architect - Center of Mass Optimization",
    seoDescription: "Simulate solid block truncation, misalignment tolerances, and visual equilibrium vectors in real-time."
  },
  {
    id: "21",
    title: "Dynamic Jelly Physics",
    slug: "dynamic-jelly-physics",
    moduleEndpoint: "https://html5games.com/game/Jelly-Collapse/",
    image: "https://img.gamedistribution.com/109c95b060fa41a995db304dfdf12a58-512x512.jpg",
    category: "Applied",
    seoTitle: "Dynamic Jelly Physics - Deformable Entity Clusters",
    seoDescription: "Analyze adjacent cluster removal mechanics and gravity tracking using deformable grid physics models."
  },
  {
    id: "22",
    title: "Pattern Induction Memory",
    slug: "pattern-induction-memory",
    moduleEndpoint: "https://html5games.com/game/Memory-Match-Animals/",
    image: "https://img.gamedistribution.com/4cc1da1430034a2e87c07da196df5886-512x512.jpg",
    category: "Interactive",
    seoTitle: "Pattern Induction Memory - Matrix Pair Matching",
    seoDescription: "Develop visual matrix indices mapping, pattern identification, and grid positioning records."
  },
  {
    id: "23",
    title: "Kinematic Target Practice",
    slug: "kinematic-target-practice",
    moduleEndpoint: "https://html5games.com/game/Defend-the-Tank/",
    image: "https://img.gamedistribution.com/791c107e3a394fb288d672dfb704fb36-512x512.jpg",
    category: "Applied",
    seoTitle: "Kinematic Target Practice - Dynamic Intercept Curves",
    seoDescription: "A real-time coordinate defense sandbox demonstrating intercept calculation and collision mechanics."
  },
  {
    id: "24",
    title: "Linear Link Puzzle",
    slug: "linear-link-puzzle",
    moduleEndpoint: "https://html5games.com/game/Hexa-Blocks-Puzzle/",
    image: "https://img.gamedistribution.com/565d75cbdf0647c490ff6697b0e176b8-512x512.jpg",
    category: "Matrix",
    seoTitle: "Linear Link Puzzle - Hexagonal Coordinate Tiling",
    seoDescription: "Fit non-overlapping geometric blocks into continuous rows on complex mathematical hexagonal matrix arrays."
  },
  {
    id: "25",
    title: "Discrete Jewel Combinatorics",
    slug: "discrete-jewel-combinatorics",
    moduleEndpoint: "https://html5games.com/game/Jewel-Crunch/",
    image: "https://img.gamedistribution.com/cb0be9fa39fb4a45906806a748c9bf39-512x512.jpg",
    category: "Logic",
    seoTitle: "Discrete Jewel Combinatorics - Array Index Displacement",
    seoDescription: "Solve linear shift grid configurations based on structural combinatorial matrix search trees."
  },
  {
    id: "26",
    title: "Optimal Path Connector",
    slug: "optimal-path-connector",
    moduleEndpoint: "https://html5games.com/game/Onet-Connect-Classic/",
    image: "https://img.gamedistribution.com/eef1108efca84000b05b76f254e0078a-512x512.jpg",
    category: "Logic",
    seoTitle: "Optimal Path Connector - Double-Turn Grid Routing",
    seoDescription: "Discover cell pathways restricted to maximum orthogonal turns to train graph pathfinding constraints."
  }
];

export const getLabBySlug = (slug: string): LabModule | undefined => {
  return labsData.find((lab) => lab.slug === slug);
};