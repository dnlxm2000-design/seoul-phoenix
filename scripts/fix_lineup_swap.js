/**
 * Fix: swap lineups for matches where FAM CMS Team order != actual home/away
 */
const fs = require('fs');
const path = require('path');
const fam = require('../data/fam-match-data.json');
const a1 = require('../data/a1_2025-26.json');

let swapped = 0;
a1.seoul_phoenix.matches.forEach((m, idx) => {
  const f = fam.find(fm => fm.matchNumber == m.match_id);
  if (!f) return;
  
  const famHomeIsSeoul = f.homeTeam && f.homeTeam.includes('SEOUL');
  const needsSwap = (m.home_away === 'away' && famHomeIsSeoul);
  
  if (needsSwap) {
    console.log('SWAP: match_id=' + m.match_id + ' ' + f.homeTeam + ' vs ' + f.awayTeam + 
      ' (a1 says Seoul=' + m.home_away + ')');
    
    // Swap lineups
    const tmpLineup = m.lineups.home;
    m.lineups.home = m.lineups.away;
    m.lineups.away = tmpLineup;
    
    // Swap substitutes
    const tmpSubs = m.substitutes.home;
    m.substitutes.home = m.substitutes.away;
    m.substitutes.away = tmpSubs;
    
    swapped++;
  }
});

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'a1_2025-26.json'),
  JSON.stringify(a1, null, 2),
  'utf8'
);

// Verify
console.log('\n=== 최종 검증 ===');
a1.seoul_phoenix.matches.forEach((m, idx) => {
  const f = fam.find(fm => fm.matchNumber == m.match_id);
  const homeLineupIsSeoul = m.lineups.home && m.lineups.home.some(p => 
    !p.name.includes('BIN') && !p.name.includes('BINTI') && p.name.length > 3 &&
    !p.name.includes('MUHAMMAD') && !p.name.includes('MOHD'));
  
  const isSeoulHome = m.home_away === 'home';
  const Ok = (isSeoulHome && homeLineupIsSeoul) || (!isSeoulHome && !homeLineupIsSeoul);
  
  console.log('[' + idx + '] match=' + m.match_id + ' SEOUL=' + (isSeoulHome?'HOME':'AWAY') + 
    ' | homeLineup=' + (m.lineups.home?.[0]?.name?.substring(0,20) || '?') + 
    (Ok ? ' ✓' : ' ✗'));
});

console.log('\nSwapped:', swapped, '/ 29');
