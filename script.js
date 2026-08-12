/* =====================================================================
   GEE — PORTFOLIO SCRIPT
   =====================================================================
   1. DATA / CONFIG   <-- edit everything here, the UI renders itself
   2. Utilities
   3. Renderers (skills, projects, education, certs, experience, etc.)
   4. Interactions (theme, nav, cursor, canvas, reveal, modals, form)
===================================================================== */

/* =====================================================================
   1. DATA / CONFIG — THIS IS THE ONLY SECTION YOU SHOULD NEED TO EDIT
   ===================================================================== */

const CONFIG = {
  name: "Gee",
  fullName: "[ADD YOUR FULL NAME]", // shown in footer/meta if you want it later
  tagline:
    "Computer Science Student • Developer • UI/UX Enthusiast • Tech Explorer",
  heroDescription:
    "I'm studying Computer Science at the University of Dar es Salaam, sharpening my skills in software development, networking, and design. I build projects to learn by doing, experiment with new technologies, and I'm steadily working toward becoming a well-rounded tech professional — one commit at a time.",

  email: "[ADD YOUR EMAIL]",
  phone: "[ADD YOUR PHONE NUMBER]",
  location: "Dar es Salaam, Tanzania",

  cvPath: "/assets/cv.pdf", // replace with your actual CV file path once uploaded

  githubUsername: "[ADD GITHUB USERNAME]",

  social: {
    github: { label: "GitHub", handle: "GH", url: "[ADD GITHUB URL]" },
    linkedin: {
      label: "LinkedIn",
      handle: "in",
      url: "[ADD LINKEDIN URL]",
    },
    instagram: {
      label: "Instagram",
      handle: "IG",
      url: "[ADD INSTAGRAM URL]",
    },
    tiktok: { label: "TikTok", handle: "TT", url: "[ADD TIKTOK URL]" },
    whatsapp: {
      label: "WhatsApp",
      handle: "WA",
      url: "[ADD WHATSAPP LINK]",
    },
  },
};

// Hero floating tech badges — edit freely, they auto-position around the ring
const TECH_BADGES = [
  { label: "Java", color: "#f0b429" },
  { label: "Python", color: "#22d3ee" },
  { label: "JavaScript", color: "#f0b429" },
  { label: "HTML", color: "#f87171" },
  { label: "CSS", color: "#7c6cf0" },
  { label: "SQL", color: "#34d399" },
  { label: "Git", color: "#f87171" },
  { label: "GitHub", color: "#a3aac0" },
  { label: "Networking", color: "#22d3ee" },
];

const QUICK_FACTS = [
  { label: "Degree", value: "BSc in Computer Science" },
  { label: "Status", value: "University Student" },
  { label: "Field", value: "Computer Science" },
  {
    label: "Interests",
    value: "Software Development, Networking, UI/UX, Technology",
  },
  { label: "Location", value: "Tanzania" },
];

// Skill categories — icon refers to the sprite symbol id above
const SKILLS = [
  {
    id: "programming",
    label: "Programming",
    icon: "ic-code",
    items: [
      {
        name: "Java",
        icon: "ic-code",
        desc: "Core language for my OOP coursework — from inheritance to building small console applications.",
      },
      {
        name: "Python",
        icon: "ic-code",
        desc: "My go-to for scripting, quick problem-solving, and algorithm practice.",
      },
      {
        name: "JavaScript",
        icon: "ic-code",
        desc: "Used for interactivity on the web and, increasingly, for full front-end builds.",
      },
      {
        name: "HTML",
        icon: "ic-code",
        desc: "Semantic structure for every web project I build.",
      },
      {
        name: "CSS",
        icon: "ic-code",
        desc: "Styling, layout, and the kind of detail work that makes an interface feel finished.",
      },
      {
        name: "SQL",
        icon: "ic-code",
        desc: "Querying and designing relational databases for coursework and personal projects.",
      },
    ],
  },
  {
    id: "software-dev",
    label: "Software Development",
    icon: "ic-layers",
    items: [
      {
        name: "Object-Oriented Programming",
        icon: "ic-layers",
        desc: "Designing with classes, inheritance, and encapsulation rather than just making code run.",
      },
      {
        name: "Data Structures & Algorithms",
        icon: "ic-layers",
        desc: "Comfortable with sorting, recursion, and analyzing complexity with Big-O.",
      },
      {
        name: "Database Systems",
        icon: "ic-layers",
        desc: "Schema design, normalization, and writing queries that actually scale.",
      },
      {
        name: "Web Development",
        icon: "ic-layers",
        desc: "Building responsive, interactive interfaces from scratch.",
      },
      {
        name: "API Development",
        icon: "ic-layers",
        desc: "Learning to design and consume clean, predictable APIs.",
      },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "ic-network",
    items: [
      {
        name: "Computer Networks",
        icon: "ic-network",
        desc: "Understanding how data actually moves — from the physical layer up.",
      },
      {
        name: "IP Addressing",
        icon: "ic-network",
        desc: "Subnetting, addressing schemes, and planning small networks.",
      },
      {
        name: "Routing",
        icon: "ic-network",
        desc: "Static and dynamic routing concepts and configuration basics.",
      },
      {
        name: "Cisco Packet Tracer",
        icon: "ic-network",
        desc: "Simulating and troubleshooting network topologies before touching real hardware.",
      },
      {
        name: "Network Troubleshooting",
        icon: "ic-network",
        desc: "Methodically isolating faults rather than guessing.",
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: "ic-pen",
    items: [
      {
        name: "UI/UX Design",
        icon: "ic-pen",
        desc: "Thinking about flow and usability before pixels — form should follow function.",
      },
      {
        name: "Figma",
        icon: "ic-pen",
        desc: "Wireframing and prototyping interfaces before I build them.",
      },
      {
        name: "Canva",
        icon: "ic-pen",
        desc: "Fast, clean visual assets for content and branding work.",
      },
      {
        name: "Photoshop",
        icon: "ic-pen",
        desc: "Image editing and asset preparation for web and social.",
      },
      {
        name: "Graphic Design",
        icon: "ic-pen",
        desc: "Applying visual hierarchy and brand consistency across projects.",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "ic-wrench",
    items: [
      {
        name: "Git",
        icon: "ic-wrench",
        desc: "Version control for every project — branches, commits, and history that make sense.",
      },
      {
        name: "GitHub",
        icon: "ic-wrench",
        desc: "Hosting repos, managing issues, and collaborating on code.",
      },
      {
        name: "VS Code",
        icon: "ic-wrench",
        desc: "My daily editor for web projects and scripting.",
      },
      {
        name: "IntelliJ IDEA",
        icon: "ic-wrench",
        desc: "My IDE of choice for Java coursework and projects.",
      },
      {
        name: "Postman",
        icon: "ic-wrench",
        desc: "Testing and debugging API endpoints.",
      },
      {
        name: "Linux",
        icon: "ic-wrench",
        desc: "Comfortable working from the command line for dev and networking tasks.",
      },
    ],
  },
];

/*
  PROJECTS — this array is the single source of truth for the Projects
  section. To add a new project, copy the object below and fill it in —
  nothing else in the UI needs to change.

  Fields:
  id (unique string), title, description (short, for the card),
  category (see PROJECT_CATEGORIES below), year, status
  ("Completed" | "In Progress" | "Planned"), featured (true/false),
  image (path or leave "" for a styled fallback), tech (array of strings),
  github (url or ""), demo (url or ""),
  details: { problem, solution, features[], learned, challenges }
*/
const PROJECT_CATEGORIES = [
  "All",
  "Web",
  "Mobile",
  "Networking",
  "UI/UX",
  "Academic",
  "Personal",
  "Other",
];

const PROJECTS = [
  {
    id: "example-project",
    title: "[EXAMPLE] GEE PLAYS — Gaming Hub",
    description:
      "[ADD PROJECT DESCRIPTION] — Example entry showing the expected data shape. Replace or delete this once you add your real projects.",
    category: "Web",
    year: "2026",
    status: "In Progress",
    featured: true,
    image: "",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "[ADD GITHUB REPO URL]",
    demo: "[ADD LIVE DEMO URL]",
    details: {
      problem: "[ADD PROBLEM] — what gap or need this project addresses.",
      solution: "[ADD SOLUTION] — how you approached solving it.",
      features: ["[ADD FEATURE 1]", "[ADD FEATURE 2]", "[ADD FEATURE 3]"],
      learned: "[ADD WHAT YOU LEARNED]",
      challenges: "[ADD CHALLENGES FACED AND HOW YOU SOLVED THEM]",
    },
  },
  {
    id: "add-project-2",
    title: "[ADD PROJECT NAME]",
    description: "[ADD PROJECT DESCRIPTION]",
    category: "Academic",
    year: "[ADD YEAR]",
    status: "Planned",
    featured: false,
    image: "",
    tech: ["[ADD TECH]"],
    github: "",
    demo: "",
    details: {
      problem: "[ADD PROBLEM]",
      solution: "[ADD SOLUTION]",
      features: ["[ADD FEATURE]"],
      learned: "[ADD WHAT YOU LEARNED]",
      challenges: "[ADD CHALLENGES]",
    },
  },
  {
    id: "add-project-3",
    title: "[ADD PROJECT NAME]",
    description: "[ADD PROJECT DESCRIPTION]",
    category: "Networking",
    year: "[ADD YEAR]",
    status: "Planned",
    featured: false,
    image: "",
    tech: ["[ADD TECH]"],
    github: "",
    demo: "",
    details: {
      problem: "[ADD PROBLEM]",
      solution: "[ADD SOLUTION]",
      features: ["[ADD FEATURE]"],
      learned: "[ADD WHAT YOU LEARNED]",
      challenges: "[ADD CHALLENGES]",
    },
  },
];

/*
  EDUCATION — add new entries as your studies progress.
  Fields: institution, qualification, field, start, end, location, description, coursework[]
*/
const EDUCATION = [
  {
    institution: "University of Dar es Salaam — CoICT",
    qualification: "BSc in Computer Science",
    field: "Computer Science",
    start: "[ADD START YEAR]",
    end: "Present",
    location: "Dar es Salaam, Tanzania",
    description:
      "Undergraduate studies covering software engineering, systems analysis and design, computer organization and architecture, algorithms, and formal logic — with a growing focus on practical, project-based learning.",
    coursework: [
      "Object-Oriented Programming (Java)",
      "Computer Organization & Architecture",
      "Object-Oriented Systems Analysis & Design",
      "Algorithms & Computability",
      "Mathematical Logic & Formal Semantics",
      "Discrete Mathematics",
    ],
  },
  // Add your next education entry here, e.g. secondary school, future postgrad, etc.
];

/*
  CERTIFICATES — add new certificates as you earn them.
  Fields: name, org, date, credentialId, image, link, description
*/
const CERTIFICATES = [
  {
    name: "[ADD CERTIFICATE NAME]",
    org: "[ADD ISSUING ORGANIZATION]",
    date: "[ADD DATE]",
    credentialId: "[ADD CREDENTIAL ID]",
    image: "",
    link: "[ADD VERIFICATION LINK]",
    description: "[ADD A SHORT DESCRIPTION OF WHAT THIS CERTIFICATE COVERS]",
  },
  // Duplicate the object above for each new certificate.
];

/*
  EXPERIENCE — internships, industrial training, freelance, volunteer work.
  Fields: org, position, location, start, end, description, responsibilities[], tech[]
*/
const EXPERIENCE = [
  {
    org: "[ADD ORGANIZATION NAME]",
    position: "[ADD POSITION / ROLE]",
    location: "[ADD LOCATION]",
    start: "[ADD START DATE]",
    end: "[ADD END DATE / Present]",
    description: "[ADD A SHORT DESCRIPTION OF THIS ROLE]",
    responsibilities: ["[ADD RESPONSIBILITY]", "[ADD RESPONSIBILITY]"],
    tech: ["[ADD TECHNOLOGY USED]"],
  },
  // Add internships, industrial training, or freelance work here as they happen.
];

/*
  ACHIEVEMENTS — optional. Icon refers to the sprite symbol id above.
*/
const ACHIEVEMENTS = [
  {
    icon: "ic-award",
    title: "[ADD ACHIEVEMENT]",
    desc: "[ADD A SHORT DESCRIPTION]",
  },
  {
    icon: "ic-trophy",
    title: "[ADD ACHIEVEMENT]",
    desc: "[ADD A SHORT DESCRIPTION]",
  },
];

/* =====================================================================
   2. UTILITIES
   ===================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const esc = (str) =>
  String(str ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
const isPlaceholder = (val) =>
  typeof val === "string" && (val.trim() === "" || /^\[ADD/i.test(val.trim()));
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function safeLink(url, fallbackText) {
  if (isPlaceholder(url))
    return { href: "#", disabled: true, text: fallbackText };
  return { href: url, disabled: false, text: fallbackText };
}

/* =====================================================================
   3. RENDERERS
   ===================================================================== */

function renderHeroBasics() {
  $("#brandName").textContent = CONFIG.name;
  $("#heroFullName").textContent = CONFIG.tagline;
  $("#heroDesc").textContent = CONFIG.heroDescription;
  $("#footerTagline").textContent =
    "Computer Science Student • Developer • Tech Enthusiast";
  $("#footerYear").textContent = new Date().getFullYear();

  const cv = $("#downloadCvBtn");
  cv.setAttribute("href", CONFIG.cvPath);
  if (CONFIG.cvPath === "/assets/cv.pdf") {
    cv.title =
      "Placeholder path — replace CONFIG.cvPath with your real CV file";
  }

  $("#statProjects").textContent = PROJECTS.length;
  $("#statSkills").textContent = SKILLS.reduce(
    (n, cat) => n + cat.items.length,
    0,
  );
}

function renderTechBadges() {
  const wrap = $("#techBadges");
  const n = TECH_BADGES.length;
  // Distribute badges evenly around an ellipse centered on the avatar using a
  // FIXED PIXEL radius (not a percentage of the container). The hero-visual
  // container is single-column from mobile all the way up to 980px, so its
  // width varies hugely (e.g. ~340px on phones vs ~900px on tablets) — a
  // percentage-based radius overshoots badly on wider single-column layouts.
  // A fixed pixel radius tied to viewport tiers stays safe at every width.
  const w = window.innerWidth;
  let radiusX, radiusY;
  if (w <= 480) {
    radiusX = 95;
    radiusY = 88;
  } else if (w <= 980) {
    radiusX = 170;
    radiusY = 155;
  } else if (w <= 1200) {
    radiusX = 145;
    radiusY = 130;
  } else {
    radiusX = 190;
    radiusY = 165;
  }

  wrap.innerHTML = TECH_BADGES.map((b, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const top = (radiusY * Math.sin(angle)).toFixed(1);
    const left = (radiusX * Math.cos(angle)).toFixed(1);
    const delay = (i * (5 / n)).toFixed(2);
    return `
      <span class="badge glass" style="top:calc(50% + ${top}px); left:calc(50% + ${left}px); animation-delay:${delay}s">
        <span class="badge-dot" style="background:${b.color}"></span>${esc(b.label)}
      </span>
    `;
  }).join("");
}

function renderQuickFacts() {
  $("#quickFacts").innerHTML = QUICK_FACTS.map(
    (f) => `
    <div class="fact">
      <span class="fact-label">${esc(f.label)}</span>
      <span class="fact-value">${esc(f.value)}</span>
    </div>
  `,
  ).join("");
}

function renderSkills() {
  const tabs = $("#skillsTabs");
  const panels = $("#skillsPanels");

  tabs.innerHTML = SKILLS.map(
    (cat, i) => `
    <button class="skills-tab${i === 0 ? " is-active" : ""}" data-tab="${cat.id}">
      <svg aria-hidden="true"><use href="#${cat.icon}"/></svg> ${esc(cat.label)}
    </button>
  `,
  ).join("");

  panels.innerHTML = SKILLS.map(
    (cat, i) => `
    <div class="skills-panel${i === 0 ? " is-active" : ""}" data-panel="${cat.id}">
      ${cat.items
        .map(
          (item) => `
        <div class="skill-card glass tilt">
          <div class="skill-top">
            <span class="skill-icon"><svg aria-hidden="true"><use href="#${item.icon}"/></svg></span>
            <span class="skill-name">${esc(item.name)}</span>
          </div>
          <p class="skill-desc">${esc(item.desc)}</p>
        </div>
      `,
        )
        .join("")}
    </div>
  `,
  ).join("");

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".skills-tab");
    if (!btn) return;
    $$(".skills-tab", tabs).forEach((t) =>
      t.classList.toggle("is-active", t === btn),
    );
    $$(".skills-panel", panels).forEach((p) =>
      p.classList.toggle("is-active", p.dataset.panel === btn.dataset.tab),
    );
  });
}

function projectMediaHtml(p) {
  if (!isPlaceholder(p.image) && p.image) {
    return `<img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy">`;
  }
  return `<div class="project-media-fallback">${esc(p.category)} · ${esc(p.title.replace(/^\[.*?\]\s*/, ""))}</div>`;
}

function projectCardHtml(p) {
  return `
    <article class="project-card glass tilt" data-id="${esc(p.id)}" data-category="${esc(p.category)}" tabindex="0" role="button" aria-label="View details for ${esc(p.title)}">
      <div class="project-media">
        ${projectMediaHtml(p)}
        <span class="project-status">${esc(p.status)}</span>
        <span class="project-year">${esc(p.year)}</span>
      </div>
      <div class="project-body">
        <span class="project-cat">${esc(p.category)}</span>
        <h3 class="project-title">${esc(p.title)}</h3>
        <p class="project-desc">${esc(p.description)}</p>
        <div class="project-tech">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="project-links">
          ${!isPlaceholder(p.github) ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg aria-hidden="true"><use href="#ic-external"/></svg> Code</a>` : `<span style="opacity:.5"><svg aria-hidden="true"><use href="#ic-external"/></svg> Code</span>`}
          ${!isPlaceholder(p.demo) ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg aria-hidden="true"><use href="#ic-arrow"/></svg> Live</a>` : `<span style="opacity:.5"><svg aria-hidden="true"><use href="#ic-arrow"/></svg> Live</span>`}
        </div>
      </div>
    </article>
  `;
}

function renderProjects() {
  const filtersEl = $("#projectFilters");
  const gridEl = $("#projectsGrid");
  const featuredEl = $("#featuredStrip");

  filtersEl.innerHTML = PROJECT_CATEGORIES.map(
    (c, i) => `
    <button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${esc(c)}">${esc(c)}</button>
  `,
  ).join("");

  gridEl.innerHTML = PROJECTS.length
    ? PROJECTS.map(projectCardHtml).join("")
    : `<p class="empty-note">No projects yet — add your first one to the PROJECTS array in the script.</p>`;

  const featured = PROJECTS.filter((p) => p.featured);
  featuredEl.innerHTML = featured.length
    ? `
    <div class="strip-label"><svg aria-hidden="true"><use href="#ic-star"/></svg> Featured</div>
    <div class="projects-grid">${featured.map(projectCardHtml).join("")}</div>
  `
    : "";

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    $$(".filter-btn", filtersEl).forEach((b) =>
      b.classList.toggle("is-active", b === btn),
    );
    const filter = btn.dataset.filter;
    $$(".project-card", gridEl).forEach((card) => {
      const match = filter === "All" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !match);
    });
  });

  const openHandler = (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    openProjectModal(card.dataset.id);
  };
  gridEl.addEventListener("click", openHandler);
  featuredEl.addEventListener("click", openHandler);
  [gridEl, featuredEl].forEach((el) =>
    el.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".project-card");
      if (!card) return;
      e.preventDefault();
      openProjectModal(card.dataset.id);
    }),
  );
}

function openProjectModal(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  const box = $("#pmBox");
  const d = p.details || {};
  box.innerHTML = `
    <div class="modal-media">
      ${projectMediaHtml(p)}
      <button class="modal-close" data-close aria-label="Close"><svg aria-hidden="true"><use href="#ic-close"/></svg></button>
    </div>
    <div class="modal-body">
      <h3 id="pmTitle">${esc(p.title)}</h3>
      <span class="modal-tagline">${esc(p.category)} · ${esc(p.year)} · ${esc(p.status)}</span>
      <div class="modal-section"><h4>Problem</h4><p>${esc(d.problem)}</p></div>
      <div class="modal-section"><h4>Solution</h4><p>${esc(d.solution)}</p></div>
      ${d.features && d.features.length ? `<div class="modal-section"><h4>Features</h4><ul>${d.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>` : ""}
      <div class="modal-section"><h4>Technologies</h4><div class="project-tech">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>
      <div class="modal-section"><h4>What I learned</h4><p>${esc(d.learned)}</p></div>
      <div class="modal-section"><h4>Challenges</h4><p>${esc(d.challenges)}</p></div>
      <div class="modal-actions">
        ${!isPlaceholder(p.github) ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" class="btn btn-glass"><svg aria-hidden="true"><use href="#ic-external"/></svg> View Code</a>` : `<button class="btn btn-glass" disabled title="Add your GitHub link in the data section">Code link pending</button>`}
        ${!isPlaceholder(p.demo) ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener" class="btn btn-primary"><svg aria-hidden="true"><use href="#ic-arrow"/></svg> Live Demo</a>` : `<button class="btn btn-primary" disabled title="Add your demo link in the data section">Demo link pending</button>`}
      </div>
    </div>
  `;
  openModal("#projectModal");
}

function renderEducation() {
  const el = $("#educationTimeline");
  el.innerHTML = EDUCATION.map(
    (ed) => `
    <div class="timeline-item">
      <span class="timeline-dot"></span>
      <div class="timeline-card glass">
        <span class="timeline-period"><svg aria-hidden="true" style="width:12px;height:12px;display:inline;vertical-align:-2px;margin-right:4px"><use href="#ic-calendar"/></svg>${esc(ed.start)} — ${esc(ed.end)}</span>
        <h3 class="timeline-title">${esc(ed.qualification)}</h3>
        <p class="timeline-org">${esc(ed.institution)}</p>
        <p class="timeline-loc">${esc(ed.location)}</p>
        <p class="timeline-desc">${esc(ed.description)}</p>
        ${ed.coursework && ed.coursework.length ? `<div class="timeline-list">${ed.coursework.map((c) => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
      </div>
    </div>
  `,
  ).join("");
}

function renderExperience() {
  const el = $("#experienceTimeline");
  el.innerHTML = EXPERIENCE.map(
    (ex) => `
    <div class="timeline-item">
      <span class="timeline-dot"></span>
      <div class="timeline-card glass">
        <span class="timeline-period"><svg aria-hidden="true" style="width:12px;height:12px;display:inline;vertical-align:-2px;margin-right:4px"><use href="#ic-briefcase"/></svg>${esc(ex.start)} — ${esc(ex.end)}</span>
        <h3 class="timeline-title">${esc(ex.position)}</h3>
        <p class="timeline-org">${esc(ex.org)}</p>
        <p class="timeline-loc">${esc(ex.location)}</p>
        <p class="timeline-desc">${esc(ex.description)}</p>
        ${ex.responsibilities && ex.responsibilities.length ? `<div class="timeline-list">${ex.responsibilities.map((r) => `<span>${esc(r)}</span>`).join("")}</div>` : ""}
      </div>
    </div>
  `,
  ).join("");
}

function renderCertificates() {
  const el = $("#certsGrid");
  el.innerHTML = CERTIFICATES.map(
    (c, i) => `
    <div class="cert-card glass tilt" data-idx="${i}" tabindex="0" role="button" aria-label="View certificate: ${esc(c.name)}">
      <div class="cert-top">
        <span class="cert-icon"><svg aria-hidden="true"><use href="#ic-award"/></svg></span>
        <span class="cert-date">${esc(c.date)}</span>
      </div>
      <h3 class="cert-name">${esc(c.name)}</h3>
      <p class="cert-org">${esc(c.org)}</p>
      <span class="cert-id">${esc(c.credentialId)}</span>
    </div>
  `,
  ).join("");

  const open = (idx) => {
    const c = CERTIFICATES[idx];
    if (!c) return;
    const box = $("#cmBox");
    box.innerHTML = `
      <div class="modal-media">
        ${!isPlaceholder(c.image) && c.image ? `<img src="${esc(c.image)}" alt="${esc(c.name)}">` : `<div class="project-media-fallback">${esc(c.org)}</div>`}
        <button class="modal-close" data-close aria-label="Close"><svg aria-hidden="true"><use href="#ic-close"/></svg></button>
      </div>
      <div class="modal-body">
        <h3 id="cmTitle">${esc(c.name)}</h3>
        <span class="modal-tagline">${esc(c.org)} · ${esc(c.date)}</span>
        <div class="modal-section"><h4>Description</h4><p>${esc(c.description)}</p></div>
        <div class="modal-section"><h4>Credential ID</h4><p>${esc(c.credentialId)}</p></div>
        <div class="modal-actions">
          ${!isPlaceholder(c.link) ? `<a href="${esc(c.link)}" target="_blank" rel="noopener" class="btn btn-primary"><svg aria-hidden="true"><use href="#ic-external"/></svg> Verify Certificate</a>` : `<button class="btn btn-primary" disabled title="Add a verification link in the data section">Verification link pending</button>`}
        </div>
      </div>
    `;
    openModal("#certModal");
  };

  el.addEventListener("click", (e) => {
    const c = e.target.closest(".cert-card");
    if (c) open(+c.dataset.idx);
  });
  el.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const c = e.target.closest(".cert-card");
    if (!c) return;
    e.preventDefault();
    open(+c.dataset.idx);
  });
}

function renderAchievements() {
  $("#achieveGrid").innerHTML =
    ACHIEVEMENTS.map(
      (a) => `
    <div class="achieve-card glass tilt">
      <span class="achieve-icon"><svg aria-hidden="true"><use href="#${a.icon}"/></svg></span>
      <h3 class="achieve-title">${esc(a.title)}</h3>
      <p class="achieve-desc">${esc(a.desc)}</p>
    </div>
  `,
    ).join("") +
    `
    <div class="achieve-card achieve-card--ghost glass">
      <svg aria-hidden="true"><use href="#ic-trophy"/></svg>
      <span>Add your next milestone to the ACHIEVEMENTS array</span>
    </div>
  `;
}

/*
  GITHUB PLACEHOLDER — ready to enable.
  Once CONFIG.githubUsername is set to a real username, you can swap this
  function's body for something like:

  fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=6`)
    .then(r => r.json())
    .then(repos => { ...render repos into a grid, no API key needed for public data... });
*/
function renderGithubPlaceholder() {
  const link = $("#ghProfileLink");
  const gh = safeLink(CONFIG.social.github.url, "View GitHub Profile");
  link.href = gh.href;
  if (gh.disabled) link.setAttribute("aria-disabled", "true");
}

function renderContactInfo() {
  const rows = [
    {
      icon: "ic-mail",
      label: "Email",
      value: CONFIG.email,
      href: isPlaceholder(CONFIG.email) ? null : `mailto:${CONFIG.email}`,
    },
    {
      icon: "ic-phone",
      label: "Phone",
      value: CONFIG.phone,
      href: isPlaceholder(CONFIG.phone) ? null : `tel:${CONFIG.phone}`,
    },
    {
      icon: "ic-pin",
      label: "Location",
      value: CONFIG.location,
      href: null,
    },
  ];

  const rowsHtml = rows
    .map(
      (r) => `
    <div class="contact-row">
      <span class="ci-icon"><svg aria-hidden="true"><use href="#${r.icon}"/></svg></span>
      <div>
        <div class="ci-label">${esc(r.label)}</div>
        ${r.href ? `<a class="ci-value" href="${esc(r.href)}">${esc(r.value)}</a>` : `<span class="ci-value">${esc(r.value)}</span>`}
      </div>
    </div>
  `,
    )
    .join("");

  const socials = Object.values(CONFIG.social)
    .map((s) => {
      const l = safeLink(s.url, s.label);
      return `<a class="social-btn" href="${esc(l.href)}" ${l.disabled ? 'aria-disabled="true" title="Add your ' + esc(s.label) + ' URL in the data section"' : 'target="_blank" rel="noopener"'}>${esc(s.handle)}<span class="tooltip">${esc(s.label)}</span></a>`;
    })
    .join("");

  $("#contactInfo").innerHTML =
    rowsHtml + `<div class="social-row">${socials}</div>`;
  $("#footerSocial").innerHTML = socials;
}

/* =====================================================================
   4. INTERACTIONS
   ===================================================================== */

/* --- Theme --- */
function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("gee-theme");
  if (stored) root.setAttribute("data-theme", stored);
  $("#themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("gee-theme", next);
  });
}

/* --- Navbar scroll state + active section + smooth scroll --- */
function initNav() {
  const nav = $("#navbar");
  const sections = $$("main section[id]");
  const navLinks = $$("#navLinks a, .mobile-menu a");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    navLinks.forEach((a) =>
      a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`),
    );
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navLinks.forEach((a) =>
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id.startsWith("#")) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      const y =
        target.getBoundingClientRect().top +
        window.scrollY -
        (window.innerWidth < 720 ? 60 : 76);
      window.scrollTo({
        top: y,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }),
  );
}

/* --- Mobile menu --- */
function closeMobileMenu() {
  $("#mobileMenu").classList.remove("is-open");
  $("#hamburger").classList.remove("is-open");
  $("#hamburger").setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
function initMobileMenu() {
  const btn = $("#hamburger");
  btn.addEventListener("click", () => {
    const open = !$("#mobileMenu").classList.contains("is-open");
    $("#mobileMenu").classList.toggle("is-open", open);
    btn.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
}

/* --- Scroll progress bar --- */
function initScrollProgress() {
  const bar = $("#scrollProgress");
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop || document.body.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    bar.style.width = height > 0 ? `${(scrolled / height) * 100}%` : "0%";
  };
  document.addEventListener("scroll", update, { passive: true });
  update();
}

/* --- Reveal on scroll --- */
function initReveal() {
  const items = $$("[data-reveal]");
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  items.forEach((el) => io.observe(el));
}

/* --- Custom cursor + cursor glow + light parallax --- */
function initCursorFX() {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (!isFinePointer || prefersReducedMotion()) return;

  document.body.classList.add("has-custom-cursor");
  const glow = $("#cursorGlow"),
    dot = $("#cursorDot"),
    ring = $("#cursorRing");
  let mx = window.innerWidth / 2,
    my = window.innerHeight / 2;
  let rx = mx,
    ry = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
  });

  const tick = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  $$("a, button, .tilt, input, textarea").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
  });

  // subtle tilt / parallax on glass cards
  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // hero visual responds slightly to mouse
  const heroVisual = $(".hero-visual");
  if (heroVisual) {
    document.addEventListener("mousemove", (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      heroVisual.style.transform = `translate(${(px * 10).toFixed(1)}px, ${(py * 10).toFixed(1)}px)`;
    });
  }
}

/* --- Ambient network-topology canvas (signature background element) --- */
function initNetworkCanvas() {
  const canvas = $("#network-canvas");
  const ctx = canvas.getContext("2d");
  let w,
    h,
    nodes = [];
  const reduced = prefersReducedMotion();
  const isSmall = window.innerWidth < 720;
  const COUNT = reduced ? 0 : isSmall ? 26 : 52;
  const LINK_DIST = isSmall ? 110 : 150;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function makeNodes() {
    nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }
  function getVar(name) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const dotColor = getVar("--accent-secondary-rgb") || "34,211,238";
    const lineColor = getVar("--accent-primary-rgb") || "124,108,240";

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          ctx.strokeStyle = `rgba(${lineColor}, ${(1 - d / LINK_DIST) * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach((n) => {
      ctx.fillStyle = `rgba(${dotColor}, 0.55)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  let raf;
  function loop() {
    draw();
    raf = requestAnimationFrame(loop);
  }

  resize();
  makeNodes();
  if (!reduced && COUNT > 0) {
    loop();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else loop();
    });
  }
  window.addEventListener("resize", () => {
    resize();
    makeNodes();
    if (reduced || COUNT === 0) draw();
  });
}

/* --- Modals --- */
let lastFocused = null;
function openModal(sel) {
  const overlay = $(sel);
  lastFocused = document.activeElement;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  const closeBtn = overlay.querySelector("[data-close]");
  if (closeBtn) closeBtn.focus();
}
function closeModal(overlay) {
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}
function initModals() {
  $$(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.closest("[data-close]"))
        closeModal(overlay);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    $$(".modal-overlay.is-open").forEach((o) => closeModal(o));
    closeMobileMenu();
  });
}

/* --- Contact form (frontend only — see comment for backend hookup) --- */
function initContactForm() {
  const form = $("#contactForm");
  const status = $("#cfStatus");
  const submitBtn = $("#cfSubmit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const name = $("#cf-name"),
      email = $("#cf-email"),
      subject = $("#cf-subject"),
      message = $("#cf-message");

    [name, subject, message].forEach((f) => {
      const wrap = f.closest(".field");
      const ok = f.value.trim().length > 1;
      wrap.classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    email.closest(".field").classList.toggle("has-error", !emailOk);
    if (!emailOk) valid = false;

    if (!valid) {
      status.textContent = "Please fix the highlighted fields.";
      status.className = "form-status is-error";
      return;
    }

    /* ---------------------------------------------------------------
       BACKEND INTEGRATION POINT
       This currently only simulates a send. To connect a real backend
       (e.g. Formspree, EmailJS, or your own API), replace the
       setTimeout block below with something like:

       fetch("https://your-api.com/contact", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           name: name.value, email: email.value,
           subject: subject.value, message: message.value
         })
       }).then(...).catch(...)
    --------------------------------------------------------------- */
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.className = "form-status";
    status.textContent = "";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      status.textContent =
        "Message ready — connect a backend (see code comment) to actually deliver it.";
      status.className = "form-status is-success";
      form.reset();
    }, 900);
  });
}

/* =====================================================================
   INIT
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderHeroBasics();
  renderTechBadges();
  renderQuickFacts();
  renderSkills();
  renderProjects();
  renderEducation();
  renderExperience();
  renderCertificates();
  renderAchievements();
  renderGithubPlaceholder();
  renderContactInfo();

  initTheme();
  initNav();
  initMobileMenu();
  initScrollProgress();
  initReveal();
  initCursorFX();
  initNetworkCanvas();
  initModals();
  initContactForm();

  // Re-layout badges on resize (debounced) so orientation changes / window
  // resizing keep the ring radius appropriate for the new viewport width.
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderTechBadges, 200);
  });
});
