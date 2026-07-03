/**
 * Add homeTeamDisplay/awayTeamDisplay to each match.
 * These control which team name shows on LEFT/RIGHT columns,
 * ensuring consistency with lineups.home/away.
 */
const fs = require('fs');
const path = require('path');
const fam = require('../data/fam-match-data.json');
const a1 = require('../data/a1_2025-26.json');

const TEAM_DISPLAY = {
  'Johor Darul Ta\'zim II': 'JDT II',
  'Malaysian University': 'Malaysian Univ.',
  'Kelantan Red Warrior FC': 'Kelantan Red Warrior',
  'Manjung City FC': 'Manjung City',
  'Armed Forces FC': 'ATM Angkatan Tentera',
  'Kedah Darul Aman FC': 'Kedah Darul Aman',
  'Bunga Raya FC': 'Bunga Raya',
  'Imigresen FC II': 'Imigresen II',
  'Kelantan WTS FC': 'Kelantan WTS',
  'Selangor FC II': 'Selangor II',
  'Machan FC': 'Machan FC',
  'UM-Damansara United': 'UM-Damansara Utd',
  'Perak FA': 'Perak FA',
  'Perlis GSA FC': 'Perlis GSA',
  'Kedah FA': 'Kedah FA',
};

function displayName(team) {
  if (!team) return '';
  return TEAM_DISPLAY[team] || team;
}

a1.seoul_phoenix.matches.forEach((m) => {
  const f = fam.find(fm => fm.matchNumber == m.match_id);
  
  // Determine the real team order from FAM CMS
  const famSeoulIsLeft = f && f.homeTeam && f.homeTeam.includes('SEOUL');
  
  // For display: who goes on LEFT vs RIGHT?
  // home/away matches: left = home team
  // neutral matches: left = FAM CMS Team A
  let seoulOnLeft;
  if (m.home_away === 'home') {
    seoulOnLeft = true;
  } else if (m.home_away === 'away') {
    seoulOnLeft = false;
  } else { // neutral
    // For neutral venues, Seoul is usually listed first in FAM CMS
    seoulOnLeft = famSeoulIsLeft;
  }
  
  // Set goal filter team names (uppercase from FAM)
  const seoulUppercase = 'SEOUL PHOENIX FC';
  const opponentUppercase = m.opponent.toUpperCase();
  
  m.homeTeamDisplay = seoulOnLeft ? '서울피닉스FC' : displayName(m.opponent);
  m.awayTeamDisplay = seoulOnLeft ? displayName(m.opponent) : '서울피닉스FC';
  m.homeTeamName = seoulOnLeft ? seoulUppercase : opponentUppercase;
  m.awayTeamName = seoulOnLeft ? opponentUppercase : seoulUppercase;
});

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'a1_2025-26.json'),
  JSON.stringify(a1, null, 2),
  'utf8'
);

// Verify
console.log('=== Display fields 검증 ===');
a1.seoul_phoenix.matches.forEach((m, idx) => {
  const isSeoulLeft = m.homeTeamDisplay === '서울피닉스FC';
  const correctLineup = m.lineups.home.some(p => p.name.includes('YOUNG') || p.name.includes('NORONHA') || p.name.includes('VIKNES'));
  const match = (isSeoulLeft === correctLineup);
  const marker = match ? '' : ' <<< MISMATCH!';
  if (!match) {
    console.log('[' + idx + '] match=' + m.match_id + ' displayLeft=' + m.homeTeamDisplay + ' homeLineupIsSeoul=' + correctLineup + marker);
  }
});
console.log('\nVerification complete.');
