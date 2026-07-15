export type SectionCard = {
  title: string;
  text: string;
  label?: string;
  tags?: string[];
  href?: string;
  external?: boolean;
};

export type SectionDefinition = {
  title: string;
  eyebrow: string;
  description: string;
  intro?: string;
  cards: SectionCard[];
  note?: string;
  primaryAction?: { label: string; href: string; external?: boolean };
  secondaryAction?: { label: string; href: string; external?: boolean };
};

export const sections: Record<string, SectionDefinition> = {
  about: {
    title: 'About Manarth Patel',
    eyebrow: 'Analyst Profile',
    description:
      'Cybersecurity-focused IT analyst based in Oshawa / GTA with a foundation in Microsoft 365, identity and access, endpoint support, documentation, and hands-on security labs.',
    intro:
      'I work at the intersection of reliable IT operations and practical security. My portfolio separates production support experience from lab-based security evidence so every claim remains clear and interview-defendable.',
    cards: [
      { title: 'Identity & Access', text: 'Microsoft 365, Microsoft Entra ID, Active Directory, MFA, account support, access requests, and permission review.', label: 'Core area', tags: ['M365', 'Entra ID', 'MFA'] },
      { title: 'Endpoint & User Support', text: 'Windows troubleshooting, software setup, endpoint hygiene, user guidance, escalation, and clear support documentation.', label: 'Production foundation', tags: ['Windows', 'Support', 'Documentation'] },
      { title: 'Security Operations Labs', text: 'Wazuh, Splunk, Sysmon, honeypots, log analysis, controlled validation, triage, and incident-style reporting.', label: 'Hands-on evidence', tags: ['Wazuh', 'Splunk', 'Sysmon'], href: '/projects/' },
      { title: 'Working Style', text: 'Evidence before assumptions, honest scope, clear communication, reproducible steps, safe sanitization, and practical remediation.', label: 'Operating principles', tags: ['Evidence', 'Clarity', 'Safety'] }
    ],
    primaryAction: { label: 'Review projects', href: '/projects/' },
    secondaryAction: { label: 'View resume', href: '/resume/' }
  },
  services: {
    title: 'Practical Cybersecurity Services',
    eyebrow: 'Services',
    description:
      'Clear, realistically scoped support for individuals, students, startups, and small businesses that need useful findings, practical fixes, and understandable documentation.',
    cards: [
      { title: 'Cybersecurity Checkup', text: 'A structured review of account, device, access, and security hygiene with prioritized quick wins and next steps.', label: 'Assessment', tags: ['Checklist', 'Findings', 'Action plan'] },
      { title: 'Microsoft 365 Security Review', text: 'MFA, account security, access hygiene, user settings, and basic administrative observations for small environments.', label: 'Identity', tags: ['M365', 'MFA', 'Access'] },
      { title: 'Website, Domain & Email Review', text: 'DNS, HTTPS, public exposure, SPF, DKIM, and DMARC readiness observations with plain-English recommendations.', label: 'External posture', tags: ['DNS', 'HTTPS', 'Email'] },
      { title: 'Approved Exposure Review', text: 'Basic open-port and public-exposure review for systems you own or are authorized to assess, with a readable remediation checklist.', label: 'Authorized scope only', tags: ['Nmap', 'Scope', 'Report'] },
      { title: 'Security Documentation', text: 'Incident notes, troubleshooting summaries, security checklists, handoff documents, and lab-style reports.', label: 'Documentation', tags: ['Reports', 'Handoff', 'Clarity'] }
    ],
    note:
      'Advanced enterprise penetration testing, regulated compliance engagements, and 24/7 monitoring require a specialized provider. My focus is practical review, documentation, support, and clear next steps.',
    primaryAction: { label: 'Request support', href: '/contact/' },
    secondaryAction: { label: 'Email directly', href: 'mailto:mpatel237@icloud.com?subject=Cybersecurity%20support%20inquiry' }
  },
  blog: {
    title: 'Cybersecurity Blog',
    eyebrow: 'Knowledge Base',
    description:
      'Evidence-linked writing for technical and non-technical readers covering SOC analysis, IAM, cloud security, detection engineering, and practical security concepts.',
    intro: 'Articles will be published only when they add useful explanation or connect to validated project evidence.',
    cards: [
      { title: 'What a SOC analyst actually does with an alert', text: 'A practical explanation of triage, context gathering, confidence, escalation, containment, and documentation.', label: 'Drafting', tags: ['SOC', 'Triage', 'Beginner-friendly'] },
      { title: 'Event, log, alert, and incident: the difference', text: 'A plain-English explanation connected to the endpoint detection engineering project.', label: 'Planned', tags: ['Logs', 'SIEM', 'Foundations'] },
      { title: 'Why IAM is one of cybersecurity’s most important controls', text: 'Identity, MFA, Conditional Access, authorization, least privilege, and user-experience tradeoffs.', label: 'Planned', tags: ['IAM', 'Entra ID', 'Zero Trust'] },
      { title: 'Least privilege explained with AWS IAM', text: 'How broad permissions create risk and how policy analysis supports safer cloud access.', label: 'Planned', tags: ['AWS', 'IAM', 'Cloud'] },
      { title: 'How to publish cybersecurity lab evidence safely', text: 'A checklist for logs, screenshots, credentials, identifiers, and vulnerable services.', label: 'Planned', tags: ['Safety', 'Documentation', 'GitHub'] }
    ],
    primaryAction: { label: 'Explore projects', href: '/projects/' },
    secondaryAction: { label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/manarthpatel/', external: true }
  },
  linkedin: {
    title: 'LinkedIn Activity Hub',
    eyebrow: 'Professional Activity',
    description:
      'A curated, searchable archive of project milestones, learning updates, and professional posts linked to the original LinkedIn profile.',
    cards: [
      { title: 'Detection engineering progress', text: 'Architecture decisions, validation steps, and lessons from Wazuh, Sysmon, and ATT&CK-mapped testing.', label: 'Next update', tags: ['Wazuh', 'Sysmon', 'MITRE ATT&CK'] },
      { title: 'IAM and Zero Trust learning', text: 'Conditional Access, MFA, sign-in logs, policy decisions, and usability tradeoffs in Microsoft Entra.', label: 'Planned', tags: ['Entra ID', 'MFA', 'Zero Trust'] },
      { title: 'AWS least-privilege lab', text: 'CloudTrail, GuardDuty, Access Analyzer, and before-and-after permission hardening.', label: 'Planned', tags: ['AWS', 'GuardDuty', 'IAM'] }
    ],
    note: 'LinkedIn feeds can change or become unavailable. This page preserves searchable summaries while linking to the original public profile.',
    primaryAction: { label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/manarthpatel/', external: true },
    secondaryAction: { label: 'Read the blog', href: '/blog/' }
  },
  glossary: {
    title: 'Cybersecurity Glossary',
    eyebrow: 'Plain-English Security',
    description:
      'Security terminology explained for recruiters, learners, small businesses, and technical visitors who want a quick definition.',
    cards: [
      { title: 'Security Operations Centre (SOC)', text: 'A team that monitors security activity, investigates alerts, and coordinates response.', label: 'SOC' },
      { title: 'Security Information and Event Management (SIEM)', text: 'A platform that collects and analyzes logs so analysts can detect and investigate suspicious activity.', label: 'SIEM' },
      { title: 'Identity and Access Management (IAM)', text: 'The people, processes, and technology used to control who can access which systems and data.', label: 'IAM' },
      { title: 'Multi-factor Authentication (MFA)', text: 'An additional verification step that reduces the chance of a stolen password being enough to sign in.', label: 'MFA' },
      { title: 'MITRE ATT&CK', text: 'A widely used knowledge base for describing adversary tactics and techniques.', label: 'ATT&CK' },
      { title: 'Zero Trust', text: 'A security model that continuously verifies access instead of trusting users or devices by default.', label: 'Zero Trust' },
      { title: 'Log', text: 'A record of activity generated by a system, application, user, or security tool.', label: 'Log' },
      { title: 'Alert', text: 'A notification that activity may require investigation. An alert is not automatically an incident.', label: 'Alert' },
      { title: 'Security Incident', text: 'An event or series of events that threatens confidentiality, integrity, or availability and requires response.', label: 'Incident' }
    ],
    primaryAction: { label: 'Read the blog', href: '/blog/' },
    secondaryAction: { label: 'Explore labs', href: '/labs/' }
  },
  resume: {
    title: 'Resume',
    eyebrow: 'Career Profile',
    description:
      'Current role focus, core skill signals, education, experience, and an ATS-friendly downloadable resume.',
    cards: [],
    primaryAction: { label: 'Open resume PDF', href: 'https://manarthpatel.com/assets/docs/Manarth_Patel_Resume_IT_SOC.pdf', external: true },
    secondaryAction: { label: 'Contact Manarth', href: '/contact/' }
  },
  contact: {
    title: 'Contact Manarth Patel',
    eyebrow: 'Contact',
    description:
      'Reach out for cybersecurity and IT analyst roles, referrals, portfolio discussion, or realistically scoped security support.',
    cards: [
      { title: 'Email', text: 'mpatel237@icloud.com', label: 'Direct', href: 'mailto:mpatel237@icloud.com' },
      { title: 'LinkedIn', text: 'Professional profile, updates, and networking.', label: 'Professional', href: 'https://www.linkedin.com/in/manarthpatel/', external: true },
      { title: 'GitHub', text: 'Code, project repositories, and technical work.', label: 'Technical', href: 'https://github.com/PatelManarth', external: true },
      { title: 'Location', text: 'Oshawa / GTA, Ontario, Canada. Open to remote, hybrid, and onsite opportunities across Canada.', label: 'Canada' }
    ],
    primaryAction: { label: 'Email about a role', href: 'mailto:mpatel237@icloud.com?subject=Cybersecurity%20role%20opportunity' },
    secondaryAction: { label: 'Discuss a project', href: 'mailto:mpatel237@icloud.com?subject=Portfolio%20project%20discussion' }
  },
  'case-files': {
    title: 'Cybersecurity Case Files',
    eyebrow: 'Investigation Library',
    description: 'Incident-style reports produced from completed, validated, and sanitized labs.',
    cards: [
      { title: 'Endpoint Detection Case File', text: 'Planned incident-style report covering telemetry, validation, investigation, tuning, remediation, and lessons learned.', label: 'Building', tags: ['Wazuh', 'Sysmon', 'ATT&CK'], href: '/projects/endpoint-detection/' },
      { title: 'Identity Access Case File', text: 'Planned analysis of Conditional Access decisions, sign-in evidence, false blocks, and risk tradeoffs.', label: 'Planned', tags: ['Entra ID', 'MFA', 'Zero Trust'], href: '/projects/entra-zero-trust/' },
      { title: 'AWS IAM Case File', text: 'Planned cloud evidence covering policy exposure, detection findings, and least-privilege remediation.', label: 'Planned', tags: ['AWS', 'GuardDuty', 'IAM'], href: '/projects/aws-cloud-security/' }
    ],
    primaryAction: { label: 'View all projects', href: '/projects/' }
  },
  'detection-notes': {
    title: 'Detection Notes',
    eyebrow: 'Technical Library',
    description: 'Focused notes covering log sources, alert logic, ATT&CK mapping, validation, false positives, and response recommendations.',
    cards: [
      { title: 'Authentication failure followed by success', text: 'Context required: source IP, user behavior, MFA, location, device, timing, and related activity.', label: 'Synthetic example', tags: ['Authentication', 'Triage', 'Confidence'] },
      { title: 'Sysmon telemetry planning', text: 'Event coverage, collection scope, noise considerations, and how telemetry supports investigation.', label: 'Building', tags: ['Sysmon', 'Windows', 'Wazuh'] },
      { title: 'False-positive documentation', text: 'A repeatable note format for expected activity, observed evidence, confidence, tuning, and residual risk.', label: 'Standard', tags: ['Tuning', 'Analysis', 'Documentation'] }
    ],
    primaryAction: { label: 'Open endpoint project', href: '/projects/endpoint-detection/' }
  },
  'iam-cloud': {
    title: 'IAM & Cloud Security',
    eyebrow: 'Identity and Cloud',
    description: 'Evidence for Microsoft Entra, Conditional Access, MFA, AWS IAM, GuardDuty, CloudTrail, and least privilege.',
    cards: [
      { title: 'Microsoft Entra IAM & Zero Trust', text: 'Conditional Access policy design, MFA, sign-in analysis, troubleshooting, and usability tradeoffs.', label: 'Planned project', tags: ['Entra ID', 'Conditional Access', 'MFA'], href: '/projects/entra-zero-trust/' },
      { title: 'AWS Cloud Security & Least Privilege', text: 'CloudTrail, GuardDuty, Access Analyzer, policy review, and evidence-backed permission hardening.', label: 'Planned project', tags: ['AWS', 'GuardDuty', 'IAM'], href: '/projects/aws-cloud-security/' },
      { title: 'Identity operations foundation', text: 'Account support, MFA guidance, access requests, documentation, and security-minded user support.', label: 'Production foundation', tags: ['Microsoft 365', 'Access', 'Support'] }
    ],
    primaryAction: { label: 'Explore projects', href: '/projects/' },
    secondaryAction: { label: 'View glossary', href: '/glossary/' }
  }
};