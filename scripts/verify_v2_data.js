const fam = require('../data/fam-match-data.json');

console.log('=== v2 파서 결과 검증 ===');
let ok = 0;
let issues = [];

fam.forEach((m, idx) => {
  const h = m.lineups?.home?.length || 0;
  const a = m.lineups?.away?.length || 0;
  const hSubs = m.substitutes?.home?.length || 0;
  const aSubs = m.substitutes?.away?.length || 0;
  
  const status = (h === 11 && a === 11) ? 'OK' : (h + '/' + a);
  if (status === 'OK') ok++;
  else issues.push({idx, home: h, away: a, homeTeam: m.homeTeam, awayTeam: m.awayTeam});
  
  console.log('[' + idx + '] ' + m.homeTeam.padEnd(35) + ' vs ' + m.awayTeam.padEnd(25) + 
    ' L:' + h + '/' + a + ' S:' + hSubs + '/' + aSubs + ' G:' + (m.goals?.length||0) + ' ' + status);
});

console.log('\n=== 요약 ===');
console.log('11/11 정상: ' + ok + '/' + fam.length);
console.log('문제: ' + issues.length);
issues.forEach(i => console.log('  [' + i.idx + '] ' + i.homeTeam + ' vs ' + i.awayTeam + ' -> ' + i.home + '/' + i.away));

// Check match 0 specifically 
console.log('\n=== 첫번째 매치 라인업 상세 ===');
const m0 = fam[0];
console.log('Home (' + m0.lineups.home.length + '):');
m0.lineups.home.forEach((p,i) => console.log('  ' + (i+1) + '. #' + p.number + ' ' + p.name + (p.position ? ' ('+p.position+')' : '')));
console.log('Away (' + m0.lineups.away.length + '):');
m0.lineups.away.forEach((p,i) => console.log('  ' + (i+1) + '. #' + p.number + ' ' + p.name + (p.position ? ' ('+p.position+')' : '')));

// Check if NORONHA is now in away
const noronhaHome = m0.lineups.home.find(p => p.name.includes('NORONHA'));
const noronhaAway = m0.lineups.away.find(p => p.name.includes('NORONHA'));
console.log('\nNORONHA in home: ' + !!noronhaHome + ', in away: ' + !!noronhaAway);

// Check goals structure
console.log('\n=== Goals 구조 ===');
console.log(JSON.stringify(m0.goals[0], null, 2));
