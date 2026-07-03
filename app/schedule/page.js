import Link from 'next/link';
import allData from '@/data/a1_2025-26.json';

const TEAM_DISPLAY = {
  'Johor Darul Ta\'zim II': 'JDT II',
  'Malaysian University': 'Malaysian Univ.',
  'Kelantan Red Warrior FC': 'Kelantan Red Warrior',
  'Manjung City FC': 'Manjung City',
  'Armed Forces FC': 'ATM',
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

function formatDateK(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

function getMonthLabel(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
}

function getMonthKey(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export const metadata = {
  title: '경기 일정',
  description: '서울피닉스FC의 2025-26 A1 Semi-Pro League 경기 일정 및 결과를 확인하세요.',
};

function MatchCard({ match }) {
  const isSeoulHome = match.home_away === 'home';
  const seoulScore = match.scores.seoul;
  const oppScore = match.scores.opponent;
  const isWin = match.result === 'W';
  const isDraw = match.result === 'D';

  return (
    <Link href={`/schedule/${match.match_id}`} className="block group">
      <div className="rounded-xl border border-gray-100 bg-white/80 transition-all duration-300 hover:shadow-md hover:border-brand-red/20 group-hover:bg-white">
        <div className="p-5 lg:p-6">
          {/* Match Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-brand-gray bg-gray-100 px-2.5 py-1 rounded-full">
              Match #{match.match_id}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isWin ? 'text-green-600 bg-green-50' :
                isDraw ? 'text-yellow-600 bg-yellow-50' :
                'text-red-500 bg-red-50'
              }`}>
                {isWin ? '승' : isDraw ? '무' : '패'}
              </span>
              <span className="text-xs text-brand-gray opacity-0 group-hover:opacity-100 transition-opacity">
                자세히 →
              </span>
            </div>
          </div>

          {/* Teams & Score */}
          <div className="grid grid-cols-3 gap-3 items-center mb-4">
            <div className="text-right">
              <p className="font-bold text-sm lg:text-base text-brand-red">
                서울피닉스FC
              </p>
              <span className={`inline-block mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                isSeoulHome ? 'text-brand-red bg-brand-red/10' : match.home_away === 'neutral' ? 'text-yellow-600 bg-yellow-50' : 'text-orange-500 bg-orange-500/10'
              }`}>
                {isSeoulHome ? '홈' : match.home_away === 'neutral' ? '중립' : '원정'}
              </span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 text-lg font-extrabold">
                <span className={seoulScore > oppScore ? 'text-brand-red' : 'text-brand-gray'}>
                  {seoulScore}
                </span>
                <span className="text-brand-gray text-sm">:</span>
                <span className={oppScore > seoulScore ? 'text-brand-red' : 'text-brand-gray'}>
                  {oppScore}
                </span>
              </span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm lg:text-base text-brand-black">
                {displayName(match.opponent)}
              </p>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-3 text-xs text-brand-gray">
              <span>{formatDateK(match.date)}</span>
            </div>
            <span className="text-xs text-brand-gray truncate max-w-[200px] sm:max-w-none">
              {match.venue}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SchedulePage() {
  const matches = allData.seoul_phoenix.matches;

  // Sort by date descending (most recent first)
  const sorted = [...matches].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Group by month
  const grouped = sorted.reduce((acc, match) => {
    const key = getMonthKey(match.date);
    if (!acc[key]) {
      acc[key] = { label: getMonthLabel(match.date), matches: [] };
    }
    acc[key].matches.push(match);
    return acc;
  }, {});

  const monthKeys = Object.keys(grouped).sort().reverse();

  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">경기 일정</h1>
          <p className="text-lg text-white/60">서울피닉스의 2025-26 A1 Semi-Pro League 전 경기 결과</p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Season Summary */}
          <div className="mb-10 bg-brand-black/5 rounded-2xl p-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-brand-black">28</p>
                <p className="text-xs text-brand-gray mt-1">경기</p>
              </div>
              <div>
                <p className="text-2xl font-black text-green-600">5</p>
                <p className="text-xs text-brand-gray mt-1">승</p>
              </div>
              <div>
                <p className="text-2xl font-black text-yellow-600">2</p>
                <p className="text-xs text-brand-gray mt-1">무</p>
              </div>
              <div>
                <p className="text-2xl font-black text-red-600">21</p>
                <p className="text-xs text-brand-gray mt-1">패</p>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-brand-gray">
              득점: {allData.seoul_phoenix.record.goals_for} · 실점: {allData.seoul_phoenix.record.goals_against} · 최종 순위: {allData.seoul_phoenix.final_position}위
            </div>
          </div>

          {/* Matches by Month */}
          {monthKeys.map((key) => (
            <div key={key} className="mb-8">
              <h2 className="sticky top-20 z-10 text-lg font-extrabold text-brand-black bg-white py-3 mb-4 border-b border-gray-100">
                {grouped[key].label}
                <span className="ml-2 text-sm font-normal text-brand-gray">
                  ({grouped[key].matches.length}경기)
                </span>
              </h2>
              <div className="space-y-3">
                {grouped[key].matches.map((match) => (
                  <MatchCard key={match.match_id} match={match} />
                ))}
              </div>
            </div>
          ))}

          {/* Data Source */}
          <div className="mt-12 text-center">
            <p className="text-xs text-brand-gray">
              출처: FAM CMS (cms.fam.org.my) · Liga A1 Semi-Pro 2025/2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
