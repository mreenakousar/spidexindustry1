---
name: create-skill
user-invocable: true
description: |
  Use when you need an interactive workflow to define and author a new `SKILL.md` customization file for this repository.
  Guides the user through choosing scope, identifying inputs, drafting frontmatter, and saving the skill under `.github/skills/`.
---

# Create Skill

Use this skill to create a new agent customization skill (`SKILL.md`) for the current workspace.

## When to use

- You want a reusable workflow for authoring new workspace-scoped skill files
- You need help deciding whether a customization should be a skill, prompt, instruction, or custom agent
- You want to capture the required inputs before writing a `SKILL.md` file

## What this skill does

1. Asks for the intended outcome and scope of the new skill
2. Identifies the target audience and the file location
3. Confirms the key steps, decision points, and expected completion criteria
4. Drafts frontmatter and body content for the new `SKILL.md`

## Questions to answer

- What outcome should the new skill produce?
- Should the skill be workspace-scoped (`.github/skills/`) or personal/user-scoped?
- What specific task or workflow does the skill need to guide?
- What are the main steps the user should follow?

## Output

- A completed `SKILL.md` file with a clear name and description
- Guidance for run instructions or example prompts
- A recommendation for the best file location and naming pattern

## Example prompts

- "Create a `SKILL.md` for defining a repo-specific testing workflow."
- "Help me build a skill that guides contributors through adding a new page component."
- "Draft a workspace skill for authoring and reviewing agent customization files."
