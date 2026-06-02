'use client';

import { useState } from 'react';

const albums = [
  {
    id: 'match',
    label: '경기 사진',
    active: true,
    images: [
      {
        id: 1,
        title: 'Seoul Phoenix FC',
        desc: 'Seoul phoenix #malaysia #afl #korean',
        src: '/gallery/gallery-1.jpg',
      },
      {
        id: 2,
        title: 'Since 2025',
        desc: 'SEOUL PHOENIX FC in Malaysia',
        src: '/gallery/gallery-3.jpg',
      },
      {
        id: 3,
        title: 'Back Numbers',
        desc: '서울피닉스 FC 등번호',
        src: '/gallery/gallery-2.jpg',
      },
      {
        id: 4,
        title: 'New Players',
        desc: 'Welcome our new players!',
        src: '/gallery/gallery-4.jpg',
      },
      {
        id: 10,
        title: 'Cameroon Players',
        desc: '카메룬 신입 선수 Ismaila, Yahaya 합류 (2026.01.19)',
        src: '/20260119-cameroon-players.jpg',
      },
      {
        id: 11,
        title: 'Match Day Poster',
        desc: 'Imigresen FC 홈경기 포스터 (2025.10.08)',
        src: '/20251008-matchday-poster.jpg',
      },
    ],
  },
  {
    id: 'training',
    label: '선수단',
    images: [
      {
        id: 5,
        title: 'Team Photo',
        desc: '서울피닉스 FC 선수단',
        gradient: 'from-brand-red/30 via-brand-black/20 to-brand-gold/20',
      },
      {
        id: 6,
        title: 'Training Session',
        desc: '말레이시아 현지 훈련',
        gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
      },
      {
        id: 7,
        title: 'Match Preparation',
        desc: '경기 전 워밍업',
        gradient: 'from-green-500/20 via-teal-500/20 to-cyan-500/20',
      },
      {
        id: 12,
        title: 'Training BTS',
        desc: '훈련 비하인드 씬 (2025.10.09)',
        src: '/20251009-training-bts.jpg',
      },
    ],
  },
  {
    id: 'team',
    label: '팀 단체',
    images: [
      {
        id: 8,
        title: 'Group Photo',
        desc: '2025-26 시즌 팀 단체',
        gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
      },
      {
        id: 9,
        title: 'Coaching Staff',
        desc: '코칭 스태프',
        gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
      },
    ],
  },
  {
    id: 'video',
    label: '영상',
    videos: [
      {
        id: 1,
        title: '말레이시아 2부 리그에 진출한 한국팀🇰🇷',
        channel: 'ZD Sports Studio',
        views: '1.9천',
        videoId: 'ePzwjp6oako',
        desc: '서울피닉스 FC의 말레이시아 도전 스토리 1부',
      },
      {
        id: 2,
        title: '말레이시아 2부리그에 진출한 한국팀 2화',
        channel: 'ZD Sports Studio',
        views: '1.5천',
        videoId: 'lrrcBdScUFY',
        desc: '서울피닉스 FC의 말레이시아 도전 스토리 2부',
      },
      {
        id: 3,
        title: '말레이시아 2부리그에 진출한 한국 축구 팀 - 서울 피닉스 FC',
        channel: 'JP의 말레이시아 일기',
        views: '1.8천',
        videoId: 'SKpgC60MHX0',
        desc: 'K4리그 FC세종에서 말레이시아까지의 여정',
      },
      {
        id: 4,
        title: 'Highlights Seoul Phoenix FC vs KDA FC 280925',
        channel: 'Kedah Darul Aman FC',
        views: '762',
        videoId: 'PaMnJjX9Z10',
        desc: '서울피닉스 vs 케다 다룰 아만 FC 하이라이트',
      },
      {
        id: 5,
        title: 'MANJUNG CITY FC VS SEOUL PHOENIX FC',
        channel: 'MANJUNG CITY FC OFFICIAL',
        views: '8.4천',
        videoId: '2fLSFMf4RY0',
        desc: '서울피닉스 역사적 첫 승 경기 (1-0)',
      },
      {
        id: 6,
        title: 'Machan FC lwn Seoul Phoenix FC | Liga A1 Semi Pro 25/26',
        channel: 'Astro Arena',
        views: '1만',
        videoId: 'eVgjFIuhxGQ',
        desc: 'Astro Arena 중계 - Machan FC vs 서울피닉스',
      },
      {
        id: 7,
        title: 'Kelantan Red Warrior FC vs Seoul Phoenix FC',
        channel: 'Kelantan Red Warrior Official',
        views: '8.6천',
        videoId: '8qqxl2KEIIc',
        desc: 'Kelantan Red Warrior vs 서울피닉스 풀경기',
      },
      {
        id: 8,
        title: 'KOTA KEMUNING CITY FC vs SEOUL PHOENIX FC',
        channel: 'AFN TV',
        views: '359',
        videoId: '9WalhIZ-yNU',
        desc: 'Community Shield Cup 2026 친선전',
      },
      {
        id: 9,
        title: '서울피닉스 훈련 비하인드',
        channel: 'Seoul Phoenix FC',
        views: 'Instagram',
        src: '/20251009-training-video.mp4',
        desc: '훈련장 비하인드 씬 (2025.10.09)',
      },
    ],
  },
];

export default function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState('match');
  const [selectedImage, setSelectedImage] = useState(null);

  const currentAlbum = albums.find((a) => a.id === activeAlbum);

  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">갤러리</h1>
          <p className="text-lg text-white/60">서울피닉스의 순간들을 사진과 영상으로 만나보세요</p>
        </div>
      </section>

      {/* Album Tabs */}
      <section className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1 py-3">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeAlbum === album.id
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'text-brand-gray hover:text-brand-black hover:bg-gray-100'
                }`}
              >
                {album.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {activeAlbum === 'video' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentAlbum?.videos?.map((video) => (
                video.src ? (
                  <div
                    key={video.id}
                    className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-brand-black shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <video
                      src={video.src}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-xs leading-tight mb-0.5 line-clamp-2">{video.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-white/50 text-[10px]">{video.channel}</span>
                        <span className="text-white/30 text-[10px]">·</span>
                        <span className="text-white/40 text-[10px]">{video.views}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-brand-black shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-red/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-red transition-transform duration-300">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-semibold text-xs leading-tight mb-0.5 line-clamp-2">{video.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-white/50 text-[10px]">{video.channel}</span>
                        <span className="text-white/30 text-[10px]">·</span>
                        <span className="text-white/40 text-[10px]">조회 {video.views}</span>
                      </div>
                    </div>
                  </a>
                )
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentAlbum?.images?.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-brand-black shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} group-hover:scale-105 transition-transform duration-500`} />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-sm">{image.title}</p>
                    <p className="text-white/70 text-xs mt-0.5">{image.desc}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            aria-label="닫기"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImage.src ? (
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full rounded-2xl shadow-2xl"
              />
            ) : (
              <div
                className={`aspect-video rounded-2xl bg-gradient-to-br ${selectedImage.gradient} mb-4 flex items-center justify-center`}
              >
                <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="text-center">
              <p className="text-white font-semibold text-lg">{selectedImage.title}</p>
              <p className="text-white/60 mt-1">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
