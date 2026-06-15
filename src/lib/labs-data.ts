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
export const LAB_CATEGORIES = ["All","Matrix", "Logic", "Applied", "Interactive"] as const;

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
    seoTitle: "Discrete Linear Systems Simulator – Advanced Mathematics",
    seoDescription: "Investigate discrete equations, coordinate matrices,"
  }, // 💡 注意：第 59 行原本的结束大括号后面，必须补上这个英文逗号（,）
  {
    id: "6",
    title: "Capybara Meow: Math Adventure",
    slug: "capybara-meow-math",
    moduleEndpoint: "https://chinhnt2k3.github.io/capybara-meow-game/",
    category: "Applied",
    seoTitle: "Capybara Meow: Math Adventure - K-12 Mental Math Game",
    seoDescription: "An endless runner educational game helping kids aged 6-12 train mental math skills."
  },
  {
    id: "7",
    title: "PhET Arithmetic Challenge",
    slug: "phet-arithmetic",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_all.html",
    category: "Interactive",
    seoTitle: "PhET Arithmetic Challenge - Interactive Math Simulation",
    seoDescription: "Master multiplication, division, and factoring through standard interactive visual models."
  },
  {
    id: "8",
    title: "Fractions Matcher",
    slug: "fractions-matcher",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    category: "Interactive",
    seoTitle: "Fractions Matcher - Visual Fraction Learning",
    seoDescription: "Interactive tool designed for school Chromebooks to master fraction concepts visually."
  },
  {
    id: "9",
    title: "2048 Number Logic",
    slug: "2048-number-logic",
    moduleEndpoint: "https://gabrielecirulli.github.io/2048/",
    category: "Logic",
    seoTitle: "2048 Number Logic - Powers of Two Puzzle",
    seoDescription: "Train your mathematical foresight and number sense by combining exponential tiles."
  },
  {
    id: "10",
    title: "Sudoku Logic Master",
    slug: "sudoku-logic-master",
    moduleEndpoint: "https://pocketjoso.github.io/sudokuJS/",
    category: "Logic",
    seoTitle: "Sudoku Logic Master - Deductive Reasoning Puzzle",
    seoDescription: "Classic matrix sudoku to enhance logical deduction and deductive reasoning skills."
  },
  {
    id: "11",
    title: "Discrete Linear Systems",
    slug: "discrete-linear-systems",
    moduleEndpoint: "https://example.com/modules/discrete-linear-systems",
    category: "Logic",
    seoTitle: "Discrete Linear Systems Simulator – Advanced Mathematics",
    seoDescription: "Investigate discrete equations, coordinate matrices,"
  }, // 💡 注意：第 59 行原本的结束大括号后面，必须补上这个英文逗号（,）
  {
    id: "12",
    title: "Capybara Meow: Math Adventure",
    slug: "capybara-meow-math",
    moduleEndpoint: "https://chinhnt2k3.github.io/capybara-meow-game/",
    category: "Applied",
    seoTitle: "Capybara Meow: Math Adventure - K-12 Mental Math Game",
    seoDescription: "An endless runner educational game helping kids aged 6-12 train mental math skills."
  },
  {
    id: "13",
    title: "PhET Arithmetic Challenge",
    slug: "phet-arithmetic",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_all.html",
    category: "Interactive",
    seoTitle: "PhET Arithmetic Challenge - Interactive Math Simulation",
    seoDescription: "Master multiplication, division, and factoring through standard interactive visual models."
  },
  {
    id: "14",
    title: "Fractions Matcher",
    slug: "fractions-matcher",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    category: "Interactive",
    seoTitle: "Fractions Matcher - Visual Fraction Learning",
    seoDescription: "Interactive tool designed for school Chromebooks to master fraction concepts visually."
  },
  {
    id: "15",
    title: "2048 Number Logic",
    slug: "2048-number-logic",
    moduleEndpoint: "https://gabrielecirulli.github.io/2048/",
    category: "Logic",
    seoTitle: "2048 Number Logic - Powers of Two Puzzle",
    seoDescription: "Train your mathematical foresight and number sense by combining exponential tiles."
  },
  {
    id: "16",
    title: "Sudoku Logic Master",
    slug: "sudoku-logic-master",
    moduleEndpoint: "https://pocketjoso.github.io/sudokuJS/",
    category: "Logic",
    seoTitle: "Sudoku Logic Master - Deductive Reasoning Puzzle",
    seoDescription: "Classic matrix sudoku to enhance logical deduction and deductive reasoning skills."
  }, 
  {
    id: "17",
    title: "Fractions Matcher",
    slug: "fractions-matcher",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    category: "Interactive",
    seoTitle: "Fractions Matcher - Visual Fraction Learning",
    seoDescription: "Interactive tool designed for school Chromebooks to master fraction concepts visually."
  },
  {
    id: "9",
    title: "2048 Number Logic",
    slug: "2048-number-logic",
    moduleEndpoint: "https://gabrielecirulli.github.io/2048/",
    category: "Logic",
    seoTitle: "2048 Number Logic - Powers of Two Puzzle",
    seoDescription: "Train your mathematical foresight and number sense by combining exponential tiles."
  },
  {
    id: "18",
    title: "Sudoku Logic Master",
    slug: "sudoku-logic-master",
    moduleEndpoint: "https://pocketjoso.github.io/sudokuJS/",
    category: "Logic",
    seoTitle: "Sudoku Logic Master - Deductive Reasoning Puzzle",
    seoDescription: "Classic matrix sudoku to enhance logical deduction and deductive reasoning skills."
  },
  {
    id: "11",
    title: "Discrete Linear Systems",
    slug: "discrete-linear-systems",
    moduleEndpoint: "https://example.com/modules/discrete-linear-systems",
    category: "Logic",
    seoTitle: "Discrete Linear Systems Simulator – Advanced Mathematics",
    seoDescription: "Investigate discrete equations, coordinate matrices,"
  }, // 💡 注意：第 59 行原本的结束大括号后面，必须补上这个英文逗号（,）
  {
    id: "19",
    title: "Capybara Meow: Math Adventure",
    slug: "capybara-meow-math",
    moduleEndpoint: "https://chinhnt2k3.github.io/capybara-meow-game/",
    category: "Applied",
    seoTitle: "Capybara Meow: Math Adventure - K-12 Mental Math Game",
    seoDescription: "An endless runner educational game helping kids aged 6-12 train mental math skills."
  },
  {
    id: "20",
    title: "PhET Arithmetic Challenge",
    slug: "phet-arithmetic",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_all.html",
    category: "Interactive",
    seoTitle: "PhET Arithmetic Challenge - Interactive Math Simulation",
    seoDescription: "Master multiplication, division, and factoring through standard interactive visual models."
  },
  {
    id: "21",
    title: "Fractions Matcher",
    slug: "fractions-matcher",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    category: "Interactive",
    seoTitle: "Fractions Matcher - Visual Fraction Learning",
    seoDescription: "Interactive tool designed for school Chromebooks to master fraction concepts visually."
  },
  {
    id: "22",
    title: "2048 Number Logic",
    slug: "2048-number-logic",
    moduleEndpoint: "https://gabrielecirulli.github.io/2048/",
    category: "Logic",
    seoTitle: "2048 Number Logic - Powers of Two Puzzle",
    seoDescription: "Train your mathematical foresight and number sense by combining exponential tiles."
  },
  {
    id: "23",
    title: "Sudoku Logic Master",
    slug: "sudoku-logic-master",
    moduleEndpoint: "https://pocketjoso.github.io/sudokuJS/",
    category: "Logic",
    seoTitle: "Sudoku Logic Master - Deductive Reasoning Puzzle",
    seoDescription: "Classic matrix sudoku to enhance logical deduction and deductive reasoning skills."
  },
  {
    id: "24",
    title: "Sudoku Logic Master",
    slug: "sudoku-logic-master",
    moduleEndpoint: "https://pocketjoso.github.io/sudokuJS/",
    category: "Logic",
    seoTitle: "Sudoku Logic Master - Deductive Reasoning Puzzle",
    seoDescription: "Classic matrix sudoku to enhance logical deduction and deductive reasoning skills."
  }  // // 👈 干净的大括号结束，注意不要在这里留下一堆提示文本
]; // 👈 这是整个文件中唯一应该存在的、代表数组结束的符号
/**
 * 根据 URL 中的 slug 查出对应的模块数据
 */
export const getLabBySlug = (slug: string): LabModule | undefined => {
  return labsData.find((lab) => lab.slug === slug);
};