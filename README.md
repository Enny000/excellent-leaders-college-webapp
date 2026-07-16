# Excellent Leaders College Web App

A complete, responsive school website and role-based portal prototype created from the supplied planning images and the high-level structure of the referenced Eduka education template.

This is an original implementation. It does not contain copied ThemeForest source code, licensed template assets, or paid template files.

## What is included

### Public school website

- Responsive top bar, sticky navigation and desktop mega menu
- Branded loading screen
- Professional homepage with hero, values, statistics, academics, admissions, departments, gallery, news, events, testimonials and calls to action
- About page with story, mission, vision, principal’s message and school leadership
- Academics page with curriculum areas, departments, assessment and resources
- Admissions page with application process, requirements, fees guidance and enquiry form
- Gallery with category filters and image preview modals
- News and events page
- Contact page with enquiry form and map placeholder
- Newsletter form
- Accessible keyboard focus, responsive layouts and reduced-motion support
- Installable PWA manifest and offline asset caching

### Role-based portal

- Student portal: dashboard, grades, attendance, classes, notifications and profile
- Parent portal: children overview, grades, attendance, notifications and profile
- Teacher portal: classes, students, editable gradebook, attendance register, notifications and profile
- Admin portal: school metrics, users, classes, teachers, students, grades, attendance, announcements and settings
- Demo authentication and local browser storage
- Responsive portal sidebar and mobile navigation

## Run locally

The project has no npm dependencies and no build step.

From the project folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly also works for most features, but running a local server is recommended for the service worker and PWA support.

## Demo portal accounts

| Role | Email | Password |
|---|---|---|
| Student | `student@elc.demo` | `student123` |
| Parent | `parent@elc.demo` | `parent123` |
| Teacher | `teacher@elc.demo` | `teacher123` |
| Admin | `admin@elc.demo` | `admin123` |

## Main files

- `index.html` — application shell
- `css/styles.css` — full responsive design system
- `js/data.js` — school content, demo users and portal data
- `js/app.js` — routing, rendering, forms, login and portal interactions
- `assets/` — school crest and original SVG illustrations
- `manifest.webmanifest` — PWA configuration
- `service-worker.js` — offline caching

## Customize school information

Edit the `school` object at the top of `js/data.js`:

- verified address
- telephone numbers
- school email addresses
- office hours
- student and staff statistics

The supplied crest image says “Excellent Leaders Secondary School,” while the requested website name is “Excellent Leaders College.” Replace `assets/elc-crest.png` with the final approved high-resolution crest or wordmark before launch.

## Forms and data

This version is a polished front-end prototype. Form submissions, user sessions, teacher gradebook changes and announcements are stored in the browser with `localStorage`. They are not sent to a server.

Before production deployment, connect the forms and portal to a secure backend and database. Recommended production work includes:

- authenticated server sessions or an identity provider
- password hashing and account recovery
- role-based API authorization
- database models for students, parents, staff, grades, attendance and classes
- secure file uploads and report generation
- email/SMS notifications
- audit logs and data retention policies
- backups, monitoring and incident response
- privacy, child-safeguarding and local regulatory review
- verified school content, staff names, fees, policies, dates and contact details

## Design direction

The design uses the requested school palette:

- Royal Gold: `#C9AF37`
- Emerald Green: `#009F79`
- Deep Red: `#C8102E`
- Navy Blue: `#003366`
- White: `#FFFFFF`
- Charcoal: `#26323F`

The public-site information architecture follows the broad education-template pattern the user referenced: top contact bar, primary navigation, large hero, feature cards, about, statistics, academic areas, gallery, events, news, calls to action and a structured footer.
