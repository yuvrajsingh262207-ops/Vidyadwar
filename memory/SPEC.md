# Vidyadwar living specification

Vidyadwar is a demo-ready scholarship decision navigator for CODEX 2026. The local demo flow uses a fictional Aarav profile (B.Tech Computer Engineering, 2nd Year, 82%, Maharashtra, ₹2.1 lakh income) and structured prototype scholarship records.

Core flow: public landing → Demo Mode → profile → scholarship matching → eligibility explanation → documents → compare two scholarships → stage-aware conflict analysis → interactive relationship/evidence explanation → readiness → action plan → official portal → personal tracking.

The backend persists users, profiles, scholarships, student document availability, sessions, and tracking in MongoDB. Eligibility is deterministic from profile and scholarship rules. Conflict analysis uses lifecycle stages: application, selection, acceptance, receiving/disbursement, and next academic year re-check. The seeded National STEM and Maharashtra Support records contain an explicitly labeled Demo Rule conflict at disbursement; no prototype record is presented as verified official evidence.

Authentication is local demo authentication with an httpOnly session cookie. Demo Mode uses the seeded Aarav account; register/login are also functional. There is no admin area and no external AI dependency.

Newly registered accounts enter the dashboard immediately, and the workspace identity reflects the registered profile rather than the demo student.

Profile edits persist per authenticated user in MongoDB. A successful save invalidates profile, dashboard, scholarship, conflict, readiness, and session caches so the saved profile becomes the immediate source of truth. Demo Mode remains isolated under the `demo-aarav` user id.

The scholarship knowledge catalog contains 30+ source-first records across NSP, AICTE, UGC, government ministries, MahaDBT, selected state portals, university aid, corporate providers, discovery metadata, and clearly labeled prototype records. Each record stores provider, portal, source type, official/discovery URLs, category, course, education level, state, deadline, benefit, verification date, status, and keywords. Where detailed criteria are not stored, deterministic eligibility returns Review with “Eligibility details require official verification.”