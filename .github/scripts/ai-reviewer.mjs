import { GoogleGenAI } from '@google/genai';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const DIFF_FILE = 'pr_diff.patch';
const OUTPUT_FILE = 'REVIEW_REPORT.md';

// Ensure diff file exists
if (!existsSync(DIFF_FILE)) {
  const fallback = '# AI Code Review Report\n\nNo diff file was generated for this Pull Request.';
  writeFileSync(OUTPUT_FILE, fallback);
  console.log('No diff file present. Exiting gracefully.');
  process.exit(0);
}

const diff = readFileSync(DIFF_FILE, 'utf8');

// Handle empty diffs (e.g. branch is fully up to date or identical)
if (!diff || diff.trim().length === 0) {
  const emptyReport = '# AI Code Review Report\n\nNo code changes detected in this pull request to review.';
  writeFileSync(OUTPUT_FILE, emptyReport);
  console.log('Empty diff. Written empty report placeholder.');
  process.exit(0);
}

// Truncate excessively large diffs to avoid token limits
const MAX_DIFF_LENGTH = 60000;
const truncatedDiff = diff.length > MAX_DIFF_LENGTH
  ? diff.substring(0, MAX_DIFF_LENGTH) + '\n\n...[Diff truncated due to size limits]...'
  : diff;

if (!process.env.GEMINI_API_KEY) {
  const missingKeyReport = '# AI Code Review Report\n\n**Error:** `GEMINI_API_KEY` secret is missing from repository secrets.';
  writeFileSync(OUTPUT_FILE, missingKeyReport);
  console.error('GEMINI_API_KEY environment variable is not defined.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are a Staff Software Architect performing an automated Pull Request code review.
Evaluate the code changes strictly across the following 4 pillars:
1. **DRY & Reusability**: Identify duplicated code blocks, lack of abstractions, and copy-paste patterns.
2. **Edge Cases & Resilience**: Detect uncaught exceptions, missing null/undefined guards, potential race conditions, or unhandled promise rejections.
3. **System Design & Clean Architecture**: Check separation of concerns (e.g. UI vs logic, controllers vs services), proper typing, and code readability.
4. **Scalability & Performance**: Identify memory leaks, blocking synchronous code, unnecessary re-renders, N+1 query patterns, and algorithmic complexity.

Output formatting:
- Give an Executive Summary with an **Overall Quality Score (0 - 100)**.
- Provide key strengths (what was done well).
- Provide detailed actionable feedback categorized under the 4 pillars with specific file names, line references, and suggested code refactors where applicable.
`;

async function runReview() {
  try {
    console.log('Generating AI review from diff...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\nPull Request Diff:\n\`\`\`diff\n${truncatedDiff}\n\`\`\`` }]
        }
      ]
    });

    const report = response.text || '# AI Code Review Report\n\nReview output was empty.';
    writeFileSync(OUTPUT_FILE, report);
    console.log(`Review report written to ${OUTPUT_FILE} successfully.`);
  } catch (error) {
    console.error('Error during AI review execution:', error);
    const errorReport = `# AI Code Review Report\n\nAn error occurred while generating the review:\n\`\`\`\n${error.message}\n\`\`\``;
    writeFileSync(OUTPUT_FILE, errorReport);
    process.exit(1);
  }
}

runReview();