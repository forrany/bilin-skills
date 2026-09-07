# Activity List Review v1.3 Design

## Goal

Make ED school an actual required input for `bilin-activity-list-review`, close the remaining gaps in list-wide description consistency, and make the English clean version contain only the work an external coach must perform.

## Input contract

Evaluation starts only when all three inputs exist:

1. At least one intended major.
2. At least one ED school or ED candidate. An EA/RD/target-school list does not substitute for ED input.
3. An editable activity list with title, description, position, and time for every activity.

Multiple ED candidates and multiple majors are allowed. Two or more candidates on either axis trigger the ED-by-major matrix. Missing ED input stops work and returns the intake checklist; the skill must not provide a partial or RD-pool review.

## Review behavior

Keep the existing evidence, official-source freshness, scoring, red-mark, and matrix workflows. Add a final list-wide consistency pass covering parallel description structure, tense logic, capitalization, abbreviations, punctuation, number formatting, and repeated terminology. The Chinese report records concrete consistency corrections rather than saying only “make the style consistent.”

## English clean version

The substantive body contains exactly two sections:

1. Recommended order by intended major.
2. Prioritized revisions using Must fix, Should fix, and Polish.

A compact title, student/date/major metadata, and the safety note for unresolved `{{ }}` placeholders are allowed as operational scaffolding. Remove the separate positioning paragraph because it adds a third content category not requested by the external coach.

## Files and compatibility

Update the core skill, intake checklist, matrix rules, field checklist, report template, clean-version template, agent interface, routing/evaluation fixtures, manifest, changelog, and validation report. Version the skill as 1.3 / 1.3.0 and keep existing evidence and scoring semantics unchanged.

## Acceptance criteria

- A request with major + activity list + RD schools but no ED school is blocked.
- A request with at least one ED candidate proceeds.
- Multiple ED or major candidates still produce a full matrix.
- No active instruction says an ED-less review may continue.
- The interface exposes `ed_schools` as required and `target_schools` as optional.
- The final review explicitly checks cross-entry description consistency.
- The clean-version body has only order and revisions; no positioning paragraph.
- JSON and YAML files parse, repository validation checks pass, and searches find no stale ED-optional exception.
