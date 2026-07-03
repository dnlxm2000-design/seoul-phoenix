const data = require('../data/fam-match-data.json');
const m = data[0];

console.log('=== Match ===');
console.log('Home:', m.homeTeam, m.homeScore, '-', m.awayScore, m.awayTeam);
console.log('');

console.log('=== Home lineup (' + m.lineups.home.length + ') ===');
m.lineups.home.forEach((p,i) => {
  console.log('  ' + (i+1) + '. #' + p.number, p.name, p.position||'', p.u22?'(U22)':'', p.captain?'(C)':'', p.subOut?'subOut='+p.subOut:'', p.yellowCard?'YC='+p.yellowCard:'');
});

console.log('');
console.log('=== Away lineup (' + m.lineups.away.length + ') ===');
m.lineups.away.forEach((p,i) => {
  console.log('  ' + (i+1) + '. #' + p.number, p.name, p.position||'', p.u22?'(U22)':'', p.captain?'(C)':'', p.subOut?'subOut='+p.subOut:'', p.yellowCard?'YC='+p.yellowCard:'');
});

console.log('');
// Check substitutes for away team
console.log('=== Away substitutes ===');
m.substitutes.filter(s => s.team === 'away' || s.team === 'A').forEach(s => console.log('  ', s.out, '->', s.in, s.time + "'"));

console.log('');
console.log('=== Goals ===');
m.goals.forEach(g => console.log('  ', g.time + "'", g.team, g.scorer, g.assist||'', g.penalty?'(PK)':'', g.ownGoal?'(OG)':''));
