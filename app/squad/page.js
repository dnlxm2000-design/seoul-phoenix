import Link from 'next/link';

const players = [
  { number: 1, name: 'Vikneswaran Krisnan', position: 'GK', nation: 'MAS', flag: '🇲🇾' },
  { number: 2, name: '임오규', position: 'MF', nation: 'KOR', flag: '🇰🇷' },
  { number: 5, name: 'Wan Syamil Sulaiman', position: 'MF', nation: 'MAS', flag: '🇲🇾' },
  { number: 6, name: '송영주', position: 'MF', nation: 'KOR', flag: '🇰🇷' },
  { number: 7, name: '정은호', position: 'DF', nation: 'KOR', flag: '🇰🇷' },
  { number: 9, name: '이지석', position: 'DF', nation: 'KOR', flag: '🇰🇷' },
  { number: 10, name: '최찬양', position: 'MF', nation: 'KOR', flag: '🇰🇷', captain: true },
  { number: 12, name: '박평안', position: 'DF', nation: 'KOR', flag: '🇰🇷' },
  { number: 13, name: '오상묵', position: 'MF', nation: 'KOR', flag: '🇰🇷' },
  { number: 15, name: 'Adam Ilham Idwan Shah', position: 'MF', nation: 'MAS', flag: '🇲🇾' },
  { number: 16, name: '유준혁', position: 'MF', nation: 'KOR', flag: '🇰🇷' },
  { number: 17, name: 'Mhlengi Sibonani Ndhlovu', position: 'DF', nation: 'RSA', flag: '🇿🇦' },
  { number: 18, name: 'Zubair Kamarulzaman', position: 'DF', nation: 'MAS', flag: '🇲🇾' },
  { number: 22, name: '방선우', position: 'MF', nation: 'KOR', flag: '🇰🇷' },
  { number: 23, name: '최지윤', position: 'DF', nation: 'KOR', flag: '🇰🇷' },
  { number: 24, name: '—', position: '—', nation: '—', flag: '' },
];

const positionGroups = [
  { key: 'GK', label: '골키퍼', color: 'bg-yellow-500' },
  { key: 'DF', label: '수비수', color: 'bg-blue-500' },
  { key: 'MF', label: '미드필더', color: 'bg-green-500' },
];

export const metadata = {
  title: '선수단',
  description: '서울피닉스 FC의 선수단을 소개합니다.',
};

function PositionBadge({ position }) {
  const group = positionGroups.find((g) => g.key === position);
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-white text-xs font-bold ${
        group?.color || 'bg-gray-500'
      }`}
    >
      {position}
    </span>
  );
}

export default function SquadPage() {
  const goalkeepers = players.filter((p) => p.position === 'GK');
  const defenders = players.filter((p) => p.position === 'DF');
  const midfielders = players.filter((p) => p.position === 'MF');

  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">선수단</h1>
          <p className="text-lg text-white/60">2026시즌 서울피닉스 FC의 선수들을 소개합니다</p>
        </div>
      </section>

      {/* Squad Info */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {/* Position Legend */}
          <div className="flex items-center gap-6 mb-8 justify-center">
            {positionGroups.map((g) => (
              <div key={g.key} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded ${g.color}`} />
                <span className="text-sm text-brand-gray">{g.label}</span>
              </div>
            ))}
          </div>

          {/* Goalkeepers */}
          <div className="mb-10">
            <h2 className="text-lg font-extrabold text-brand-black mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              골키퍼
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {goalkeepers.map((player) => (
                <PlayerCard key={player.number} player={player} />
              ))}
            </div>
          </div>

          {/* Defenders */}
          <div className="mb-10">
            <h2 className="text-lg font-extrabold text-brand-black mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              수비수
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {defenders.map((player) => (
                <PlayerCard key={player.number} player={player} />
              ))}
            </div>
          </div>

          {/* Midfielders */}
          <div>
            <h2 className="text-lg font-extrabold text-brand-black mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              미드필더
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {midfielders.map((player) => (
                <PlayerCard key={player.number} player={player} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,57,70,0.1),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">서울피닉스의 선수가 되어보세요</h2>
          <p className="text-white/60 mb-8">
            재능 있는 선수들의 지원을 기다립니다
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-full transition-all duration-200"
          >
            문의하기
          </Link>
        </div>
      </section>
    </div>
  );
}

function PlayerCard({ player }) {
  if (!player.position || player.position === '—') return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 group">
      {/* Jersey Number */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl font-extrabold text-brand-red/20 group-hover:text-brand-red/40 transition-colors">
          #{player.number}
        </span>
        <PositionBadge position={player.position} />
      </div>

      {/* Player Avatar */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-red/10 to-brand-gold/10 mx-auto mb-3 flex items-center justify-center">
        <span className="text-xl font-extrabold text-brand-red/60">
          {player.name.charAt(0)}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-center font-bold text-brand-black text-sm leading-tight">
        {player.name}
        {player.captain && (
          <span className="ml-1 text-xs text-brand-gold" title="주장">(C)</span>
        )}
      </h3>

      {/* Nationality */}
      <p className="text-center text-xs text-brand-gray mt-1">
        {player.flag} {player.nation}
      </p>
    </div>
  );
}
