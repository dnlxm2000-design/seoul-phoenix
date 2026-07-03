'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { label: '홈', href: '/' },
  { label: '클럽 소개', href: '/about' },
  { label: '뉴스', href: '/news' },
  { label: '선수단', href: '/squad' },
  { label: '경기 일정', href: '/schedule' },
  { label: '갤러리', href: '/gallery' },
  { label: '연맹 소개', href: '/federation' },
  { label: '연락처', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsMenuOpen(false);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full overflow-hidden shrink-0 ring-2 ring-brand-gold/30 group-hover:ring-brand-gold transition-all">
                <Image
                  src="/logo.jpg"
                  alt="서울피닉스FC 로고"
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-extrabold tracking-tight text-white">
                  서울피닉스FC
                </span>
              </div>
            </Link>

            {/* Federation Logo */}
            <Link
              href="/federation"
              className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/20 hover:opacity-80 transition-opacity"
            >
              <div className="relative w-8 h-8 lg:w-10 lg:h-10 shrink-0">
                <Image
                  src="/images/partners/k-international-club.svg"
                  alt="K·국제클럽축구연맹"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xs lg:text-sm font-extrabold tracking-tight text-white leading-tight">
                K·국제클럽<br />축구연맹
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-brand-gold-light bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold-light rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white"
            aria-label="메뉴 열기"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-brand-black-light/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-brand-gold-light bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
