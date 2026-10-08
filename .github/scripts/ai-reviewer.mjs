// .github/scripts/ai-reviewer.mjs
import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync } from 'fs';

const diff = readFileSync('pr_diff.patch', 'utf8');

if (!diff || diff.trim().length === 0) {
  console.log('No diff found. Skipping review.');
  process.exit(0);
}

// Truncate excessively large diffs to prevent token exhaustion
const maxDiffLength = 50000;
const truncatedDiff = diff.length > maxDiffLength 
  ? diff.substring(0, maxDiffLength) + '\n\n...[Diff truncated due to size limits]...' 
  : diff;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are a Staff Software Architect performing an automated Pull Request review.
Evaluate the code strictly against these 4 pillars:
1. **DRY & Modularity**: Flag repeated logic or missed abstraction opportunities.
2. **Edge Cases & Error Handling**: Missing null checks, uncaught async errors, race conditions, timeout handling.
3. **System Design & Clean Code**: Separation of concerns, domain encapsulation, interface decoupling.
4. **Scalability & Performance**: N+1 queries, memory leaks, blocking operations, algorithmic bottlenecks.

Output your feedback formatted directly in clean GitHub-flavored Markdown:
- An Executive Summary with a Score (1-100).
- Key highlights / what went well.
- Actionable findings categorized under the 4 pillars with file names and suggested refactors.
`;

async function runReview() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: [
        { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nPull Request Diff:\n\`\`\`diff\n${truncatedDiff}\n\`\`\`` }] }
      ]
    });

    const report = response.text;
    writeFileSync('REVIEW_REPORT.md', report);
    console.log('Review report generated successfully.');
  } catch (error) {
    console.error('Error during AI review:', error);
    process.exit(1);
  }
}

runReview();