# Vidyadwar living specification

Vidyadwar is a demo-ready scholarship decision navigator for CODEX 2026. The local demo flow uses a fictional Aarav profile (B.Tech Computer Engineering, 2nd Year, 82%, Maharashtra, ₹2.1 lakh income) and structured prototype scholarship records.

Core flow: public landing → Demo Mode → profile → scholarship matching → eligibility explanation → documents → compare two scholarships → stage-aware conflict analysis → interactive relationship/evidence explanation → readiness → action plan → official portal → personal tracking.

The backend persists users, profiles, scholarships, student document availability, sessions, and tracking in MongoDB. Eligibility is deterministic from profile and scholarship rules. Conflict analysis uses lifecycle stages: application, selection, acceptance, receiving/disbursement, and next academic year re-check. The seeded National STEM and Maharashtra Support records contain an explicitly labeled Demo Rule conflict at disbursement; no prototype record is presented as verified official evidence.

Authentication is local demo authentication with an httpOnly session cookie. Demo Mode uses the seeded Aarav account; register/login are also functional. There is no admin area and no external AI dependency.

Newly registered accounts enter the dashboard immediately, and the workspace identity reflects the registered profile rather than the demo student.