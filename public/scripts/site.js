const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const html=document.documentElement;
const escapeHtml=(value='')=>value.replace(/[&<>'"]/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));

const menu=$('[data-menu]');
const menuToggle=$('[data-menu-toggle]');
if(menu&&menuToggle){
  menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');menuToggle.setAttribute('aria-expanded',String(open));});
  $$('a',menu).forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');}));
}

const syncThemeLabel=()=>$$('[data-theme-name]').forEach(element=>{element.textContent=html.dataset.theme==='green'?'Green':'Blue';});
syncThemeLabel();
$$('[data-theme-toggle]').forEach(button=>button.addEventListener('click',()=>{html.dataset.theme=html.dataset.theme==='green'?'blue':'green';localStorage.setItem('portfolio-theme',html.dataset.theme);syncThemeLabel();}));

$$('[data-depth]').forEach(button=>button.addEventListener('click',()=>{html.dataset.depth=button.dataset.depth;localStorage.setItem('portfolio-depth',button.dataset.depth);$$('[data-depth]').forEach(item=>item.classList.toggle('is-active',item===button));}));
$$(`[data-depth="${html.dataset.depth}"]`).forEach(button=>button.classList.add('is-active'));

const routes={
  recruiter:{title:'Recruiter route',text:'Resume → About → Featured projects → Contact',href:'/resume/',label:'Open resume'},
  technical:{title:'Technical manager route',text:'Projects → Labs → Case files → GitHub',href:'/projects/',label:'Review projects'},
  learner:{title:'Learning route',text:'Glossary → Blog → Simulator → Labs',href:'/glossary/',label:'Open glossary'},
  business:{title:'Practical security route',text:'Services → Scope → Recommendations → Contact',href:'/services/',label:'View services'}
};
function activateRoute(routeName){const route=routes[routeName];if(!route)return;$$('[data-route]').forEach(item=>item.classList.toggle('is-active',item.dataset.route===routeName));const output=$('[data-route-output]');if(output)output.innerHTML=`<strong>${route.title}</strong><p>${route.text}</p><a class="button button--primary" href="${route.href}">${route.label}</a>`;localStorage.setItem('portfolio-route',routeName);}
$$('[data-route]').forEach(button=>button.addEventListener('click',()=>activateRoute(button.dataset.route)));
const savedRoute=localStorage.getItem('portfolio-route');if(savedRoute)activateRoute(savedRoute);

const typewriter=$('[data-typewriter]');
if(typewriter&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const commands=['reviewing project evidence...','mapping identity and endpoint controls...','loading analyst decision paths...','indexing labs, notes and articles...'];let commandIndex=0,characterIndex=0,deleting=false;const type=()=>{const command=commands[commandIndex];characterIndex+=deleting?-1:1;typewriter.textContent=command.slice(0,characterIndex);if(!deleting&&characterIndex===command.length){deleting=true;setTimeout(type,1300);return;}if(deleting&&characterIndex===0){deleting=false;commandIndex=(commandIndex+1)%commands.length;}setTimeout(type,deleting?28:48);};typewriter.textContent='';type();}
const greeting=$('[data-console-greeting]');
if(greeting){const messages=['Evidence is strongest when the reasoning is visible.','Explore the portfolio in simple or technical depth.','Synthetic scenarios are clearly labelled; project evidence stays truthful.','Search any tool, control, project, framework or concept.'];greeting.textContent=messages[Math.floor(Math.random()*messages.length)];}

const nistContent={
  govern:{title:'Govern',text:'How scope, policy intent, risk decisions and documentation guide security work.',items:['Project scope and assumptions','Decision logs','Framework mapping']},
  identify:{title:'Identify',text:'Understanding assets, accounts, data sources, exposure and the context needed for analysis.',items:['Asset and identity context','Architecture diagrams','Risk and vulnerability review']},
  protect:{title:'Protect',text:'Reducing risk through MFA, Conditional Access, least privilege and secure configuration.',items:['Microsoft Entra policies','AWS IAM hardening','Endpoint configuration']},
  detect:{title:'Detect',text:'Collecting telemetry and validating whether suspicious activity creates useful analyst evidence.',items:['Wazuh and Sysmon','GuardDuty findings','ATT&CK-mapped validation']},
  respond:{title:'Respond',text:'Triage, investigation, confidence assessment, containment and remediation recommendations.',items:['Synthetic triage simulator','Incident-style reports','Case files and detection notes']},
  recover:{title:'Recover',text:'Restoring trusted operations and documenting improvements after an incident or control failure.',items:['Recovery recommendations','Lessons learned','Production improvement plan']}
};
$$('[data-nist]').forEach(button=>button.addEventListener('click',()=>{$$('[data-nist]').forEach(item=>item.classList.toggle('is-active',item===button));const detail=$('[data-nist-detail]');const item=nistContent[button.dataset.nist];if(detail&&item)detail.innerHTML=`<span class="eyebrow">Framework explorer</span><h3>${item.title}</h3><p>${item.text}</p><ul>${item.items.map(value=>`<li>${value}</li>`).join('')}</ul>`;}));

const triageFeedback={disable:'Premature. Immediate disabling may be justified later, but first confirm the account, source, MFA result, timing and related activity unless the risk is already critical.',context:'Best first step. Establish context before assigning confidence or containment: source IP, user behavior, location, MFA, device, time and nearby events.',ignore:'Unsafe. A successful sign-in after failures can still indicate password spraying, credential compromise or a legitimate user mistake that needs validation.',restart:'Not relevant as the first action. The evidence is authentication-focused; restarting an endpoint does not explain the sign-in pattern.'};
$$('[data-triage-choice]').forEach(button=>button.addEventListener('click',()=>{$$('[data-triage-choice]').forEach(item=>item.classList.toggle('is-selected',item===button));const feedback=$('[data-triage-feedback]');if(feedback)feedback.textContent=triageFeedback[button.dataset.triageChoice];}));

const dialog=$('[data-search-dialog]');
const searchInput=$('[data-search-input]');
const searchResults=$('[data-search-results]');
let pagefind;
async function loadPagefind(){if(pagefind)return pagefind;pagefind=await import('/pagefind/pagefind.js');await pagefind.init();return pagefind;}
function googleFallback(query){const site=encodeURIComponent(`site:manarthpatel.com ${query}`);const web=encodeURIComponent(query);return `<div class="search-empty"><p>No matching content was found on this website.</p><div class="search-fallbacks"><a class="button" target="_blank" rel="noreferrer" href="https://www.google.com/search?q=${site}">Search this site on Google</a><a class="button" target="_blank" rel="noreferrer" href="https://www.google.com/search?q=${web}">Search the wider web</a><a class="button" href="/contact/">Ask Manarth</a></div></div>`;}
async function renderSearch(){const query=searchInput?.value.trim()||'';if(!searchResults)return;if(!query){searchResults.innerHTML='<p class="search-hint">Search any project, tool, skill, framework, article, service, or glossary term.</p>';return;}searchResults.innerHTML='<p class="search-hint">Searching the website…</p>';try{const api=await loadPagefind();const search=await api.search(query);const data=await Promise.all(search.results.slice(0,12).map(result=>result.data()));searchResults.innerHTML=data.length?data.map(result=>`<a class="search-result" href="${escapeHtml(result.url)}"><strong>${escapeHtml(result.meta?.title||result.url)}</strong><span>${result.excerpt||''}</span></a>`).join(''):googleFallback(query);}catch{searchResults.innerHTML=googleFallback(query);}}
$$('[data-search-open]').forEach(button=>button.addEventListener('click',()=>{dialog?.showModal();if(searchInput)searchInput.value='';renderSearch();setTimeout(()=>searchInput?.focus(),0);}));
searchInput?.addEventListener('input',renderSearch);
addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();dialog?.showModal();searchInput?.focus();}if(event.key==='Escape'&&dialog?.open)dialog.close();});
$('[data-year]')?.replaceChildren(String(new Date().getFullYear()));

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion&&matchMedia('(pointer:fine)').matches){let targetX=50,targetY=25,currentX=50,currentY=25;addEventListener('pointermove',event=>{targetX=event.clientX/innerWidth*100;targetY=event.clientY/innerHeight*100;},{passive:true});(function follow(){currentX+=(targetX-currentX)*.035;currentY+=(targetY-currentY)*.035;html.style.setProperty('--pointer-x',`${currentX}%`);html.style.setProperty('--pointer-y',`${currentY}%`);requestAnimationFrame(follow);}());}

const canvas=$('[data-network]');
if(canvas&&!reducedMotion){const context=canvas.getContext('2d');let width,height,dpr,nodes=[],pulse=0;function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;context.setTransform(dpr,0,0,dpr,0,0);const mobile=width<700;const count=mobile?Math.min(34,Math.max(20,Math.floor(width*height/33000))):Math.min(78,Math.max(38,Math.floor(width*height/24000)));nodes=Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*(mobile?.12:.22),vy:(Math.random()-.5)*(mobile?.12:.22),r:Math.random()*1.2+1,phase:Math.random()*Math.PI*2}));}
addEventListener('resize',resize,{passive:true});resize();
(function draw(){context.clearRect(0,0,width,height);pulse+=.008;const rgb=html.dataset.theme==='green'?'27,233,140':'45,124,255';nodes.forEach((node,index)=>{node.x+=node.vx;node.y+=node.vy;if(node.x<-20)node.x=width+20;if(node.x>width+20)node.x=-20;if(node.y<-20)node.y=height+20;if(node.y>height+20)node.y=-20;const glow=.55+Math.sin(pulse*4+node.phase)*.18;context.fillStyle=`rgba(${rgb},${glow})`;context.beginPath();context.arc(node.x,node.y,node.r,0,Math.PI*2);context.fill();for(let next=index+1;next<nodes.length;next++){const other=nodes[next];const distance=Math.hypot(node.x-other.x,node.y-other.y);const limit=width<700?100:145;if(distance<limit){const alpha=(1-distance/limit)*(width<700?.11:.18);context.strokeStyle=`rgba(${rgb},${alpha})`;context.lineWidth=.7;context.beginPath();context.moveTo(node.x,node.y);context.lineTo(other.x,other.y);context.stroke();}}});requestAnimationFrame(draw);}());}
