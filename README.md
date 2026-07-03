# 서울피닉스FC 공식 웹사이트

Next.js 기반 서울피닉스FC 공식 웹사이트. 정적 사이트로 빌드되어 FTP로 배포됩니다.

## 사이트 구조도

```
soccerline.dothome.co.kr
├── /                          # 홈페이지 (app/page.js)
│   ├── Hero 섹션 (구단 로고 + 타이틀)
│   ├── 구단 비전 섹션
│   ├── 최근 경기 결과 (RecentNews 컴포넌트)
│   ├── K·국제클럽축구연맹 / MSL 설명란
│   └── 스폰서 영역
│
├── /about                     # 클럽 소개 (app/about/page.js)
│   ├── 연혁 (timeline)
│   ├── 감독 소개 (Ariff Hashim)
│   ├── 리더십팀 (구단주/단장/기술고문/법률위원장/사무국장/운영본부장)
│   └── 구단 철학
│
├── /news                      # 뉴스 목록 (app/news/page.js)
│   └── 게시글 목록 (SSG)
│       └── /news/[id]         # 뉴스 상세 (app/news/[id]/page.js)
│           ├── /news/1 ~ /news/25  (정적 생성, SSG)
│
├── /schedule                  # 경기 일정 목록 (app/schedule/page.js)
│   └── A1 리그 2025/2026 전체 일정
│       └── /schedule/[id]     # 경기 상세 (app/schedule/[id]/page.js)
│           ├── /schedule/7 ~ /schedule/231  (정적 생성, SSG, 50페이지)
│           ├── MatchDetailClient.js (클라이언트 컴포넌트)
│           │   ├── 스코어보드 (홈/원정 점수, 승패 색상)
│           │   ├── 득점자 목록 (득점/자책골/페널티)
│           │   ├── 출전선수 (라인업 11명 + 교체선수)
│           │   ├── 경고카드 (옐로카드)
│           │   └── 경기 정보 (경기장, 날짜, 리그)
│
├── /squad                    # 선수단 (app/squad/page.js)
│   ├── 2025-26시즌 선수 프로필
│   └── /squad/2026-27        # 2026-27시즌 선수단 (app/squad/2026-27/page.js)
│       └── 시즌 전환 버튼으로 2025-26 ↔ 2026-27 이동 가능
│
├── /gallery                  # 갤러리 (app/gallery/page.js)
│
├── /federation               # K·국제클럽축구연맹 소개 (app/federation/page.js)
│
├── /contact                  # 연락처 (app/contact/page.js)
│   └── 문의 폼 → API /api/inquiries.php → MySQL 전송
│
├── /sponsors                 # 스폰서 (app/sponsors/ - 빈 디렉토리)
│
├── /ticket                   # 티켓 (app/ticket/ - 빈 디렉토리)
│
└── /api                      # PHP API (백엔드, 서버사이드)
    └── db-check.php
```

## 데이터 흐름

### 정적 데이터 (로컬 JSON)
```
data/
├── a1_2025-26.json           # A1 리그 시즌 DB (29경기)
│   ├── matches[]
│   │   ├── scores (seoul/opponent)
│   │   ├── result (W/L/D)
│   │   ├── lineups (선발 11명) [+ substitutes]
│   │   ├── goals (득점자/시간/type)
│   │   ├── yellow_cards (경고)
│   │   ├── homeTeamName / awayTeamName (영문, 필터용)
│   │   └── homeTeamDisplay / awayTeamDisplay (표시명)
│   └── squad (선수단)
│
├── fam-match-data.json       # FAM CMS 파싱 원본 (v2)
├── wikipedia-seoulphoenix-squad.json  # Wikipedia 선수단 데이터
├── wikipedia-a1league.json   # Wikipedia 리그 데이터
└── news.js                   # 뉴스 데이터 (정적 fallback, DB 우선)
```

### DB (MySQL, soccerline.dothome.co.kr)
```
api/
├── admin.php      # 관리자 페이지
├── auth.php       # 인증
├── db.php         # DB 연결
├── inquiries.php  # 문의 폼 API (POST)
├── news.php       # 뉴스 API
├── schema.sql     # DB 스키마
└── db-check.php   # DB 상태 확인
```

### 외부 데이터 소스
```
FAM CMS (cms.fam.org.my)
  └── /resultdetail/...       # 경기 상세 페이지
      ├── 라인업 (Team A / Team B)
      ├── 득점자
      ├── 경고카드 (kkuning.png 이미지)
      └── 교체선수 및 시간
```

## 컴포넌트 구조

```
components/
├── Header.js         # 네비게이션 헤더 (모바일 메뉴 포함)
│   ├── 로고 (서울피닉스FC)
│   └── Nav: 홈 / 클럽소개 / 뉴스 / 선수단 / 경기일정 / 갤러리 / 연맹소개 / 연락처
│
├── Footer.js         # 푸터
│
└── RecentNews.js     # 최근 뉴스 요약 (홈페이지, 이미지 표시 지원)

app/
├── layout.js         # Root Layout (Header + Footer + globals.css)
├── globals.css       # Tailwind CSS + 전역 스타일
├── page.js           # 홈페이지
└── schedule/[id]/
    └── MatchDetailClient.js  # 경기 상세 (스코어/득점/라인업/경고)
```

## 빌드 및 배포

```bash
# 빌드 (정적 export)
npx next build          # out/ 디렉토리 생성

# FTP 업로드 (PowerShell)
curl.exe -T "out/파일" "ftp://soccerline.dothome.co.kr/html/경로" \
  --user "soccerline:love1004!" --ftp-create-dirs

# 웹 루트: /html/
```

## 주요 설정

| 항목 | 내용 |
|------|------|
| Framework | Next.js 16 (Turbopack) |
| 스타일 | Tailwind CSS |
| 출력 방식 | Static Export (`output: "export"`) |
| 배포 | FTP (Dothome) |
| DB | MySQL (soccerline.dothome.co.kr) |
| 파서 | Node.js (`scripts/fam-match-parser-v2.js`) |
| 언어 | 한국어 (ko_KR) |

## 스크립트

```
scripts/
├── fam-match-parser-v2.js   # FAM CMS 29경기 파싱 (v2, 최종)
├── fam-match-parser.js      # v1 파서 (rows.length/2 버그)
├── merge_v2_data.js         # v2 데이터 a1.json 병합
├── fix_lineup_swap.js       # 홈/원정 라인업 swap 보정
├── add_display_fields.js    # display 필드 추가
├── fix_goal_scorers.js      # 득점자 팀명 데이터 보정
├── verify_v2_data.js        # 데이터 검증
├── analyze_lineup_bug.js    # 라인업 버그 분석
└── check_gk.js              # GK 확인
```

## DB 리더십팀 (2026.07 기준)

| 직책 | 담당자 |
|------|--------|
| 구단주 | 손진영 |
| 단장 | 권혁민 |
| 기술고문 | 변병주 |
| 법률위원장 및 감사 | 조금현 |
| 사무국장 | 엄민식 |
| 운영본부장 | 이다솜 |
| Head Coach | Ariff Hashim |
