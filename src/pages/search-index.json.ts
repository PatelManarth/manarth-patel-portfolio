import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

type SearchEntry = { title: string; url: string; type: string; summary: string; tags: string[] };

const staticEntries: SearchEntry[] = [
  { title:'Home', url:'/', type:'Page', summary:'Cybersecurity and IT Evidence Console', tags:['cybersecurity','soc','iam'] },
  { title:'About', url:'/about/', type:'Page', summary:'Profile, education, direction and working style', tags:['profile','education'] },
  { title:'Projects', url:'/projects/', type:'Page', summary:'Cybersecurity project programme', tags:['projects','evidence'] },
  { title:'Labs', url:'/labs/', type:'Page', summary:'Milestone-driven lab workspace', tags:['labs','progress'] },
  { title:'Services', url:'/services/', type:'Page', summary:'Practical cybersecurity support', tags:['services','mfa','m365'] },
  { title:'Blog', url:'/blog/', type:'Page', summary:'Evidence-linked cybersecurity articles', tags:['blog','articles'] },
  { title:'Glossary', url:'/glossary/', type:'Page', summary:'Plain-English security definitions', tags:['glossary','beginner'] },
  { title:'LinkedIn Activity', url:'/linkedin/', type:'Page', summary:'Curated professional posts', tags:['linkedin','updates'] },
  { title:'Resume', url:'/resume/', type:'Page', summary:'Current resume and career focus', tags:['resume','experience'] },
  { title:'Contact', url:'/contact/', type:'Page', summary:'Contact Manarth Patel', tags:['contact','email'] }
];

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');
  const entries: SearchEntry[] = [
    ...staticEntries,
    ...projects.map(project=>({ title:project.data.title, url:`/projects/${project.data.slug}/`, type:'Project', summary:project.data.simpleSummary, tags:[project.data.track,project.data.focus,...project.data.tools,...project.data.frameworks] }))
  ];
  return new Response(JSON.stringify(entries), { headers: { 'Content-Type': 'application/json' } });
};
