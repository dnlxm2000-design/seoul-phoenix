import Link from 'next/link';

const matches = [
  {
    date: '2026.05.23',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Kedah FA',
    away: '서울피닉스 FC',
    venue: 'Kedah Stadium',
    score: { home: 3, away: 0 },
    status: 'completed',
  },
  {
    date: '2026.05.16',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Perlis GSA FC',
    venue: 'MMU Stadium',
    score: { home: 3, away: 1 },
    status: 'completed',
  },
  {
    date: '2026.05.09',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Perak FA',
    away: '서울피닉스 FC',
    venue: 'Perak Stadium',
    score: { home: 2, away: 0 },
    status: 'completed',
  },
  {
    date: '2026.05.02',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'UM-Damansara United',
    venue: 'MMU Stadium',
    score: { home: 1, away: 8 },
    status: 'completed',
  },
  {
    date: '2026.04.19',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Selangor FC B',
    away: '서울피닉스 FC',
    venue: 'Selangor Stadium',
    score: { home: 5, away: 0 },
    status: 'completed',
  },
  {
    date: '2026.04.13',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Kelantan WTS FC',
    venue: 'MMU Stadium',
    score: { home: 0, away: 4 },
    status: 'completed',
  },
  {
    date: '2026.04.04',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Imigresen FC B',
    away: '서울피닉스 FC',
    venue: 'Imigresen Stadium',
    score: { home: 7, away: 1 },
    status: 'completed',
  },
  {
    date: '2026.03.30',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Bunga Raya FC',
    venue: 'MMU Stadium',
    score: { home: 0, away: 2 },
    status: 'completed',
  },
  {
    date: '2026.02.15',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'KDA FC',
    away: '서울피닉스 FC',
    venue: 'Kedah Stadium',
    score: { home: 1, away: 6 },
    status: 'completed',
  },
  {
    date: '2026.02.07',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'ATM Angkatan Tentera',
    venue: 'MMU Stadium',
    score: { home: 0, away: 6 },
    status: 'completed',
  },
  {
    date: '2026.01.30',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Manjung City',
    away: '서울피닉스 FC',
    venue: 'Manjung Stadium',
    score: { home: 5, away: 1 },
    status: 'completed',
  },
  {
    date: '2026.01.24',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Malaysian University',
    venue: 'MMU Stadium',
    score: { home: 2, away: 6 },
    status: 'completed',
  },
  {
    date: '2026.01.20',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Kelantan Red Warrior',
    away: '서울피닉스 FC',
    venue: 'Kelantan Stadium',
    score: { home: 6, away: 0 },
    status: 'completed',
  },
  {
    date: '2026.01.11',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Johor Darul Takzim FC B',
    venue: 'MMU Stadium',
    score: { home: 0, away: 9 },
    status: 'completed',
  },
  {
    date: '2026.01.06',
    time: '15:00 (KST)',
    competition: '친선 토너먼트',
    home: '서울피닉스 FC',
    away: 'Kota Kemuning City FC',
    venue: 'MMU Stadium',
    score: { home: 2, away: 0 },
    status: 'completed',
  },
  {
    date: '2025.12.28',
    time: '17:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Kedah FA',
    venue: 'MMU Stadium',
    score: { home: 0, away: 2 },
    status: 'completed',
  },
  {
    date: '2025.12.20',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Perlis GSA FC',
    away: '서울피닉스 FC',
    venue: 'Tuanku Syed Putra Stadium',
    score: { home: 8, away: 0 },
    status: 'completed',
  },
  {
    date: '2025.12.14',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Perak FC',
    venue: 'MMU Stadium',
    score: { home: 0, away: 8 },
    status: 'completed',
  },
  {
    date: '2025.12.06',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'UM-Damansara United',
    away: '서울피닉스 FC',
    venue: 'Damansara Stadium',
    score: { home: 3, away: 0 },
    status: 'completed',
  },
  {
    date: '2025.11.07',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Machan FC',
    away: '서울피닉스 FC',
    venue: 'Machan Stadium',
    score: { home: 0, away: 3 },
    status: 'completed',
    note: 'Machan FC 몰수패 (서울피닉스 몰수승)',
  },
  {
    date: '2025.11.02',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Selangor FC II',
    venue: 'MMU Stadium',
    score: { home: 0, away: 3 },
    status: 'completed',
  },
  {
    date: '2025.10.25',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Kelantan WTS FC',
    away: '서울피닉스 FC',
    venue: 'Kelantan Stadium',
    score: { home: 2, away: 2 },
    status: 'completed',
  },
  {
    date: '2025.10.12',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Imigresen FC II',
    venue: 'MMU Stadium',
    score: { home: 0, away: 2 },
    status: 'completed',
  },
  {
    date: '2025.10.06',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Bunga Raya FC',
    away: '서울피닉스 FC',
    venue: 'Stadium Tampin, Negeri Sembilan',
    score: { home: 2, away: 0 },
    status: 'completed',
  },
  {
    date: '2025.09.28',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Kedah Darul FC',
    venue: 'MMU Stadium',
    score: { home: 2, away: 0 },
    status: 'completed',
  },
  {
    date: '2025.09.21',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'ATM (Armed Forces FC)',
    away: '서울피닉스 FC',
    venue: 'ATM Stadium',
    score: { home: 3, away: 1 },
    status: 'completed',
  },
  {
    date: '2025.09.13',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Manjung City',
    venue: 'MPS Stadium, Sepang',
    score: { home: 1, away: 0 },
    status: 'completed',
  },
  {
    date: '2025.09.06',
    time: '20:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Kelantan FC',
    venue: 'MMU Stadium',
    score: { home: 0, away: 0 },
    status: 'completed',
  },
  {
    date: '2025.08.24',
    time: '16:45 (KST)',
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Malaysian University',
    away: '서울피닉스 FC',
    venue: 'Stadium UiTM, Shah Alam',
    score: { home: 3, away: 0 },
    status: 'completed',
  },
];

export const metadata = {
  title: '경기 일정',
  description: '서울피닉스 FC의 경기 일정 및 결과를 확인하세요.',
};

function MatchCard({ match }) {
  const isUpcoming = match.status === 'upcoming';
  const isHome = match.home === '서울피닉스 FC';

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isUpcoming
          ? 'bg-white border-brand-red/20 shadow-sm hover:shadow-md'
          : 'bg-white/80 border-gray-100 hover:shadow-sm'
      }`}
    >
      <div className="p-5 lg:p-6">
        {/* Match Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-brand-gray bg-gray-100 px-2.5 py-1 rounded-full">
            {match.competition}
          </span>
          <span className={`text-xs font-medium ${isUpcoming ? 'text-brand-red' : 'text-brand-gray'}`}>
            {isUpcoming ? '예정' : '종료'}
          </span>
        </div>

        {/* Teams & Score */}
        <div className="grid grid-cols-3 gap-3 items-center mb-4">
          <div className={`text-right ${isHome ? 'order-1' : 'order-3'}`}>
            <p className={`font-bold text-sm lg:text-base ${isHome ? 'text-brand-red' : 'text-brand-black'}`}>
              {match.home}
            </p>
            {isHome ? (
              <span className="inline-block mt-0.5 text-[10px] font-bold text-brand-red bg-brand-red/10 px-1.5 py-0.5 rounded">홈</span>
            ) : (
              <span className="inline-block mt-0.5 text-[10px] font-bold text-brand-gray bg-gray-100 px-1.5 py-0.5 rounded">원정</span>
            )}
          </div>
          <div className="order-2 text-center">
            {isUpcoming ? (
              <span className="inline-block px-4 py-1.5 bg-brand-black text-white text-xs font-bold rounded-lg">
                VS
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-lg font-extrabold">
                <span className={match.score.home > match.score.away ? 'text-brand-red' : 'text-brand-gray'}>
                  {match.score.home}
                </span>
                <span className="text-brand-gray text-sm">:</span>
                <span className={match.score.away > match.score.home ? 'text-brand-red' : 'text-brand-gray'}>
                  {match.score.away}
                </span>
              </span>
            )}
          </div>
          <div className={`text-left ${isHome ? 'order-3' : 'order-1'}`}>
            <p className={`font-bold text-sm lg:text-base ${!isHome ? 'text-brand-red' : 'text-brand-black'}`}>
              {match.away}
            </p>
            {!isHome ? (
              <span className="inline-block mt-0.5 text-[10px] font-bold text-brand-red bg-brand-red/10 px-1.5 py-0.5 rounded">원정</span>
            ) : (
              <span className="inline-block mt-0.5 text-[10px] font-bold text-brand-gray bg-gray-100 px-1.5 py-0.5 rounded">홈</span>
            )}
          </div>
        </div>

        {/* Forfeit Note */}
        {match.note && (
          <div className="mb-2">
            <span className="text-[11px] font-bold text-brand-red bg-brand-red/5 px-2 py-0.5 rounded">
              ⚠ {match.note}
            </span>
          </div>
        )}
        {/* Match Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 text-xs text-brand-gray">
            <span>{match.date}</span>
            <span className="hidden sm:inline">{match.time}</span>
          </div>
          <span className="text-xs text-brand-gray">{match.venue}</span>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');
  const completedMatches = matches.filter((m) => m.status === 'completed');

  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">경기 일정</h1>
          <p className="text-lg text-white/60">서울피닉스의 모든 경기를 확인하세요</p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Upcoming Matches */}
          {upcomingMatches.length > 0 && (
            <div className="mb-14">
              <h2 className="text-xl font-extrabold text-brand-black mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                예정 경기
              </h2>
              <div className="space-y-4">
                {upcomingMatches.map((match, i) => (
                  <MatchCard key={`upcoming-${i}`} match={match} />
                ))}
              </div>
            </div>
          )}

          {/* Completed Matches */}
          <div>
            <h2 className="text-xl font-extrabold text-brand-black mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-gray rounded-full" />
              경기 결과
            </h2>
            <div className="space-y-3">
              {completedMatches.map((match, i) => (
                <MatchCard key={`completed-${i}`} match={match} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Venue Info */}
      <section className="py-16 lg:py-20 bg-brand-gray-light/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-brand-black text-center mb-8">홈 경기장</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-red/20 to-brand-gold/20 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-1">MMU Stadium</h3>
            <p className="text-sm text-brand-gray mb-2">Cyberjaya, Malaysia</p>
            <p className="text-sm text-brand-gray">수용 인원: 2,500석</p>
          </div>
        </div>
      </section>
    </div>
  );
}
