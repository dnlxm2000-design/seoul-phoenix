import Link from 'next/link';
import Image from 'next/image';

const timeline = [
  {
    year: '2023.01',
    title: 'Vanesse FC 창단',
    description: 'K4 League 참가를 목표로 클럽 창단',
  },
  {
    year: '2024',
    title: '세종 SA FC로 재창단',
    description: '세종시를 연고지로 클럽명 변경 및 재창단',
  },
  {
    year: '2025',
    title: '서울피닉스 FC로 재탄생',
    description:
      '말레이시아 Cyberjaya로 연고지 이전 및 클럽명 변경. Malaysia A1 Semi-Pro League 참가',
  },
  {
    year: '2025-26',
    title: '말레이시아 리그 데뷔 시즌',
    description:
      '2025.08.02 개막 — 2026.05.23 종료. 말레이시아 A1 Semi-Pro League 첫 시즌을 소화하며 한국-말레이시아 축구 교류의 새 장을 열다',
  },
  {
    year: '2026.01',
    title: '프리시즌 친선 토너먼트 승리',
    description:
      'Kota Kemuning City FC를 2-0으로 격파하며 클럽 역사상 첫 친선 토너먼트 승리 기록',
  },
];

const headCoach = {
  name: 'Ariff Hashim',
  role: 'Head Coach',
  flag: '🇲🇾',
  location: 'Shah Alam, Selangor, Malaysia',
  bio: '말레이시아 축구의 베테랑 코치로, Football Association of Malaysia(FAM) 산하 국가대표 U-17 전임 코치로서 10년 이상의 국가대표급 지도 경험을 보유하고 있습니다. Selangor United FC U-21 헤드 코치로 Malaysian League Presidents Cup 무대를 경험하며 클럽 축구 지도자로서의 폭넓은 경험을 쌓았습니다.',
  philosophy: '체계적이고 분석적인 전술 구성과 선수 개개인의 강점을 살리는 맞춤형 코칭으로 정평이 나 있으며, 한국과 말레이시아 선수들이 함께 호흡하는 서울피닉스의 다양성을 팀의 강점으로 끌어올리고 있습니다.',
  experience: [
    { period: '2013 - 현재', role: 'National U-17 코치', org: 'Football Association of Malaysia (FAM)' },
    { period: '2019 - 2020', role: 'Head Coach, U-21 Presidents Cup', org: 'Selangor United FC' },
    { period: '2024 - 현재', role: '기술 이사 / 코칭 디렉터', org: 'Kelantan FA (Red Warriors)' },
    { period: '2025 - 현재', role: 'Head Coach', org: '서울피닉스 FC' },
  ],
  education: 'Bachelor of Sports Studies — Universiti Teknologi MARA (UiTM), Malaysia',
  linkedin: 'https://my.linkedin.com/in/ariff-hashim-03753a49',
};

const staff = [
  { name: '권혁훈', role: '구단주', desc: '클럽의 비전과 방향성 제시' },
  { name: '서진영', role: '회장', desc: '구단 운영 총괄' },
  { name: '변병주', role: '회장', desc: '구단 운영 총괄' },
];

export const metadata = {
  title: '클럽 소개',
  description: '서울피닉스 FC의 역사, 비전, 코치진을 소개합니다.',
};

export default function AboutPage() {
  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">클럽 소개</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            대한민국과 말레이시아를 잇는 축구 클럽, 서울피닉스 FC의 이야기입니다
          </p>
        </div>
      </section>

      {/* Club Vision */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-brand-red uppercase tracking-widest">About</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-black mt-2 mb-6">
                서울피닉스 FC의
                <br />
                <span className="text-brand-red">비전과 미션</span>
              </h2>
              <div className="space-y-4 text-brand-gray leading-relaxed">
                <p>
                  서울피닉스 FC는 2023년 Vanesse FC로 창단되어, 2025년 말레이시아 Cyberjaya로 연고지를
                  이전하며 새롭게 출범한 축구 클럽입니다.
                </p>
                <p>
                  우리는 한국 축구의 우수한 시스템과 말레이시아의 축구 열정을 결합하여,
                  아시아 축구의 새로운 가능성을 열어가고 있습니다.
                </p>
                <p>
                  단순한 축구 클럽을 넘어, 한국과 말레이시아를 연결하는 스포츠 문화 교류의
                  가교 역할을 목표로 합니다.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-red/20 to-brand-gold/20 border border-brand-gray-light p-8 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 bg-white rounded-full overflow-hidden ring-4 ring-brand-gold/20 shadow-xl mb-4">
                  <Image
                    src="/logo.jpg"
                    alt="서울피닉스 FC 공식 로고"
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
                <p className="text-brand-gray-dark font-bold text-center">
                  하나된 열정, 하나된 도전
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-24 bg-brand-gray-light/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">
            핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: '도전',
                desc: '새로운 무대에서 끊임없이 도전하며 성장합니다',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: '화합',
                desc: '한국과 말레이시아, 두 문화의 조화를 만들어갑니다',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: '투명성',
                desc: '정직하고 투명한 운영으로 신뢰를 쌓습니다',
              },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-brand-red/5 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-black mb-2">{value.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">클럽 역사</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-red/20" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-brand-red border-2 border-white shadow-sm" />
                  {/* Content */}
                  <div className="bg-brand-gray-light/30 rounded-xl p-5 hover:bg-brand-gray-light/50 transition-colors">
                    <span className="text-sm font-bold text-brand-red">{item.year}</span>
                    <h3 className="text-lg font-bold text-brand-black mt-1">{item.title}</h3>
                    <p className="text-sm text-brand-gray mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Head Coach Feature */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-brand-red uppercase tracking-widest">Head Coach</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-black mt-2">
              팀을 이끄는 감독
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left — Avatar & Quick Info */}
              <div className="lg:col-span-2 bg-gradient-to-br from-brand-black to-brand-black-light text-white p-8 lg:p-10 flex flex-col">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-red/30 ring-4 ring-brand-gold/40 mx-auto mb-5 flex items-center justify-center text-5xl font-extrabold text-brand-gold-light">
                  {headCoach.flag}
                </div>
                <h3 className="text-2xl font-extrabold text-center">{headCoach.name}</h3>
                <p className="text-brand-gold-light text-sm font-semibold text-center mt-1 uppercase tracking-wider">
                  {headCoach.role}
                </p>
                <p className="text-white/50 text-xs text-center mt-2">
                  📍 {headCoach.location}
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                  <a
                    href={headCoach.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-brand-gold-light text-xs transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                    </svg>
                    LinkedIn 프로필
                  </a>
                  <p className="text-white/40 text-xs mt-3 leading-relaxed">
                    🎓 {headCoach.education}
                  </p>
                </div>
              </div>

              {/* Right — Bio & Experience */}
              <div className="lg:col-span-3 p-8 lg:p-10">
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">
                    About
                  </h4>
                  <p className="text-brand-black/80 text-sm leading-relaxed">
                    {headCoach.bio}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">
                    Coaching Philosophy
                  </h4>
                  <p className="text-brand-black/80 text-sm leading-relaxed">
                    {headCoach.philosophy}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
                    Experience
                  </h4>
                  <ul className="space-y-3">
                    {headCoach.experience.map((exp, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-2 h-2 bg-brand-red rounded-full mt-1.5" />
                        <div>
                          <span className="font-semibold text-brand-black">{exp.role}</span>
                          <span className="text-brand-gray"> · {exp.org}</span>
                          <p className="text-xs text-brand-gray mt-0.5">{exp.period}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff / Leadership */}
      <section className="py-20 lg:py-24 bg-brand-gray-light/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-4">리더십 팀</h2>
          <p className="text-brand-gray text-center mb-12 max-w-xl mx-auto">
            서울피닉스를 이끄는 리더십 팀을 소개합니다
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-red/20 to-brand-gold/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-brand-red">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-bold text-brand-black">{member.name}</h3>
                <p className="text-sm font-semibold text-brand-red mt-1">{member.role}</p>
                <p className="text-xs text-brand-gray mt-2">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,57,70,0.1),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">서울피닉스의 여정에 함께하세요</h2>
          <p className="text-white/60 mb-8">
            새로운 역사를 함께 써 나갈 선수와 팬을 기다립니다
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full transition-all duration-200"
          >
            연락하기
          </Link>
        </div>
      </section>
    </div>
  );
}
