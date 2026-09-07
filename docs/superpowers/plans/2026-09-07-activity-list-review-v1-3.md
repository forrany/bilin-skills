# Activity List Review v1.3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce ED school as a true hard-gate input and close the description-consistency and clean-version scope gaps.

**Architecture:** Treat the skill's Markdown, interface YAML, manifest, and eval fixtures as one behavioral contract. First encode failing acceptance checks, then update every source of ED behavior consistently, add the list-wide language pass, and verify the two-section external-coach projection.

**Tech Stack:** Markdown, YAML, JSON, shell/`rg`, Git.

---

### Task 1: Capture the failing contract

**Files:**
- Modify: `skills/bilin-activity-list-review/evals/trigger_cases.json`
- Create: `skills/bilin-activity-list-review/evals/behavior_cases.json`

- [x] **Step 1: Run the pre-change ED, interface, consistency, and clean-version assertions**

Run four `rg` assertions that require no ED-optional language, a required `ed_schools` field, a list-wide consistency gate, and no `Positioning:` template line.

- [x] **Step 2: Verify the assertions fail for the expected reasons**

Expected: all four assertions fail against v1.2 because the ED exception and positioning line exist while the new interface field and consistency gate do not.

- [x] **Step 3: Add behavior fixtures**

Add cases with explicit expectations:

```json
{
  "case": "major and RD schools supplied but ED missing",
  "expected": "stop and request at least one ED school or candidate"
}
```

Also cover a single ED, multiple ED/major candidates, cross-entry style consistency, and clean-version section limits.

### Task 2: Enforce the ED hard gate everywhere

**Files:**
- Modify: `skills/bilin-activity-list-review/SKILL.md`
- Modify: `skills/bilin-activity-list-review/references/INTAKE.md`
- Modify: `skills/bilin-activity-list-review/references/ED-MAJOR-MATRIX.md`
- Modify: `skills/bilin-activity-list-review/references/SCORING.md`
- Modify: `skills/bilin-activity-list-review/agents/interface.yaml`
- Modify: `skills/bilin-activity-list-review/evals/semantic_config.json`

- [x] **Step 1: Replace the ED-optional branches**

State that at least one ED school/candidate is required and that target/EA/RD schools are optional context, not a substitute.

- [x] **Step 2: Make the interface contract explicit**

Use:

```yaml
required: [major, ed_schools, activity_list(title,description,position,time)]
optional: [target_schools, personal_statement, supplemental_essays, recommendations, portfolio, activity_info_sheet, transcripts]
```

- [x] **Step 3: Preserve matrix behavior**

Keep one ED × one major as a single combination; require a matrix when either axis has two or more candidates.

### Task 3: Add whole-list description consistency and narrow the clean version

**Files:**
- Modify: `skills/bilin-activity-list-review/references/FIELD-CHECKLIST.md`
- Modify: `skills/bilin-activity-list-review/references/REPORT-TEMPLATE.md`
- Modify: `skills/bilin-activity-list-review/references/CLEAN-VERSION.md`

- [x] **Step 1: Add the final consistency pass**

Require concrete checks for parallel opening verbs, tense logic, capitalization, abbreviations, punctuation, number formatting, and stable names/terms across all activities.

- [x] **Step 2: Add the report output block**

Require a concise list-wide consistency result with exact affected activity numbers and replacement text.

- [x] **Step 3: Remove the positioning paragraph**

Retain only order and revisions as substantive sections. Keep header metadata and the placeholder safety note as non-substantive safeguards.

### Task 4: Version, document, and verify

**Files:**
- Modify: `skills/bilin-activity-list-review/manifest.json`
- Modify: `CHANGELOG.md`
- Create: `skills/bilin-activity-list-review/reports/validation-run-2026-09-07.md`

- [x] **Step 1: Bump versions and record the decisions**

Set SKILL metadata to `1.3`, manifest version to `1.3.0`, update dates/lifecycle, and append resolved decisions for the strict ED gate, list-wide consistency, and clean-version scope.

- [x] **Step 2: Run structural validation**

Parse all JSON with `python3 -m json.tool`, inspect YAML through Ruby's standard YAML parser, and validate Markdown links/target files with repository searches.

- [x] **Step 3: Run the GREEN acceptance assertions**

Expected: ED-optional phrases are absent; `ed_schools` is required; the consistency gate exists; `Positioning:` is absent; behavior fixtures contain the missing-ED stop case.

- [x] **Step 4: Review the full diff**

Confirm only v1.3 contract files and the approved design/plan changed, with no unrelated edits.
