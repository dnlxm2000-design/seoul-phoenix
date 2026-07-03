/**
 * Fix goals where scorer is a team name (FAM CMS didn't record player)
 * Mark them as own-goals with proper type
 */
const fs = require('fs');
const path = require('path');
const a1 = require('../data/a1_2025-26.json');

const TEAM_NAMES = [
  'SEOUL PHOENIX FC',
  'JOHOR DARUL TA\'ZIM II', 'MALAYSIAN UNIVERSITY', 'KELANTAN RED WARRIOR FC',
  'MANJUNG CITY FC', 'ARMED FORCES FC', 'KEDAH DARUL AMAN FC', 'BUNGA RAYA FC',
  'IMIGRESEN FC II', 'KELANTAN WTS FC', 'SELANGOR FC II', 'MACHAN FC',
  'UM-DAMANSARA UNITED', 'PERAK FA', 'PERLIS GSA FC', 'KEDAH FA'
];

let fixed = 0;
a1.seoul_phoenix.matches.forEach(m => {
  m.goals.forEach(g => {
    if (TEAM_NAMES.includes(g.name?.trim()) || TEAM_NAMES.includes(g.name?.trim().toUpperCase())) {
      // Scorer is a team name - data quality issue from FAM CMS
      // Mark as unknown
      g.name = null;
      if (g.type !== 'own-goal') {
        // If the scorer is the opponent team, it's likely an own goal
        // Just mark as unknown
        g.type = 'unknown';
      }
      fixed++;
    }
  });
});

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'a1_2025-26.json'),
  JSON.stringify(a1, null, 2),
  'utf8'
);

console.log('Fixed ' + fixed + ' goals with team-name scorers');

// Verify
const a1v = require('../data/a1_2025-26.json');
let remaining = 0;
a1v.seoul_phoenix.matches.forEach(m => {
  m.goals.forEach(g => {
    if (TEAM_NAMES.includes(g.name)) remaining++;
  });
});
console.log('Remaining: ' + remaining);
