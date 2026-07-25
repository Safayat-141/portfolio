# Portfolio

A personal portfolio website designed to present multiple facets of who I am — mathematics, competitive programming, public speaking, Model United Nations, and software development — without confining it to a single professional label.

**Live site:** [your-vercel-url.vercel.app] *(add once deployed)*

## Overview

This isn't a freelance/services site or a blog — it's a curated index of projects and interests, built to give employers and collaborators a fuller picture of my work and range.

## Features

- Editorial, row-style project index (not a card grid) with tag-based filtering
- Individual project detail pages
- About page covering academic and extracurricular background
- Contact page
- Custom admin panel for managing projects and content (single-admin, JWT-authenticated)
- Subtle math-motif visual accents — SVG parametric curves derived from equations used in my own projects

## Tech Stack

**Frontend**
- React (Vite)
- React Router

**Backend**
- Node.js / Express
- MongoDB (Atlas)
- JWT authentication via httpOnly cookies
- Cloudinary (signed image uploads)

**Hosting**
- Vercel (frontend)
- Render (backend)
- MongoDB Atlas (database)

## Project Structure
/backend
  /config → database connection
  /models → Mongoose schemas (Admin, Project, About)
  /routes → API routes (auth, projects, about, upload)
  /middleware → auth middleware
  server.js

/frontend
  /src
  /pages → Home, Work, WorkDetail, About, Contact, Admin
  /components → Nav, Footer, ParametricCurve, shared UI
  /context → AuthContext
  /lib → api.js fetch wrapper

## Data Model

Projects are tagged rather than single-category, and include:
- `title`, `slug`, `description`, `tags[]`, `year`, `role`, `status`, `order`
- Optional cover image (Cloudinary)

Only projects with `status: published` are publicly visible; drafts are admin-only.

## Routes

**Public:** `/`, `/about`, `/work`, `/work/:slug`, `/contact`
**Private:** `/admin` — CRUD interface for projects and about content

## About Me

I'm a math student at SUST (Shahjalal University of Science and Technology), Sylhet, Bangladesh. Outside coursework, I'm involved in Model United Nations, public speaking, and independent software projects. *(expand this section at the end with a proper bio — 2-3 sentences on what draws these interests together)*

## Author

**Safayat** — [GitHub](https://github.com/Safayat-141)
