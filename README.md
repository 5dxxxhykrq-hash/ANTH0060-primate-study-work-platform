# Primate Study Work Platform — ANTH0060

A private-study-oriented, public-code workspace for **UCL ANTH0060 PG: Primate Behaviour and Ecology (2026/27)**.

## What this site does

- Week-by-week course dashboard
- Reading cards with summaries, DOI/publisher/OA/UCL reading-list routes
- Pre-seminar and Moodle task tracker
- First-class contract tracker and Week 7 checkpoint
- Annotated bibliography progress tracker
- Research Atlas and Project Lab
- Methods Toolkit with:
  - observation schedule generator
  - sampling-effort calculator
  - budget builder
  - ethogram builder
  - confound checker
  - direct links to BORIS, VOSviewer, ResearchRabbit and Connected Papers
- Feedback journal and AI/authorship log
- Local browser persistence + JSON backup/restore
- Optional automatic ANTH0060-only timetable/deadline sync from private iCalendar feeds

## Privacy / copyright

This repository is public. **Do not upload subscription-only PDFs, private Moodle exports, private timetable tokens, or other licensed course files to this repository.**

The site stores only citation metadata, notes/summaries, and lawful external links. Licensed PDFs can remain in the user's private study environment.

## GitHub Pages

In the repository settings, enable **Pages** and deploy from the `main` branch / repository root.

The expected Pages URL will then normally be:

`https://5dxxxhykrq-hash.github.io/ANTH0060-primate-study-work-platform/`

## Optional automatic UCL calendar sync

The repository includes a scheduled GitHub Action. It only commits events that contain **ANTH0060**, so the rest of the personal timetable is not exposed.

Add either or both of these repository secrets:

- `UCL_TIMETABLE_ICS` — private UCL personal timetable iCalendar subscription URL
- `MOODLE_CALENDAR_ICS` — private Moodle calendar iCalendar subscription URL

Never commit those URLs into source code.

## Data policy

The browser stores progress, task status, budgets, project ideas and journal notes in `localStorage`. Use **Export workspace** regularly to keep a local JSON backup.

## Source-of-truth order

1. 2026/27 Moodle
2. 2026/27 ReadingLists@UCL / Talis
3. Lecturer/module email
4. UCL personal timetable
5. Current official UCL pages
6. Previous-year ANTH0060 material
7. External literature

## Status

Initial research-OS build. Course readings for Weeks 2–5 and 7–10 are seeded; weekly Moodle activities, rooms, slides and formal deadlines should be updated as the teaching team releases them.
