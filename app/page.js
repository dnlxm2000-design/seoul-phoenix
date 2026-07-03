import Link from 'next/link';
import Image from 'next/image';
import RecentNews from '@/components/RecentNews';
import scheduleData from '@/data/a1_2025-26.json';

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

const allMatches = scheduleData.seoul_phoenix.matches || [];
const recentResults = allMatches.slice(-4).reverse();

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(230,57,70,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(244,162,97,0.1),transparent_50%)]" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 border border-brand-red/10 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-40 right-20 w-96 h-96 border border-brand-gold/5 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            {/* Main Logo Area */}
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 lg:w-44 lg:h-44 bg-white rounded-full overflow-hidden ring-4 ring-brand-gold/30 shadow-2xl shadow-brand-red/20 animate-pulse-glow">
                <Image
                  src="/logo.jpg"
                  alt="서울피닉스FC 공식 로고"
                  fill
                  sizes="(max-width: 1024px) 128px, 176px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight">
              서울피닉스FC
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              대한민국과 말레이시아(<Link href="/about#league" className="underline decoration-white/30 hover:decoration-white/70 underline-offset-4 transition-colors">Malaysia A1 Semi-Pro League</Link>)를 잇는 축구 클럽.
              <br />
              새로운 도전, 새로운 역사를 만들어갑니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-brand-red/30"
              >
                클럽 소개
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white hover:bg-white/10 font-medium rounded-full transition-all duration-200"
              >
                경기 일정
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <span className="text-white/40 text-xs font-medium">SCROLL</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-brand-gold-light rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative -mt-20 z-20 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '리그 경기', value: String(allMatches.length) },
            { label: '승리', value: String(scheduleData.seoul_phoenix.record.wins) },
            { label: '총 득점', value: String(scheduleData.seoul_phoenix.record.goals_for) },
            { label: '최종 순위', value: String(scheduleData.seoul_phoenix.final_position) + '위' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="text-2xl lg:text-3xl font-extrabold text-brand-red">{stat.value}</div>
              <div className="text-sm text-brand-gray-dark mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Results */}
      <section className="py-20 lg:py-28 bg-brand-gray-light/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-black">최근 경기 결과</h2>
              <p className="text-brand-gray mt-1">2025-26 A1 Semi-Pro League 서울피닉스의 경기 결과</p>
            </div>
            <Link
              href="/schedule"
              className="hidden sm:inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark font-medium text-sm transition-colors"
            >
              전체 일정
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {recentResults.map((match, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
                      <div className="text-right">
                        <span className="font-bold text-lg text-brand-red">서울피닉스FC</span>
                      </div>
                      <div className="text-center">
                        <span className={`inline-block px-4 py-1 font-bold rounded-lg ${match.scores.seoul > match.scores.opponent ? 'bg-brand-red text-white' : match.scores.seoul < match.scores.opponent ? 'bg-brand-gray text-white' : 'bg-brand-gray text-white'}`}>
                          {match.scores.seoul} : {match.scores.opponent}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-lg text-brand-black">{displayName(match.opponent)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-1 text-sm text-brand-gray shrink-0">
                    <span className="font-semibold">{formatDateK(match.date)}</span>
                    <span className="text-xs">{match.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RecentNews />

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,57,70,0.1),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            서울피닉스와 함께하세요
          </h2>
          <p className="text-lg text-white/60 mb-8">
            새로운 역사를 만들어가는 서울피닉스의 여정에 함께해 주세요.
            <br />
            경기 관람, 뉴스 구독, 소셜 미디어 팔로우 등 다양한 방법으로 참여하실 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full transition-all duration-200"
            >
              연락하기
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white hover:bg-white/10 font-medium rounded-full transition-all duration-200"
            >
              더 알아보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
