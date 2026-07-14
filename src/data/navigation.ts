export type NavItem = { label: string; href: string; children?: NavItem[] };

export const navigation: NavItem[] = [
  { label: 'About', href: '/about/' },
  {
    label: 'Work', href: '/projects/', children: [
      { label: 'Projects', href: '/projects/' },
      { label: 'Labs', href: '/labs/' },
      { label: 'Case Files', href: '/case-files/' },
      { label: 'Detection Notes', href: '/detection-notes/' },
      { label: 'IAM & Cloud', href: '/iam-cloud/' }
    ]
  },
  {
    label: 'Knowledge', href: '/blog/', children: [
      { label: 'Blog', href: '/blog/' },
      { label: 'Glossary', href: '/glossary/' },
      { label: 'LinkedIn Activity', href: '/linkedin/' }
    ]
  },
  { label: 'Services', href: '/services/' },
  { label: 'Resume', href: '/resume/' },
  { label: 'Contact', href: '/contact/' }
];
