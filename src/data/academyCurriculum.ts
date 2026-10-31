import { AcademyChapter } from '../types';

export const ACADEMY_CHAPTERS: AcademyChapter[] = [
  {
    id: 'ch-1',
    chapterNumber: 1,
    title: 'Understanding the Final Year Project (FYP)',
    category: 'Foundations',
    readTime: '6 min read',
    summary: 'What an FYP is, why it holds the heaviest credit weight, and the full two-semester lifecycle.',
    overview: `The Final Year Project (FYP), also referred to as the Capstone Project or Senior Design Project, is the crowning academic and practical milestone of your Bachelor's degree in Computer Science or Software Engineering. It typically spans two semesters (6 to 8 months) and carries 6 credit hours—the highest single course weighting in your entire degree.

Unlike regular semester course assignments where you follow prescriptive lab sheets, an FYP requires you to apply cumulative knowledge: system analysis, architecture design, algorithmic problem-solving, database normalization, software quality assurance, professional documentation, and verbal defense.`,
    coreConcepts: [
      {
        title: 'The Dual Nature of FYP: Engineering vs Research',
        description: 'An engineering FYP delivers a working, testable software system solving an operational pain point. A research FYP investigates a novel hypothesis, algorithm, or dataset benchmark. Most undergraduate CS students succeed best with an Applied Engineering project with an innovative algorithmic component.',
        example: 'Good: A decentralized telemetry pipeline for IoT cold-chain logistics. Cliché: Yet another generic restaurant table booking app.'
      },
      {
        title: 'The Two-Semester Timeline Breakdown',
        description: 'Semester 1 (FYP-I): Problem definition, literature review, project proposal defense, SRS specification, UI/UX prototyping, and high-level architectural design. Semester 2 (FYP-II): Sprint implementation, unit & integration testing, performance benchmarking, final thesis report writing, and external panel defense.'
      },
      {
        title: 'The Evaluation Panel Psychology',
        description: 'The internal and external examination committee does not grade based on lines of code. They evaluate: 1) Did you follow a disciplined engineering process? 2) Can you articulate every technical trade-off made? 3) Does your system handle edge cases and failures gracefully?'
      }
    ],
    doAndDont: {
      do: [
        'Select a domain where you can find real end-users or domain stakeholders to test with.',
        'Keep a weekly engineering log / meeting notebook signed by your project supervisor.',
        'Version-control everything with Git from Day 1 using semantic branches and commit messages.'
      ],
      dont: [
        'Do not wait until Semester 2 to start coding; architectural prototypes must run by the end of Semester 1.',
        'Never purchase or outsource your project—examiners can identify outsourced code within 3 minutes of viva questioning.',
        'Do not commit to proprietary or paid APIs that might expire or exceed rate limits before the defense.'
      ]
    },
    supervisorExpectations: [
      'Weekly progress updates with tangible deliverables rather than verbal promises.',
      'Active consultation before making major architectural changes or switching tech stacks.',
      'Self-directed debugging before knocking on the supervisor door.'
    ],
    quiz: [
      {
        question: 'What is the primary factor FYP evaluation panels look for during grading?',
        options: [
          'The total lines of code written in the repository',
          'Disciplined engineering methodology, architecture trade-offs, and verification',
          'Using the newest trending JavaScript framework released this month',
          'Having the highest number of decorative UI animations'
        ],
        correctIndex: 1,
        explanation: 'Panels grade software engineering discipline, defensible architectural decisions, and testing rigor—not sheer code volume.'
      },
      {
        question: 'In standard BS Computer Science curricula, what is expected at the end of Semester 1 (FYP-I)?',
        options: [
          'A completed commercial production release deployed to app stores',
          'Only a 1-page informal email without documentation',
          'Approved Proposal, SRS, System Architecture, and working Proof-of-Concept',
          'Nothing until the final week of Semester 2'
        ],
        correctIndex: 2,
        explanation: 'Semester 1 concludes with the Project Proposal, complete SRS document, system architectural models, and a foundational proof of concept.'
      }
    ]
  },
  {
    id: 'ch-2',
    chapterNumber: 2,
    title: 'Selecting a High-Scoring Project Idea',
    category: 'Ideation',
    readTime: '8 min read',
    summary: 'How to bypass clichéd projects, identify real-world pain points, and secure supervisor approval.',
    overview: `Over 60% of FYP proposals face immediate rejection or severe downgrading during initial departmental defense boards. The primary culprit is "Cliché Project Syndrome"—students proposing generic e-commerce portals, basic clinic appointment managers, or clone apps with zero technical depth.

To achieve an 'A' grade, your project must exhibit three pillars: 1) A quantifiable real-world problem, 2) Technical depth (challenging algorithms, distributed state, optimization, security, or ML pipeline), and 3) Realistic feasibility within 8 months.`,
    coreConcepts: [
      {
        title: 'The Problem-First vs Tech-First Trap',
        description: 'Amateur students pick a technology first ("I want to use Blockchain and AI") and then invent an artificial problem. Senior engineers identify a concrete inefficiency first ("Community blood banks experience 32% waste due to cold-chain latency") and select the simplest effective technology stack to solve it.',
        example: 'Bad: "AI Blockchain Pet Feeder". Good: "Automated Micro-Grid Energy Dispatcher with Real-Time Demand Forecasting".'
      },
      {
        title: 'The 3-Tier Feature Scope: Core, Secondary, Stretch',
        description: 'Never propose a flat list of 20 features. Categorize them into Tier 1: Core Must-Haves (the minimum viable product without which the project fails), Tier 2: Secondary Features (reporting, multi-tenant roles), and Tier 3: Stretch Goals (nice-to-have innovations that impress the panel if time permits).'
      },
      {
        title: 'Vetting Dataset and Hardware Availability',
        description: 'If your project relies on machine learning or specialized hardware (e.g. EEG sensors, medical X-rays, enterprise CRM APIs), confirm data availability BEFORE submitting your proposal. 40% of ML projects stall mid-semester due to missing clean data.'
      }
    ],
    doAndDont: {
      do: [
        'Conduct a preliminary literature or market search on IEEE Xplore, Google Scholar, and GitHub.',
        'Match project tech stack with at least one team member’s existing foundational strengths.',
        'Ensure the project title is clear, academic, and specifies the technique and domain.'
      ],
      dont: [
        'Do not build simple CRUD (Create, Read, Update, Delete) apps without algorithmic complexity.',
        'Do not propose projects requiring HIPAA-restricted patient records or proprietary bank APIs.',
        'Do not let one team member carry the entire technical load while others handle documentation.'
      ]
    },
    supervisorExpectations: [
      'A one-page project concept paper outlining Problem, Objectives, Methodology, and Tech Stack.',
      'Proof of available datasets or mock data generators.',
      'Clear distribution of responsibilities across team members.'
    ],
    quiz: [
      {
        question: 'Why do evaluation panels frequently reject basic e-commerce or booking proposals?',
        options: [
          'Because e-commerce websites are illegal in universities',
          'Because they consist mostly of basic CRUD with low algorithmic and architectural depth',
          'Because they require too many databases to run locally',
          'Because students must only build operating systems'
        ],
        correctIndex: 1,
        explanation: 'Basic CRUD portals lack software engineering complexity, algorithmic depth, and significant research or technical challenges.'
      }
    ]
  },
  {
    id: 'ch-3',
    chapterNumber: 3,
    title: 'The Project Proposal & Approval Board',
    category: 'Planning',
    readTime: '7 min read',
    summary: 'The anatomical structure of a winning FYP proposal and defending it before the committee.',
    overview: `Your project proposal is your formal contract with the university department. Once approved, the objectives and scope defined in this document become the benchmark against which your final defense will be graded.

A strong proposal is concise (typically 8–15 pages), formal in tone, and answers five fundamental questions: Why this problem? Who cares? What is your proposed technical solution? What are the exact boundaries? What is the execution timeline?`,
    coreConcepts: [
      {
        title: 'The 4-Part Problem Statement Formula',
        description: 'A professional problem statement includes: 1) The Ideal State (what should be happening), 2) The Reality (what goes wrong today), 3) The Consequences (cost, time, safety, accuracy loss), and 4) The Proposed Intervention.',
        example: 'Example: "While small-scale municipal water networks require daily chlorine monitoring (Ideal), field workers currently take manual samples only once per week (Reality), leading to delayed contamination detection affecting up to 15,000 residents (Consequences). This project proposes an automated edge-sensor telemetry unit with automated alert dispatching (Intervention)."'
      },
      {
        title: 'SMART Objectives',
        description: 'Objectives must be Specific, Measurable, Achievable, Relevant, and Time-bound. Avoid vague words like "to understand", "to make a good app", or "to optimize everything". Use action verbs: "To design", "To implement", "To benchmark", "To evaluate".'
      },
      {
        title: 'Explicit Scope Bounding (In-Scope vs Out-of-Scope)',
        description: 'Stating what your project will NOT do is just as important as stating what it will do. This protects you during the final defense when external examiners ask: "Why didn\'t you support international currency conversions or biometric retinal scanning?"'
      }
    ],
    doAndDont: {
      do: [
        'Include a Gantt chart mapping sprints across Semesters 1 and 2.',
        'Define explicit hardware/software minimum specifications.',
        'Anticipate supervisor questions on risk management and fallback plans.'
      ],
      dont: [
        'Never write marketing slogans like "revolutionary", "game-changing", or "100% flawless".',
        'Do not list more than 4 to 6 core objectives—too many objectives lead to incomplete deliverables.',
        'Do not submit a proposal without checking for grammatical precision and citation standards.'
      ]
    },
    supervisorExpectations: [
      'A cleanly formatted PDF adhering to university font, margin, and IEEE citation standards.',
      'Defensible boundary constraints in the Out-of-Scope section.',
      'Confidence during proposal defense presentations.'
    ],
    quiz: [
      {
        question: 'Which of the following is written as a valid SMART project objective?',
        options: [
          'To make the fastest and coolest healthcare app in the country',
          'To develop an automated deep-learning classifier achieving >=88% precision on chest X-ray pneumonia detection',
          'To learn Python and explore modern machine learning libraries',
          'To finish all documentation on time'
        ],
        correctIndex: 1,
        explanation: 'Option 2 is Specific, Measurable (>=88% precision), Achievable, Relevant to the domain, and clearly testable.'
      }
    ]
  },
  {
    id: 'ch-4',
    chapterNumber: 4,
    title: 'Software Requirements Specification (SRS)',
    category: 'Documentation',
    readTime: '9 min read',
    summary: 'Mastering the IEEE 830 standard, functional vs non-functional requirements, and requirement traceability.',
    overview: `The Software Requirements Specification (SRS) is the single most scrutinized document during mid-term evaluations. Following the IEEE 830 standard, the SRS acts as the complete technical blueprint describing what the software shall do, without prescribing how it is implemented inside the source code.

Examiners specifically look for ambiguity in requirements. If a requirement cannot be verified by a concrete test case, it is invalid.`,
    coreConcepts: [
      {
        title: 'Functional Requirements (FR) with RFC 2119 Keywords',
        description: 'Functional requirements define inputs, processing, and outputs. Use the standard normative keyword "SHALL" for mandatory capabilities, "SHOULD" for recommended, and "MAY" for optional features. Each FR must have a unique identifier.',
        example: 'FR-AUTH-01: The system SHALL verify user credentials against Argon2id salted password hashes and issue a signed JSON Web Token (JWT) with an expiry of 15 minutes.'
      },
      {
        title: 'Non-Functional Requirements (NFR) & Measurable Metrics',
        description: 'NFRs describe quality attributes: Performance, Security, Reliability, Availability, Maintainability, and Usability. Never write "The app must be fast". Write quantifiable thresholds.',
        example: 'NFR-PERF-01: The REST API SHALL return 95% of read queries within 250 milliseconds under a concurrent load of 100 simulated users.'
      },
      {
        title: 'Requirements Traceability Matrix (RTM)',
        description: 'An RTM is a table that maps each Functional Requirement (FR) to its corresponding Use Case, Design Component, and Quality Assurance Test Case. It proves complete engineering coverage.'
      }
    ],
    doAndDont: {
      do: [
        'Organize functional requirements hierarchically by module (e.g. FR-AUTH, FR-DATA, FR-REPORT).',
        'State system constraints clearly (e.g. browser versions, minimum RAM, network latency).',
        'Include clear user persona profiles.'
      ],
      dont: [
        'Do not write vague requirements like "The user interface shall be user-friendly".',
        'Do not discuss specific code libraries or database queries in the SRS—keep it focused on requirements, not internal code.',
        'Do not ignore error handling and exception requirements.'
      ]
    },
    supervisorExpectations: [
      'Every functional requirement must be testable.',
      'Clear separation between functional behavior and non-functional performance targets.',
      'Proper IEEE standard formatting with Document Version Control table.'
    ],
    quiz: [
      {
        question: 'Which of the following is a properly specified Non-Functional Requirement?',
        options: [
          'The mobile application should look modern and pleasant to young users',
          'The authentication service SHALL encrypt all data at rest using AES-256 and achieve 99.5% uptime during testing',
          'Users will be able to click buttons smoothly',
          'The system must never crash under any circumstances'
        ],
        correctIndex: 1,
        explanation: 'It specifies concrete security encryption standards (AES-256) and a measurable uptime metric (99.5%).'
      }
    ]
  },
  {
    id: 'ch-5',
    chapterNumber: 5,
    title: 'Use Cases & Behavioral Modeling',
    category: 'Modeling',
    readTime: '7 min read',
    summary: 'Actors, Use Case diagrams, preconditions, postconditions, and alternative execution paths.',
    overview: `Use case modeling captures how different user roles (actors) interact with your system to achieve a specific goal. In academic defenses, examiners love challenging use cases to test whether students have considered system boundaries, authorization levels, and failure modes.

A complete use case is not just a diagram; it is supported by a structured tabular specification detailing the Main Success Scenario and Extensions.`,
    coreConcepts: [
      {
        title: 'Primary vs Secondary Actors',
        description: 'A Primary Actor is an entity (human user or external system) that initiates a use case to achieve a direct goal. A Secondary Actor provides a service or receives notifications (e.g. Payment Gateway, SMS Dispatcher, SMTP Server).'
      },
      {
        title: 'The Critical Difference: <<include>> vs <<extend>>',
        description: '<<include>> represents behavior that is mandatory and ALWAYS executed as part of the base use case (e.g. "Checkout" <<includes>> "Validate Payment"). <<extend>> represents optional or conditional behavior that only executes under specific extension points (e.g. "Apply Discount Coupon" <<extends>> "Checkout").'
      },
      {
        title: 'Use Case Specification Anatomy',
        description: 'Must include: 1) Use Case ID and Title, 2) Actor(s), 3) Preconditions (what must be true before starting), 4) Postconditions (what is true upon success), 5) Main Flow (step-by-step happy path), and 6) Alternative/Exception Flows (e.g. network timeout, invalid input).'
      }
    ],
    doAndDont: {
      do: [
        'Name use cases with active verb-noun phrases (e.g. "Generate Audit Report", "Authenticate Student").',
        'Document exception flows for every critical operation.',
        'Keep the system boundary box distinct in your UML diagram.'
      ],
      dont: [
        'Do not confuse data-flow diagrams with use-case diagrams.',
        'Do not draw arrows pointing in the wrong direction for <<include>> and <<extend>> relationships.',
        'Do not create a use case for trivial UI actions like "Click Button" or "Open Dropdown".'
      ]
    },
    supervisorExpectations: [
      'Correct UML 2.0 notation without visual syntax errors.',
      'Full use-case tables for the top 5 core features of your project.',
      'Clear definition of system actors and access permission levels.'
    ],
    quiz: [
      {
        question: 'When should a UML use case relationship be marked as <<extend>> rather than <<include>>?',
        options: [
          'When the sub-behavior is mandatory and runs every single time',
          'When the sub-behavior is optional or triggered only under specific conditional circumstances',
          'When connecting two human actors to each other',
          'When deleting a database record'
        ],
        correctIndex: 1,
        explanation: '<<extend>> denotes optional, conditional behavior that augments the base use case only when certain triggers occur.'
      }
    ]
  },
  {
    id: 'ch-6',
    chapterNumber: 6,
    title: 'Database Architecture & Data Modeling',
    category: 'Architecture',
    readTime: '8 min read',
    summary: 'Entity-Relationship (ER) diagrams, normalization up to 3NF, SQL vs NoSQL trade-offs, and indexing.',
    overview: `More than half of technical viva grillings center around database architecture. External examiners will inspect your database tables, ask why certain columns are duplicated, demand proof of 3rd Normal Form (3NF), and ask how your schema handles concurrent writes or relational integrity.

Understanding relational normalization, primary/foreign key constraints, and indexing is non-negotiable for CS graduates.`,
    coreConcepts: [
      {
        title: 'Normalization Rules (1NF -> 2NF -> 3NF)',
        description: '1NF: Atomic values (no repeating groups or comma-separated lists in a single cell). 2NF: In 1NF and no partial dependencies (every non-key attribute must depend on the whole composite primary key). 3NF: In 2NF and no transitive dependencies (no non-key attribute depends on another non-key attribute).'
      },
      {
        title: 'Relational (SQL) vs Document/Graph (NoSQL) Rationale',
        description: 'Do not use MongoDB just because you learned it in a web dev tutorial. If your data involves financial transactions, relational joins, and strict schema validation, defend PostgreSQL or MySQL using ACID properties. If your data is semi-structured, telemetry-heavy, or horizontally partitioned, justify NoSQL with access pattern analysis.'
      },
      {
        title: 'Database Indexing & Query Optimization',
        description: 'Examiners will ask: "What happens when your table hits 1 million rows?" You must explain B-Tree indexing on foreign keys and search query columns, composite indexes, and preventing N+1 query bottlenecks in your ORM.'
      }
    ],
    doAndDont: {
      do: [
        'Document a complete Data Dictionary with Table Name, Column Name, Data Type, Constraints (PK, FK, Unique, Not Null), and Descriptions.',
        'Enforce referential integrity with CASCADE or RESTRICT foreign key constraints.',
        'Use migration scripts (e.g. Prisma, Flyway, Knex) rather than manually editing tables in phpMyAdmin.'
      ],
      dont: [
        'Never store unhashed plaintext passwords in user tables.',
        'Do not store comma-separated IDs inside a string column to avoid creating junction tables.',
        'Do not claim your database handles unlimited concurrent users without load test metrics.'
      ]
    },
    supervisorExpectations: [
      'A formal Crow’s Foot or Chen notation ER Diagram.',
      'Structured Data Dictionary for all project entities.',
      'Demonstrated understanding of database normalization trade-offs.'
    ],
    quiz: [
      {
        question: 'A table stores Student_ID, Course_ID, Instructor_Name, and Instructor_Office. If Instructor_Office depends on Instructor_Name rather than the student/course key, what normalization violation exists?',
        options: [
          'Violation of First Normal Form (1NF)',
          'Violation of Third Normal Form (3NF) due to a transitive dependency',
          'Violation of Boyce-Codd Normal Form only',
          'No violation; this is optimal database design'
        ],
        correctIndex: 1,
        explanation: 'A non-key attribute depending on another non-key attribute is a classic transitive dependency, violating 3NF.'
      }
    ]
  },
  {
    id: 'ch-7',
    chapterNumber: 7,
    title: 'High-Level Software Architecture & System Design',
    category: 'Architecture',
    readTime: '9 min read',
    summary: 'Monolith vs Microservices, Layered Architecture, API contracts, and Component Diagrams.',
    overview: `Your software architecture represents the high-level structural decisions that are difficult and expensive to change later. A solid architecture provides modularity, separation of concerns, and ease of automated testing.

In academic projects, many students over-engineer by attempting full microservices with Kubernetes for a simple 3-user system, which leads to massive deployment headaches. Examiners respect pragmatic, well-reasoned architectural patterns.`,
    coreConcepts: [
      {
        title: 'Pragmatic Modular Monolith vs Distributed Services',
        description: 'For undergraduate teams, a Modular Monolith or Clean Layered Architecture (Presentation -> Application Service -> Domain -> Infrastructure) is vastly superior to microservices. It eliminates network serialization latency, distributed transactions, and Docker orchestration complexity while maintaining clean code boundaries.'
      },
      {
        title: 'Architectural Style Justification',
        description: 'Be prepared to defend your pattern: MVC (Model-View-Controller), Event-Driven (publish-subscribe for real-time telemetry), or Hexagonal/Clean Architecture (isolating business logic from databases and UI frameworks).'
      },
      {
        title: 'API Contracts and Data Serialization',
        description: 'Document RESTful or GraphQL endpoints using OpenAPI/Swagger specs. Define status codes accurately (200, 201, 400, 401, 403, 404, 500) and establish a consistent JSON error schema.'
      }
    ],
    doAndDont: {
      do: [
        'Draw clear Component Diagrams showing communication protocols (HTTPS, WebSockets, gRPC).',
        'Isolate configuration and secrets using environment variables (.env files).',
        'Implement structured logging and centralized error-handling middleware.'
      ],
      dont: [
        'Do not put SQL queries or database calls directly inside UI components or API route controllers.',
        'Do not build 8 microservices when a single well-structured backend service suffices.',
        'Do not hardcode IP addresses or API keys in the source codebase.'
      ]
    },
    supervisorExpectations: [
      'High-Level Architecture (HLA) diagram in your SRS and Final Report.',
      'Component and Deployment diagrams showing physical or cloud node distribution.',
      'Clear explanation of communication protocols and API design.'
    ],
    quiz: [
      {
        question: 'Why is a clean modular layered architecture generally recommended over microservices for undergraduate FYP teams?',
        options: [
          'Because microservices cannot run on university computers',
          'To avoid distributed failure modes, complex network latency, and orchestration overhead while keeping code modular',
          'Because microservices do not support databases',
          'Because cloud providers forbid students from using containers'
        ],
        correctIndex: 1,
        explanation: 'Microservices introduce heavy operational overhead (distributed tracing, network partitions, container orchestration) that can jeopardize project completion.'
      }
    ]
  },
  {
    id: 'ch-8',
    chapterNumber: 8,
    title: 'Software Testing & Quality Assurance',
    category: 'Testing',
    readTime: '8 min read',
    summary: 'Unit testing, Integration testing, Black-box test cases, Automated CI pipelines, and Code Coverage.',
    overview: `The difference between an average project and an honors-level project almost always lies in Testing and Verification. Weak students show up to defense with zero test cases and say: "We clicked around on the UI and everything worked."

Examiners know that manual clicking is not software engineering. A rigorous FYP includes a formal Test Plan with structured test cases, automated unit tests, and measurable code coverage.`,
    coreConcepts: [
      {
        title: 'The Testing Pyramid in FYP',
        description: 'Unit Tests (broad base: testing isolated business logic functions, validators, and math algorithms), Integration Tests (testing database queries, API endpoints, and authentication middleware), and End-to-End Tests (top: testing critical user checkout or workflow flows).'
      },
      {
        title: 'Anatomy of an Academic Test Case',
        description: 'Every test case in your thesis must follow: Test Case ID, Test Description, Preconditions, Test Steps, Test Input Data, Expected Output, Actual Output, and Status (Pass/Fail).'
      },
      {
        title: 'Boundary Value Analysis & Equivalence Partitioning',
        description: 'Examiners will ask: "How did you test your inputs?" You should explain black-box techniques: testing values at the extreme edges (e.g. age = 0, age = 1, age = 120, age = -1, age = non-numeric string).'
      }
    ],
    doAndDont: {
      do: [
        'Set up automated test runners (e.g. Jest, PyTest, JUnit) with code coverage reports.',
        'Include at least 20 to 30 documented test cases in Chapter 5 of your final report.',
        'Test both positive scenarios (happy path) and negative scenarios (invalid inputs, authorization bypass attempts).'
      ],
      dont: [
        'Never falsify test results by writing "Pass" for features that were never tested or implemented.',
        'Do not skip testing error responses (e.g. database down, expired token, invalid file format upload).',
        'Do not leave automated tests failing when you check into the main Git branch.'
      ]
    },
    supervisorExpectations: [
      'Documented Software Test Plan (STP) and Software Test Report (STR).',
      'Test case execution matrix with reproducible test data.',
      'Demonstrated test suite execution during live defense.'
    ],
    quiz: [
      {
        question: 'If an input field accepts passwords between 8 and 20 characters, which test inputs demonstrate proper Boundary Value Analysis?',
        options: [
          'Lengths 10, 12, and 15 characters',
          'Lengths 7, 8, 20, and 21 characters',
          'Only a length of 100 characters',
          'Testing uppercase letters only'
        ],
        correctIndex: 1,
        explanation: 'Boundary Value Analysis specifically tests the exact thresholds and immediate outer edges (7 just below min, 8 min, 20 max, 21 just above max).'
      }
    ]
  },
  {
    id: 'ch-9',
    chapterNumber: 9,
    title: 'Writing the Final Project Report (Thesis)',
    category: 'Documentation',
    readTime: '10 min read',
    summary: 'The 6-chapter thesis structure, IEEE citation standards, avoiding plagiarism, and formal academic prose.',
    overview: `Your Final Report is the permanent academic document archived in your university library and scrutinized by external examiners before they enter the defense room. A poorly formatted report immediately predisposes examiners to be harsh during the viva.

The standard CS final report consists of 6 core chapters, strict pagination, formal figure/table labeling, and zero tolerance for plagiarism (typically under 15% Turnitin similarity index excluding bibliography).`,
    coreConcepts: [
      {
        title: 'The Standard 6-Chapter Report Structure',
        description: 'Chapter 1: Introduction (Background, Problem, Objectives, Scope). Chapter 2: Literature Review & Related Work (Comparative matrix of existing systems). Chapter 3: Requirements Analysis (SRS, Use Cases, Personas). Chapter 4: System Design & Architecture (HLA, ERD, Sequence diagrams). Chapter 5: Implementation & Testing (Code highlights, Test cases, Benchmarks). Chapter 6: Conclusion & Future Work.'
      },
      {
        title: 'Comparative Literature Review Matrix',
        description: 'Never just summarize 5 papers in isolated paragraphs. Build a Comparative Evaluation Table listing Competitors / Academic Papers along rows, and Evaluation Criteria (Security, Accuracy, Latency, Offline support, Cost) along columns, highlighting the gap your project fills.'
      },
      {
        title: 'Academic Tone & Voice',
        description: 'Write in third-person objective voice. Avoid first-person pronouns ("I made", "we decided", "in our opinion"). Write: "The system was designed...", "The evaluation demonstrates...", "The algorithm achieved...".'
      }
    ],
    doAndDont: {
      do: [
        'Ensure every single figure and table is explicitly referenced in the body text (e.g. "As illustrated in Figure 4.2...").',
        'Use reference management tools (Zotero, Mendeley, or BibTeX) for consistent IEEE formatting.',
        'Run your draft through Turnitin or your university plagiarism checker at least 2 weeks before submission.'
      ],
      dont: [
        'Never copy-paste Wikipedia, ChatGPT output, or fellow students’ reports without attribution.',
        'Do not use low-resolution pixelated screenshots of diagrams—export clean SVG or vector PNGs.',
        'Do not leave orphan headings at the bottom of pages (use proper page-breaks).'
      ]
    },
    supervisorExpectations: [
      'Draft chapters submitted iteratively rather than a giant 120-page dump 3 days before deadline.',
      'Plagiarism report under institutional threshold (usually < 15%).',
      'Compliance with university margin, binding, and preliminary page guidelines (Declaration, Dedication, Abstract).'
    ],
    quiz: [
      {
        question: 'In an academic thesis, what is the best way to present your review of existing literature and rival systems?',
        options: [
          'Copying their marketing landing pages word-for-word',
          'A comparative feature/criteria matrix table highlighting technical gaps and your novel contribution',
          'Saying that all existing systems are completely useless without evidence',
          'Skipping Chapter 2 entirely because the project is too original'
        ],
        correctIndex: 1,
        explanation: 'A comparative matrix systematically evaluates existing solutions against established criteria, scientifically establishing the research or engineering gap.'
      }
    ]
  },
  {
    id: 'ch-10',
    chapterNumber: 10,
    title: 'Creating High-Impact FYP Presentations',
    category: 'Presentation',
    readTime: '7 min read',
    summary: 'Mastering the 15-minute slide deck, visual storytelling, team speaking division, and live demo management.',
    overview: `You typically have only 15 to 20 minutes to present 8 months of exhaustive work to a panel of busy professors and industry evaluators, followed by 10 to 15 minutes of rigorous Q&A.

A successful presentation is not a dump of bullet points. It is a structured narrative that proves you identified a worthwhile problem, built a sound engineering solution, verified it through testing, and achieved measurable results.`,
    coreConcepts: [
      {
        title: 'The Golden 12-Slide FYP Defense Outline',
        description: '1) Title & Team, 2) Problem Statement & Motivation, 3) Objectives & Scope, 4) Related Work & Gap, 5) System Architecture & Tech Stack, 6) Database Design, 7) Core Features (Live Demo Transition), 8) Algorithmic Highlights, 9) Testing & Performance Results, 10) Limitations, 11) Future Work & Conclusion, 12) Q&A Acknowledgments.'
      },
      {
        title: 'The 60-Second Slide Rule & Visual Hierarchy',
        description: 'Allocate roughly 1 to 1.5 minutes per slide. Never put walls of text on slides. Use high-contrast architectural diagrams, workflow charts, and clean metric callouts. Your slides are visual anchors for your speech, not a teleprompter for you to read.'
      },
      {
        title: 'The Live Demo Contingency Strategy',
        description: 'Murphy\'s Law states that anything that can go wrong during a live demo will go wrong (Wi-Fi disconnection, cloud cold-start, API rate limit). Always have: 1) A local offline Docker container or SQLite mock database, and 2) A high-definition 2-minute recorded backup video of the complete walkthrough ready in the presentation directory.'
      }
    ],
    doAndDont: {
      do: [
        'Divide speaking time equally among all team members so the panel sees balanced contribution.',
        'Rehearse the presentation with a timer at least 3 times before the actual defense day.',
        'Keep a laser pointer or clean slide clicker and maintain eye contact with all committee members.'
      ],
      dont: [
        'Never read slides with your back turned to the audience.',
        'Do not spend 8 minutes explaining the background problem and rush through architecture and demo in 2 minutes.',
        'Do not argue or talk over your own team members during questions.'
      ]
    },
    supervisorExpectations: [
      'A rehearsal dry-run in front of the supervisor one week prior to the defense.',
      'Professional attire, synchronized transitions between team speakers, and backup demo media.'
    ],
    quiz: [
      {
        question: 'What is the most critical preparation for safeguarding an FYP live demonstration against technical failures?',
        options: [
          'Hoping that the university campus Wi-Fi does not disconnect',
          'Having an offline local test environment ready plus a pre-recorded HD backup walkthrough video',
          'Refusing to show a demo and only showing screenshots',
          'Asking the examiners to test the code on their own phones'
        ],
        correctIndex: 1,
        explanation: 'Having both an offline-capable local instance and a pre-recorded backup video guarantees you can smoothly showcase the system even if network or cloud services fail.'
      }
    ]
  },
  {
    id: 'ch-11',
    chapterNumber: 11,
    title: 'The Final Defense & Viva Voce Simulator',
    category: 'Defense',
    readTime: '9 min read',
    summary: 'Examiner personality archetypes, common viva trap questions, handling unknown questions, and scoring rubrics.',
    overview: `The Viva Voce (oral examination) is the ultimate defense of your academic integrity and technical competence. The examination committee is tasked with determining whether you genuinely built the project, understand every underlying technology, and possess the analytical acumen expected of a graduate engineer.

Understanding the mindset of different examiner types and knowing how to structure your answers transforms defense anxiety into confident mastery.`,
    coreConcepts: [
      {
        title: 'The Four Examiner Archetypes',
        description: '1) The Strict Technical Architect (probes concurrency, SQL injection, latency, indexing, and design patterns), 2) The Academic Research Professor (scrutinizes literature review, statistical validation, and theoretical algorithms), 3) The Industry Pragmatist (asks about deployment, maintenance costs, security, and realistic user friction), 4) The Scope Challenger (questions why you chose this problem and tests project boundaries).'
      },
      {
        title: 'Classic Viva Trap Questions',
        description: '"Why did you use PostgreSQL instead of MongoDB?", "What happens to your system when 10,000 users click submit simultaneously?", "Show me in the source code where authentication tokens are verified", "What is the biggest technical limitation of your project?"'
      },
      {
        title: 'The Art of the Professional "I Don’t Know"',
        description: 'Never guess or try to bluff an experienced professor—they will instantly catch you. If you don’t know an answer, follow the 3-step pivot: 1) Acknowledge: "That is an important architectural consideration that falls outside our primary scope", 2) Hypothesize logically: "Given our current database schema, a practical approach would likely involve...", 3) Bridge: "We have documented this in Chapter 6 as a prioritized future enhancement."'
      }
    ],
    doAndDont: {
      do: [
        'Have your IDE and source code open with bookmarks to key algorithmic functions and database migrations.',
        'Listen completely to the examiner’s entire question before beginning your response.',
        'Reference your thesis pages directly when answering: "As detailed in Table 4.3 on page 48...".'
      ],
      dont: [
        'Never interrupt an examiner while they are speaking.',
        'Do not blame your teammate: "I don\'t know that part because Ahmed wrote it"—every member must understand the full system.',
        'Do not claim your system has "zero limitations and 100% security"—professors consider this an immediate red flag.'
      ]
    },
    supervisorExpectations: [
      'Calm, professional, and respectful demeanor under intense questioning.',
      'Comprehensive knowledge of the entire project repository by every team member.',
      'Clear articulation of engineering trade-offs.'
    ],
    quiz: [
      {
        question: 'When an examiner asks about a critical technical limitation of your project that you did not implement, what is the best strategy?',
        options: [
          'Claim that your project has no limitations and is completely finished',
          'Blame your supervisor for not telling you to build it',
          'Acknowledge the limitation candidly, explain the engineering trade-off or scope constraint, and discuss how you would architect it in future work',
          'Pretend you cannot hear the examiner'
        ],
        correctIndex: 2,
        explanation: 'Engineering is the science of trade-offs. Candidly acknowledging limitations and articulating a reasoned future enhancement roadmap demonstrates mature engineering judgment.'
      }
    ]
  },
  {
    id: 'ch-12',
    chapterNumber: 12,
    title: 'Open Source, Licensing & Career Transition',
    category: 'Post-FYP',
    readTime: '6 min read',
    summary: 'Publishing your code on GitHub, choosing open-source licenses, portfolio positioning, and converting your FYP into a startup.',
    overview: `Your FYP should not die in a dusty binder after graduation. A well-engineered, cleanly documented Final Year Project is your single most powerful asset for software engineering job interviews, graduate school applications (MS/PhD scholarships), or bootstrapping a SaaS startup.

Packaging your project properly as an open-source repository or portfolio showcase sets you apart from 95% of other graduating candidates.`,
    coreConcepts: [
      {
        title: 'Production-Grade GitHub Repository Packaging',
        description: 'A stellar repository includes: 1) A clean README.md with architecture badge, screenshots, and live demo link, 2) Docker Compose file for one-command local spin-up (docker compose up), 3) Clear API documentation, 4) An explicit LICENSE file, and 5) CONTRIBUTING guidelines.'
      },
      {
        title: 'Choosing the Right Open-Source License',
        description: 'MIT License (permissive, allows anyone to use, modify, and distribute commercially with attribution), Apache 2.0 (permissive plus explicit patent grant protection), GNU GPLv3 (copyleft, ensures derivative works remain open source).'
      },
      {
        title: 'Framing Your FYP in Job Interviews (STAR Method)',
        description: 'Situation (the academic problem context), Task (your specific role and technical challenge), Action (the architecture, algorithms, and tests you engineered), Result (quantitative metrics: latency reduced by 40%, 94% accuracy, 120 automated test cases passing).'
      }
    ],
    doAndDont: {
      do: [
        'Clean up repository history to ensure no API keys or database passwords were committed in git logs.',
        'Pin the repository to your GitHub profile and add video demo walkthroughs in the README.',
        'Write an engineering blog post on Medium or Dev.to explaining a tricky technical bug you solved during development.'
      ],
      dont: [
        'Do not leave your repository with generic commits like "update", "fixed bug", "final final final".',
        'Do not abandon your deployment link—if hosting expires, record an HD video walkthrough.',
        'Do not violate university intellectual property agreements if your project was funded by an industry grant.'
      ]
    },
    supervisorExpectations: [
      'Submission of sanitized repository code and official documentation archives.',
      'Acknowledgement of the university department in any public research papers or open-source releases.'
    ],
    quiz: [
      {
        question: 'Which open-source license allows external developers and companies to use and modify your software commercially while requiring minimal restrictions other than preserving your copyright notice?',
        options: [
          'GNU General Public License v3 (GPLv3)',
          'MIT License',
          'Creative Commons Non-Commercial (CC BY-NC)',
          'Proprietary University Exclusive'
        ],
        correctIndex: 1,
        explanation: 'The MIT License is a short, highly permissive license allowing anyone to use, modify, and distribute the software commercially, provided the original copyright notice is retained.'
      }
    ]
  }
];
