'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllNews } from '@/data/news';

export default function NewsDetailClient({ id, initialArticle, initialRelated }) {
  const [article, setArticle] = useState(initialArticle || null);
  const [related, setRelated] = useState(initialRelated || []);
  const [loading, setLoading] = useState(!initialArticle);

  useEffect(() => {
    // If initialArticle was provided (SSG), no need to fetch
    if (initialArticle) return;
    fetchAllNews().then((allNews) => {
      const found = allNews.find((a) => a.id === parseInt(id)) || null;
      setArticle(found);
      if (found) {
        setRelated(
          allNews
            .filter((a) => a.category === found.category && a.id !== found.id)
            .slice(0, 3),
        );
      }
      setLoading(false);
    });
  }, [id, initialArticle]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3">
          <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
          <span className="text-brand-gray">불러오는 중...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-brand-black mb-4">뉴스를 찾을 수 없습니다</h1>
          <Link href="/news" className="text-brand-red hover:underline font-medium">
            ← 뉴스 목록으로
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = article.content
    ? article.content.split('\n').filter((p) => p.trim())
    : [];

  return (
    <div className="pt-20 bg-brand-black">
      {/* Header */}
      <section className="relative py-20 lg:py-24 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-white/50 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5" />
            </svg>
            뉴스 목록
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-brand-red/20 text-brand-red text-xs font-semibold rounded-full">
              {article.categoryLabel}
            </span>
            <span className="text-white/40 text-sm">
              {article.date?.replace(/-/g, '.') || ''}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 mt-4 text-white/30 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {article.author}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {article.image && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-96 object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
          <article className="prose prose-lg max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-brand-black/80 leading-relaxed mb-4 text-[15px] lg:text-base">
                {p}
              </p>
            ))}
          </article>

          {/* Source / Footer */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-brand-gray">
              <span className="font-medium">출처: </span>
              {article.author}
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark font-medium text-sm transition-colors"
            >
              ← 뉴스 목록으로
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-brand-gray-light/20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-brand-black mb-8">
              관련 뉴스
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news?id=${item.id}`}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </span>
                    <span className="text-xs text-brand-gray">
                      {item.date?.replace(/-/g, '.') || ''}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer spacing */}
      <div className="h-16 bg-white" />
    </div>
  );
}
