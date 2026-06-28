import Link from 'next/link';
import Image from 'next/image';
import allNews from '@/data/news';

const recentNews = allNews.slice(0, 4);

const recentResults = [
  {
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Kedah FA',
    away: '서울피닉스 FC',
    date: '2026.05.23',
    time: '20:45 (KST)',
    venue: 'Kedah Stadium',
    score: { home: 3, away: 0 },
  },
  {
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'Perlis GSA FC',
    date: '2026.05.16',
    time: '16:45 (KST)',
    venue: 'MMU Stadium',
    score: { home: 3, away: 1 },
  },
  {
    competition: 'Malaysia A1 Semi-Pro League',
    home: 'Perak FA',
    away: '서울피닉스 FC',
    date: '2026.05.09',
    time: '16:45 (KST)',
    venue: 'Perak Stadium',
    score: { home: 2, away: 0 },
  },
  {
    competition: 'Malaysia A1 Semi-Pro League',
    home: '서울피닉스 FC',
    away: 'UM-Damansara United',
    date: '2026.05.02',
    time: '20:45 (KST)',
    venue: 'MMU Stadium',
    score: { home: 1, away: 8 },
  },
];

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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/30 text-brand-gold-light text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              Malaysia A1 Semi-Pro League
            </div>

            {/* Main Logo Area */}
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 lg:w-44 lg:h-44 bg-white rounded-full overflow-hidden ring-4 ring-brand-gold/30 shadow-2xl shadow-brand-red/20 animate-pulse-glow">
                <Image
                  src="/logo.jpg"
                  alt="서울피닉스 FC 공식 로고"
                  fill
                  sizes="(max-width: 1024px) 128px, 176px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight">
              서울피닉스
            </h1>
            <p className="text-xl lg:text-2xl text-brand-gold-light font-semibold mb-2">
              Seoul Phoenix FC
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              대한민국과 말레이시아를 잇는 축구 클럽.
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
            { label: '리그 경기', value: '30' },
            { label: '승리', value: '5' },
            { label: '총 득점', value: '24' },
            { label: '시즌 결과', value: '잔류' },
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
                    <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2.5 py-1 rounded-full">
                      {match.competition}
                    </span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
                      <div className="text-right">
                        <span className={`font-bold text-lg ${match.home === '서울피닉스 FC' ? 'text-brand-red' : 'text-brand-black'}`}>
                          {match.home}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className={`inline-block px-4 py-1 font-bold rounded-lg ${match.score.home > match.score.away ? (match.home === '서울피닉스 FC' ? 'bg-brand-red text-white' : 'bg-brand-black text-white') : match.score.home < match.score.away ? (match.away === '서울피닉스 FC' ? 'bg-brand-red text-white' : 'bg-brand-black text-white') : 'bg-brand-gray text-white'}`}>
                          {match.score.home} : {match.score.away}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className={`font-bold text-lg ${match.away === '서울피닉스 FC' ? 'text-brand-red' : 'text-brand-black'}`}>
                          {match.away}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-1 text-sm text-brand-gray shrink-0">
                    <span className="font-semibold">{match.date}</span>
                    <span>{match.time}</span>
                    <span className="text-xs">{match.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-black">최신 뉴스</h2>
              <p className="text-brand-gray mt-1">서울피닉스와 축구 소식을 전합니다</p>
            </div>
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark font-medium text-sm transition-colors"
            >
              모든 뉴스
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentNews.map((article, i) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-brand-red/10 to-brand-gold/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent" />
                  <svg className="w-16 h-16 text-brand-red/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">
                      {article.categoryLabel}
                    </span>
                    <span className="text-xs text-brand-gray">{article.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-brand-gray leading-relaxed line-clamp-2">
                    {article.content.replace(/\n/g, ' ').slice(0, 150)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* K·국제클럽축구연맹 사업 구조 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-black mb-2">K·국제클럽축구연맹 사업 구조</h2>
            <p className="text-brand-gray">서울피닉스 FC가 속한 국제 클럽 축구 연맹의 6대 사업 영역</p>
          </div>

          {/* Federation Logo Center */}
          <div className="flex justify-center mb-12">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32">
              <Image
                src="/images/partners/k-international-club.svg"
                alt="K·국제클럽축구연맹 로고"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Business Areas - 2x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 프로선수 */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-3">프로선수</h3>
              <ul className="space-y-1 text-sm text-blue-100">
                <li>입단, 연봉계약</li>
                <li>각종 Endorsement 계약</li>
                <li>이적, 임대 계약</li>
                <li>기록(경력)관리</li>
                <li>자산관리</li>
                <li>종합매니지먼트</li>
              </ul>
            </div>

            {/* 프로구단 */}
            <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-3">프로구단</h3>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>마케팅 대행</li>
                <li>외국인 선수 영입주선</li>
                <li>해외 전훈등 스케줄관리</li>
                <li>운용 물품 공급</li>
                <li>클럽 간 경기</li>
              </ul>
            </div>

            {/* KFA 등 단체 */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-3">KFA 등 단체</h3>
              <ul className="space-y-1 text-sm text-purple-100">
                <li>프로모션 대행</li>
                <li>공익사업</li>
                <li>Licensing</li>
                <li>국가 간 경기</li>
              </ul>
            </div>

            {/* 일반 소비계층 */}
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-3">일반 소비계층</h3>
              <ul className="space-y-1 text-sm text-pink-100">
                <li>제조 / 유통시장</li>
                <li>On-Line 쇼핑몰</li>
                <li>스타마케팅</li>
                <li>레저사업</li>
                <li>참여 스포츠 유도</li>
              </ul>
            </div>

            {/* 클럽하우스운영 */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-3">클럽하우스운영</h3>
              <ul className="space-y-1 text-sm text-yellow-100">
                <li>U-12, U-15,</li>
                <li>U-18, U-20</li>
                <li>프로 및 세미프로</li>
                <li>기업팀 운영계획</li>
              </ul>
            </div>

            {/* 기업 */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-3">기업</h3>
              <ul className="space-y-1 text-sm text-teal-100">
                <li>스포츠를 이용한 홍보</li>
                <li>광고 주선</li>
                <li>스폰서 집</li>
                <li>이벤트 개최</li>
                <li>스타마케팅</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
