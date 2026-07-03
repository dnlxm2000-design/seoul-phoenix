/**
 * Merge corrected v2 parser data into a1_2025-26.json
 */
const fs = require('fs');
const path = require('path');
const fam = require('../data/fam-match-data.json');
const a1 = require('../data/a1_2025-26.json');

let updated = 0;
a1.seoul_phoenix.matches.forEach((m, idx) => {
  const f = fam.find(fm => fm.matchNumber == m.match_id);
  if (!f) {
    console.log('[' + idx + '] NO MATCH for match_id:', m.match_id);
    return;
  }
  
  // Update lineups
  m.lineups = f.lineups;
  
  // Update substitutes
  m.substitutes = f.substitutes;
  
  // Update goals (with team names)
  m.goals = f.goals;
  
  // Update other fields
  if (f.kickoff) m.kickoff = f.kickoff;
  if (f.htHome != null) m.htHome = f.htHome;
  if (f.htAway != null) m.htAway = f.htAway;
  if (f.referee) m.referee = f.referee;
  if (f.venue) m.venue = f.venue;
  
  updated++;
});

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'a1_2025-26.json'),
  JSON.stringify(a1, null, 2),
  'utf8'
);

// Verify
const a1v = require('../data/a1_2025-26.json');
let ok = 0, not11 = 0;
a1v.seoul_phoenix.matches.forEach(m => {
  const h = m.lineups?.home?.length || 0;
  const a = m.lineups?.away?.length || 0;
  if (h === 11 && a === 11) ok++;
  else { not11++; console.log('NOT 11/11: match ' + m.match_id + ' ' + m.opponent + ' ' + h + '/' + a); }
});

console.log('\n=== 결과 ===');
console.log('업데이트된 매치:', updated);
console.log('11/11 정상:', ok, '/', a1v.seoul_phoenix.matches.length);
console.log('11/11 아님:', not11);
