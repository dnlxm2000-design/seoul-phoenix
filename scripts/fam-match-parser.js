#!/usr/bin/env node
/**
 * FAM CMS Match Detail Parser
 * Parses all 29 Seoul Phoenix match pages from FAM CMS
 * Extracts: lineups, goals, yellow/red cards, substitutions
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// All 29 match URLs
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
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
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
  const decoded = decodeHtml(html);
  const result = { url };

  // --- Match Info ---
  // Date: look for date pattern
  const dateMatch = decoded.match(/(\d{2}\/\d{2}\/\d{4})/);
  if (dateMatch) result.date = dateMatch[1];

  // Kickoff time
  const kickoffMatch = decoded.match(/Kick Off\s*[:\-]?\s*(\d{2}:\d{2})/i);
  if (kickoffMatch) result.kickoff = kickoffMatch[1];

  // Venue
  const venueMatch = decoded.match(/Venue\s*[:\-]?\s*([^<\n]+)/i);
  if (venueMatch) result.venue = venueMatch[1].trim();

  // Attendance
  const attendMatch = decoded.match(/Attendance\s*[:\-]?\s*(\d+)/i);
  if (attendMatch) result.attendance = parseInt(attendMatch[1]);

  // --- Score ---
  // Score is in a pattern like: <span ...>2</span> - <span ...>0</span>
  // Or in the match result section
  const scoreMatch = decoded.match(/match-result.*?<span[^>]*>(\d+)<\/span>\s*[-–]\s*<span[^>]*>(\d+)<\/span>/s);
  if (scoreMatch) {
    result.homeScore = parseInt(scoreMatch[1]);
    result.awayScore = parseInt(scoreMatch[2]);
  }

  // Team names in match result
  const teamNameMatches = [...decoded.matchAll(/text-primary">\s*([A-Z][A-Z\s\-&']+FC?)\s*<\/strong>/g)];
  if (teamNameMatches.length >= 2) {
    result.homeTeam = teamNameMatches[0][1].trim();
    result.awayTeam = teamNameMatches[1][1].trim();
  }

  // --- Goal Scorers ---
  result.goals = { home: [], away: [] };
  // Goals section: find "Goal Scorers" then parse each team's goals
  const goalsSection = decoded.split(/Goal Scorers/i)[1];
  if (goalsSection) {
    const goalsBlock = goalsSection.split(/Line-ups/i)[0] || goalsSection.substring(0, 3000);
    const teamBlocks = goalsBlock.split(/text-primary">\s*[A-Z]/);

    // Parse goals for each team
    // Pattern: <span class="badge bg-primary">number</span> <strong>NAME</strong> <small>(G)</small> <span class="badge bg-success">minute'</span>
    const goalPattern = /badge bg-primary[^>]*>(\d+)<\/span>\s*<strong[^>]*>([^<]+)<\/strong>[\s\S]*?<small[^>]*>\(G\)<\/small>[\s\S]*?badge bg-success[^>]*>(\d+)'/g;
    let goalMatch;
    const allGoals = [];
    while ((goalMatch = goalPattern.exec(goalsBlock)) !== null) {
      allGoals.push({
        number: parseInt(goalMatch[1]),
        name: goalMatch[2].trim(),
        minute: parseInt(goalMatch[3]),
      });
    }
    result.goals.all = allGoals;
  }

  // --- Line-ups ---
  result.lineups = { home: [], away: [] };
  const lineupsSection = decoded.split(/Line-ups/i)[1];
  if (lineupsSection) {
    const lineupsBlock = lineupsSection.split(/Substitutes/i)[0] || lineupsSection.substring(0, 8000);

    // Split by team
    const teamHeaders = [...lineupsBlock.matchAll(/text-primary">\s*([A-Z][A-Z\s\-&']+FC?)\s*<\/strong>/g)];

    // For Team A (home): events are on the RIGHT side
    // For Team B (away): events are on the LEFT side

    // Parse player rows
    const playerPattern = /d-flex justify-content-between[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;

    // Simpler approach: find all player entries
    // Each player has: badge number, name, optional badges (GK, C, U22, I), optional events
    const entryPattern = /badge bg-(?:primary|secondary)[^>]*>(\d+)<\/span>\s*(?:<span[^>]*>(?:<strike>U22<\/strike>|U22|I|GK|C)<\/span>\s*)*<strong[^>]*>([^<]+)<\/strong>/g;

    // Actually let me use a more robust approach
    // Split the lineups block into individual player rows
    const rows = lineupsBlock.split(/d-flex justify-content-between/);

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      // Skip team header rows
      if (row.includes('text-center mb-3')) continue;

      // Extract jersey number
      const numMatch = row.match(/badge bg-(?:primary|secondary)[^>]*>(\d+)/);
      if (!numMatch) continue;
      const number = parseInt(numMatch[1]);

      // Extract name
      const nameMatch = row.match(/<strong[^>]*>([^<]+)<\/strong>/);
      if (!nameMatch) continue;
      const name = nameMatch[1].trim();

      // Extract position badge
      let position = '';
      if (row.includes('>GK<')) position = 'GK';
      else if (row.includes('>CB<')) position = 'CB';
      else if (row.includes('>LB<')) position = 'LB';
      else if (row.includes('>RB<')) position = 'RB';
      else if (row.includes('>MF<')) position = 'MF';
      else if (row.includes('>FW<')) position = 'FW';

      // Extract status badges
      const isCaptain = row.includes('>C<') && row.includes('bg-success');
      const isU22 = row.includes('U22') && !row.includes('<strike>U22</strike>');
      const isInternational = row.includes('"I"') || (row.includes('>I<') && row.includes('#ff5735'));

      // Extract events (yellow card, red card, substitution out)
      let yellowCard = null;
      let redCard = null;
      let subOut = null;

      // Yellow card: kkuning.png with minute
      const yellowMatch = row.match(/kkuning\.png[^>]*>(\d+)/);
      if (yellowMatch) yellowCard = parseInt(yellowMatch[1]);

      // Red card: kmerah.png with minute
      const redMatch = row.match(/kmerah\.png[^>]*>(\d+)/);
      if (redMatch) redCard = parseInt(redMatch[1]);

      // Substitution out: ▼ (▼) with minute
      const subOutMatch = row.match(/▼(\d+)/);
      if (subOutMatch) subOut = parseInt(subOutMatch[1]);

      const player = {
        number,
        name,
        position: position || undefined,
        captain: isCaptain || undefined,
        u22: isU22 || undefined,
        international: isInternational || undefined,
        yellowCard,
        redCard,
        subOut,
      };

      // Clean undefined
      Object.keys(player).forEach(k => player[k] === undefined && delete player[k]);

      // Determine if this is home or away based on position in the block
      // Team A comes first, Team B comes second
      if (i < rows.length / 2) {
        result.lineups.home.push(player);
      } else {
        result.lineups.away.push(player);
      }
    }
  }

  // --- Substitutes ---
  result.substitutes = { home: [], away: [] };
  const subsSection = decoded.split(/Substitutes/i)[1];
  if (subsSection) {
    const subsBlock = subsSection.split(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/)[0] || subsSection.substring(0, 8000);

    const rows = subsBlock.split(/d-flex justify-content-between/);
    let isHome = true;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      // Skip team header rows
      if (row.includes('text-center mb-3')) {
        if (row.includes('SEOUL') || row.includes('Team B')) isHome = false;
        continue;
      }

      // Extract jersey number
      const numMatch = row.match(/badge bg-secondary[^>]*>(\d+)/);
      if (!numMatch) continue;
      const number = parseInt(numMatch[1]);

      // Extract name
      const nameMatch = row.match(/<strong[^>]*>([^<]+)<\/strong>/);
      if (!nameMatch) continue;
      const name = nameMatch[1].trim();

      // Extract position badge
      let position = '';
      if (row.includes('>GK<')) position = 'GK';

      // Extract status badges
      const isU22 = row.includes('U22') && !row.includes('<strike>U22</strike>');

      // Extract events (substitution in)
      let subIn = null;
      const subInMatch = row.match(/▲(\d+)/);
      if (subInMatch) subIn = parseInt(subInMatch[1]);

      // Extract sub number
      let subNumber = null;
      const subNumMatch = row.match(/<sub>(\d+)<\/sub>/);
      if (subNumMatch) subNumber = parseInt(subNumMatch[1]);

      const player = {
        number,
        name,
        position: position || undefined,
        u22: isU22 || undefined,
        subIn,
        subNumber,
      };

      Object.keys(player).forEach(k => player[k] === undefined && delete player[k]);

      if (isHome) {
        result.substitutes.home.push(player);
      } else {
        result.substitutes.away.push(player);
      }
    }
  }

  return result;
}

async function main() {
  console.log('Starting FAM CMS match parser...');
  console.log(`Will parse ${MATCH_URLS.length} matches`);

  const results = [];
  const delay = ms => new Promise(r => setTimeout(r, ms));

  for (let i = 0; i < MATCH_URLS.length; i++) {
    const url = MATCH_URLS[i];
    console.log(`\n[${i + 1}/${MATCH_URLS.length}] Fetching: ${url}`);

    try {
      const html = await fetchUrl(url);
      console.log(`  HTML length: ${html.length}`);

      const match = parseMatchPage(html, url);
      match.index = i + 1;

      console.log(`  Teams: ${match.homeTeam || '?'} vs ${match.awayTeam || '?'}`);
      console.log(`  Score: ${match.homeScore ?? '?'} - ${match.awayScore ?? '?'}`);
      console.log(`  Date: ${match.date || '?'}`);
      console.log(`  Goals: ${match.goals?.all?.length || 0}`);
      console.log(`  Home lineup: ${match.lineups?.home?.length || 0} players`);
      console.log(`  Away lineup: ${match.lineups?.away?.length || 0} players`);
      console.log(`  Home subs: ${match.substitutes?.home?.length || 0} players`);
      console.log(`  Away subs: ${match.substitutes?.away?.length || 0} players`);

      // Count cards
      const allPlayers = [
        ...(match.lineups?.home || []),
        ...(match.lineups?.away || []),
        ...(match.substitutes?.home || []),
        ...(match.substitutes?.away || []),
      ];
      const yellows = allPlayers.filter(p => p.yellowCard !== null && p.yellowCard !== undefined);
      const reds = allPlayers.filter(p => p.redCard !== null && p.redCard !== undefined);
      const subsOut = allPlayers.filter(p => p.subOut !== null && p.subOut !== undefined);
      const subsIn = [
        ...(match.substitutes?.home || []),
        ...(match.substitutes?.away || []),
      ].filter(p => p.subIn !== null && p.subIn !== undefined);

      console.log(`  Yellow cards: ${yellows.length}`);
      console.log(`  Red cards: ${reds.length}`);
      console.log(`  Substitutions out: ${subsOut.length}`);
      console.log(`  Substitutions in: ${subsIn.length}`);

      results.push(match);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      results.push({ index: i + 1, url, error: err.message });
    }

    // Rate limit: wait 500ms between requests
    if (i < MATCH_URLS.length - 1) await delay(500);
  }

  // Save results
  const outPath = path.join(__dirname, '..', 'data', 'fam-match-data.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n\nSaved ${results.length} matches to ${outPath}`);

  // Summary
  let totalGoals = 0, totalYellows = 0, totalReds = 0, totalSubs = 0;
  results.forEach(m => {
    totalGoals += m.goals?.all?.length || 0;
    const allP = [...(m.lineups?.home||[]), ...(m.lineups?.away||[]), ...(m.substitutes?.home||[]), ...(m.substitutes?.away||[])];
    totalYellows += allP.filter(p => p.yellowCard != null).length;
    totalReds += allP.filter(p => p.redCard != null).length;
    totalSubs += allP.filter(p => p.subOut != null).length;
  });
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total goals: ${totalGoals}`);
  console.log(`Total yellow cards: ${totalYellows}`);
  console.log(`Total red cards: ${totalReds}`);
  console.log(`Total substitutions: ${totalSubs}`);
}

main().catch(console.error);
