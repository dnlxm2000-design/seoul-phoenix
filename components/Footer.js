import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  {
    title: '클럽',
    links: [
      { label: '클럽 소개', href: '/about' },
      { label: '선수단', href: '/squad' },
      { label: '경기 일정', href: '/schedule' },
      { label: '갤러리', href: '/gallery' },
    ],
  },
  {
    title: '미디어',
    links: [
      { label: '뉴스', href: '/news' },
      { label: '한국 축구', href: '/news?category=korean' },
      { label: '말레이시아 축구', href: '/news?category=malaysia' },
    ],
  },
  {
    title: '고객 지원',
    links: [
      { label: '연락처', href: '/contact' },
      { label: '자주 묻는 질문', href: '/contact' },
      { label: '티켓 예매', href: '/schedule' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 bg-white rounded-full overflow-hidden shrink-0 ring-2 ring-brand-gold/30">
                <Image
                  src="/logo.jpg"
                  alt="서울피닉스FC 로고"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold">서울피닉스FC</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              대한민국과 말레이시아(Malaysia A1 Semi-Pro League)를 잇는 축구 클럽.
              <br />
              새로운 도전, 새로운 역사를 만들어갑니다.
            </p>
            <div className="flex items-center gap-3">
              {['youtube', 'instagram', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red transition-colors flex items-center justify-center group"
                  aria-label={social}
                >
                  <span className="text-white/70 group-hover:text-white text-xs font-bold uppercase">
                    {social[0].toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold text-white/90 mb-4 uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-brand-gold-light text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} 서울피닉스FC. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-white/40 text-xs">
              <a href="#" className="hover:text-white/60 transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
