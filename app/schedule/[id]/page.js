import allData from '@/data/a1_2025-26.json';
import MatchDetailClient from './MatchDetailClient';

export async function generateStaticParams() {
  const matches = allData.seoul_phoenix.matches;
  return matches.map((m) => ({
    id: m.match_id.toString(),
  }));
}

export default async function MatchDetailPage({ params }) {
  const { id } = await params;
  const matchId = parseInt(id);
  const matches = allData.seoul_phoenix.matches;
  const match = matches.find((m) => m.match_id === matchId) || null;
  const stadiums = allData.stadiums || [];

  if (!match) {
    return (
      <div className="pt-20 min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">경기를 찾을 수 없습니다</h1>
          <p className="text-white/60">존재하지 않는 경기입니다.</p>
        </div>
      </div>
    );
  }

  return <MatchDetailClient match={match} stadiums={stadiums} />;
}
