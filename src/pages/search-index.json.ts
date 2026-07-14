import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const staticEntries = [
  ['Home','/','Page','Cybersecurity and IT Evidence Console',['cybersecurity','soc','iam']],
  ['About','/about/','Page','Profile, education, direction and working style',['profile','education']],
  ['Projects','/projects/','Page','Cybersecurity project programme',['projects','evidence']],
  ['Labs','/labs/','Page','Milestone-driven lab workspace',['labs','progress']],
  ['Services','/services/','Page','Practical cybersecurity support',['services','mfa','m365']],
  ['Blog','/blog/','Page','Evidence-linked cybersecurity articles',['blog','articles']],
  ['Glossary','/glossary/','Page','Plain-English security definitions',['glossary','beginner']],
  ['LinkedIn Activity','/linkedin/','Page','Curated professional posts',['linkedin','updates']],
  ['Resume','/resume/','Page','Current resume and career focus',['resume','experience']],
  ['Contact','/contact/','Page','Contact Manarth Patel',['contact','email']]
];

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');
  const entries = [
    ...staticEntries.map(([title,url,type,summary,tags])=>({title,url,type,summary,tags})),
    ...projects.map(project=>({title:project.data.title,url:`/projects/${project.data.slug}/`,type:'Project',summary:project.data.simpleSummary,tags:[project.data.track,project.data.focus,...project.data.tools,...project.data.frameworks]}))
  ];
  return new Response(JSON.stringify(entries), { headers: { 'Content-Type': 'application/json' } });
};
