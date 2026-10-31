import { ProjectIdea } from '../types';

export const PROJECT_IDEAS_CATALOG: ProjectIdea[] = [
  {
    id: 'idea-1',
    title: 'MedFlow: Decentralized Triage & Health Record Interoperability System',
    category: 'Full-Stack Web Systems',
    difficulty: 'Intermediate',
    recommendedTeamSize: '2–3 Students',
    problemStatement: 'Emergency departments and regional clinics suffer from fragmented patient medical histories. During transfers, critical allergies, prior medications, and triage vitals are lost or delayed due to incompatible legacy EHR systems, leading to medical errors and redundant diagnostic tests.',
    proposedSolution: 'A zero-knowledge, FHIR (Fast Healthcare Interoperability Resources) compliant triage platform that enables fast QR-based emergency credential exchange, offline-first triage notes, and cryptographically verified patient consent logging.',
    objectives: [
      'Design a FHIR-compliant schema for cross-clinic patient summary exchange.',
      'Implement an automated triage queue scoring system based on Emergency Severity Index (ESI).',
      'Engineer role-based access control (RBAC) with cryptographic audit logging for HIPAA compliance.',
      'Achieve sub-300ms emergency record retrieval using localized cache synchronization.'
    ],
    suggestedFeatures: [
      'Emergency QR-Token generation for instant paramedic vitals check-in',
      'Interactive ESI triage decision tree with automated vital abnormality flags',
      'Cross-clinic referral protocol with digital signature verification',
      'Automated adverse drug interaction alerts based on active prescription lists',
      'Offline-capable progressive web application for field ambulance paramedics'
    ],
    recommendedTechStack: ['React', 'TypeScript', 'Node.js/Express', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    possibleModules: ['Triage Engine', 'EHR Interoperability Service', 'Security & RBAC Service', 'Audit Ledger', 'Emergency Mobile Portal'],
    complexityAnalysis: 'Medium-High. Combines healthcare standard compliance (HL7/FHIR) with high-reliability concurrency and strict security audit requirements.',
    learningRequirements: ['Healthcare data standards (FHIR basics)', 'Database transactions and foreign key constraints', 'Cryptographic signing with Web Crypto API'],
    potentialLimitations: ['Requires mock clinical data generators to adhere to privacy regulations', 'Real-world hospital hardware integration is simulated via REST endpoints'],
    supervisorDefenseTips: 'Emphasize that you implemented actual HL7 FHIR standard resources rather than a trivial custom patient table, and be ready to explain your database transaction isolation level during simultaneous bed allocations.'
  },
  {
    id: 'idea-2',
    title: 'CodeSentry: Automated AST Security Vulnerability & Code Smell Scanner',
    category: 'Systems, Cloud & DevOps',
    difficulty: 'Advanced',
    recommendedTeamSize: '2–3 Students',
    problemStatement: 'Junior developers frequently commit vulnerable code (SQL injection, hardcoded secrets, prototype pollution, unchecked buffer limits) into Git repositories. Existing enterprise static analysis tools are either expensive closed-source or generate overwhelming false positives without explanatory context.',
    proposedSolution: 'A developer-first static analysis engine that parses JavaScript, TypeScript, and Python code into Abstract Syntax Trees (ASTs), executes deterministic taint analysis rules to trace untrusted inputs to dangerous sinks, and generates actionable auto-fix patches.',
    objectives: [
      'Build a language parser interface generating unified AST representations for JS and Python.',
      'Implement control-flow graph (CFG) and taint propagation algorithms to detect OWASP Top 10 vulnerabilities.',
      'Achieve a false-positive rate under 12% across standard benchmark test repositories.',
      'Provide a GitHub Action CI/CD integration that annotates pull requests with code diff fixes.'
    ],
    suggestedFeatures: [
      'Interactive AST visualizer highlighting vulnerable taint propagation paths',
      'Rule creation DSL (Domain-Specific Language) for custom security invariants',
      'Automated AST-level code refactoring and diff generation',
      'Benchmark scanner against standard OWASP Benchmark test suites',
      'Team dashboard displaying vulnerability trends and technical debt metrics'
    ],
    recommendedTechStack: ['TypeScript', 'Rust or Node.js', 'Babel Parser / Tree-sitter', 'React', 'Tailwind CSS', 'Docker'],
    possibleModules: ['Parser & AST Normalizer', 'Taint Analysis Engine', 'Rule Registry', 'CLI & GitHub Action', 'Visual Dashboard'],
    complexityAnalysis: 'High. Involves compiler principles, control-flow graph traversal, and recursive tree walking algorithms.',
    learningRequirements: ['Compiler theory and AST node traversal', 'Static code analysis and taint tracking', 'GitHub Actions workflow integration'],
    potentialLimitations: ['Dynamic code evaluation (eval / reflection) cannot be statically verified 100%', 'Execution time can scale on massive monorepos'],
    supervisorDefenseTips: 'Demonstrate the exact difference between naive regex matching and true AST-based taint analysis to prove why regex scanners fail on variable aliasing.'
  },
  {
    id: 'idea-3',
    title: 'AgriPulse: Edge-AI Crop Disease Diagnostician with Offline Telemetry',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    recommendedTeamSize: '2–3 Students',
    problemStatement: 'Smallholder farmers in rural regions experience 20–40% seasonal crop loss due to late detection of fungal and viral leaf diseases. Agricultural extension officers are scarce, and rural areas have poor or non-existent internet connectivity, rendering cloud-dependent AI tools unusable in the field.',
    proposedSolution: 'An offline-first mobile and edge application running a quantized, optimized computer vision model (MobileNetV3 / EfficientNet-Lite) capable of diagnosing 30+ crop foliar diseases in real-time, providing treatment recommendations and micro-climate soil sensor telemetry.',
    objectives: [
      'Train and quantize (INT8) a deep convolutional neural network achieving >=92% top-1 accuracy on PlantVillage benchmarks.',
      'Deploy the model directly on device with sub-100ms inference latency without internet connectivity.',
      'Integrate Bluetooth/LoRa telemetry ingestion from low-cost soil moisture and temperature sensors.',
      'Provide multilingual audio and visual advisory instructions for low-literacy farmers.'
    ],
    suggestedFeatures: [
      'Real-time camera bounding-box disease detection with confidence score',
      'Localized treatment recipes using affordable organic and chemical solutions',
      'Offline sync queue that uploads geotagged infection hot-spots once cellular data is detected',
      'Disease spread forecast map for regional agricultural extension workers',
      'Sensor telemetry dashboard displaying soil humidity, ambient temperature, and irrigation triggers'
    ],
    recommendedTechStack: ['Python/PyTorch', 'TensorFlow Lite', 'React/Capacitor or Flutter', 'FastAPI', 'PostgreSQL/PostGIS'],
    possibleModules: ['Model Training & Quantization', 'Mobile Inference Engine', 'Offline Sync Manager', 'Geo-Epidemic Mapping', 'Sensor Ingestion API'],
    complexityAnalysis: 'Medium-High. Combines computer vision model optimization (quantization, pruning) with mobile edge deployment and offline-first data sync.',
    learningRequirements: ['Convolutional Neural Networks and Transfer Learning', 'Model Quantization (TFLite / ONNX Runtime)', 'Mobile device camera pipelines'],
    potentialLimitations: ['Lighting variations and lens dirt in real fields can reduce accuracy compared to laboratory datasets', 'Edge device battery consumption during sustained camera streaming'],
    supervisorDefenseTips: 'Prepare a test confusion matrix comparing the FP32 model vs the INT8 quantized model showing that memory footprint was reduced by 75% with less than 1.5% drop in accuracy.'
  },
  {
    id: 'idea-4',
    title: 'VeriVote: Cryptographically Verifiable Remote Student Council Voting Protocol',
    category: 'Cyber Security & Cryptography',
    difficulty: 'Advanced',
    recommendedTeamSize: '2 Students',
    problemStatement: 'Campus student elections and academic committee referendums suffer from low voter turnout and persistent distrust in electronic voting systems. Closed-source portals can alter vote tallies or link ballots to student identities, violating secret ballot principles.',
    proposedSolution: 'An end-to-end verifiable (E2E-V) electronic voting protocol utilizing ElGamal homomorphic encryption, zero-knowledge proofs (ZKP), and a public bulletin board ledger that allows voters to independently verify their vote was counted without revealing who they voted for.',
    objectives: [
      'Implement an ElGamal homomorphic encryption scheme enabling ballot aggregation without decrypting individual votes.',
      'Generate Schnorr zero-knowledge proofs ensuring each encrypted ballot contains a valid option (0 or 1).',
      'Provide an individual verification portal where students check their cryptographic tracking hash on the public bulletin board.',
      'Implement threshold decryption requiring a quorum of 3 out of 5 election trustees to reveal the final tally.'
    ],
    suggestedFeatures: [
      'Cryptographic ballot receipt generator with downloadable verification tracker',
      'Public append-only bulletin board with Merkle tree integrity proofs',
      'Trustee key generation and threshold ceremony interface',
      'Real-time cryptographic audit verification script runnable in browser or command line',
      'Student identity authentication via university email with blind token issuance'
    ],
    recommendedTechStack: ['TypeScript', 'Rust / WebAssembly', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    possibleModules: ['Cryptographic Core (ZKP & Homomorphic Ops)', 'Ballot Box & Verification Board', 'Trustee Ceremony Portal', 'Admin & Eligibility Service'],
    complexityAnalysis: 'High. Deep applied cryptography, zero-knowledge proofs, and threshold cryptography mathematics.',
    learningRequirements: ['Public key cryptography and ElGamal homomorphic properties', 'Zero-knowledge proofs of knowledge', 'Merkle trees for data integrity'],
    potentialLimitations: ['Voter coercion cannot be 100% prevented in remote environments without formal in-person voting booths', 'Cryptographic terminology requires intuitive UI explanations for non-technical students'],
    supervisorDefenseTips: 'Clearly articulate the distinction between "cast-as-intended" and "counted-as-recorded" verifiability, and demonstrate the mathematical proof of homomorphic ballot addition.'
  },
  {
    id: 'idea-5',
    title: 'CloudCostIQ: FinOps Automated Kubernetes Cost Optimization & Right-Sizing Platform',
    category: 'Systems, Cloud & DevOps',
    difficulty: 'Intermediate',
    recommendedTeamSize: '2–3 Students',
    problemStatement: 'Startups and engineering departments over-provision cloud compute resources by 35–50% because developers request excessive CPU and RAM limits to prevent crashes. This leads to thousands of dollars in wasted cloud bills each month with zero visibility into container resource efficiency.',
    proposedSolution: 'An automated FinOps optimization agent that monitors Prometheus metrics from container workloads, analyzes historical percentile utilization patterns, and computes optimal CPU/Memory resource recommendations and autoscaling configurations.',
    objectives: [
      'Ingest real-time container CPU, Memory, and Network telemetry from Prometheus or simulated metric collectors.',
      'Implement a percentile-based recommendation algorithm (e.g. 95th percentile peak + safety margin) to generate right-sizing recommendations.',
      'Calculate precise dollar cost projections mapped to AWS/GCP pricing tiers.',
      'Generate automated pull requests or Kubernetes YAML manifests with optimized resource limits.'
    ],
    suggestedFeatures: [
      'Interactive cost breakdown dashboard by namespace, deployment, and service',
      'Before-and-after cost savings simulator with monthly projection curves',
      'One-click YAML patch generator for Kubernetes deployments',
      'Idle container and unattached persistent storage detector',
      'Slack/Webhook automated alert triggers for anomalous cost spikes'
    ],
    recommendedTechStack: ['Go or Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Prometheus client', 'Tailwind CSS', 'Docker'],
    possibleModules: ['Telemetry Ingestion Pipeline', 'Cost Calculation & Modeling Engine', 'Right-Sizing Recommender', 'Manifest Generator', 'Dashboard UI'],
    complexityAnalysis: 'Medium-High. Involves time-series telemetry analysis, distributed systems cost modeling, and clean DevOps tooling integration.',
    learningRequirements: ['Prometheus metric queries (PromQL)', 'Container resource allocation concepts (requests vs limits)', 'Time-series aggregation algorithms'],
    potentialLimitations: ['Spike-prone workloads require conservative buffer thresholds to prevent out-of-memory (OOM) kills', 'Simulated cluster data must be generated for demonstrations if live cloud clusters are budget-constrained'],
    supervisorDefenseTips: 'Show your mathematical formula for calculating the safety headroom buffer and explain how your tool distinguishes between transient CPU spikes and genuine baseline workload growth.'
  },
  {
    id: 'idea-6',
    title: 'NeuroScreen: Multi-Modal Early Parkinson’s & Neurological Motor Screening App',
    category: 'AI & Machine Learning',
    difficulty: 'Advanced',
    recommendedTeamSize: '3 Students',
    problemStatement: 'Early neurological disorders like Parkinson’s disease develop subtle kinetic and vocal symptoms (micrographia, resting hand tremors, voice dysphonia) years before clinical diagnosis. Early detection can slow motor deterioration, yet clinical specialized tests are inaccessible or expensive for everyday checkups.',
    proposedSolution: 'A multi-modal smartphone and tablet screening application that conducts standardized non-invasive neuromotor tests: 1) Spiral and wave touchscreen drawing kinematic velocity analysis, 2) Gyroscope resting tremor frequency FFT analysis, and 3) Acoustic voice jitter/shimmer signal processing.',
    objectives: [
      'Extract kinematic features (velocity variations, pressure hesitation, stroke jerkiness) from spiral drawing tasks.',
      'Perform Fast Fourier Transform (FFT) on device accelerometer/gyroscope signals to isolate the characteristic 4–6 Hz Parkinsonian tremor band.',
      'Extract acoustic speech markers (jitter, shimmer, fundamental frequency variation) from sustained vowel vocalizations.',
      'Train an ensemble classifier synthesizing multi-modal signals into an interpretable risk stratification score.'
    ],
    suggestedFeatures: [
      'Guided digital drawing tests (Archimedes spiral, meander wave) with micro-velocity logging',
      '15-second phone-in-hand resting tremor sensor test with real-time frequency spectrum display',
      'Vocal biomarker recorder with voice frequency stability graph',
      'Longitudinal patient progression tracker showing motor stability trends over time',
      'Exportable clinical summary PDF designed for neurologist consultation'
    ],
    recommendedTechStack: ['Python (SciPy, Librosa, Scikit-learn)', 'React Native / Flutter / Web Audio API', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    possibleModules: ['Kinematic Touch Analyzer', 'Sensor Signal Processing (FFT)', 'Audio Feature Extractor', 'Risk Classifier Ensemble', 'Clinical Reporting UI'],
    complexityAnalysis: 'High. Involves digital signal processing (DSP), Fast Fourier Transforms, feature engineering, and responsible medical disclaimer boundaries.',
    learningRequirements: ['Digital Signal Processing basics (FFT, filtering, windowing)', 'Feature extraction from time-series and audio data', 'Responsible AI evaluation metrics (Sensitivity, Specificity, ROC-AUC)'],
    potentialLimitations: ['Must be positioned strictly as an academic screening risk indicator, NOT a definitive medical diagnostic tool', 'Touchscreen sampling rate variability across different consumer mobile hardware'],
    supervisorDefenseTips: 'Highlight your sensitivity vs specificity trade-offs, explain why false negatives are far more dangerous in health screening, and emphasize that the tool assists doctors rather than replacing clinical diagnosis.'
  },
  {
    id: 'idea-7',
    title: 'LogiChain: Real-Time Fleet Route Optimization & Cold-Chain Telemetry Hub',
    category: 'Full-Stack Web Systems',
    difficulty: 'Intermediate',
    recommendedTeamSize: '2–3 Students',
    problemStatement: 'Logistics and delivery fleets suffer from inefficient vehicle routing that increases fuel consumption by 22%, combined with unmonitored temperature breaches in perishable goods transport that spoil pharmaceuticals and food inventory before delivery.',
    proposedSolution: 'A unified fleet dispatcher dashboard integrating Vehicle Routing Problem (VRP) heuristic solvers with real-time simulated IoT temperature/humidity telemetry, dynamic re-routing upon traffic congestion, and proof-of-delivery verification.',
    objectives: [
      'Implement a Vehicle Routing Problem with Time Windows (VRPTW) solver using genetic algorithms or Clark-Wright savings heuristics.',
      'Simulate real-time GPS and sensor telemetry ingestion via WebSockets with sub-second dashboard rendering.',
      'Trigger automated dispatch alerts when cargo ambient temperature exceeds perishable thresholds (+/- 2C to 8C).',
      'Generate dynamic route adjustments when delivery stops are added or canceled mid-transit.'
    ],
    suggestedFeatures: [
      'Interactive vector map showing real-time delivery trucks, routes, and waypoints',
      'Automated multi-vehicle route optimization considering vehicle capacity and time windows',
      'Cold-chain temperature timeline graph with automatic violation flags',
      'Driver mobile portal for step-by-step route navigation and digital signature proof of delivery',
      'Analytics suite reporting fuel savings, on-time delivery percentages, and carbon footprint reduction'
    ],
    recommendedTechStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL / PostGIS', 'Socket.IO / WebSockets', 'Leaflet / OpenStreetMap', 'Tailwind CSS'],
    possibleModules: ['Route Optimization Algorithm Service', 'IoT Telemetry Stream Handler', 'Dispatcher Dashboard', 'Driver Mobile PWA', 'Reporting & Analytics'],
    complexityAnalysis: 'Medium-High. Combines NP-hard combinatorial optimization algorithms with live bidirectional WebSocket telemetry and geospatial mapping.',
    learningRequirements: ['Combinatorial optimization heuristics (Genetic Algorithms / Simulated Annealing)', 'Geospatial queries with PostGIS or turf.js', 'WebSocket concurrency and event streaming'],
    potentialLimitations: ['Traffic simulation is based on synthetic speed-matrices or open routing APIs with rate caps', 'Edge IoT sensors are simulated via background telemetry generators'],
    supervisorDefenseTips: 'Be ready to defend your choice of heuristic over an exact algorithm (like Branch-and-Bound), proving that an exact solver takes exponential time on 20+ delivery stops.'
  },
  {
    id: 'idea-8',
    title: 'QueryLens: Natural Language to SQL Pipeline with Schema-Grounded Validation',
    category: 'Data Engineering & Big Data',
    difficulty: 'Intermediate',
    recommendedTeamSize: '2 Students',
    problemStatement: 'Non-technical business stakeholders and researchers struggle to query relational databases because they lack SQL expertise. Generic LLM code generators often hallucinate non-existent table columns, produce unsafe DROP/UPDATE queries, or execute inefficient full-table cross joins.',
    proposedSolution: 'A schema-grounded Natural Language to SQL converter that parses relational database schemas, validates generated queries against strict AST syntax trees, executes dry-run explain plans, and presents visual results with interactive charts.',
    objectives: [
      'Extract and tokenize foreign key relationships and column data dictionaries from live database schemas.',
      'Construct prompt schemas enforcing safe read-only (SELECT) SQL queries.',
      'Build a SQL AST validation layer preventing SQL injection and forbidden destructive statements (DROP, TRUNCATE, ALTER).',
      'Execute query benchmarking and visualize tabular results into auto-selected charts (bar, line, scatter).'
    ],
    suggestedFeatures: [
      'Interactive schema explorer and connection tester for PostgreSQL / MySQL',
      'Natural language query input with instant SQL translation and syntax highlighting',
      'Dry-run Query Execution Plan (EXPLAIN ANALYZE) performance estimator',
      'Auto-visualization engine that detects temporal vs categorical data to render suitable charts',
      'Audit log and query history with natural language explanation of what the SQL query actually does'
    ],
    recommendedTechStack: ['React', 'TypeScript', 'Node.js/Express', 'PostgreSQL', 'SQL-Parser (AST)', 'Tailwind CSS', 'Chart.js / Recharts'],
    possibleModules: ['Schema Extraction Engine', 'Prompt & LLM Grounding Service', 'SQL AST Validator & Sanitizer', 'Query Execution Engine', 'Data Visualization UI'],
    complexityAnalysis: 'Medium. Strong focus on database semantics, query security sandboxing, and data visualization.',
    learningRequirements: ['Database information schema and metadata extraction', 'SQL Abstract Syntax Tree parsing and validation', 'Client-side chart visualization logic'],
    potentialLimitations: ['Highly complex nested recursive queries on non-normalized schemas can occasionally produce sub-optimal joins', 'Requires read-only credentials for safe execution'],
    supervisorDefenseTips: 'Demonstrate how your AST validator catches destructive queries (like DROP TABLE) even if the user deliberately tries prompt injection tricks.'
  }
];
