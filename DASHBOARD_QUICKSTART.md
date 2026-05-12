# Dashboard Quick Start Guide

## Testing the Dashboard

### Prerequisites

- Server running on port 5000
- Client running on port 5173 (Vite)
- PostgreSQL database with prisma migrations applied
- Authenticated user (login required)

### How to Test

1. **Start the Server**

   ```bash
   cd server
   npm run dev
   # or
   npm start
   ```

2. **Start the Client**

   ```bash
   cd client
   npm run dev
   ```

3. **Access the Dashboard**
   - Navigate to `http://localhost:5173`
   - Login with your credentials
   - You'll see the Dashboard as the home page

### What You'll See

The dashboard displays:

1. **Welcome Header**
   - Time-based greeting ("Good morning/afternoon/evening, [Name]")
   - Subtitle: "Here's your wellness snapshot for today"

2. **Summary Cards Grid** (4 cards on desktop, responsive on mobile)
   - Total Mood Entries (😊)
   - Total Journal Entries (📝)
   - Total Workouts (🏃)
   - Total Workout Minutes (⏱️)

3. **Latest Entry Snapshots** (3 cards on desktop, stacked on mobile)
   - Latest Mood: Shows mood level with emoji + optional note
   - Latest Journal: Shows title + date
   - Latest Workout: Shows title, type, duration, exercise count

4. **Recent Activity Feed**
   - Chronological list of up to 15 recent activities
   - Mix of moods, journals, and workouts
   - Relative timestamps (just now, 2h ago, etc.)
   - Activity icons for quick visual scanning

### Testing Scenarios

**Scenario 1: New User (No Data)**

- All counters show 0
- Snapshots show empty states
- Activity feed shows "No activities yet"
- Each empty state has encouraging message

**Scenario 2: User with Some Data**

- Counters show aggregated data
- Snapshots show latest from each category
- Activity feed shows mixed activities
- Timestamps display properly (just now, yesterday, etc.)

**Scenario 3: Mobile Responsiveness**

- Open dashboard on mobile device or resize browser
- Grid switches from 4 columns → 2 columns → 1 column
- Snapshots switch from 3 columns → stacked
- All text remains readable
- Touch targets are appropriately sized

### API Endpoint Testing

**Using Postman or curl:**

```bash
curl -X GET http://localhost:5000/api/dashboard/overview \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "summaryCards": {
      "moodEntries": 10,
      "journalEntries": 5,
      "workoutSessions": 3,
      "workoutMinutes": 120
    },
    "latestMood": { ... },
    "latestJournal": { ... },
    "latestWorkout": { ... },
    "recentActivities": [ ... ]
  }
}
```

## File Structure Reference

### Backend

```
server/src/modules/dashboard/
├── dashboard.types.ts      # Type definitions
├── dashboard.service.ts    # Business logic (aggregation queries)
├── dashboard.controller.ts # Request handling
└── dashboard.routes.ts     # Route definition
```

### Frontend

```
client/src/features/dashboard/
├── api/
│   └── dashboard.api.ts            # API client
├── components/
│   ├── PageContainer.tsx           # Layout wrapper
│   ├── LoadingSpinner.tsx          # Loading state
│   ├── EmptyState.tsx              # Empty state UI
│   ├── SummaryCard.tsx             # Summary card
│   ├── SectionCard.tsx             # Section wrapper
│   ├── WelcomeSection.tsx          # Welcome header
│   ├── SummaryCardsGrid.tsx        # Summary grid
│   ├── SnapshotsSection.tsx        # Snapshots
│   └── RecentActivityFeed.tsx      # Activity feed
├── hooks/
│   └── useDashboard.ts             # Data fetching hook
├── pages/
│   └── DashboardPage.tsx           # Main page
├── types/
│   └── dashboard.types.ts          # TypeScript types
└── index.ts                        # Exports

```

## Troubleshooting

### Dashboard shows "Failed to load"

- Check server is running on port 5000
- Verify JWT token is valid
- Check browser console for errors
- Ensure API endpoint is accessible

### No data displayed

- Verify user has created moods, journals, or workouts
- Check database has data for authenticated user
- Verify timestamps are not in the future

### Styling looks off

- Ensure Tailwind CSS is properly configured
- Check client is using production build or dev server
- Clear browser cache

### Empty states not showing

- User needs to have zero entries in a category
- Empty states have encouraging messages with icons
- Create some data to see populated states

## Next Steps

- Add date range filtering
- Implement mood trend visualization
- Add wellness streaks
- Create weekly/monthly summaries
- Add data export functionality
- Integrate with notification system
