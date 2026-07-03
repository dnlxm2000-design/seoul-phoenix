import { fetchAllNews } from '@/data/news';
import NewsDetailClient from './NewsDetailClient';

// Generate static pages for ALL existing articles at build time
export async function generateStaticParams() {
  const articles = await fetchAllNews();
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

export default async function NewsDetailPage({ params }) {
  const { id } = await params;
  const allArticles = await fetchAllNews();
  const article = allArticles.find((a) => a.id === parseInt(id)) || null;
  const related = article
    ? allArticles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)
    : [];
  return <NewsDetailClient id={id} initialArticle={article} initialRelated={related} />;
}
