import Link from 'next/link';
import allNews, { categories } from '@/data/news';

export function generateStaticParams() {
  return allNews.map((article) => ({
    id: article.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = allNews.find((a) => a.id === parseInt(id));
  if (!article) return { title: '뉴스를 찾을 수 없습니다' };

  return {
    title: article.title,
    description: article.content.slice(0, 150),
  };
}

export default async function NewsDetailPage({ params }) {
  const { id } = await params;
  const article = allNews.find((a) => a.id === parseInt(id));

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

  // Related articles (same category, exclude current)
  const related = allNews
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="pt-20 bg-brand-black">
      {/* Header */}
      <section className="relative py-20 lg:py-24 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-white/60 hover:text-brand-gold-light text-sm font-medium transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            뉴스 목록으로
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-brand-gold-light bg-brand-red/20 px-2.5 py-0.5 rounded-full">
              {article.categoryLabel}
            </span>
            <span className="text-sm text-white/50">{article.date}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-white/50 text-sm mt-4">By {article.author}</p>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Featured Image Placeholder */}
          <div className="aspect-video rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-gold/10 mb-10 flex items-center justify-center">
            <svg className="w-20 h-20 text-brand-red/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-brand-black/80 leading-relaxed mb-5 text-[15px] lg:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-brand-gray">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {article.author}
            </div>
            <div className="flex gap-2">
              {['F', 'X', 'K'].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white text-xs font-bold text-brand-gray transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-brand-gray-light/50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-brand-black mb-8">
              관련 뉴스
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[11px] text-brand-gray">{item.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-brand-black group-hover:text-brand-red transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-gray mt-2 line-clamp-2">
                    {item.content.replace(/\n/g, ' ').slice(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12 bg-white text-center">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full transition-all duration-200 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          모든 뉴스 보기
        </Link>
      </section>
    </div>
  );
}
