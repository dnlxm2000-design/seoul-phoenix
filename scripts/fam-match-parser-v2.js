#!/usr/bin/env node
/**
 * FAM CMS Match Detail Parser v2
 * Parses all 29 Seoul Phoenix match pages from FAM CMS
 * Extracts: lineups, goals, yellow/red cards, substitutions
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MATCH_URLS = [
  'https://cms.fam.org.my/resultdetail/czo0OiI3OTg1Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MDIzIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MDg1Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MTEzIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MTYzIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MjI2Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MjkxIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MzUzIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4MzgwIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NDI1Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NDM0Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NDY0Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NTA4Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NTIzIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NTQ3Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NTcyIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NjA4Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NjE3Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NjM0Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NjQ4Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NjY2Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NzEzIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NzI0Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NzYwIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4NzczIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4ODE1Ijs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4ODUwIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4ODgyIjs%3D/W2025MA1',
  'https://cms.fam.org.my/resultdetail/czo0OiI4OTE5Ijs%3D/W2025MA1',
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function decodeHtml(html) {
  return html
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseMatchPage(html, url) {
  const h = decodeHtml(html);
  const result = { url };

  // --- Match Info ---
  const matchNumMatch = h.match(/Match\s+(\d+)/);
  if (matchNumMatch) result.matchNumber = parseInt(matchNumMatch[1]);

  // Date: look in match-info-minimal section
  const dateMatch = h.match(/fa-calendar[^<]*<\/i>\s*([A-Z][a-z]+\s+\d+\s+\d{4})/);
  if (dateMatch) result.date = dateMatch[1].trim();

  const timeMatch = h.match(/fa-clock[^<]*<\/i>\s*(\d+:\d+\s*[AP]M)/i);
  if (timeMatch) result.kickoff = timeMatch[1].trim();

  const venueMatch = h.match(/fa-map-marker-alt[^<]*<\/i>\s*([A-Z][A-Z\s\d'.,]+?)(?:\s*<)/);
  if (venueMatch) result.venue = venueMatch[1].trim();

  const potmMatch = h.match(/Player Of The Match[\s\S]*?<div class="fw-bold">([^<]+)<\/div>/);
  if (potmMatch && potmMatch[1].trim() !== 'None') result.playerOfTheMatch = potmMatch[1].trim();

  const refMatch = h.match(/Referee[\s\S]*?<div class="fw-bold">([^<]+)<\/div>/);
  if (refMatch) result.referee = refMatch[1].trim();

  // --- Team Names ---
  const teamALogoIdx = h.indexOf('Team A Logo');
  const teamBLogoIdx = h.indexOf('Team B Logo');
  if (teamALogoIdx > 0) {
    const m = h.substring(teamALogoIdx).match(/fw-bold">([^<]+)</);
    if (m) result.homeTeam = m[1].trim();
  }
  if (teamBLogoIdx > 0) {
    const m = h.substring(teamBLogoIdx).match(/fw-bold">([^<]+)</);
    if (m) result.awayTeam = m[1].trim();
  }

  // --- Score ---
  const scorePattern = /bg-primary text-white rounded[^>]*>\s*(\d+)\s*<\/div>/g;
  const scores = [];
  let sm;
  while ((sm = scorePattern.exec(h)) !== null) scores.push(parseInt(sm[1]));
  if (scores.length >= 2) {
    result.homeScore = scores[0];
    result.awayScore = scores[1];
  }

  const htMatch = h.match(/HT:\s*(\d+)-(\d+)/);
  if (htMatch) { result.htHome = parseInt(htMatch[1]); result.htAway = parseInt(htMatch[2]); }

  // --- Goal Scorers ---
  result.goals = [];
  const gsIdx = h.indexOf('Goal Scorers');
  if (gsIdx > 0) {
    const nextSection = h.indexOf('Line-ups', gsIdx);
    const gsBlock = h.substring(gsIdx, nextSection > 0 ? nextSection : gsIdx + 10000);

    // Get team names from goal scorers header
    const teamAGsName = gsBlock.match(/Team A Goals[\s\S]*?text-primary">\s*([^<]+)/);
    const teamBGsName = gsBlock.match(/Team B Goals[\s\S]*?text-primary">\s*([^<]+)/);
    const teamAName = teamAGsName ? teamAGsName[1].trim() : result.homeTeam;
    const teamBName = teamBGsName ? teamBGsName[1].trim() : result.awayTeam;

    // Find the actual goal entries - look for badge bg-success (goal minute) patterns
    const goalEntryPattern = /<span class="badge bg-success[^>]*>(\d+[^<]*)<\/span>[\s\S]*?<strong[^>]*>([^<]+)<\/strong>[\s\S]*?<span class="badge bg-primary[^>]*>(\d+)/g;
    let goalMatch;
    while ((goalMatch = goalEntryPattern.exec(gsBlock)) !== null) {
      const minute = goalMatch[1].trim().replace("'", "");
      const name = goalMatch[2].trim();
      const number = parseInt(goalMatch[3]);
      
      // Determine goal type
      let goalType = 'normal';
      const context = gsBlock.substring(goalMatch.index - 200, goalMatch.index);
      if (context.includes('(OG)')) goalType = 'own-goal';
      else if (context.includes('(PG)')) goalType = 'penalty';

      // Determine which team - check if this goal is before or after "Team B Goals" marker
      const teamBIdx = gsBlock.indexOf('Team B Goals');
      const goalIdx = goalMatch.index;
      const team = goalIdx > teamBIdx ? teamBName : teamAName;

      result.goals.push({ team, minute: parseInt(minute) || minute, name, number, type: goalType });
    }
  }

  // --- Line-ups ---
  result.lineups = { home: [], away: [] };
  const luIdx = h.indexOf('Line-ups');
  if (luIdx > 0) {
    const subsIdx = h.indexOf('Substitutes', luIdx);
    const luBlock = h.substring(luIdx, subsIdx > 0 ? subsIdx : luIdx + 30000);

    // Split properly: Team A section ends where Team B section begins
    const teamARaw = luBlock.split(/Team A Line-up/)[1];
    const teamABlock = teamARaw ? teamARaw.split(/Team B Line-up/)[0] : null;
    const teamBBlock = luBlock.split(/Team B Line-up/)[1];

    function parseLineupPlayers(block) {
      if (!block) return [];
      const players = [];
      const rows = block.split(/d-flex justify-content-between/);

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.includes('text-center mb-3')) continue;

        const numMatch = row.match(/badge bg-primary[^>]*>(\d+)/);
        if (!numMatch) continue;
        const number = parseInt(numMatch[1]);

        const nameMatch = row.match(/<strong[^>]*>([^<]+)<\/strong>/);
        if (!nameMatch) continue;
        const name = nameMatch[1].trim();

        const isCaptain = row.includes('>C<') && row.includes('bg-success');
        const isU22 = row.includes('U22') && !row.includes('<strike>U22</strike>');
        const isGK = row.includes('>GK<');

        let yellowCard = null;
        let redCard = null;
        let subOut = null;

        const yellowMatch = row.match(/kkuning\.png[^>]*>(\d+[^'<]*)/);
        if (yellowMatch) yellowCard = yellowMatch[1].trim();

        const redMatch = row.match(/kmerah\.png[^>]*>(\d+[^'<]*)/);
        if (redMatch) redCard = redMatch[1].trim();

        const subOutMatch = row.match(/▼(\d+)/);
        if (subOutMatch) subOut = parseInt(subOutMatch[1]);

        const player = { number, name };
        if (isGK) player.position = 'GK';
        if (isCaptain) player.captain = true;
        if (isU22) player.u22 = true;
        if (yellowCard) player.yellowCard = yellowCard;
        if (redCard) player.redCard = redCard;
        if (subOut !== null) player.subOut = subOut;

        players.push(player);
      }
      return players;
    }

    if (teamABlock) result.lineups.home = parseLineupPlayers(teamABlock);
    if (teamBBlock) result.lineups.away = parseLineupPlayers(teamBBlock);
  }

  // --- Substitutes ---
  result.substitutes = { home: [], away: [] };
  const subIdx = h.indexOf('Substitutes');
  if (subIdx > 0) {
    const subBlock = h.substring(subIdx, subIdx + 20000);

    const teamASubBlock = subBlock.split(/Team A Substitutes/)[1];
    const teamBSubBlock = subBlock.split(/Team B Substitutes/)[1];

    function parseSubPlayers(block) {
      if (!block) return [];
      const players = [];
      const rows = block.split(/d-flex justify-content-between/);

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.includes('text-center mb-3')) continue;

        const numMatch = row.match(/badge bg-secondary[^>]*>(\d+)/);
        if (!numMatch) continue;
        const number = parseInt(numMatch[1]);

        const nameMatch = row.match(/<strong[^>]*>([^<]+)<\/strong>/);
        if (!nameMatch) continue;
        const name = nameMatch[1].trim();

        const isGK = row.includes('>GK<');
        const isU22 = row.includes('U22') && !row.includes('<strike>U22</strike>');

        let subIn = null;
        const subInMatch = row.match(/▲(\d+)/);
        if (subInMatch) subIn = parseInt(subInMatch[1]);

        let subNumber = null;
        const subNumMatch = row.match(/<sub>(\d+)<\/sub>/);
        if (subNumMatch) subNumber = parseInt(subNumMatch[1]);

        const player = { number, name };
        if (isGK) player.position = 'GK';
        if (isU22) player.u22 = true;
        if (subIn !== null) player.subIn = subIn;
        if (subNumber !== null) player.subNumber = subNumber;

        players.push(player);
      }
      return players;
    }

    if (teamASubBlock) result.substitutes.home = parseSubPlayers(teamASubBlock);
    if (teamBSubBlock) result.substitutes.away = parseSubPlayers(teamBSubBlock);
  }

  return result;
}

async function main() {
  console.log('Starting FAM CMS match parser v2...');
  console.log(`Will parse ${MATCH_URLS.length} matches\n`);

  const results = [];
  const delay = ms => new Promise(r => setTimeout(r, ms));

  for (let i = 0; i < MATCH_URLS.length; i++) {
    const url = MATCH_URLS[i];
    process.stdout.write(`[${i + 1}/${MATCH_URLS.length}] `);

    try {
      const html = await fetchUrl(url);
      const match = parseMatchPage(html, url);
      match.index = i + 1;

      const home = match.homeTeam || '?';
      const away = match.awayTeam || '?';
      const score = match.homeScore != null ? `${match.homeScore}-${match.awayScore}` : '?-?';

      console.log(`${home} vs ${away} (${score}) | ${match.date || '?'}`);
      console.log(`  Goals: ${match.goals.length} | Lineup H/A: ${match.lineups.home.length}/${match.lineups.away.length} | Subs H/A: ${match.substitutes.home.length}/${match.substitutes.away.length}`);

      const allPlayers = [
        ...match.lineups.home, ...match.lineups.away,
        ...match.substitutes.home, ...match.substitutes.away,
      ];
      const yellows = allPlayers.filter(p => p.yellowCard);
      const reds = allPlayers.filter(p => p.redCard);
      if (yellows.length > 0) console.log(`  Yellows: ${yellows.map(p => `${p.name}(${p.yellowCard})`).join(', ')}`);
      if (reds.length > 0) console.log(`  Reds: ${reds.map(p => `${p.name}(${p.redCard})`).join(', ')}`);

      results.push(match);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results.push({ index: i + 1, url, error: err.message });
    }

    if (i < MATCH_URLS.length - 1) await delay(500);
  }

  const outPath = path.join(__dirname, '..', 'data', 'fam-match-data.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nSaved ${results.length} matches to ${outPath}`);

  let totalGoals = 0, totalYellows = 0, totalReds = 0, totalSubs = 0;
  results.forEach(m => {
    totalGoals += m.goals?.length || 0;
    const allP = [...(m.lineups?.home||[]), ...(m.lineups?.away||[]), ...(m.substitutes?.home||[]), ...(m.substitutes?.away||[])];
    totalYellows += allP.filter(p => p.yellowCard).length;
    totalReds += allP.filter(p => p.redCard).length;
    totalSubs += allP.filter(p => p.subOut != null || p.subIn != null).length;
  });
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total goals: ${totalGoals}`);
  console.log(`Total yellow cards: ${totalYellows}`);
  console.log(`Total red cards: ${totalReds}`);
  console.log(`Total substitution events: ${totalSubs}`);
}

main().catch(console.error);
