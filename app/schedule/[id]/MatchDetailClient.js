'use client';

import Link from 'next/link';
import { useMemo } from 'react';

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
  return TEAM_DISPLAY[team] || team;
}

function getResultLabel(result) {
  if (result === 'W') return { text: '승', class: 'text-green-500 bg-green-500/10' };
  if (result === 'L') return { text: '패', class: 'text-red-500 bg-red-500/10' };
  return { text: '무', class: 'text-yellow-500 bg-yellow-500/10' };
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const wd = days[d.getDay()];
  return `${y}.${m}.${day} (${wd})`;
}

export default function MatchDetailClient({ match, stadiums }) {
  const seoulScore = match.scores.seoul;
  const oppScore = match.scores.opponent;
  const resultInfo = getResultLabel(match.result);

  const isSeoulOnLeft = match.homeTeamName === 'SEOUL PHOENIX FC';
  const homeScore = isSeoulOnLeft ? seoulScore : oppScore;
  const awayScore = isSeoulOnLeft ? oppScore : seoulScore;
  const leftWon = homeScore > awayScore;
  const leftLost = homeScore < awayScore;

  const stadiumInfo = useMemo(() => {
    return stadiums.find((s) => {
      const venue = match.venue.toLowerCase();
      return s.stadium.toLowerCase().includes(venue.slice(0, 15)) || venue.includes(s.stadium.toLowerCase().slice(0, 10));
    });
  }, [match.venue, stadiums]);

  const monthLabel = (() => {
    const d = new Date(match.date + 'T12:00:00');
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
  })();

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      {/* Page Header */}
      <section className="relative py-12 lg:py-16 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            경기 일정으로
          </Link>

          {/* Match Header Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 mb-6">
            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-brand-gray bg-white/10 px-3 py-1 rounded-full">
                Match #{match.match_id} · Liga A1 Semi-Pro 2025/2026
              </span>
            </div>

            {/* Score Board */}
            <div className="grid grid-cols-3 gap-4 items-center mb-6">
              <div className="text-right">
                <p className={`text-lg lg:text-xl font-extrabold ${isSeoulOnLeft ? 'text-brand-red' : 'text-white'}`}>
                  {match.homeTeamDisplay}
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full text-brand-gray bg-white/10">
                  HOME
                </span>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10">
                  <span className={`text-4xl lg:text-5xl font-black ${leftWon ? 'text-green-400' : leftLost ? 'text-red-400' : 'text-white'}`}>
                    {homeScore}
                  </span>
                  <span className="text-2xl text-white/40 font-bold">:</span>
                  <span className={`text-4xl lg:text-5xl font-black ${leftLost ? 'text-green-400' : leftWon ? 'text-red-400' : 'text-white'}`}>
                    {awayScore}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                    FULL TIME
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${resultInfo.class}`}>
                    {resultInfo.text}
                  </span>
                </div>
              </div>
              <div className="text-left">
                <p className={`text-lg lg:text-xl font-extrabold ${!isSeoulOnLeft ? 'text-brand-red' : 'text-white'}`}>
                  {match.awayTeamDisplay}
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full text-brand-gray bg-white/10">
                  AWAY
                </span>
              </div>
            </div>

            {/* Match Meta */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(match.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {match.venue}
              </span>
              {match.htHome !== undefined && match.htAway !== undefined && (
                <span className="text-white/30">
                  전반: {match.htHome}-{match.htAway}
                </span>
              )}
            </div>
          </div>

          {/* Goal Scorers Section */}
          {match.goals && match.goals.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 mb-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                득점
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Home Goals */}
                <div>
                  <div className="text-center mb-3">
                    <div className="inline-block bg-white/10 rounded-lg px-4 py-1.5">
                      <span className="text-sm font-bold text-white">{match.homeTeamDisplay}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {match.goals
                      .filter(g => g.team === match.homeTeamName)
                      .map((g, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-sm">⚽</span>
                            <span className="text-white text-sm">
                              {g.name || <span className="text-white/50">(정보 없음)</span>}
                            </span>
                            {g.type === 'own-goal' && <span className="text-xs text-red-400">(자책골)</span>}
                            {g.type === 'penalty' && <span className="text-xs text-yellow-400">(페널티)</span>}
                          </div>
                          <span className="text-brand-red font-bold text-sm">{g.minute}'</span>
                        </div>
                      ))}
                    {match.goals.filter(g => g.team === match.homeTeamName).length === 0 && (
                      <div className="text-center py-4 text-white/20">
                        <p className="text-sm">득점 없음</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Away Goals */}
                <div>
                  <div className="text-center mb-3">
                    <div className="inline-block bg-white/10 rounded-lg px-4 py-1.5">
                      <span className="text-sm font-bold text-white">{match.awayTeamDisplay}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {match.goals
                      .filter(g => g.team === match.awayTeamName)
                      .map((g, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-sm">⚽</span>
                            <span className="text-white text-sm">
                              {g.name || <span className="text-white/50">(정보 없음)</span>}
                            </span>
                            {g.type === 'own-goal' && <span className="text-xs text-red-400">(자책골)</span>}
                            {g.type === 'penalty' && <span className="text-xs text-yellow-400">(페널티)</span>}
                          </div>
                          <span className="text-brand-red font-bold text-sm">{g.minute}'</span>
                        </div>
                      ))}
                    {match.goals.filter(g => g.team === match.awayTeamName).length === 0 && (
                      <div className="text-center py-4 text-white/20">
                        <p className="text-sm">득점 없음</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lineups Section */}
          {match.lineups && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 mb-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                출전 선수
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Home Lineup */}
                <div>
                  <div className="text-center mb-4">
                    <div className="inline-block bg-white/10 rounded-lg px-4 py-1.5">
                      <span className="text-sm font-bold text-white">{match.homeTeamDisplay}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {match.lineups.home?.map((p, i) => (
                      <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg ${p.captain ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5'}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-xs w-6 text-right">{p.number}</span>
                          <span className="text-white text-sm">{p.name}</span>
                          {p.captain && <span className="text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold">C</span>}
                          {p.u22 && <span className="text-[10px] bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded">U22</span>}
                          {p.position === 'GK' && <span className="text-[10px] bg-orange-500/30 text-orange-300 px-1.5 py-0.5 rounded">GK</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          {p.yellowCard && <span className="text-yellow-400 text-xs">🟨 {p.yellowCard}'</span>}
                          {p.redCard && <span className="text-red-400 text-xs">🟥 {p.redCard}'</span>}
                          {p.subOut !== null && <span className="text-red-400 text-xs">⬇ {p.subOut}'</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Away Lineup */}
                <div>
                  <div className="text-center mb-4">
                    <div className="inline-block bg-white/10 rounded-lg px-4 py-1.5">
                      <span className="text-sm font-bold text-white">{match.awayTeamDisplay}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {match.lineups.away?.map((p, i) => (
                      <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg ${p.captain ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-white/5'}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-xs w-6 text-right">{p.number}</span>
                          <span className="text-white text-sm">{p.name}</span>
                          {p.captain && <span className="text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold">C</span>}
                          {p.u22 && <span className="text-[10px] bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded">U22</span>}
                          {p.position === 'GK' && <span className="text-[10px] bg-orange-500/30 text-orange-300 px-1.5 py-0.5 rounded">GK</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          {p.yellowCard && <span className="text-yellow-400 text-xs">🟨 {p.yellowCard}'</span>}
                          {p.redCard && <span className="text-red-400 text-xs">🟥 {p.redCard}'</span>}
                          {p.subOut !== null && <span className="text-red-400 text-xs">⬇ {p.subOut}'</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Substitutes Section */}
          {match.substitutes && (match.substitutes.home?.length > 0 || match.substitutes.away?.length > 0) && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 mb-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                교체 선수
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Home Substitutes */}
                <div>
                  <div className="text-center mb-4">
                    <div className="inline-block bg-white/10 rounded-lg px-4 py-1.5">
                      <span className="text-sm font-bold text-white">{match.homeTeamDisplay}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {match.substitutes.home?.map((p, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-xs w-6 text-right">{p.number}</span>
                          <span className="text-white text-sm">{p.name}</span>
                          {p.position === 'GK' && <span className="text-[10px] bg-orange-500/30 text-orange-300 px-1.5 py-0.5 rounded">GK</span>}
                          {p.u22 && <span className="text-[10px] bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded">U22</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          {p.subIn !== null && <span className="text-green-400 text-xs">⬆ {p.subIn}'</span>}
                          {p.subNumber && <span className="text-white/30 text-xs">({p.subNumber}교)</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Away Substitutes */}
                <div>
                  <div className="text-center mb-4">
                    <div className="inline-block bg-white/10 rounded-lg px-4 py-1.5">
                      <span className="text-sm font-bold text-white">{match.awayTeamDisplay}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {match.substitutes.away?.map((p, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-xs w-6 text-right">{p.number}</span>
                          <span className="text-white text-sm">{p.name}</span>
                          {p.position === 'GK' && <span className="text-[10px] bg-orange-500/30 text-orange-300 px-1.5 py-0.5 rounded">GK</span>}
                          {p.u22 && <span className="text-[10px] bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded">U22</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          {p.subIn !== null && <span className="text-green-400 text-xs">⬆ {p.subIn}'</span>}
                          {p.subNumber && <span className="text-white/30 text-xs">({p.subNumber}교)</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Match Information */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 mb-6">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              경기 정보
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">대회</p>
                <p className="text-white font-medium">Liga A1 Semi-Pro 2025/2026</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">경기일</p>
                <p className="text-white font-medium">{formatDate(match.date)}</p>
              </div>
              {match.kickoff && (
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-1">킥오프</p>
                  <p className="text-white font-medium">{match.kickoff}</p>
                </div>
              )}
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">경기장</p>
                <p className="text-white font-medium">{match.venue}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">매치 No.</p>
                <p className="text-white font-medium">Match #{match.match_id}</p>
              </div>
              {match.htHome !== undefined && match.htAway !== undefined && (
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-1">전반 스코어</p>
                  <p className="text-white font-medium">{match.htHome} - {match.htAway}</p>
                </div>
              )}
              {match.referee && (
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-1">심판</p>
                  <p className="text-white font-medium">{match.referee}</p>
                </div>
              )}
              {match.playerOfTheMatch && (
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/40 text-xs mb-1">맨 오브 더 매치</p>
                  <p className="text-white font-medium">{match.playerOfTheMatch}</p>
                </div>
              )}
              {stadiumInfo && (
                <div className="bg-white/5 rounded-xl p-4 sm:col-span-2">
                  <p className="text-white/40 text-xs mb-1">경기장 정보</p>
                  <p className="text-white font-medium">{stadiumInfo.stadium} · {stadiumInfo.capacity?.toLocaleString()}석</p>
                </div>
              )}
            </div>
          </div>

          {/* League Table Context */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              시즌 성적
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-green-500/10 rounded-xl p-4">
                <p className="text-2xl font-black text-green-400">5</p>
                <p className="text-xs text-white/50 mt-1">승</p>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4">
                <p className="text-2xl font-black text-yellow-400">2</p>
                <p className="text-xs text-white/50 mt-1">무</p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4">
                <p className="text-2xl font-black text-red-400">21</p>
                <p className="text-xs text-white/50 mt-1">패</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link href="/schedule" className="inline-flex items-center gap-1.5 text-sm text-brand-red/70 hover:text-brand-red transition-colors">
                전체 경기 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
