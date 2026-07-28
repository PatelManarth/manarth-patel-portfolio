# Public Content Release Checklist

Run this review before every commit that changes visible copy, metadata, navigation, search text, structured data, images containing text, project records, or article content.

## Required checks

1. Read every new or changed public sentence as a visitor would see it.
2. Remove planning, approval, implementation, repository, branch, and editing-process language.
3. Confirm every professional claim is supported by the approved resume or a separately verified source.
4. Confirm no private employer, client, incident, metric, architecture, system, email, or application detail is exposed.
5. Confirm professional work, academic work, and planned lab work are clearly distinguished.
6. Confirm planned work is not described as completed, active, validated, or evidence-backed.
7. Confirm certifications are not shown unless earned and approved for publication.
8. Confirm location, email, title, dates, and role names use the approved public versions.
9. Check page titles, descriptions, Open Graph text, structured data, search prompts, menus, popups, buttons, labels, and image text.
10. Run `npm run content:audit`, `npm run check`, and `npm run build` before deployment.

## Public wording rule

Public copy must explain Manarth Patel’s profile, experience, skills, projects, and learning work directly. It must never explain how the website content was selected, approved, stored, generated, reviewed, or aligned internally.

## Release gate

A failed content audit blocks the build and deployment. Fix every reported item before pushing another public-content change.
