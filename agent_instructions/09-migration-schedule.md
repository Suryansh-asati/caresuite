# Migration Schedule

A 20-day sprint allocating 2 hours per day to achieve MVP.

## Week 1: Environment & Core UI
- **Day 1**: Environment Setup. React app scaffold, Node skeleton setup, initialize Git branches.
- **Day 2**: Frontend Layout. Build global components (Navbar/Footer). Set up routing.
- **Day 3**: Auth System. API logic for `/api/users`. Validate registration and login flows internally.
- **Day 4**: Mood Tracker UI. Migrate `mood.html` to a React component. Write API and database calls.
- **Day 5**: Journal UI. Migrate `journal.html`. Map Journal APIs.

## Week 2: Content & Backend Polish
- **Day 6**: Fitness UI. Migrate `fitness.html`. Connect to `/api/workouts`.
- **Day 7**: Well-Being Pages. Port static therapies (Audio/Yoga/Laughing/Gaming) pages.
- **Day 8**: Database Integration. Confirm end-to-end data saving flows for the actual DB, replacing any mocks.
- **Day 9**: Dashboards & Lists. Create views to list past routines and journal history.
- **Day 10**: Polishing Frontend. Standardize UI layouts (Tailwind/CSS, responsiveness).

## Week 3: CI/CD & Testing
- **Day 11**: API Error Handling. Build client-side loaders, error toasts, and backend parameter checks.
- **Day 12**: CI/CD Setup (Part 1). Construct initial GitHub Actions workflows (`ci.yml`) to govern tests on UI/API.
- **Day 13**: CI/CD Setup (Part 2). Build Heroku staging deployments configuration. Deploy staging code.
- **Day 14**: Environment Prep. Document environment `.env` setups and standard parameters locally.
- **Day 15**: Code Review. Refactor and merge, preparing the branch.

## Week 4: Handoff & Launch
- **Day 16**: Unit Testing. Mock critical APIs and finalize testing on backend/frontend.
- **Day 17**: Integration Testing. User workflow verification (Signup -> Interact -> Results).
- **Day 18**: Chatbot Backend (Prep). Stub empty chatbot endpoints for later sprints without linking frontends.
- **Day 19**: Release Candidate. Merge staging logic into `main`. Deploy to real production domains.
- **Day 20**: Post-Core Planning. Retrospective and next-step outlines for Chatbot/AI expansions.