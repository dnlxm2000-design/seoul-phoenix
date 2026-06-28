'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import allNews, { categories } from '@/data/news';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = useMemo(() => {
    let list =
      activeCategory === 'all'
        ? allNews
        : allNews.filter((item) => item.category === activeCategory);

    if (searchTerm.trim()) {
      const kw = searchTerm.trim().toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(kw) ||
          item.content.toLowerCase().includes(kw),
      );
    }

    // Already sorted by date DESC (newest first) in data
    return list;
  }, [activeCategory, searchTerm]);

  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-16 lg:py-20 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">뉴스</h1>
          <p className="text-lg text-white/60">국내외 축구 소식을 전합니다</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'text-brand-gray hover:text-brand-black hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search + News List */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="기사 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-black"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-brand-gray">
                {searchTerm ? '검색 결과가 없습니다.' : '해당 카테고리의 뉴스가 없습니다.'}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="block group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Thumbnail placeholder */}
                      <div className="hidden lg:block w-32 h-32 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-gold/10 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <svg className="w-12 h-12 text-brand-red/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2.5 py-0.5 rounded-full">
                            {article.categoryLabel}
                          </span>
                          <span className="text-xs text-brand-gray">{article.date}</span>
                        </div>
                        <h2 className="text-lg lg:text-xl font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-sm text-brand-gray leading-relaxed line-clamp-2">
                          {article.content.replace(/\n/g, ' ')}
                        </p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                          <span className="text-xs text-brand-gray">{article.author}</span>
                          <span className="text-xs font-medium text-brand-red group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                            자세히 보기
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
