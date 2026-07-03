import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'K·국제클럽축구연맹',
  description: '서울피닉스FC가 속한 K·국제클럽축구연맹의 사업 영역을 소개합니다.',
};

const businessAreas = [
  {
    title: '프로선수',
    color: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-100',
    items: [
      '입단, 연봉계약',
      '각종 Endorsement 계약',
      '이적, 임대 계약',
      '기록(경력)관리',
      '자산관리',
      '종합매니지먼트',
    ],
  },
  {
    title: '프로구단',
    color: 'from-orange-400 to-pink-500',
    textColor: 'text-orange-100',
    items: [
      '마케팅 대행',
      '외국인 선수 영입주선',
      '해외 전훈등 스케줄관리',
      '운용 물품 공급',
      '클럽 간 경기',
    ],
  },
  {
    title: 'KFA 등 단체',
    color: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-100',
    items: [
      '프로모션 대행',
      '공익사업',
      'Licensing',
      '국가 간 경기',
    ],
  },
  {
    title: '일반 소비계층',
    color: 'from-pink-400 to-purple-500',
    textColor: 'text-pink-100',
    items: [
      '제조 / 유통시장',
      'On-Line 쇼핑몰',
      '스타마케팅',
      '레저사업',
      '참여 스포츠 유도',
    ],
  },
  {
    title: '클럽하우스운영',
    color: 'from-yellow-400 to-orange-500',
    textColor: 'text-yellow-100',
    items: [
      'U-12, U-15',
      'U-18, U-20',
      '프로 및 세미프로',
      '기업팀 운영계획',
    ],
  },
  {
    title: '기업',
    color: 'from-teal-500 to-teal-600',
    textColor: 'text-teal-100',
    items: [
      '스포츠를 이용한 홍보',
      '광고 주선',
      '스폰서 집',
      '이벤트 개최',
      '스타마케팅',
    ],
  },
];

export default function FederationPage() {
  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 lg:w-24 lg:h-24">
              <Image
                src="/images/partners/k-international-club.svg"
                alt="K·국제클럽축구연맹 로고"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-4">
            K·국제클럽축구연맹
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            서울피닉스FC가 속한 국제 클럽 축구 연맹의 6대 사업 영역
          </p>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-black mb-2">
              사업 구조
            </h2>
            <p className="text-brand-gray">
              K·국제클럽축구연맹의 6대 핵심 사업 영역
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessAreas.map((area) => (
              <div
                key={area.title}
                className={`bg-gradient-to-br ${area.color} rounded-2xl p-6 text-white shadow-lg`}
              >
                <h3 className="text-lg font-bold mb-3">{area.title}</h3>
                <ul className={`space-y-1 text-sm ${area.textColor}`}>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
