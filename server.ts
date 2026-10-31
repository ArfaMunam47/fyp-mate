import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for error responses
function handleGenAiError(error: unknown, res: Response, fallbackMessage: string) {
  console.error('Gemini API Error:', error);
  const errMsg = error instanceof Error ? error.message : String(error);
  res.status(500).json({ error: errMsg || fallbackMessage });
}

// 1. AI Project Idea Generator
app.post('/api/gemini/generate-ideas', async (req: Request, res: Response) => {
  try {
    const { category, technicalSkills, interests, teamSize, targetDuration, difficulty } = req.body;

    const prompt = `You are a Senior Academic Advisor and Project Coordinator in Computer Science & Software Engineering.
Generate 3 realistic, academically robust, well-scoped Final Year Project (FYP) ideas for university students.

Student Context:
- Domain / Category: ${category || 'Software Engineering / AI'}
- Student Skills: ${technicalSkills || 'React, TypeScript, Python'}
- Areas of Interest: ${interests || 'Healthcare, FinTech, Education, Productivity'}
- Team Size: ${teamSize || 'Individual (1 student)'}
- Available Duration: ${targetDuration || '8 Months (2 Semesters)'}
- Difficulty Level: ${difficulty || 'Intermediate'}

Guidelines:
1. Ideas must NOT be generic trivial clones (e.g. basic to-do list, generic blog).
2. Ideas must NOT be overly unrealistic or require proprietary enterprise datasets that undergraduates cannot access.
3. Every idea must solve a genuine real-world problem with measurable academic engineering value.
4. Provide structured, actionable details.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an elite Computer Science university professor designing high-standard Final Year Projects.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              problemStatement: { type: Type.STRING },
              proposedSolution: { type: Type.STRING },
              objectives: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              coreFeatures: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommendedStack: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              complexityAnalysis: { type: Type.STRING },
              learningPrerequisites: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              potentialLimitations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'title',
              'category',
              'difficulty',
              'problemStatement',
              'proposedSolution',
              'objectives',
              'coreFeatures',
              'recommendedStack',
              'complexityAnalysis',
              'learningPrerequisites',
              'potentialLimitations',
            ],
          },
        },
      },
    });

    const jsonText = (response.text ?? '[]').trim();
    const parsed = JSON.parse(jsonText);
    res.json({ ideas: parsed });
  } catch (err) {
    handleGenAiError(err, res, 'Failed to generate ideas with Gemini.');
  }
});

// 2. Project Feasibility Doctor
app.post('/api/gemini/feasibility-check', async (req: Request, res: Response) => {
  try {
    const { title, description, techStack, teamSize, duration, studentSkills, plannedScope } = req.body;

    const prompt = `Evaluate the feasibility of this university Final Year Project (FYP) for Computer Science / Software Engineering degree:
Project Title: ${title}
Description: ${description}
Target Tech Stack: ${Array.isArray(techStack) ? techStack.join(', ') : techStack}
Team Size: ${teamSize || '2 students'}
Planned Duration: ${duration || '2 Semesters (8 months)'}
Student Team Background Skills: ${studentSkills || 'Intermediate Web / Python'}
Planned Scope & Features: ${plannedScope || 'Full-stack application with automated recommendation engine'}

Provide a rigorous evaluation. Be honest, practical, and constructive.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an FYP Project Evaluation Committee Chairperson examining an undergraduate proposal.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER, description: 'Score between 0 and 100' },
            status: { type: Type.STRING, description: 'One of: Well-Scoped, High Feasibility, Moderately Ambitious, Overly Complex, Under-Scoped' },
            summaryAssessment: { type: Type.STRING },
            technicalFeasibility: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.INTEGER },
                verdict: { type: Type.STRING },
                risks: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['score', 'verdict', 'risks'],
            },
            timeAndScope: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.INTEGER },
                verdict: { type: Type.STRING },
                featuresToTrim: { type: Type.ARRAY, items: { type: Type.STRING } },
                featuresToAdd: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['score', 'verdict', 'featuresToTrim', 'featuresToAdd'],
            },
            resourceRequirements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            supervisorDefenseQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            actionableRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'overallScore',
            'status',
            'summaryAssessment',
            'technicalFeasibility',
            'timeAndScope',
            'resourceRequirements',
            'supervisorDefenseQuestions',
            'actionableRecommendations',
          ],
        },
      },
    });

    const jsonText = (response.text ?? '{}').trim();
    res.json({ evaluation: JSON.parse(jsonText) });
  } catch (err) {
    handleGenAiError(err, res, 'Failed to evaluate project feasibility.');
  }
});

// 3. Project Mentor Chat
app.post('/api/gemini/mentor-chat', async (req: Request, res: Response) => {
  try {
    const { messages, projectContext } = req.body;

    const systemInstruction = `You are "FYP Mentor", an empathetic, pedagogically rigorous Senior Software Architect and CS University Advisor.
You are mentoring a student working on their Final Year Project.

Active Project Context:
- Title: ${projectContext?.title || 'Undecided'}
- Category: ${projectContext?.category || 'Software Engineering'}
- Tech Stack: ${Array.isArray(projectContext?.techStack) ? projectContext.techStack.join(', ') : (projectContext?.techStack || 'Not specified')}
- Current Phase: ${projectContext?.currentPhase || 'Planning & Architecture'}
- Problem Statement: ${projectContext?.problemStatement || 'Not defined yet'}

Your Mission:
1. Educate and empower the student; do not simply dump giant monolithic code without architectural explanation.
2. Teach them software design principles (SOLID, clean architecture, separation of concerns, testability).
3. Warn them of common academic defense traps (e.g., using a database without indexing, claiming 100% accuracy, lack of validation).
4. Provide structured, clean Markdown with clear code snippets or architecture diagrams where helpful.
5. Keep your tone encouraging, professional, and directly actionable.`;

    // Format chat messages
    const formattedContents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
      },
    });

    res.json({ reply: response.text || '' });
  } catch (err) {
    handleGenAiError(err, res, 'Failed to get mentor response.');
  }
});

// 4. Documentation Studio Assistant
app.post('/api/gemini/doc-assist', async (req: Request, res: Response) => {
  try {
    const { docType, sectionKey, sectionTitle, existingContent, projectContext, instructionType } = req.body;

    const prompt = `You are an IEEE Documentation and Academic Thesis Specialist for Computer Science.
Assist the student in preparing their ${docType} document, specifically the "${sectionTitle}" section.

Project Context:
- Title: ${projectContext?.title || 'Academic Software Project'}
- Category: ${projectContext?.category || 'Software Engineering'}
- Problem: ${projectContext?.problemStatement || 'Solving manual inefficiency in domain workflows'}
- Proposed Solution: ${projectContext?.proposedSolution || 'Automated intelligent system'}
- Tech Stack: ${Array.isArray(projectContext?.techStack) ? projectContext.techStack.join(', ') : (projectContext?.techStack || 'React, Node, PostgreSQL')}

Instruction Type: ${instructionType || 'draft'} (draft: write high-standard academic draft, polish: improve academic tone and formal clarity, review: critique against IEEE criteria)

Existing draft:
"""${existingContent || ''}"""

Rules:
1. Maintain formal academic prose (third-person objective, avoid colloquialisms).
2. For SRS functional requirements, use strict RFC/IEEE convention: "The system SHALL...".
3. For architecture or database, specify entities, attributes, and data flow.
4. Output Markdown that can be directly pasted and edited into the student's report.
5. Provide a brief 1-2 sentence tip at the very end explaining how to defend this section during defense.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You generate publishable-grade academic Software Engineering documentation following IEEE standards.',
      },
    });

    res.json({ content: response.text || '' });
  } catch (err) {
    handleGenAiError(err, res, 'Failed to generate documentation assistance.');
  }
});

// 5. FYP Defense Simulator - Generate Question
app.post('/api/gemini/defense-question', async (req: Request, res: Response) => {
  try {
    const { examinerPersona, category, projectContext, previousQuestions } = req.body;

    const prompt = `Generate a realistic, tough, viva voce defense question for an undergraduate Computer Science FYP defense.

Examiner Persona: ${examinerPersona || 'Strict Technical Architect'}
- Strict Technical Architect: Probes deep into concurrency, database locks, API latency, architectural trade-offs, and scaling bottlenecks.
- Academic Research Professor: Probes methodology, literature review gaps, evaluation metrics, statistical significance, and theoretical algorithms.
- Industry Practical Evaluator: Probes maintainability, security vulnerabilities, deployment pipelines, testing coverage, and failure recovery.
- Friendly Generalist: Tests foundational understanding of problem motivation, user personas, and project workflow.

Question Domain / Category: ${category || 'System Architecture & Implementation'}

Project Context:
- Title: ${projectContext?.title || 'Student Project'}
- Tech Stack: ${Array.isArray(projectContext?.techStack) ? projectContext.techStack.join(', ') : (projectContext?.techStack || 'React, Express, PostgreSQL')}
- Description: ${projectContext?.description || ''}

Previous questions already asked: ${JSON.stringify(previousQuestions || [])}

Generate 1 challenging question that an actual professor would ask. Include what specific trap or criteria the examiner is listening for.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert university examiner evaluating undergraduate software projects.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            category: { type: Type.STRING },
            examinerPersona: { type: Type.STRING },
            intent: { type: Type.STRING, description: 'What the examiner is really testing' },
            whatToWatchFor: { type: Type.STRING, description: 'Common rookie mistakes students make when answering this' },
            sampleOpeningHint: { type: Type.STRING, description: 'A structured first sentence to begin the answer smoothly' },
          },
          required: ['question', 'category', 'examinerPersona', 'intent', 'whatToWatchFor', 'sampleOpeningHint'],
        },
      },
    });

    const jsonText = (response.text ?? '{}').trim();
    res.json({ question: JSON.parse(jsonText) });
  } catch (err) {
    handleGenAiError(err, res, 'Failed to generate defense question.');
  }
});

// 6. FYP Defense Simulator - Evaluate Student Answer
app.post('/api/gemini/evaluate-answer', async (req: Request, res: Response) => {
  try {
    const { question, studentAnswer, examinerPersona, projectContext } = req.body;

    const prompt = `Evaluate the student's viva voce answer during an FYP defense panel:

Examiner Persona: ${examinerPersona || 'Technical Architect'}
Question Asked: "${question}"
Student's Given Answer:
"""${studentAnswer || ''}"""

Project Context:
- Title: ${projectContext?.title || 'Academic Project'}
- Tech Stack: ${Array.isArray(projectContext?.techStack) ? projectContext.techStack.join(', ') : (projectContext?.techStack || 'Web / Software')}

Evaluate honestly:
- Score Technical Accuracy (1 to 5)
- Score Clarity & Academic Confidence (1 to 5)
- Score Depth & Completeness (1 to 5)
- Highlight specific strengths
- Point out critical red flags or misconceptions
- Provide an exemplary Model Answer that would receive full marks from the committee.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a Senior FYP Defense Panel Member providing rigorous academic evaluation.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallVerdict: { type: Type.STRING, description: 'e.g., Excellent Defense, Acceptable with Reservations, Needs Major Revision' },
            accuracyScore: { type: Type.INTEGER },
            clarityScore: { type: Type.INTEGER },
            depthScore: { type: Type.INTEGER },
            totalPercentage: { type: Type.INTEGER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            vivaTrapExposed: { type: Type.STRING },
            modelAnswer: { type: Type.STRING },
            nextFollowUpQuestion: { type: Type.STRING },
          },
          required: [
            'overallVerdict',
            'accuracyScore',
            'clarityScore',
            'depthScore',
            'totalPercentage',
            'strengths',
            'weaknesses',
            'vivaTrapExposed',
            'modelAnswer',
            'nextFollowUpQuestion',
          ],
        },
      },
    });

    const jsonText = (response.text ?? '{}').trim();
    res.json({ evaluation: JSON.parse(jsonText) });
  } catch (err) {
    handleGenAiError(err, res, 'Failed to evaluate answer.');
  }
});

// Setup Vite in Dev or Static Serving in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FYP Mate full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
