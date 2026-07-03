const fam = require('../data/fam-match-data.json');

console.log('=== 29경기 라인업 분석 ===');
let totalHome = 0, totalAway = 0;
let mismatches = [];

fam.forEach((m, idx) => {
  const home = m.lineups?.home?.length || 0;
  const away = m.lineups?.away?.length || 0;
  totalHome += home;
  totalAway += away;
  
  // Check if last home player could be Seoul player
  const lastHome = m.lineups?.home?.[home-1];
  const firstAway = m.lineups?.away?.[0];
  
  // Check home lineup - does it contain any Seoul-looking players?
  const homeNames = m.lineups?.home?.map(p => p.name) || [];
  const koreanNames = homeNames.filter(n => /[A-Z]{2,}/.test(n) && !n.includes('BIN') && !n.includes('BINTI'));
  const malayNames = homeNames.filter(n => n.includes('BIN') || n.includes('BINTI') || n.includes('MUHAMMAD'));
  
  const awayNames = m.lineups?.away?.map(p => p.name) || [];
  const awayKorean = awayNames.filter(n => /[A-Z]{2,}/.test(n) && !n.includes('BIN') && !n.includes('BINTI'));
  
  console.log('[' + idx + '] ' + m.homeTeam + ' vs ' + m.awayTeam);
  console.log('    home:' + home + ' away:' + away + 
    ' | korean_in_home:' + koreanNames.length + ' korean_in_away:' + awayKorean.length +
    ' | malay_in_home:' + malayNames.length);
  
  if (home !== 11 || away !== 11) {
    mismatches.push({idx, home, away, korean_in_home: koreanNames.length, hometeam: m.homeTeam, awayteam: m.awayTeam});
  }
  
  if (koreanNames.length > 0) {
    console.log('    >>> Korean players in HOME lineup: ' + koreanNames.join(', '));
  }
});

console.log('\n=== 요약 ===');
console.log('평균 홈:' + (totalHome/fam.length).toFixed(1) + ' 원정:' + (totalAway/fam.length).toFixed(1));
console.log('11명 아닌 매치: ' + mismatches.length + '/' + fam.length);
mismatches.forEach(m => {
  console.log('  [' + m.idx + '] home:' + m.home + ' away:' + m.away + ' korean_in_home:' + m.korean_in_home + ' ' + m.hometeam + ' vs ' + m.awayteam);
});
