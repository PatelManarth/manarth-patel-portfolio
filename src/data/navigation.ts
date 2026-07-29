export type NavItem = { label: string; href: string; children?: NavItem[] };

export const navigation: NavItem[] = [
  { label: 'About', href: '/about/' },
  { label: 'Experience', href: '/experience/' },
  {
    label: 'Work', href: '/projects/', children: [
      { label: 'Projects', href: '/projects/' },
      { label: 'Labs', href: '/labs/' },
      { label: 'Blog', href: '/blog/' }
    ]
  },
  { label: 'Glossary', href: '/glossary/' },
  { label: 'Contact', href: '/contact/' }
];
