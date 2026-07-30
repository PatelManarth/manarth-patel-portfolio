export type SkillContext = 'Professional' | 'Academic' | 'Planned lab' | 'Profile';

export type SkillReference = {
  context: SkillContext;
  label: string;
  href: string;
  detail: string;
};

export type Skill = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  references: SkillReference[];
};

export const skillCategories = [
  {
    slug: 'security-operations-monitoring',
    title: 'Security Operations & Monitoring',
    description: 'Monitoring, triage, investigation, incident-response support and security-event analysis.'
  },
  {
    slug: 'identity-access-management',
    title: 'Identity & Access Management',
    description: 'Accounts, authentication, access reviews, permissions and identity-security controls.'
  },
  {
    slug: 'vulnerability-security-assessment',
    title: 'Vulnerability Management & Security Assessment',
    description: 'Assessment, risk review, remediation tracking, validation and configuration hardening.'
  },
  {
    slug: 'infrastructure-network-security',
    title: 'Infrastructure & Network Security',
    description: 'Windows and Linux environments, endpoints, networks, firewalls and infrastructure controls.'
  },
  {
    slug: 'security-tools-automation',
    title: 'Security Tools & Automation',
    description: 'Security platforms, analysis utilities, scripting and repeatable technical workflows.'
  },
  {
    slug: 'cloud-application-database-security',
    title: 'Cloud, Application & Database Security',
    description: 'Cloud fundamentals, APIs, backend services, validation and application-security concepts.'
  },
  {
    slug: 'technical-support-troubleshooting',
    title: 'Technical Support, Troubleshooting & Documentation',
    description: 'User support, issue investigation, root-cause analysis, testing and technical communication.'
  }
] as const;

const currentRole: SkillReference = {
  context: 'Professional',
  label: 'Cyber Security Engineer — Current role',
  href: '/experience/#experience-cyber-security-engineer',
  detail: 'Professional responsibilities within a collaborative cybersecurity environment.'
};

const chatkazz: SkillReference = {
  context: 'Professional',
  label: 'Technical Support — Chatkazz',
  href: '/experience/#experience-chatkazz',
  detail: 'User support, systems troubleshooting, networking and documented issue resolution.'
};

const genieapp: SkillReference = {
  context: 'Professional',
  label: 'Backend Developer Intern — GenieApp Solutions',
  href: '/experience/#experience-genieapp-solutions',
  detail: 'Backend development, API testing, validation, debugging and technical documentation.'
};

const businessWeb: SkillReference = {
  context: 'Professional',
  label: 'Web Development Intern — Business Web Solutions',
  href: '/experience/#experience-business-web-solutions',
  detail: 'Application testing, troubleshooting, documentation and web-development support.'
};

const localStore: SkillReference = {
  context: 'Professional',
  label: 'Lead Sales — Local Convenience Store',
  href: '/experience/#experience-local-convenience-store',
  detail: 'Customer service, operational support, issue resolution and dependable shift responsibility.'
};

const homeCapabilities: SkillReference = {
  context: 'Profile',
  label: 'Core capabilities — Home',
  href: '/#capabilities',
  detail: 'High-level professional capability summary.'
};

const aboutPerspective: SkillReference = {
  context: 'Profile',
  label: 'Technical perspective — About',
  href: '/about/#technical-perspective',
  detail: 'How security work connects across identities, endpoints, networks, applications and systems.'
};

const plannedLab: SkillReference = {
  context: 'Planned lab',
  label: 'Cybersecurity Learning Lab — Planned coverage',
  href: '/labs/#planned-coverage',
  detail: 'Planned · 0% · Evidence pending.'
};

const operationHydra: SkillReference = {
  context: 'Academic',
  label: 'Operation Hydra',
  href: '/projects/#operation-hydra',
  detail: 'Academic attack-and-defence capstone with monitoring, investigation and defensive hardening.'
};

const honeypotElk: SkillReference = {
  context: 'Academic',
  label: 'Honeypot and ELK Monitoring',
  href: '/projects/#honeypot-elk-monitoring',
  detail: 'Academic telemetry, investigation, correlation and dashboarding project.'
};

const activeDirectoryProject: SkillReference = {
  context: 'Academic',
  label: 'Active Directory, PKI and FreeRADIUS',
  href: '/projects/#active-directory-pki-freeradius',
  detail: 'Academic identity, Group Policy, PKI and RADIUS security environment.'
};

const digitalForensics: SkillReference = {
  context: 'Academic',
  label: 'Digital Forensics Investigation',
  href: '/projects/#digital-forensics-investigation',
  detail: 'Academic acquisition, artefact review, evidence handling and structured reporting.'
};

const enterpriseNetwork: SkillReference = {
  context: 'Academic',
  label: 'Enterprise Network Security and IPsec',
  href: '/projects/#enterprise-network-security-ipsec',
  detail: 'Academic segmentation, IPsec, AAA, switching security and infrastructure hardening.'
};

const smartAttend: SkillReference = {
  context: 'Academic',
  label: 'SmartAttend',
  href: '/projects/#smartattend',
  detail: 'Academic FastAPI and MongoDB application project.'
};

const dangerousObjectDetection: SkillReference = {
  context: 'Academic',
  label: 'Dangerous Object Detection',
  href: '/projects/#dangerous-object-detection',
  detail: 'Academic API, cloud deployment and automated delivery project.'
};

export const skills: Skill[] = [
  {
    slug: 'security-monitoring',
    name: 'Security Monitoring',
    category: 'security-operations-monitoring',
    summary: 'Reviewing security activity, alerts and system behaviour to identify events that require investigation or escalation.',
    references: [currentRole, homeCapabilities, aboutPerspective, operationHydra, plannedLab]
  },
  {
    slug: 'alert-triage',
    name: 'Alert Triage',
    category: 'security-operations-monitoring',
    summary: 'Reviewing alert context, severity, indicators and supporting activity to determine the next action.',
    references: [currentRole, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'log-analysis',
    name: 'Log Analysis',
    category: 'security-operations-monitoring',
    summary: 'Analyzing authentication, endpoint, application, user and network activity recorded in system logs.',
    references: [currentRole, homeCapabilities, aboutPerspective, honeypotElk]
  },
  {
    slug: 'incident-investigation',
    name: 'Incident Investigation',
    category: 'security-operations-monitoring',
    summary: 'Connecting alerts, indicators, logs and technical context to document findings and support response decisions.',
    references: [currentRole, homeCapabilities, operationHydra, digitalForensics]
  },
  {
    slug: 'indicator-analysis',
    name: 'Indicator Analysis',
    category: 'security-operations-monitoring',
    summary: 'Reviewing indicators of compromise and related system, identity, endpoint or network context.',
    references: [currentRole, homeCapabilities, operationHydra]
  },
  {
    slug: 'incident-response-support',
    name: 'Incident-Response Support',
    category: 'security-operations-monitoring',
    summary: 'Supporting documented response activities, escalation, coordination and follow-up within a team environment.',
    references: [currentRole, aboutPerspective, plannedLab]
  },
  {
    slug: 'identity-access-management',
    name: 'Identity & Access Management',
    category: 'identity-access-management',
    summary: 'Supporting accounts, authentication, groups, permissions, access reviews and least-privilege practices.',
    references: [currentRole, homeCapabilities, aboutPerspective, activeDirectoryProject, plannedLab]
  },
  {
    slug: 'active-directory',
    name: 'Active Directory',
    category: 'identity-access-management',
    summary: 'Working with directory identities, groups, permissions, policy and authentication concepts.',
    references: [homeCapabilities, activeDirectoryProject]
  },
  {
    slug: 'microsoft-entra-id',
    name: 'Microsoft Entra ID',
    category: 'identity-access-management',
    summary: 'Supporting cloud identity, authentication, access and account-management workflows.',
    references: [currentRole, homeCapabilities]
  },
  {
    slug: 'multi-factor-authentication',
    name: 'Multi-Factor Authentication',
    category: 'identity-access-management',
    summary: 'Supporting stronger authentication through additional identity-verification factors.',
    references: [homeCapabilities, aboutPerspective, activeDirectoryProject]
  },
  {
    slug: 'access-reviews',
    name: 'Access Reviews',
    category: 'identity-access-management',
    summary: 'Reviewing accounts, permissions, authentication activity and access context for appropriateness.',
    references: [currentRole, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'vulnerability-management',
    name: 'Vulnerability Management',
    category: 'vulnerability-security-assessment',
    summary: 'Supporting assessment, risk review, remediation tracking, validation and security-control improvement.',
    references: [currentRole, homeCapabilities, aboutPerspective, plannedLab]
  },
  {
    slug: 'vulnerability-assessment',
    name: 'Vulnerability Assessment',
    category: 'vulnerability-security-assessment',
    summary: 'Reviewing scan results, technical findings, affected systems and security context.',
    references: [currentRole, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'remediation-tracking',
    name: 'Remediation Tracking',
    category: 'vulnerability-security-assessment',
    summary: 'Documenting corrective actions, ownership, status and follow-up validation.',
    references: [currentRole, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'configuration-reviews',
    name: 'Configuration Reviews',
    category: 'vulnerability-security-assessment',
    summary: 'Reviewing technical settings and controls for weaknesses, inconsistencies or hardening opportunities.',
    references: [currentRole, homeCapabilities, aboutPerspective, enterpriseNetwork]
  },
  {
    slug: 'system-hardening',
    name: 'System Hardening',
    category: 'vulnerability-security-assessment',
    summary: 'Reducing unnecessary exposure through stronger configurations, controls and validation.',
    references: [currentRole, homeCapabilities, operationHydra, enterpriseNetwork]
  },
  {
    slug: 'windows-linux',
    name: 'Windows & Linux Environments',
    category: 'infrastructure-network-security',
    summary: 'Supporting, troubleshooting and reviewing activity across Windows and Linux systems.',
    references: [currentRole, homeCapabilities, aboutPerspective, chatkazz, operationHydra]
  },
  {
    slug: 'network-security',
    name: 'Network Security',
    category: 'infrastructure-network-security',
    summary: 'Understanding traffic, segmentation, connectivity, network controls and investigation context.',
    references: [homeCapabilities, aboutPerspective, chatkazz, operationHydra, enterpriseNetwork]
  },
  {
    slug: 'firewalls',
    name: 'Firewalls',
    category: 'infrastructure-network-security',
    summary: 'Working with traffic-control, segmentation and network-security concepts.',
    references: [homeCapabilities, aboutPerspective, operationHydra, enterpriseNetwork]
  },
  {
    slug: 'endpoint-troubleshooting',
    name: 'Endpoint Troubleshooting',
    category: 'infrastructure-network-security',
    summary: 'Investigating workstation, operating-system, application and peripheral issues.',
    references: [chatkazz, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'infrastructure-network-security',
    summary: 'Supporting Microsoft cloud productivity, identity and technical administration workflows.',
    references: [currentRole, homeCapabilities]
  },
  {
    slug: 'python',
    name: 'Python',
    category: 'security-tools-automation',
    summary: 'Using Python for backend development, technical workflows and application problem-solving.',
    references: [genieapp, aboutPerspective, smartAttend, dangerousObjectDetection]
  },
  {
    slug: 'postman',
    name: 'Postman',
    category: 'security-tools-automation',
    summary: 'Testing API requests, responses, validation behaviour and error handling.',
    references: [genieapp, businessWeb]
  },
  {
    slug: 'git',
    name: 'Git',
    category: 'security-tools-automation',
    summary: 'Supporting version-controlled development and collaborative technical workflows.',
    references: [genieapp, dangerousObjectDetection]
  },
  {
    slug: 'wazuh',
    name: 'Wazuh',
    category: 'security-tools-automation',
    summary: 'Academic security monitoring, event collection and detection work within a controlled lab environment.',
    references: [operationHydra]
  },
  {
    slug: 'elk-stack',
    name: 'ELK Stack',
    category: 'security-tools-automation',
    summary: 'Academic log ingestion, investigation, correlation and dashboarding in a controlled environment.',
    references: [honeypotElk]
  },
  {
    slug: 'api-security',
    name: 'API Security',
    category: 'cloud-application-database-security',
    summary: 'Reviewing authentication, authorization, validation, request handling and application behaviour.',
    references: [businessWeb, genieapp, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'fastapi',
    name: 'FastAPI',
    category: 'cloud-application-database-security',
    summary: 'Building and troubleshooting Python backend services and REST API workflows.',
    references: [genieapp, aboutPerspective, smartAttend, dangerousObjectDetection]
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    category: 'cloud-application-database-security',
    summary: 'Working with document-oriented application data and backend integration.',
    references: [genieapp, aboutPerspective, smartAttend]
  },
  {
    slug: 'input-validation',
    name: 'Input Validation',
    category: 'cloud-application-database-security',
    summary: 'Reviewing and implementing checks that reduce invalid or unsafe application input.',
    references: [businessWeb, genieapp, aboutPerspective]
  },
  {
    slug: 'cloud-security-fundamentals',
    name: 'Cloud-Security Fundamentals',
    category: 'cloud-application-database-security',
    summary: 'Understanding cloud identities, services, configurations, logging and security-control concepts.',
    references: [homeCapabilities, dangerousObjectDetection, plannedLab]
  },
  {
    slug: 'technical-support',
    name: 'Technical Support',
    category: 'technical-support-troubleshooting',
    summary: 'Supporting users, systems, applications, endpoints and operational technology through structured problem-solving.',
    references: [chatkazz, localStore, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'technical-troubleshooting',
    name: 'Technical Troubleshooting',
    category: 'technical-support-troubleshooting',
    summary: 'Investigating symptoms, testing likely causes, reviewing logs and documenting resolutions.',
    references: [chatkazz, genieapp, businessWeb, homeCapabilities, aboutPerspective]
  },
  {
    slug: 'root-cause-analysis',
    name: 'Root-Cause Analysis',
    category: 'technical-support-troubleshooting',
    summary: 'Identifying the underlying reason for a recurring or complex technical issue.',
    references: [chatkazz, aboutPerspective]
  },
  {
    slug: 'application-testing',
    name: 'Application Testing',
    category: 'technical-support-troubleshooting',
    summary: 'Testing application behaviour, workflows, requests, responses and error conditions.',
    references: [businessWeb, genieapp, aboutPerspective]
  },
  {
    slug: 'technical-documentation',
    name: 'Technical Documentation',
    category: 'technical-support-troubleshooting',
    summary: 'Recording observations, procedures, findings, troubleshooting steps and follow-up actions clearly.',
    references: [currentRole, chatkazz, genieapp, businessWeb, homeCapabilities]
  }
];

export const skillHref = (slug: string) => `/skills/#${slug}`;
export const getSkill = (slug: string) => skills.find(skill => skill.slug === slug);
