'use client';

import { useState, useMemo, useEffect } from 'react';
import { categories, fetchAllNews } from '@/data/news';

export default function NewsPage() {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    // Reset detail view when entering /news/ without ?id= (e.g. from header link)
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');
    if (!idFromUrl) {
      setSelectedId(null);
    }
    fetchAllNews().then((data) => {
      setAllNews(data);
      setLoading(false);
      if (idFromUrl) {
        const found = data.find((a) => a.id === parseInt(idFromUrl));
        if (found) setSelectedId(found.id);
      }
    });
  }, []);

  const selectedArticle = useMemo(() => {
    if (!selectedId) return null;
    return allNews.find((a) => a.id === selectedId) || null;
  }, [selectedId, allNews]);

  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return allNews
      .filter((a) => a.category === selectedArticle.category && a.id !== selectedArticle.id)
      .slice(0, 3);
  }, [selectedArticle, allNews]);

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

    return list;
  }, [activeCategory, searchTerm, allNews]);

  function selectArticle(article) {
    setSelectedId(article.id);
    // Update URL without navigation (for new articles without static page)
    const url = new URL(window.location);
    url.searchParams.set('id', article.id);
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToList() {
    setSelectedId(null);
    const url = new URL(window.location);
    url.searchParams.delete('id');
    window.history.pushState({}, '', url);
  }

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

      {/* Search & Filter */}
      <section className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Filter */}
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // If currently viewing article detail, go back to list
                    if (selectedId) backToList();
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-red text-white shadow-sm'
                      : 'bg-brand-gray-light/50 text-brand-gray hover:bg-brand-gray-light hover:text-brand-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative sm:ml-auto sm:min-w-[240px]">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="뉴스 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-brand-black placeholder-brand-gray focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Detail View */}
      {selectedArticle ? (
        <section className="py-12 lg:py-16 bg-white min-h-[50vh]">
          <div className="max-w-3xl mx-auto px-4">
            <button
              onClick={backToList}
              className="inline-flex items-center gap-1.5 text-sm text-brand-gray hover:text-brand-red transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로
            </button>
            <article>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2.5 py-0.5 rounded-full">
                  {selectedArticle.categoryLabel}
                </span>
                <span className="text-xs text-brand-gray">
                  {selectedArticle.date?.replace(/-/g, '.') || ''}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-brand-black mb-4 leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-brand-gray mb-8 pb-6 border-b border-gray-100">
                <span>{selectedArticle.author}</span>
              </div>
              {selectedArticle.image && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-auto max-h-96 object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="prose prose-base max-w-none text-brand-black/80 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </article>
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-brand-black mb-4">관련 기사</h3>
                <div className="space-y-3">
                  {relatedArticles.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => selectArticle(rel)}
                      className="w-full text-left block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-sm font-semibold text-brand-black hover:text-brand-red transition-colors">
                        {rel.title}
                      </p>
                      <p className="text-xs text-brand-gray mt-1">{rel.date?.replace(/-/g, '.')}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* News List */
        <section className="py-12 lg:py-16 bg-white min-h-[50vh]">
          <div className="max-w-5xl mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
                <span className="ml-3 text-brand-gray">불러오는 중...</span>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-16 h-16 text-brand-gray-light mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-brand-gray font-medium">검색 결과가 없습니다</p>
                <p className="text-brand-gray text-sm mt-1">다른 검색어로 시도해보세요</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-brand-gray mb-2">최근 {Math.min(filteredNews.length, 10)}개 기사 (전체 {filteredNews.length}개)</p>
                {filteredNews.slice(0, 10).map((article) => (
                  <button
                    key={article.id}
                    onClick={() => selectArticle(article)}
                    className="w-full text-left block group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Thumbnail */}
                        <div className="hidden lg:block w-32 h-32 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-brand-red/10 to-brand-gold/10 flex items-center justify-center">
                          {article.image ? (
                            <img
                              src={article.image}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <svg className="w-12 h-12 text-brand-red/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2.5 py-0.5 rounded-full">
                              {article.categoryLabel}
                            </span>
                            <span className="text-xs text-brand-gray">
                              {article.date?.replace(/-/g, '.') || ''}
                            </span>
                          </div>
                          <h2 className="text-lg lg:text-xl font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors">
                            {article.title}
                          </h2>
                          <p className="text-sm text-brand-gray leading-relaxed line-clamp-2">
                            {article.content?.replace(/<[^>]+>/g, '').slice(0, 200) || ''}
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
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer spacing */}
      <div className="h-16 bg-white" />
    </div>
  );
}
