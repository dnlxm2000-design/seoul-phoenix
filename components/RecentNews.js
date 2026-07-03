'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllNews } from '@/data/news';

export default function RecentNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchAllNews().then((data) => setArticles(data.slice(0, 4)));
  }, []);

  if (articles.length === 0) return null;

  return (
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
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news?id=${article.id}`}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-brand-red/10 to-brand-gold/10 flex items-center justify-center relative overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent" />
                    <svg className="w-16 h-16 text-brand-red/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">
                    {article.categoryLabel}
                  </span>
                  <span className="text-xs text-brand-gray">
                    {article.date?.replace(/-/g, '.') || ''}
                  </span>
                </div>
                <h3 className="text-base font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed line-clamp-2">
                  {article.content?.replace(/<[^>]+>/g, '').slice(0, 200) || ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
