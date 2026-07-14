---
title: Endpoint Detection Engineering Lab
slug: endpoint-detection
status: building
track: SOC
focus: Detection Engineering
featured: true
order: 1
tools: [Wazuh, Windows 11, Sysmon, Atomic Red Team]
frameworks: [MITRE ATT&CK, NIST CSF 2.0]
simpleSummary: A Windows security lab that tests whether suspicious activity can be detected, investigated, and documented clearly.
technicalSummary: Sysmon telemetry is ingested into Wazuh and validated through controlled ATT&CK-mapped Atomic Red Team tests, followed by triage, confidence assessment, tuning, remediation, and incident reporting.
updated: 2026-07-14
milestones:
  - { label: Environment setup, complete: true }
  - { label: Telemetry collection, complete: true }
  - { label: Validation tests, complete: false }
  - { label: Investigation, complete: false }
  - { label: Detection tuning, complete: false }
  - { label: Final report, complete: false }
  - { label: Evidence sanitization, complete: false }
  - { label: Expert review, complete: false }
evidence:
  - Architecture and data-flow diagrams
  - Three to five sanitized ATT&CK-mapped tests
  - Detection and false-positive notes
  - Incident-style report
---
This project is being built as the flagship SOC case file. Public evidence will be added only after validation, sanitization, and documentation are complete.
