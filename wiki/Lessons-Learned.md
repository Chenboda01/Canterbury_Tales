# Lessons Learned

## Project: Canterbury Tales Picture Book & AI Chatbot Improvements
**Date**: 2026-04-19  
**Context**: Font readability improvements for AI Chatbot/Quiz components and completion of picture book scene files.

---

## Key Lessons

### 1. Parallel Delegation with Specialized Subagents
- **Pattern**: Use DeepSeek Reasoner subagents for independent tasks (CSS styling vs content population)
- **Benefit**: Parallel execution reduces overall completion time
- **Implementation**: 
  - Delegate via `task(category="deep", load_skills=[...])` for goal-oriented autonomous work
  - Provide clear prompts with TASK, EXPECTED OUTCOME, REQUIRED TOOLS, MUST DO, MUST NOT DO, CONTEXT
  - Use `run_in_background=true` for parallel exploration agents (explore/librarian)

### 2. Momus Review Requirements
- **Requirement**: Momus expects a `.sisyphus/plans/*.md` file with executable verification steps
- **Anti-pattern**: Vague "Playwright tests" without config files leads to rejection
- **Solution**: Include concrete manual verification steps:
  - Exact commands to run
  - Browser DevTools inspection procedures
  - Expected results with specific thresholds (e.g., contrast ratio ≥ 4.5:1)
  - Reference to existing tools (npm run wiki:build, python3 wiki/lint_wiki.py)

### 3. CSS Accessibility Improvements
- **Challenge**: User-provided colors (red, blue, green) may not meet WCAG contrast ratios on dark backgrounds
- **Solution**: Adjust background colors (darker) rather than modifying requested text colors
- **Verification**: 
  - Use browser DevTools Accessibility panel to check contrast ratios
  - Test each color class against actual background color
  - Document verified ratios for future reference
- **Implementation Pattern**: 
  - Define CSS variables for consistency
  - Create modifier classes (`.chatbot-color-*`, `.chatbot-size-*`)
  - Ensure backward compatibility with existing styles

### 4. Bulk File Population
- **Scenario**: 35 scene files needing consistent content from a source (README.md)
- **Approach**: Scripted population using Python parsing
- **Key Elements to Include**:
  - Image references (consistent naming: `scene-XX.jpg`)
  - Summaries (concise 1-2 sentences)
  - Scene descriptions (verbatim from source)
  - Source excerpts (preserve formatting)
  - Entity links (wiki-style `[[...]]` links)
  - Clean-up notes (editorial consistency)
  - Next action links (navigation)
- **Verification**: Run lint script to ensure link integrity and completeness

### 5. Git Branch Management
- **Observation**: User may refer to branch with different naming (`new_feature` vs `new-feature`)
- **Best Practice**: Verify actual branch name before operations
- **Workflow**: 
  - Check existing branches: `git branch -a`
  - Confirm remote tracking: `git status`
  - Use exact branch name for push operations

### 6. Tool Integration
- **Playwright-cli**: Useful for browser automation but requires proper setup
  - Local preview needed: `cd quartz-site && npx serve -s public -l 4173`
  - Evaluate computed styles via JavaScript in browser context
  - Contrast ratio calculation possible via `window.getComputedStyle()` and color conversion
- **LSP Diagnostics**: Not available for SCSS/Markdown in this environment
  - Alternative: Use build commands (`npm run wiki:build`) and lint scripts
- **GitHub Actions**: Automated deployment on push to specific branches
  - Verify workflow triggers include your branch (`new-feature` in `.github/workflows/deploy-pages.yml`)

### 7. Communication & Documentation
- **Todo Management**: Use `todowrite` for multi-step tasks to provide user visibility
- **Plan Files**: Store work plans in `.sisyphus/plans/` for Momus review
- **Log Entries**: Update `wiki/Log.md` with date-stamped summaries of work completed
- **Index Maintenance**: Keep `wiki/index.md` updated when adding new pages

---

## Recommended Skills for Future Use

### CSS Contrast Improvement Skill
```yaml
name: css-contrast-improvement
description: Improves text readability by adding color/size options and ensuring WCAG compliance
steps:
  1. Analyze current CSS for contrast issues
  2. Define CSS variables for colors and sizes
  3. Create modifier classes (.color-*, .size-*)
  4. Adjust background colors to meet contrast ratios
  5. Provide manual verification steps using browser DevTools
```

### Bulk File Population Skill
```yaml
name: bulk-file-population  
description: Populates multiple similar files from a source document
steps:
  1. Parse source document for structured content
  2. Generate consistent markdown templates
  3. Include image references, summaries, entity links
  4. Run lint verification for completeness
  5. Update index and navigation files
```

### Momus Review Preparation Skill
```yaml
name: momus-review-prep
description: Prepares work plans for Momus review with executable verification steps
steps:
  1. Create `.sisyphus/plans/*.md` file
  2. Include concrete, executable verification steps
  3. Specify tools and expected results
  4. Avoid vague references to unavailable test frameworks
```

---

## Checklist for Similar Projects

- [ ] Verify branch naming consistency
- [ ] Delegate parallel tasks to appropriate subagents
- [ ] Prepare Momus plan with executable verification steps
- [ ] Test CSS contrast ratios against actual backgrounds
- [ ] Use scripts for bulk file operations
- [ ] Update logs and indexes
- [ ] Trigger deployment workflow
- [ ] Verify live site functionality

---

**Related Files**:
- `.sisyphus/plans/review-plan.md` – Example Momus plan
- `quartz-site/quartz/components/styles/chatbot.scss` – CSS improvements
- `wiki/Scene-00.md` through `Scene-34.md` – Populated scene files
- `wiki/Log.md` – Project log with this entry
- `.github/workflows/deploy-pages.yml` – Deployment configuration