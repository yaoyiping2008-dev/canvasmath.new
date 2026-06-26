import { generatedLessonLabs } from "./generated-lessons";
import { runLabsDataValidation } from "./validate-labs-data";

export const LAB_CATEGORIES = [
  "All",
  "Number & Operations",
  "Algebra",
  "Geometry",
  "Probability & Data",
  "Physics & Motion",
  "Logic & Reasoning",
  "Interactive Learning",
] as const;

export type LabCategory = (typeof LAB_CATEGORIES)[number];
export type LabModuleCategory = Exclude<LabCategory, "All">;

export type LabDifficulty = "Introductory" | "Intermediate" | "Advanced";
export type LabEmbedMode = "iframe" | "local";

export type LabModule = {
  id: string;
  title: string;
  slug: string;
  moduleEndpoint: string;
  image: string;
  category: LabModuleCategory;
  seoTitle: string;
  seoDescription: string;
  subject?: string;
  gradeBand?: string;
  difficulty?: LabDifficulty;
  estimatedMinutes?: number;
  summary?: string;
  learningObjectives?: string[];
  skills?: string[];
  publisher?: string;
  sourceUrl?: string;
  license?: string;
  embedMode?: LabEmbedMode;
  fallbackUrl?: string;
  verifiedAt?: string;
  featured?: boolean;
  recentlyAdded?: boolean;
};

const coreLabsData: LabModule[] = [
  {
    id: "fruit-ninja",
    title: "Fruit Ninja",
    slug: "fruit-ninja",
    moduleEndpoint: "/games/fruitninja/index.html",
    image: "/thumbnails/fruit-ninja.png",
    category: "Interactive Learning",
    seoTitle: "Fruit Ninja - Interactive Module | CanvasMath",
    seoDescription:
      "Open the Fruit Ninja interactive module in the CanvasMath workspace.",
    subject: "Interactive Learning",
    summary:
      "A locally hosted touch-based interactive module available through CanvasMath.",
    embedMode: "local",
    fallbackUrl: "/games/fruitninja/index.html",
  },
  {
    id: "1",
    title: "Equality Explorer",
    slug: "equality-explorer",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_all.html",
    image: "/thumbnails/lab-1.png",
    category: "Algebra",
    seoTitle: "Equality Explorer - Interactive Algebra Simulation | CanvasMath",
    seoDescription:
      "Balance equations and explore algebraic equality with variables using the PhET Equality Explorer simulation.",
    subject: "Algebra",
    gradeBand: "Grades 6-8",
    difficulty: "Introductory",
    estimatedMinutes: 20,
    summary: "Explore how equations stay balanced when variables and operations change.",
    learningObjectives: [
      "Model equations with variables on a balance scale",
      "Predict how operations affect both sides of an equation",
    ],
    skills: ["Equation modeling", "Algebraic reasoning"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/equality-explorer",
    embedMode: "iframe",
    featured: true,
  },
  {
    id: "2",
    title: "Area Model Algebra",
    slug: "area-model-algebra",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra_all.html",
    image: "/thumbnails/lab-2.png",
    category: "Algebra",
    seoTitle: "Area Model Algebra - Visual Polynomial Multiplication | CanvasMath",
    seoDescription:
      "Multiply and factor expressions using area models to connect geometry with algebraic structure.",
    subject: "Algebra",
    gradeBand: "Grades 6-8",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    summary:
      "Use rectangular area models to represent multiplication and factoring of expressions.",
    learningObjectives: [
      "Represent products with area models",
      "Connect factoring to geometric decomposition",
    ],
    skills: ["Polynomial representation", "Visual algebra"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/area-model-algebra",
    embedMode: "iframe",
  },
  {
    id: "3",
    title: "Plinko Probability",
    slug: "plinko-probability",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability_all.html",
    image: "/thumbnails/lab-3.png",
    category: "Probability & Data",
    seoTitle: "Plinko Probability - Data Distribution Simulation | CanvasMath",
    seoDescription:
      "Observe how random paths produce binomial distributions in the Plinko Probability simulation.",
    subject: "Probability & Data",
    gradeBand: "Grades 9-12",
    difficulty: "Intermediate",
    estimatedMinutes: 20,
    summary: "Drop balls through pegs to study probability distributions and data patterns.",
    learningObjectives: [
      "Interpret frequency distributions from repeated trials",
      "Compare experimental results with expected probability models",
    ],
    skills: ["Data interpretation", "Probability reasoning"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/plinko-probability",
    embedMode: "iframe",
    featured: true,
  },
  {
    id: "4",
    title: "Area Builder",
    slug: "area-builder",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_all.html",
    image: "/thumbnails/lab-4.png",
    category: "Geometry",
    seoTitle: "Area Builder - Perimeter and Area Simulation | CanvasMath",
    seoDescription: "Build shapes on a grid to explore area, perimeter, and spatial decomposition.",
    subject: "Geometry",
    gradeBand: "Grades 3-5",
    difficulty: "Introductory",
    estimatedMinutes: 15,
    summary: "Construct figures to compare area and perimeter on a unit grid.",
    learningObjectives: [
      "Calculate area and perimeter of composite figures",
      "Explain how shape changes affect measurements",
    ],
    skills: ["Area measurement", "Perimeter reasoning"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/area-builder",
    embedMode: "iframe",
  },
  {
    id: "5",
    title: "Expression Exchange",
    slug: "expression-exchange",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/expression-exchange/latest/expression-exchange_all.html",
    image: "/thumbnails/lab-5.png",
    category: "Algebra",
    seoTitle: "Expression Exchange - Equivalent Expressions Lab | CanvasMath",
    seoDescription:
      "Trade and combine symbolic tokens to build and compare equivalent algebraic expressions.",
    subject: "Algebra",
    gradeBand: "Grades 6-8",
    difficulty: "Introductory",
    estimatedMinutes: 20,
    summary: "Exchange expression pieces to discover equivalent symbolic forms.",
    learningObjectives: [
      "Identify equivalent expressions",
      "Combine like terms using visual tokens",
    ],
    skills: ["Symbolic reasoning", "Expression equivalence"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/expression-exchange",
    embedMode: "iframe",
  },
  {
    id: "6",
    title: "Mental Math Practice Module",
    slug: "mental-math-practice-module",
    moduleEndpoint: "https://chinhnt2k3.github.io/capybara-meow-game/",
    image: "/thumbnails/lab-6.png",
    category: "Number & Operations",
    seoTitle: "Mental Math Practice Module - Number Fluency Activity | CanvasMath",
    seoDescription:
      "Practice rapid mental arithmetic through a third-party number-fluency activity hosted externally.",
    subject: "Number & Operations",
    gradeBand: "Grades 1-5",
    difficulty: "Introductory",
    estimatedMinutes: 10,
    summary: "External activity focused on quick mental calculation practice.",
    learningObjectives: ["Strengthen mental arithmetic fluency"],
    skills: ["Mental calculation", "Number sense"],
    sourceUrl: "https://chinhnt2k3.github.io/capybara-meow-game/",
    embedMode: "iframe",
    recentlyAdded: true,
  },
  {
    id: "7",
    title: "Arithmetic",
    slug: "arithmetic",
    moduleEndpoint: "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_all.html",
    image: "/thumbnails/lab-7.png",
    category: "Number & Operations",
    seoTitle: "Arithmetic - Multiplication and Division Simulation | CanvasMath",
    seoDescription:
      "Practice multiplication, division, and factoring with visual area and grouping models.",
    subject: "Number & Operations",
    gradeBand: "Grades 3-5",
    difficulty: "Introductory",
    estimatedMinutes: 20,
    summary: "Use visual models for multiplication, division, and factoring exercises.",
    learningObjectives: [
      "Represent multiplication with arrays and area",
      "Connect division to inverse operations",
    ],
    skills: ["Multiplication", "Division", "Factoring"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/arithmetic",
    embedMode: "iframe",
  },
  {
    id: "8",
    title: "Fractions Intro",
    slug: "fractions-intro",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html",
    image: "/thumbnails/lab-8.png",
    category: "Number & Operations",
    seoTitle: "Fractions Intro - Visual Fraction Simulation | CanvasMath",
    seoDescription:
      "Compare and build fractions using length models and shaded regions in an introductory simulation.",
    subject: "Number & Operations",
    gradeBand: "Grades 3-5",
    difficulty: "Introductory",
    estimatedMinutes: 20,
    summary: "Introduce fraction concepts with length and area representations.",
    learningObjectives: [
      "Compare fractions with different denominators",
      "Build equivalent fractions visually",
    ],
    skills: ["Fraction comparison", "Equivalent fractions"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/fractions-intro",
    embedMode: "iframe",
    featured: true,
  },
  {
    id: "9",
    title: "Powers of Two 2048",
    slug: "powers-of-two-2048",
    moduleEndpoint: "/games/2048-master/index.html",
    image: "/thumbnails/lab-9.png",
    category: "Logic & Reasoning",
    seoTitle: "Powers of Two 2048 - Number Strategy Module | CanvasMath",
    seoDescription:
      "Combine tiles representing powers of two to strengthen number sense and forward planning.",
    subject: "Number & Operations",
    gradeBand: "Grades 6-8",
    difficulty: "Intermediate",
    estimatedMinutes: 15,
    summary: "Local tile-combining activity emphasizing powers of two and strategic planning.",
    learningObjectives: [
      "Recognize powers of two in combined tile values",
      "Plan multi-step numeric combinations",
    ],
    skills: ["Number sense", "Strategic reasoning"],
    embedMode: "local",
    fallbackUrl: "/games/2048-master/index.html",
  },
  {
    id: "12",
    title: "Graphing Lines",
    slug: "graphing-lines",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_all.html",
    image: "/thumbnails/lab-12.png",
    category: "Algebra",
    seoTitle: "Graphing Lines - Linear Functions Simulation | CanvasMath",
    seoDescription:
      "Graph linear equations, adjust slope and intercept, and interpret coordinate relationships.",
    subject: "Algebra",
    gradeBand: "Grades 8-10",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    summary: "Explore slope-intercept form and graph linear relationships on a coordinate plane.",
    learningObjectives: [
      "Graph lines from slope and intercept",
      "Interpret how parameters change a line's position",
    ],
    skills: ["Graphing", "Linear functions"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/graphing-lines",
    embedMode: "iframe",
  },
  {
    id: "13",
    title: "Fractions Equality",
    slug: "fractions-equality",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality_all.html",
    image: "/thumbnails/lab-13.png",
    category: "Number & Operations",
    seoTitle: "Fractions Equality - Equivalent Fractions Lab | CanvasMath",
    seoDescription:
      "Build and compare fractions on number lines and area models to study equivalence.",
    subject: "Number & Operations",
    gradeBand: "Grades 3-5",
    difficulty: "Introductory",
    estimatedMinutes: 20,
    summary: "Compare fractions using number lines and partitioned regions.",
    learningObjectives: ["Identify equivalent fractions", "Represent fractions on number lines"],
    skills: ["Equivalent fractions", "Number line reasoning"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/fractions-equality",
    embedMode: "iframe",
  },
  {
    id: "16",
    title: "Hextris Spatial Rotation",
    slug: "hextris-spatial-rotation",
    moduleEndpoint: "https://hextris.github.io/hextris/",
    image: "/thumbnails/lab-16.png",
    category: "Logic & Reasoning",
    seoTitle: "Hextris Spatial Rotation - Geometric Orientation Module | CanvasMath",
    seoDescription:
      "Rotate a hexagonal grid to align colored segments, practicing spatial orientation and timing.",
    subject: "Logic & Reasoning",
    gradeBand: "Grades 6-12",
    difficulty: "Intermediate",
    estimatedMinutes: 15,
    summary: "External hexagonal rotation activity focused on orientation and pattern matching.",
    learningObjectives: ["Rotate objects to align geometric patterns"],
    skills: ["Spatial orientation", "Pattern recognition"],
    sourceUrl: "https://hextris.github.io/hextris/",
    embedMode: "iframe",
  },
  {
    id: "19",
    title: "Calculus Grapher",
    slug: "calculus-grapher",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_all.html",
    image: "/thumbnails/lab-19.png",
    category: "Algebra",
    seoTitle: "Calculus Grapher - Derivative Visualization | CanvasMath",
    seoDescription:
      "Visualize functions, derivatives, and integral areas with the PhET Calculus Grapher simulation.",
    subject: "Algebra",
    gradeBand: "Grades 11-12",
    difficulty: "Advanced",
    estimatedMinutes: 30,
    summary: "Explore how derivatives and integrals relate to function graphs.",
    learningObjectives: [
      "Relate slope of tangent lines to derivatives",
      "Interpret integral areas under curves",
    ],
    skills: ["Calculus visualization", "Function analysis"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/calculus-grapher",
    embedMode: "iframe",
  },
  {
    id: "20",
    title: "States of Matter Basics",
    slug: "states-of-matter-basics",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_all.html",
    image: "/thumbnails/lab-20.png",
    category: "Physics & Motion",
    seoTitle: "States of Matter Basics - Particle Motion Simulation | CanvasMath",
    seoDescription:
      "Observe how temperature and pressure affect particle motion in solids, liquids, and gases.",
    subject: "Physics & Motion",
    gradeBand: "Grades 6-8",
    difficulty: "Introductory",
    estimatedMinutes: 25,
    summary: "Study particle behavior across states of matter under changing conditions.",
    learningObjectives: [
      "Compare particle motion in solids, liquids, and gases",
      "Relate temperature to kinetic energy of particles",
    ],
    skills: ["Particle modeling", "Scientific observation"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/states-of-matter-basics",
    embedMode: "iframe",
  },
  {
    id: "24",
    title: "Graphing Quadratics",
    slug: "graphing-quadratics",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics_all.html",
    image: "/thumbnails/lab-24.png",
    category: "Algebra",
    seoTitle: "Graphing Quadratics - Parabola Exploration | CanvasMath",
    seoDescription:
      "Adjust quadratic parameters and observe how parabolas change on the coordinate plane.",
    subject: "Algebra",
    gradeBand: "Grades 9-12",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    summary: "Explore vertex form and standard form of quadratic functions graphically.",
    learningObjectives: [
      "Identify how coefficients affect parabola shape",
      "Connect algebraic forms to graph features",
    ],
    skills: ["Quadratic functions", "Graphical analysis"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/graphing-quadratics",
    embedMode: "iframe",
  },
  {
    id: "25",
    title: "Number Line Integers",
    slug: "number-line-integers",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers_all.html",
    image: "/thumbnails/lab-25.png",
    category: "Number & Operations",
    seoTitle: "Number Line Integers - Integer Operations Lab | CanvasMath",
    seoDescription:
      "Place and combine integers on an interactive number line to model addition and subtraction.",
    subject: "Number & Operations",
    gradeBand: "Grades 6-8",
    difficulty: "Introductory",
    estimatedMinutes: 20,
    summary: "Model integer operations using distance and direction on a number line.",
    learningObjectives: [
      "Represent integers on a number line",
      "Interpret addition and subtraction as movement",
    ],
    skills: ["Integer operations", "Number line reasoning"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/number-line-integers",
    embedMode: "iframe",
  },
  {
    id: "26",
    title: "Vector Addition",
    slug: "vector-addition",
    moduleEndpoint:
      "https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_all.html",
    image: "/thumbnails/lab-26.png",
    category: "Physics & Motion",
    seoTitle: "Vector Addition - Force Composition Simulation | CanvasMath",
    seoDescription:
      "Compose and decompose vectors to study magnitude, direction, and resultant forces.",
    subject: "Physics & Motion",
    gradeBand: "Grades 9-12",
    difficulty: "Intermediate",
    estimatedMinutes: 25,
    summary: "Add vectors graphically and numerically to find resultant magnitude and direction.",
    learningObjectives: [
      "Add vectors using head-to-tail and component methods",
      "Interpret vector direction and magnitude",
    ],
    skills: ["Vector composition", "Force analysis"],
    publisher: "PhET Interactive Simulations",
    sourceUrl: "https://phet.colorado.edu/en/simulations/vector-addition",
    embedMode: "iframe",
    featured: true,
  },
];

export const labsData: LabModule[] = [...coreLabsData, ...generatedLessonLabs];

export function getLabBySlug(slug: string) {
  return labsData.find((lab) => lab.slug === slug);
}

runLabsDataValidation(labsData);
