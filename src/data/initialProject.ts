import { Project } from '../types';

export const INITIAL_PROJECT: Project = {
  id: 'proj-medflow-01',
  title: 'MedFlow: Decentralized Triage & Health Record Interoperability System',
  tagline: 'Fast HL7/FHIR-compliant patient triage routing with cryptographically auditable consent logging.',
  category: 'Full-Stack Web Systems',
  difficulty: 'Intermediate',
  currentPhase: '3. SRS & Architecture',
  problemStatement: 'Emergency departments and regional clinics suffer from fragmented patient medical histories. During transfers, critical allergies, prior medications, and triage vitals are lost or delayed due to incompatible legacy EHR systems, leading to delayed medical interventions and redundant diagnostic tests.',
  proposedSolution: 'A zero-knowledge, FHIR (Fast Healthcare Interoperability Resources) compliant triage platform enabling quick QR-based emergency credential exchange, offline-first triage notes, and cryptographically verified patient consent audit trails.',
  objectives: [
    'Design an HL7 FHIR-compliant schema for cross-clinic emergency patient summary exchange.',
    'Implement an automated triage queue scoring system based on the Emergency Severity Index (ESI).',
    'Engineer role-based access control (RBAC) with cryptographic audit logging for HIPAA compliance.',
    'Achieve sub-300ms emergency record retrieval using localized cache synchronization.'
  ],
  coreFeatures: [
    'Emergency QR-Token generation for instant paramedic vitals check-in',
    'Interactive ESI triage decision tree with automated vital abnormality flags',
    'Cross-clinic referral protocol with digital signature verification',
    'Automated adverse drug interaction alerts based on active prescription lists',
    'Offline-capable progressive web application for field ambulance paramedics'
  ],
  stretchFeatures: [
    'Voice-dictated paramedic triage notes with automated vital extraction',
    'Predictive bed occupancy forecasting using exponential smoothing',
    'FHIR-to-JSON-LD semantic interoperability converter'
  ],
  techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
  teamMembers: [
    {
      id: 'mem-1',
      name: 'Ayesha Khan',
      role: 'Team Lead & Backend Architect',
      email: 'ayesha.cs@university.edu',
      avatar: '/src/assets/images/avatar_student_lead_1793475035344.jpg'
    },
    {
      id: 'mem-2',
      name: 'Bilal Ahmed',
      role: 'Frontend & UI/UX Engineer',
      email: 'bilal.se@university.edu'
    },
    {
      id: 'mem-3',
      name: 'Zainab Tariq',
      role: 'Database & QA Engineer',
      email: 'zainab.cs@university.edu'
    }
  ],
  milestones: [
    {
      id: 'ms-1',
      title: 'Problem Definition & Topic Approval',
      phase: 'Semester 1 (FYP-I)',
      targetDate: '2026-09-15',
      completed: true,
      deliverable: 'Approved 2-page Concept Paper & Supervisor Sign-off'
    },
    {
      id: 'ms-2',
      title: 'Literature Review & Proposal Defense',
      phase: 'Semester 1 (FYP-I)',
      targetDate: '2026-10-20',
      completed: true,
      deliverable: '15-page Formal Proposal Document & Slide Deck'
    },
    {
      id: 'ms-3',
      title: 'SRS Document & Architectural Design',
      phase: 'Semester 1 (FYP-I)',
      targetDate: '2026-11-28',
      completed: false,
      deliverable: 'IEEE 830 SRS, ERD, HLA & Component Diagrams'
    },
    {
      id: 'ms-4',
      title: 'Sprint 1: Core Triage Engine & FHIR Protocol',
      phase: 'Semester 2 (FYP-II)',
      targetDate: '2027-01-20',
      completed: false,
      deliverable: 'Working API endpoints, Database schema migrations, and Auth'
    },
    {
      id: 'ms-5',
      title: 'Sprint 2: Paramedic PWA & Automated Drug Check',
      phase: 'Semester 2 (FYP-II)',
      targetDate: '2027-03-10',
      completed: false,
      deliverable: 'Offline PWA with QR scanning and ESI priority scoring'
    },
    {
      id: 'ms-6',
      title: 'Quality Assurance & Automated Test Suite',
      phase: 'Semester 2 (FYP-II)',
      targetDate: '2027-04-15',
      completed: false,
      deliverable: '40+ automated test cases with >=80% coverage and load test report'
    },
    {
      id: 'ms-7',
      title: 'Final Thesis Report & External Panel Viva',
      phase: 'Semester 2 (FYP-II)',
      targetDate: '2027-05-25',
      completed: false,
      deliverable: 'Bound Hardcover Thesis, Turnitin Report (<12%), and Defense Viva'
    }
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Normalize PostgreSQL schema for FHIR Patient and Observation resources',
      description: 'Ensure 3NF normalization, define foreign key cascades, and create B-Tree indexes on patient_mrn and triage_timestamp.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'Zainab Tariq',
      dueDate: '2026-11-15',
      tags: ['Database', 'PostgreSQL', 'Architecture'],
      moduleName: 'Database Architecture'
    },
    {
      id: 'task-2',
      title: 'Implement ESI (Emergency Severity Index) triage algorithmic scoring function',
      description: 'Algorithm takes pulse, SpO2, systolic BP, pain score, and chief complaints to output ESI Level 1 to 5.',
      status: 'todo',
      priority: 'critical',
      assignee: 'Ayesha Khan',
      dueDate: '2026-11-20',
      tags: ['Algorithm', 'Backend', 'Triage'],
      moduleName: 'Triage Engine'
    },
    {
      id: 'task-3',
      title: 'Design interactive high-fidelity wireframes for Paramedic Quick Intake',
      description: 'Mobile-first layout optimized for tablet gloved hands in ambulance environments.',
      status: 'done',
      priority: 'medium',
      assignee: 'Bilal Ahmed',
      dueDate: '2026-10-30',
      tags: ['UI/UX', 'Design', 'Frontend'],
      moduleName: 'Paramedic Portal'
    },
    {
      id: 'task-4',
      title: 'Write IEEE 830 compliant Non-Functional Requirements section in SRS',
      description: 'Define exact latency (<300ms), uptime (99.5%), and cryptographic security standards (Argon2id + AES-256).',
      status: 'review',
      priority: 'high',
      assignee: 'Ayesha Khan',
      dueDate: '2026-11-10',
      tags: ['Documentation', 'SRS'],
      moduleName: 'Documentation Studio'
    },
    {
      id: 'task-5',
      title: 'Conduct comparative literature survey of legacy HL7 v2 vs modern FHIR REST APIs',
      description: 'Create summary comparison table for Chapter 2 of final project thesis.',
      status: 'done',
      priority: 'medium',
      assignee: 'Zainab Tariq',
      dueDate: '2026-10-18',
      tags: ['Research', 'Thesis'],
      moduleName: 'Literature Review'
    },
    {
      id: 'task-6',
      title: 'Configure Jest and Supertest automated API test runner in GitHub Actions',
      description: 'Automate unit tests on pull requests to prevent regressions in triage calculation logic.',
      status: 'backlog',
      priority: 'medium',
      assignee: 'Ayesha Khan',
      dueDate: '2026-12-05',
      tags: ['DevOps', 'CI/CD', 'Testing'],
      moduleName: 'QA & Testing'
    }
  ],
  notes: [
    {
      id: 'note-1',
      title: 'Supervisor Meeting Feedback (Dr. Arthur Chen - Oct 22)',
      category: 'Supervisor Meeting',
      content: `Meeting Summary:
1. Dr. Chen approved the shift to FHIR JSON standards instead of inventing a custom XML dialect.
2. Crucial feedback: Make sure we explicitly state in Chapter 1 that MedFlow handles Emergency Triage handoffs, NOT whole-hospital billing. This keeps our scope bounded and defensible.
3. Next meeting deadline: Bring complete ER diagram with Crow's foot notation and the first draft of Use Case specifications.`,
      updatedAt: '2026-10-22'
    },
    {
      id: 'note-2',
      title: 'Key Academic Literature References',
      category: 'Literature Review',
      content: `1. Mandel, J. C., et al. (2016). "SMART on FHIR: a standards-based, interoperable apps platform for electronic health records." JAMIA, 23(5), 899-908.
2. Gilboy, N., et al. (2020). "Emergency Severity Index (ESI): A Triage Tool for Emergency Department Care, Version 5." AHRQ Publication No. 20-0039.
3. Note to self: Use the ESI v5 algorithm weighting table for our scoring matrix in Chapter 3.`,
      updatedAt: '2026-10-25'
    }
  ],
  documents: [
    {
      id: 'doc-proposal',
      type: 'proposal',
      title: 'Project Proposal Document',
      description: 'Formal academic proposal defining problem statement, research gap, objectives, methodology, and Gantt timeline.',
      content: `# FINAL YEAR PROJECT PROPOSAL
## MedFlow: Decentralized Triage & Health Record Interoperability System

**Degree:** Bachelor of Science in Software Engineering  
**Department:** Department of Computer Science & Software Engineering  
**Academic Year:** 2026–2027  
**Supervisor:** Dr. Arthur Chen, Professor of Software Systems  

---

### 1. Introduction and Background
In modern emergency healthcare, patient survivability often correlates with the speed and accuracy of initial clinical triage. When patients are transferred between first-responder ambulances, community clinics, and tertiary trauma centers, their longitudinal medical histories are rarely accessible in real-time. Fragmented electronic health records (EHRs) lead to diagnostic delays, repeated imaging, and preventable adverse drug events.

### 2. Problem Statement
Emergency response teams currently lack a lightweight, secure, and standardized protocol to securely pull a patient's critical medical summary (blood type, allergies, current cardiac medications) within the golden hour of admission. Proprietary hospital systems enforce walled-garden databases that do not interoperate, creating an information gap that endangers critical patients.

### 3. Project Objectives
1. Design an open HL7/FHIR-compliant patient emergency record schema.
2. Implement an automated Emergency Severity Index (ESI Level 1-5) clinical priority calculator.
3. Engineer a decentralized cryptographic audit ledger for patient consent verification.
4. Build an offline-first mobile paramedic intake interface with QR-based transfer.

### 4. Proposed Methodology
This project adopts an Agile Scrum development methodology spanning 6 two-week sprints across FYP-I and FYP-II. Architectural models will adhere to UML 2.0 standards, and the software will be verified using continuous integration with unit, integration, and black-box boundary tests.

### 5. Project Scope & Boundaries
- **In-Scope:** Emergency department triage, allergy alert checking, paramedic handoff summaries, FHIR JSON ingestion.
- **Out-of-Scope:** Long-term hospital billing, inpatient bed laundry logistics, and direct diagnostic radiology imaging pipelines.`,
      lastUpdated: '2026-10-22',
      isReadyForSupervisor: true
    },
    {
      id: 'doc-abstract',
      type: 'abstract',
      title: 'Executive Abstract & Summary',
      description: 'Concise 250-word synthesis of problem, methodology, engineered solution, and quantitative benchmark results.',
      content: `### ABSTRACT

Interoperability barriers between disparate Electronic Health Record (EHR) systems contribute significantly to delayed patient triage and medical errors during emergency inter-facility transfers. This project introduces **MedFlow**, an open-source, standards-based healthcare interoperability and emergency triage platform built upon Fast Healthcare Interoperability Resources (HL7 FHIR) specifications. 

MedFlow addresses fragmented clinical communication by pairing an automated Emergency Severity Index (ESI) clinical decision matrix with an offline-first Progressive Web Application designed for first-responder paramedic teams. To preserve patient confidentiality without compromising life-saving speed, the system incorporates localized cryptographic tokens that allow authenticated medical personnel to retrieve verified allergy and medication histories in under 300 milliseconds. 

The system architecture employs a modular layered design with PostgreSQL for ACID-compliant structured clinical summaries and Redis for low-latency triage queue coordination. Empirical evaluation demonstrated 99.4% conformance with FHIR standard schemas and reduced patient intake documentation time from an average of 8.2 minutes to 1.8 minutes in simulated paramedic handoff trials. MedFlow proves that standards-compliant, lightweight interoperability can be achieved using modern web engineering principles without expensive proprietary vendor infrastructure.

**Keywords:** Healthcare Interoperability, HL7 FHIR, Emergency Severity Index, Clinical Decision Support, Cryptographic Consent, Software Engineering Capstone.`,
      lastUpdated: '2026-10-24',
      isReadyForSupervisor: true
    },
    {
      id: 'doc-srs',
      type: 'srs',
      title: 'Software Requirements Specification (SRS)',
      description: 'Formal IEEE 830 standard requirements specification detailing functional modules, non-functional constraints, and system actors.',
      content: `# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## MedFlow System — IEEE 830 Compliant Specification

### 1. Overall Description
#### 1.1 Product Perspective
MedFlow operates as an independent, lightweight middleware service bridging emergency paramedic intake with tertiary hospital triage wards via standard RESTful HL7 FHIR endpoints.

#### 1.2 User Classes and Characteristics
- **Triage Nurse:** Evaluates incoming patients, records initial vitals, overrides automated ESI scores when clinically warranted.
- **Emergency Paramedic:** Field user; requires high-contrast, one-thumb mobile UI capable of offline data caching.
- **Attending Emergency Physician:** Reviews synthesized patient summaries, active drug warnings, and validates admission orders.
- **Hospital System Administrator:** Manages cryptographic keys, user roles, and HIPAA compliance audit logs.

### 2. Functional Requirements

#### 2.1 Patient Identification & Ingestion (FR-PAT)
- **FR-PAT-01:** The system SHALL ingest patient demographic and allergy records formatted according to the FHIR JSON schema.
- **FR-PAT-02:** The system SHALL generate a unique, cryptographically signed 64-character QR token encoding the patient's temporary emergency session ID.
- **FR-PAT-03:** When an unknown unconscious patient arrives, the system SHALL generate a temporary anonymous Trauma Identifier linked to subsequent vitals until identity verification is completed.

#### 2.2 Triage Scoring Algorithm (FR-TRG)
- **FR-TRG-01:** The system SHALL compute an Emergency Severity Index (ESI) score between Level 1 (Resuscitation) and Level 5 (Non-urgent) based on entered physiological vitals.
- **FR-TRG-02:** If a patient's SpO2 falls below 90% or systolic blood pressure falls below 80 mmHg, the system SHALL automatically flag the record with a high-priority audible and visual alert.
- **FR-TRG-03:** The triage nurse SHALL have the ability to manually override the automated ESI score, provided a mandatory text clinical rationale is entered.

#### 2.3 Adverse Drug Interaction Checker (FR-DRG)
- **FR-DRG-01:** Upon entry of an emergency medication order, the system SHALL cross-reference the active allergy list and trigger an immediate warning if an anaphylactic interaction is detected.

### 3. Non-Functional Requirements (NFR)
- **NFR-PERF-01 (Latency):** 95% of emergency patient profile queries SHALL return within 300 milliseconds under a concurrent load of 150 requests per second.
- **NFR-SEC-01 (Encryption):** All data in transit SHALL be encrypted using TLS 1.3. All patient records at rest SHALL be encrypted using AES-256.
- **NFR-REL-01 (Availability):** The core triage queue service SHALL achieve a minimum of 99.8% uptime during the evaluation benchmarking phase.
- **NFR-USAB-01 (Accessibility):** The mobile paramedic interface SHALL conform to WCAG 2.1 Level AA standards with high-contrast night mode support.`,
      lastUpdated: '2026-10-26',
      isReadyForSupervisor: false
    },
    {
      id: 'doc-usecases',
      type: 'use_cases',
      title: 'Use Case Specifications & Scenarios',
      description: 'Detailed behavioral use case tables with actors, preconditions, postconditions, main success scenarios, and alternative paths.',
      content: `# USE CASE SPECIFICATIONS

## UC-01: Paramedic Field Triage Handoff
- **Primary Actor:** Paramedic
- **Secondary Actor:** Triage Nurse, Emergency Ward Gateway
- **Preconditions:** Paramedic is authenticated on the mobile PWA; patient vitals have been captured in the field.
- **Postconditions:** Patient record is enqueued in the hospital's live triage dashboard with assigned ESI score.

### Main Success Scenario:
1. Paramedic selects "New Emergency Intake" on mobile interface.
2. Paramedic scans patient emergency health card QR or inputs national ID / temporary trauma tag.
3. System retrieves verified allergy and current medication list from localized cache.
4. Paramedic enters current vitals: Heart Rate (110 bpm), Blood Pressure (130/85), SpO2 (96%), GCS (15).
5. System computes automated ESI score (Level 3 - Urgent).
6. Paramedic confirms handoff and taps "Dispatch to Hospital Ward".
7. System transmits encrypted payload to hospital gateway and displays "Handoff Enroute" confirmation.

### Alternative Flows:
- **3a. Network Connectivity Unavailable (Offline Mode):**
  - System caches vitals payload in IndexedDB on the device.
  - System generates an offline QR code displayable on the paramedic screen for physical scanner reading at the hospital bay.
  - System automatically syncs with central database as soon as network reconnection is detected.
- **5a. Vital Abnormality Detected (ESI Level 1 Trigger):**
  - Patient SpO2 is below 85%.
  - System automatically overrides score to ESI Level 1 (Immediate Resuscitation) and triggers urgent siren notification at the receiving hospital console.`,
      lastUpdated: '2026-10-27',
      isReadyForSupervisor: false
    },
    {
      id: 'doc-architecture',
      type: 'architecture',
      title: 'System Architecture & High-Level Design',
      description: 'System architectural patterns, module decomposition, layer boundaries, and deployment topology.',
      content: `# SYSTEM ARCHITECTURE & HIGH-LEVEL DESIGN (HLD)

### 1. Architectural Style
MedFlow follows a **Layered Modular Architecture** with clean domain separation. Rather than splitting into complex microservices prematurely, the system uses a high-performance modular monolith with asynchronous background workers for audit logging and notification dispatching.

\`\`\`
+-------------------------------------------------------+
|                 PRESENTATION LAYER                    |
|   React SPA (Hospital Console)  |  Mobile PWA (Field)  |
+-------------------------------------------------------+
                           |  HTTPS / WebSocket
+-------------------------------------------------------+
|                 API GATEWAY & AUTH                    |
|       JWT Authentication  |  Rate Limiting (Token)    |
+-------------------------------------------------------+
                           |
+-------------------------------------------------------+
|                 APPLICATION CORE                      |
|  [Triage Engine]  [FHIR Converter]  [Drug Alert Engine]|
+-------------------------------------------------------+
                           |
+-------------------------------------------------------+
|                 DATA & PERSISTENCE                    |
|   PostgreSQL (ACID EHR Data) | Redis (Realtime Queue) |
+-------------------------------------------------------+
\`\`\`

### 2. Module Boundaries
1. **Auth & Identity Module:** Manages role-based access tokens (RBAC) and bcrypt password hashing.
2. **FHIR Translation Engine:** Serializes internal data models to standard HL7 FHIR JSON resources (Patient, Condition, MedicationStatement, Observation).
3. **Triage Scoring Engine:** Pure, deterministic business logic implementing the Emergency Severity Index decision tree.
4. **Audit Logger:** Append-only log recording every record access with SHA-256 hash chains for tamper detection.`,
      lastUpdated: '2026-10-28',
      isReadyForSupervisor: false
    },
    {
      id: 'doc-database',
      type: 'database',
      title: 'Database Schema & Data Dictionary',
      description: 'Relational schema definitions, entity relationships, normal form verification, and column data dictionary.',
      content: `# DATABASE SCHEMA & DATA DICTIONARY

### 1. Entity-Relationship Overview
The database is architected in PostgreSQL to ensure ACID compliance for critical patient records. The schema adheres to Third Normal Form (3NF).

### 2. Table Definitions

#### Table: \`patients\`
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| \`id\` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique system patient identifier |
| \`national_id\` | VARCHAR(32) | UNIQUE, NULLABLE | Government identity number |
| \`first_name\` | VARCHAR(64) | NOT NULL | Patient given name |
| \`last_name\` | VARCHAR(64) | NOT NULL | Patient family name |
| \`dob\` | DATE | NOT NULL | Date of birth |
| \`blood_group\` | VARCHAR(8) | NOT NULL | ABO and Rh factor (e.g. O+, A-) |
| \`created_at\` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

#### Table: \`triage_encounters\`
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| \`id\` | UUID | PRIMARY KEY | Unique triage encounter ID |
| \`patient_id\` | UUID | FOREIGN KEY REFERENCES patients(id) | Associated patient |
| \`esi_score\` | SMALLINT | CHECK (esi_score BETWEEN 1 AND 5) | Computed severity index |
| \`systolic_bp\` | INTEGER | NOT NULL | Systolic blood pressure (mmHg) |
| \`heart_rate\` | INTEGER | NOT NULL | Heart rate (bpm) |
| \`spo2_pct\` | NUMERIC(4,1) | NOT NULL | Blood oxygen saturation % |
| \`chief_complaint\`| TEXT | NOT NULL | Primary patient symptom description |
| \`status\` | VARCHAR(24) | DEFAULT 'waiting' | 'waiting', 'in_treatment', 'discharged' |
| \`recorded_at\` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Triage timestamp (Indexed) |`,
      lastUpdated: '2026-10-29',
      isReadyForSupervisor: false
    },
    {
      id: 'doc-testing',
      type: 'testing',
      title: 'Software Testing Plan & Test Cases',
      description: 'Comprehensive QA plan covering unit tests, boundary value analysis, integration test cases, and load test benchmarks.',
      content: `# SOFTWARE TEST PLAN & TEST SUITE

### 1. Testing Strategy
- **Unit Testing:** Jest for testing isolated algorithmic modules (ESI triage decision tree, FHIR resource validator). Target code coverage: >= 85%.
- **Integration Testing:** Supertest for testing API route status codes, JWT auth token rejection, and database transaction rollbacks.
- **System Testing:** Black-box boundary value analysis on vital input fields.

### 2. Sample Academic Test Cases

#### TC-TRG-01: ESI Level 1 Immediate Resuscitation Trigger
- **Test ID:** TC-TRG-01
- **Description:** Verify that severe hypoxia (SpO2 < 80%) immediately classifies patient as ESI Level 1.
- **Input Data:** \`{ heartRate: 140, systolicBP: 75, spo2: 78.0, gcs: 12 }\`
- **Expected Output:** \`{ esiScore: 1, alertLevel: 'CRITICAL', requiresImmediateBed: true }\`
- **Actual Result:** Pass
- **Status:** PASSED

#### TC-AUTH-02: Expired Token Rejection
- **Test ID:** TC-AUTH-02
- **Description:** Verify that API returns HTTP 401 Unauthorized when an expired JWT is sent in Authorization header.
- **Input Data:** \`Authorization: Bearer <expired_token_timestamp_minus_1h>\`
- **Expected Output:** HTTP 401 with body \`{ error: "Token expired" }\`
- **Actual Result:** Pass
- **Status:** PASSED`,
      lastUpdated: '2026-10-29',
      isReadyForSupervisor: false
    },
    {
      id: 'doc-final-report',
      type: 'final_report',
      title: 'Final Project Report (Thesis Outline)',
      description: 'Complete multi-chapter graduation report outline following academic university formatting guidelines.',
      content: `# FINAL PROJECT THESIS REPORT
## Title: Design and Implementation of an Interoperable Emergency Triage System (MedFlow)

### Table of Contents
- Declaration of Originality
- Certificate of Supervisor Approval
- Acknowledgments & Dedication
- Abstract
- Chapter 1: Introduction and Problem Domain
- Chapter 2: Literature Review and Comparative Analysis
- Chapter 3: Software Requirements Specification & Behavioral Modeling
- Chapter 4: System Architecture & Database Design
- Chapter 5: Implementation Highlights & Quality Assurance Testing
- Chapter 6: Results, Limitations, and Future Directions
- References (IEEE Standard)
- Appendix A: Complete Data Dictionary
- Appendix B: Sample FHIR JSON Payloads`,
      lastUpdated: '2026-10-30',
      isReadyForSupervisor: false
    }
  ],
  presentationSlides: [
    {
      id: 1,
      slideNumber: 1,
      title: 'MedFlow: Decentralized Triage & Health Record Interoperability',
      subtitle: 'Final Year Project Defense — BS Software Engineering',
      durationMinutes: 1,
      keyBullets: [
        'Ayesha Khan (Team Lead, Backend & Architecture)',
        'Bilal Ahmed (Frontend & Paramedic UI/UX)',
        'Zainab Tariq (Database Architecture & Quality Assurance)',
        'Project Supervisor: Dr. Arthur Chen'
      ],
      visualRecommendation: 'Clean university emblem, system logo, and high-contrast typography.',
      speakerNotes: 'Good morning respected committee members, examiners, and supervisor Dr. Chen. Today our team is proud to present MedFlow, our capstone project tackling one of the most critical challenges in modern healthcare: emergency patient data fragmentation during acute hospital handoffs.'
    },
    {
      id: 2,
      slideNumber: 2,
      title: 'The Real-World Problem: The Golden Hour Dilemma',
      subtitle: 'Why Emergency Interoperability Fails Today',
      durationMinutes: 1.5,
      keyBullets: [
        'Inter-facility transfers lack real-time longitudinal medical data access.',
        'Critical allergies and cardiac drug histories are delayed or lost in paper transit.',
        'Legacy EHRs operate as walled gardens with proprietary data schemas.',
        'Consequence: Preventable adverse drug interactions and delayed acute triage.'
      ],
      visualRecommendation: 'A split infographic contrasting manual paper delays vs the life-saving Golden Hour timeline.',
      speakerNotes: 'In emergency medicine, the first 60 minutes—the golden hour—determines trauma survivability. Currently, when an ambulance transfers a patient, paramedics rely on paper notes or verbal handoffs because hospital EHRs cannot communicate with each other. This causes diagnostic delays and dangerous adverse drug reactions.'
    },
    {
      id: 3,
      slideNumber: 3,
      title: 'Project Objectives & Bounded Scope',
      subtitle: 'Measurable Engineering Goals',
      durationMinutes: 1.5,
      keyBullets: [
        '1. Engineer an HL7 FHIR-compliant schema for patient emergency summaries.',
        '2. Implement an automated Emergency Severity Index (ESI Level 1-5) clinical calculator.',
        '3. Build an offline-first PWA for field paramedics with QR credential scanning.',
        '4. Achieve sub-300ms emergency record retrieval with strict cryptographic audit logging.'
      ],
      visualRecommendation: 'A 4-quadrant diagram outlining In-Scope triage handoffs vs Out-of-Scope billing logistics.',
      speakerNotes: 'Our engineering goals were strictly bounded and measurable. We specifically focused on emergency triage handoffs rather than attempting to build an entire hospital billing platform. Every objective was verified by quantifiable benchmarks.'
    },
    {
      id: 4,
      slideNumber: 4,
      title: 'Literature Review & Technical Gap',
      subtitle: 'Evaluating Existing Solutions Against MedFlow',
      durationMinutes: 1.5,
      keyBullets: [
        'Epic/Cerner: Enterprise-grade but closed-source, prohibitively expensive for regional clinics.',
        'Legacy HL7 v2: Pipe-delimited, brittle parsing, lacks modern REST API capabilities.',
        'Standalone Triage Apps: Offline-only, lacking hospital integration or standard FHIR export.',
        'MedFlow Gap: Lightweight, open FHIR REST API with zero-knowledge emergency QR tokens.'
      ],
      visualRecommendation: 'Comparative evaluation matrix table highlighting MedFlow vs Epic vs Legacy HL7 v2.',
      speakerNotes: 'In our literature review across 18 peer-reviewed papers, we found that existing hospital systems are closed-source and cost millions of dollars, while existing mobile triage apps do not conform to international healthcare standards. MedFlow bridges this gap.'
    },
    {
      id: 5,
      slideNumber: 5,
      title: 'System Architecture & High-Level Design',
      subtitle: 'Layered Modular Architecture',
      durationMinutes: 2,
      keyBullets: [
        'Presentation: React SPA for Hospital Central Ward + Mobile PWA for Paramedics.',
        'Application Core: Node.js/Express modular monolith with deterministic ESI Triage Engine.',
        'Persistence: PostgreSQL for ACID medical records + Redis for active triage queues.',
        'Security: TLS 1.3 in transit, AES-256 at rest, Argon2id password hashing, and signed JWTs.'
      ],
      visualRecommendation: 'Clean high-level architectural block diagram with data flow arrows.',
      speakerNotes: 'We selected a modular layered architecture rather than microservices to avoid distributed latency and network serialization failures in emergency conditions. PostgreSQL guarantees ACID compliance for patient records, while Redis handles sub-millisecond triage priority queueing.'
    },
    {
      id: 6,
      slideNumber: 6,
      title: 'Database Architecture & 3NF Normalization',
      subtitle: 'Relational Design for Integrity and Speed',
      durationMinutes: 1.5,
      keyBullets: [
        'Crow’s Foot ER diagram encompassing Patients, Encounters, Vitals, and Allergies.',
        'Strict Third Normal Form (3NF) to eliminate transitive update anomalies.',
        'B-Tree compound indexes on patient_mrn and recorded_at for sub-10ms lookup.',
        'Append-only cryptographic audit ledger tracking every record read/write operation.'
      ],
      visualRecommendation: 'Relational ER diagram snippet showcasing foreign key constraints and normal form isolation.',
      speakerNotes: 'Our database was designed in strict 3rd Normal Form. Non-key dependencies were isolated into separate relational tables to prevent update anomalies. We established composite B-Tree indexes that allow emergency lookups even across large clinical datasets.'
    },
    {
      id: 7,
      slideNumber: 7,
      title: 'Live System Demonstration',
      subtitle: 'Simulating an Emergency Paramedic Handoff',
      durationMinutes: 3,
      keyBullets: [
        '1. Paramedic field intake with abnormal vital entry (SpO2 84%, BP 78/50).',
        '2. Automated ESI Level 1 (Resuscitation) trigger and instant audio-visual alert.',
        '3. Emergency QR-Token generation and scanning at the hospital trauma bay.',
        '4. Adverse drug warning triggered when clinician orders penicillin for an allergic patient.'
      ],
      visualRecommendation: 'Live screen split: Paramedic Mobile interface on the left, Hospital Central Ward dashboard on the right.',
      speakerNotes: 'Now we transition to our live demonstration. We will simulate an acute trauma patient being transported in an ambulance. Notice how the moment Bilal inputs abnormal vitals, the ESI algorithm classifies the case as Level 1 and notifies the hospital ward in real time.'
    },
    {
      id: 8,
      slideNumber: 8,
      title: 'Algorithmic Implementation: ESI Clinical Decision Tree',
      subtitle: 'Deterministic Multi-Variable Priority Queueing',
      durationMinutes: 1.5,
      keyBullets: [
        'Step 1: Immediate life-saving intervention needed? -> ESI Level 1.',
        'Step 2: High-risk situation, confusion, or severe pain? -> ESI Level 2.',
        'Step 3: Predicted resource utilization (Labs, ECG, IV hydration) -> Levels 3 to 5.',
        'Step 4: Vital sign check against age-specific pediatric and geriatric thresholds.'
      ],
      visualRecommendation: 'Flowchart diagram of the 4-step ESI decision logic tree.',
      speakerNotes: 'The heart of our triage module is a deterministic implementation of the Emergency Severity Index version 5. It evaluates life-threatening physiological flags first, resource utilization second, and validates vital thresholds against demographic baselines.'
    },
    {
      id: 9,
      slideNumber: 9,
      title: 'Software Testing & Quality Verification',
      subtitle: 'Empirical Verification of Correctness and Load',
      durationMinutes: 1.5,
      keyBullets: [
        '42 automated test cases implemented with Jest and Supertest.',
        '88.4% overall statement code coverage across business logic modules.',
        'Boundary value analysis executed on vital limits (e.g. pulse 0, 300, negative values).',
        'Load testing with Autocannon: 150 concurrent requests sustained at 18ms mean latency.'
      ],
      visualRecommendation: 'Code coverage bar graph and load test throughput graph.',
      speakerNotes: 'Software engineering requires empirical verification. We wrote 42 automated tests covering normal flows and boundary edge cases. Under simulated load of 150 concurrent connections, our API maintained an average response latency of only 18 milliseconds.'
    },
    {
      id: 10,
      slideNumber: 10,
      title: 'Project Limitations & Engineering Constraints',
      subtitle: 'Honest Academic Evaluation of Boundaries',
      durationMinutes: 1,
      keyBullets: [
        'Clinical validation conducted on simulated datasets rather than real hospital patients.',
        'Offline mobile sync currently requires reconnection within 24 hours to prevent clock drift.',
        'Biometric identification (fingerprint / facial match) was left for future work.',
        'SMS fallback for areas with zero internet connectivity is simulated via webhooks.'
      ],
      visualRecommendation: 'Clean bulleted boundary card with engineering trade-off callouts.',
      speakerNotes: 'As engineers, we must recognize our project constraints. Because student projects cannot deploy directly into real hospital ICUs without ethical IRB approval, our validation was performed against standard clinical benchmark datasets.'
    },
    {
      id: 11,
      slideNumber: 11,
      title: 'Conclusion & Key Takeaways',
      subtitle: 'Deliverables Achieved Over the 8-Month Lifecycle',
      durationMinutes: 1,
      keyBullets: [
        'Delivered a working, testable HL7 FHIR emergency triage platform.',
        'Reduced simulated patient intake documentation time from 8.2 mins to 1.8 mins.',
        'Fully documented: Proposal, IEEE 830 SRS, ERD, and 90-page final thesis report.',
        'Open-source repository packaged with Docker Compose for one-command deployment.'
      ],
      visualRecommendation: 'Summary graphic of system architecture, GitHub repository badge, and final deliverables checkmarks.',
      speakerNotes: 'In conclusion, MedFlow proves that standardized healthcare interoperability does not require multimillion-dollar enterprise software. Over two semesters, we delivered a working system, full test suite, and complete thesis documentation.'
    },
    {
      id: 12,
      slideNumber: 12,
      title: 'Thank You — Questions & Viva Defense',
      subtitle: 'Open for Examination by the Committee',
      durationMinutes: 1,
      keyBullets: [
        'Codebase and automated test runner open for inspection.',
        'Live system instance running on local test cluster.',
        'Detailed documentation references available in the hardbound thesis.'
      ],
      visualRecommendation: 'Clean closing card with team contact info, supervisor acknowledgement, and Q&A prompt.',
      speakerNotes: 'Thank you for your time, attention, and guidance throughout this project. We now welcome questions and scrutiny from our honorable examiners.'
    }
  ]
};
