# 서울피닉스FC 프로젝트 컨텍스트

> 이 문서는 프로젝트의 전반적인 구조, 데이터 흐름, 알려진 이슈, 모든 의사결정을 기록합니다.
> **데이터가 사라져도 이 문서만 있으면 전체 프로젝트를 재구축하고 모든 작업을 이어서 할 수 있습니다.**

---

## 1. 프로젝트 개요

**사이트**: https://soccerline.dothome.co.kr
**프레임워크**: Next.js 16 (Turbopack) — Static Export (`output: "export"`)
**스타일**: Tailwind CSS
**배포**: FTP (Dothome, 웹루트 `/html/`)
**DB**: MySQL (soccerline.dothome.co.kr) — 뉴스/문의/관리자
**언어**: 한국어 (ko_KR)
**구단**: 서울피닉스FC — 말레이시아 A1 Semi-Pro League 2025-26 참가 (14위/15팀, 17pts, -79 GD)
**구단주**: 손진영
**2025-26 최종 순위**: 14위 (승점 17, 28경기) — Machan FC 기권 제외
**2026-27 리그 개막**: 2026년 8월 (SofaScore 기준 8월~5월 시즌)
**2026-27 프리시즌**: 2026년 7월 중순부터 본격 훈련 돌입

---

## 2. 사이트 구조 (라우트)

| 라우트 | 파일 | 설명 | 타입 |
|--------|------|------|------|
| `/` | `app/page.js` | 홈페이지 — Hero, 비전, 최근뉴스, 리그 설명, 스폰서 | Static |
| `/about` | `app/about/page.js` | 클럽 소개 — 연혁, 감독(Ariff Hashim), 리더십팀, 철학 | Static |
| `/news` | `app/news/page.js` | 뉴스 목록 — `'use client'`, API fetch, 인라인 상세 보기 | Client |
| `/news/[id]` | `app/news/[id]/page.js` | 뉴스 상세 (정적 생성, SSG, id=1~33) | SSG |
| `/schedule` | `app/schedule/page.js` | 경기 일정 목록 | Static |
| `/schedule/[id]` | `app/schedule/[id]/page.js` | 경기 상세 (SSG, 50페이지, id=7~231) | SSG |
| `/squad` | `app/squad/page.js` | 선수단 (2025-26시즌) | Static |
| `/squad/2026-27` | `app/squad/2026-27/page.js` | 선수단 (2026-27시즌) — 시즌 전환 버튼 있음 | Static |
| `/gallery` | `app/gallery/page.js` | 갤러리 | Static |
| `/federation` | `app/federation/page.js` | K·국제클럽축구연맹 소개 (독립 페이지) | Static |
| `/contact` | `app/contact/page.js` | 연락처 — 문의 폼 → MySQL | Static |
| `/sponsors` | `app/sponsors/` | (빈 디렉토리, 미구현) | - |
| `/ticket` | `app/ticket/` | (빈 디렉토리, 미구현) | - |

### 컴포넌트

| 파일 | 역할 |
|------|------|
| `components/Header.js` | 네비게이션 헤더 (8개 nav item: 홈/클럽소개/뉴스/선수단/경기일정/갤러리/연맹소개/연락처, 모바일 메뉴, 스크롤 감지 투명→불투명) |
| `components/Footer.js` | 푸터 — 클럽 정보, SNS, 네비게이션, copyright |
| `components/RecentNews.js` | 홈페이지 최근 뉴스 요약 (최신 4개, 이미지 표시 지원) |
| `app/layout.js` | Root Layout (Header+Footer+globals.css) |
| `app/globals.css` | Tailwind CSS + 전역 스타일 |
| `app/schedule/[id]/MatchDetailClient.js` | 경기 상세 클라이언트 컴포넌트 (스코어보드/득점자/라인업/경고/경기정보) |

---

## 3. 데이터 소스

### 3.1 Wikipedia (초기 데이터)
- **URL**: https://en.wikipedia.org/wiki/2025-26_Malaysia_A1_Semi-Pro_League
- **추출 내용**: 리그 전체 일정 (165경기), 서울피닉스 29경기 match_id/날짜/상대/홈어웨이/스코어/결과, 선수단, 경기장 정보
- **저장 파일**: `data/wikipedia-a1league.json`, `data/wikipedia-seoulphoenix-squad.json`
- **한계**: 라인업, 득점자, 경고, 교체 정보 없음 (기본 일정만 있음)

### 3.2 FAM CMS (상세 데이터) — **1차 데이터 소스**
- **기본 URL**: `https://cms.fam.org.my/resultdetail/{encoded_id}/W2025MA1`
- **서울피닉스 팀 페이지**: `https://cms.fam.org.my/teamdetail/czo5OiJjbXMuc2VvdWwiOw==/W2025MA1`
- **추출 내용**: 라인업(Team A/B), 득점자, 경고/퇴장(이미지: kkuning.png=옐로, kmerah.png=레드), 교체선수/시간, 심판, 경기장
- **저장 파일**: `data/fam-match-data.json` (29경기, v2 파서)
- **29개 매치 URL**: `scripts/fam-match-parser-v2.js`의 `MATCH_URLS` 배열 참조

### 3.3 MySQL DB — 뉴스/문의/관리자 시스템
- **호스트**: soccerline.dothome.co.kr
- **파일 위치**: `api/` 디렉토리 (PHP)
- **테이블**:
  - `news` — 뉴스 기사 (id, title, category, categoryLabel, date, content, author, image, createdAt, updatedAt)
  - `inquiries` — 문의 폼 데이터
  - `admin` — 관리자 계정
- **API 엔드포인트**:
  - `api/news.php` — GET: 전체 뉴스 목록 반환 (JSON `{success, data[]}`)
  - `api/inquiries.php` — POST: 문의 폼 제출
  - `api/admin.php` — 관리자 페이지 (로그인 + 뉴스 CRUD + 문의 관리)
  - `api/auth.php` — 인증 처리
  - `api/upload.php` — POST (multipart, `file` 필드): 이미지 업로드 → `{"success":true,"url":"/uploads/..."}` 반환
  - `api/db.php` — DB 연결 설정
  - `api/schema.sql` — DB 스키마

---

## 4. 데이터 파이프라인

### 4.1 흐름도

```
Wikipedia HTML
    ↓ (파싱)
data/wikipedia-a1league.json (165경기 전체 일정)
    ↓
data/a1_2025-26.json (초기 생성: 29개 서울 경기, 기본 정보만)
    ↑
FAM CMS HTML (29개 매치 상세 페이지)
    ↓ (v2 파서, scripts/fam-match-parser-v2.js)
data/fam-match-data.json (파싱 원본, 29경기)
    ↓ (scripts/merge_v2_data.js)
a1_2025-26.json (lineups/goals/substitutes 병합)
    ↓ (scripts/fix_lineup_swap.js — 1개 매치 swap)
    ↓ (scripts/add_display_fields.js — display 필드 추가)
    ↓ (scripts/fix_goal_scorers.js — 팀명 득점자 null 처리)
```

### 4.2 실행 순서 (재구축 시)

```bash
# 1. Wikipedia 데이터 파싱 (초기 a1_2025-26.json 생성)
#    → scripts/fam-match-parser.js 에서 가져온 match list

# 2. FAM CMS 29경기 상세 파싱
node scripts/fam-match-parser-v2.js   # → data/fam-match-data.json

# 3. a1_2025-26.json에 v2 데이터 병합
node scripts/merge_v2_data.js          # lineups/substitutes/goals 업데이트

# 4. 라인업 swap 보정 (FAM CMS Team A/B ≠ 실제 홈/원정)
node scripts/fix_lineup_swap.js        # 1개 매치(match_id=101) swap

# 5. display 필드 추가
node scripts/add_display_fields.js     # homeTeamDisplay/awayTeamDisplay/homeTeamName/awayTeamName

# 6. 득점자 팀명 보정
node scripts/fix_goal_scorers.js       # 7골 name=null 처리

# 7. 빌드
npm run build

# 8. FTP 배포
# PowerShell: out/의 모든 파일을 ftp://soccerline.dothome.co.kr/html/ 로 업로드
```

---

## 5. JSON 데이터 구조 (`data/a1_2025-26.json`)

### 5.1 최상위
```json
{
  "meta": { "title", "source_wikipedia", "source_fam_cms", "extracted", "description" },
  "season": { "competition", "season", "dates", "winner", "promoted", "relegated",
              "top_scorer", "matches": 165, "total_goals": 477, ... },
  "stadiums": [ { "team", "location", "stadium", "capacity" } ],
  "seoul_phoenix": {
    "squad": [ { "number", "name", "position", "nationality" } ],
    "matches": [ Match ]
  }
}
```

### 5.2 Match 객체
```json
{
  "match_id": 7,
  "date": "2025-08-02",
  "venue": "STADIUM MAJLIS BANDAARAYA PASIR GUDANG",
  "opponent": "Johor Darul Ta'zim II",
  "home_away": "away",
  "scores": { "seoul": 1, "opponent": 0 },
  "result": "W",
  "kickoff": "8:45 PM",
  "htHome": 0, "htAway": 0,
  "referee": "MUHAMMAD USAID BIN JAMAL",
  "homeTeamDisplay": "JDT II",          // 좌측 컬럼 표시명
  "awayTeamDisplay": "서울피닉스FC",       // 우측 컬럼 표시명
  "homeTeamName": "JOHOR DARUL TA'ZIM II",  // 좌측팀 영문 대문자
  "awayTeamName": "SEOUL PHOENIX FC",       // 우측팀 영문 대문자
  "goals": [
    {
      "team": "SEOUL PHOENIX FC",    // 득점팀 (teamName 값과 일치)
      "minute": 51,
      "name": "MUHAMMAD FARIS DANISH  MOHD ASRUL",  // 득점자 (null 가능)
      "number": 31,
      "type": "normal"                // "normal" | "own-goal" | "penalty" | "unknown"
    }
  ],
  "lineups": { "home": [ Player 11명 ], "away": [ Player 11명 ] },
  "substitutes": { "home": [ Player ], "away": [ Player ] }
}
```

### 5.3 Player 객체 (라인업/교체)
```json
{
  "number": 19, "name": "JUNHYEOK OH", "position": "GK",
  "captain": true, "u22": true,
  "yellowCard": "82", "redCard": "90+3",
  "subOut": 43, "subIn": 66, "subNumber": 1
}
```

---

## 6. 뉴스 시스템 (MySQL 기반)

### 6.1 데이터 흐름
```
관리자(api/admin.php)에서 뉴스 등록
    ↓ (INSERT INTO news)
MySQL DB
    ↓ (api/news.php GET)
fetchAllNews() → allNews (useState)
    ↓
filteredNews (activeCategory + searchTerm 기준 필터링)
    ↓
목록 표시 / 상세 보기
```

### 6.2 페이지 로직 (`app/news/page.js`)

**핵심 상태**:
- `allNews[]` — API에서 받아온 전체 기사
- `activeCategory` — 현재 카테고리 필터 ('all' | 'club' | 'korean' | 'malaysia' | 'interview')
- `selectedId` — 상세 보기 중인 기사 ID (null=목록)
- `searchTerm` — 검색어
- `loading` — API 로딩 상태

**인라인 상세 보기 시스템**:
- `selectArticle(article)` → `setSelectedId(article.id)` + URL에 `?id=N` pushState
- `backToList()` → `setSelectedId(null)` + URL에서 `?id=` 제거
- 초기 로드 시 URL `?id=N` 확인 → 있으면 해당 기사 상세 표시
- 헤더에서 `/news/` 링크 클릭 시 → `useEffect`에서 `selectedId` 리셋 (전체 목록으로 복귀)
- 카테고리 버튼 클릭 시 → `setActiveCategory()` + 상세 중이면 `backToList()` 자동 호출

**카테고리 정의** (`data/news.js`):
```javascript
export const categories = [
  { id: 'all', label: '전체' },
  { id: 'club', label: '클럽 소식' },
  { id: 'korean', label: '한국 축구' },
  { id: 'malaysia', label: '말레이시아 축구' },
  { id: 'interview', label: '인터뷰' },
];
```

**API 응답 구조** (MySQL `news` 테이블):
```json
{
  "id": 33,
  "title": "기사 제목",
  "category": "club",
  "categoryLabel": "클럽 소식",
  "date": "2026-07-02",
  "content": "기사 본문 (줄바꿈 포함)",
  "author": "서울피닉스미디어",
  "image": "/uploads/news_20260702_223027_65a1eaa8.jpg",
  "createdAt": "2026-07-02 22:14:38",
  "updatedAt": "2026-07-02 22:30:31"
}
```

### 6.3 이미지 업로드
- **POST** `/api/upload.php` (multipart, 필드명 `file`)
- 응답: `{"success":true,"url":"/uploads/파일명"}`
- 관리자 페이지에서 업로드 후 URL을 `image` 필드에 저장
- 이미지가 없는 기사는 SVG 아이콘 fallback 표시
- **홈페이지 RecentNews**와 **뉴스 목록/상세** 모두 이미지 표시 지원

### 6.4 알려진 사항
- `fetchAllNews()`는 `lib/news-api.js`에 정의
- 정적 뉴스 데이터(`data/news.js`의 `allNews`)는 fallback용 (실제로는 API 우선)
- `/news/[id]` SSG 페이지는 빌드 시 생성된 기사만 정적 제공 (id=1~33)
- `?id=N`으로 접근 시 API에서 실시간 조회 → 재빌드 없이 신규 기사 접근 가능

---

## 7. FAM CMS 파서 상세

### 7.1 파서 버전 이력

| 버전 | 파일 | 방식 | 문제 |
|------|------|------|------|
| v1 | `fam-match-parser.js` | `rows.length/2`로 Team A/B 분할 | Team A/B의 행 수가 항상 같지 않아 원정 1명씩 누락 (11/10) |
| v2 | `fam-match-parser-v2.js` | `<!-- Team A Line-up -->` / `<!-- Team B Line-up -->` HTML 주석 기준 분할 | 정확히 11/11 분할 성공 |

### 7.2 v2 파서 핵심 로직

**라인업 추출**:
```
HTML 주석 "<!-- Team A Line-up -->" 와 "<!-- Team B Line-up -->" 사이를
각각 추출 → "d-flex justify-content-between" 으로 split → 각 row에서
"badge bg-primary[^>]*>(\d+)"(번호) + "<strong[^>]*>([^<]+)</strong>"(이름)
```

**Team A vs Team B 구조 차이**:
- **Team A**: 번호(`badge bg-primary me-2`)가 이름 왼쪽, 이벤트 div 오른쪽
- **Team B**: 이벤트 div 왼쪽, 이름이 오른쪽(`text-end flex-grow-1`), 번호(`badge bg-primary ms-2`) div 밖

**득점자 추출**:
```
"Goal Scorers" 섹션 → "badge bg-success" 에서 시간
→ "<strong>" 에서 선수명 → "badge bg-primary" 에서 등번호
→ "Team B Goals" 마커 위치로 소속팀 판별
```

**카드 추출**:
- 노란카드: `kkuning.png` 이미지 → alt/주변 텍스트에서 시간
- 빨간카드: `kmerah.png` 이미지 → 주변 텍스트에서 시간

**교체 추출**:
- 선발: 하단 화살표 ▼숫자 → `subOut` 시간
- 교체: 상단 화살표 ▲숫자 → `subIn` 시간 + sub(등번호) → `subNumber`

### 7.3 알려진 파서 한계
1. 득점자명이 팀명인 경우 (FAM CMS에 선수명 미기록) → `fix_goal_scorers.js`에서 `g.name=null` 처리
2. 일부 매치에서 substitutes의 home/away 구분이 FAM CMS Team A/B와 다를 수 있음
3. 경고카드가 이미지(`kkuning.png`)로 존재 → OCR 없이 alt 텍스트 의존
4. 중립 경기에서 Team A/B만으로 홈/원정 판별 불가 → display 필드 시스템으로 우회

---

## 8. display 필드 시스템 (경기 상세 화면)

### 8.1 목적
FAM CMS의 Team A/B 순서가 실제 홈/원정과 항상 일치하지 않기 때문에, 표시용 좌우 컬럼을 별도로 관리합니다.

### 8.2 생성 로직 (`scripts/add_display_fields.js`)
```
For each match:
  if home_away == "home"  → seoulOnLeft = true (서울=홈=좌측)
  if home_away == "away"  → seoulOnLeft = false (서울=원정=우측)
  if neutral → FAM CMS에서 서울이 Team A인지로 판별

  homeTeamDisplay = seoulOnLeft ? "서울피닉스FC" : displayName(opponent)
  awayTeamDisplay = seoulOnLeft ? displayName(opponent) : "서울피닉스FC"
  homeTeamName = seoulOnLeft ? "SEOUL PHOENIX FC" : opponentUppercase
  awayTeamName = seoulOnLeft ? opponentUppercase : "SEOUL PHOENIX FC"
```

### 8.3 MatchDetailClient.js 소비 로직
```javascript
const isSeoulOnLeft = match.homeTeamName === 'SEOUL PHOENIX FC';
const homeScore = isSeoulOnLeft ? seoulScore : oppScore;   // 좌측 점수
const awayScore = isSeoulOnLeft ? oppScore : seoulScore;   // 우측 점수
const leftWon = homeScore > awayScore;
const leftLost = homeScore < awayScore;

// 점수 색상
// 좌측: leftWon ? green : leftLost ? red : white
// 우측: leftLost ? green : leftWon ? red : white

// HOME/AWAY 라벨: 좌측=HOME 고정, 우측=AWAY 고정 (isSeoulOnLeft 무관)
// 득점자 소속: homeTeamName/awayTeamName 기준 필터링
```

### 8.4 팀명 표시 매핑 (`TEAM_DISPLAY`)
```javascript
{
  'Johor Darul Ta\'zim II': 'JDT II',
  'Malaysian University': 'Malaysian Univ.',
  'Kelantan Red Warrior FC': 'Kelantan Red Warrior',
  'Manjung City FC': 'Manjung City',
  'Armed Forces FC': 'ATM Angkatan Tentera',
  'Kedah Darul Aman FC': 'Kedah Darul Aman',
  'Bunga Raya FC': 'Bunga Raya',
  'Imigresen FC II': 'Imigresen II',
  'Kelantan WTS FC': 'Kelantan WTS',
  'Selangor FC II': 'Selangor II',
  'Machan FC': 'Machan FC',
  'UM-Damansara United': 'UM-Damansara Utd',
  'Perak FA': 'Perak FA',
  'Perlis GSA FC': 'Perlis GSA',
  'Kedah FA': 'Kedah FA',
}
```

---

## 9. 선수단 페이지 (시즌 전환 시스템)

### 9.1 구조
- `/squad` — 2025-26시즌 선수단 (app/squad/page.js)
- `/squad/2026-27` — 2026-27시즌 선수단 (app/squad/2026-27/page.js)
- 각 페이지 헤더에 시즌 전환 버튼 (← 2025-26 시즌 | 2026-27 시즌 →)
- 현재 시즌은 빨간색(bg-brand-red) 버튼, 다른 시즌은 반투명(bg-white/10) 버튼

### 9.2 선수 데이터
정적 데이터 (Server Component). 각 선수는 다음 필드:
```javascript
{ number: 1, name: 'Vikneswaran Krisnan', position: 'GK', nation: 'MAS', flag: '🇲🇾', captain: true }
```
- 포지션별 그룹: GK(골키퍼/노랑), DF(수비수/파랑), MF(미드필더/초록), FW(공격수/빨강)
- 각 선수 카드: 등번호, 포지션 배지, 이니셜 아바타, 이름, 국기+국가
- 2026-27 페이지 상단에 업데이트 중 안내문 표시

---

## 10. 버그 수정 이력 (전체)

| # | 버그 | 원인 | 해결 | 영향 범위 |
|---|------|------|------|-----------|
| 1 | 라인업 11명 누락 (v1→v2) | v1 파서 Team A/B 행 수 불일치 | HTML 주석 기준 분할로 변경 | 28/29 매치 |
| 2 | 득점자 표시 안됨 | goals 필터가 없는 `match.homeTeam` 참조 | `homeTeamName`/`awayTeamName`으로 대체 | 전체 경기 |
| 3 | 홈/원정 좌우 반전 | `SIDE` 객체가 없는 `match.homeTeam` 의존 | `SIDE` 제거, display 필드 직접 사용 | 전체 경기 |
| 4 | 승패 색상 반전 | `isWin`(서울 기준)을 좌우 색상에 동일 적용 | `leftWon`(좌측 display 점수 기준)으로 변경 | 원정 경기 |
| 5 | HOME/AWAY 라벨 오류 | `isSeoulOnLeft` 기준으로 라벨 표시 | 좌측=HOME, 우측=AWAY 고정 | 전체 경기 |
| 6 | 득점자 팀명 표시 (7건) | FAM CMS에 선수명 없음, 팀명이 scorer에 기록 | `g.name=null` 처리 → "(정보 없음)" fallback | match 38/81/146/167/180/213/231 |
| 7 | 라인업 swap (1개 매치) | FAM CMS Team A/B 순서 불일치 | 조건부 lineups/substitutes swap | match_id=101 |
| 8 | 뉴스 카테고리 이동 안됨 | 상세 보기 중 카테고리 버튼이 목록으로 안돌아감 | `onClick`에 `if(selectedId) backToList()` 추가 | news page |
| 9 | 헤더 뉴스 링크 전체복귀 안됨 | 같은 페이지 `Link`가 상태 유지 | useEffect에서 `selectedId` URL기반 리셋 | news page |
| 10 | 홈페이지 최신뉴스 이미지 없음 | RecentNews가 article.image 미체크 | 조건부 `<img>` 렌더링 추가 | RecentNews.js |

---

## 11. 알려진 데이터 이슈

### 11.1 득점자 미상 (7건)
| match_id | 상대 | 득점팀 | 비고 |
|----------|------|--------|------|
| 38 | ARMED FORCES FC | 서울 | FAM CMS에 선수명 없음 |
| 81 | KEDAH DARUL AMAN FC | 서울 | 동일 |
| 146 | KELANTAN WTS FC | 서울 | 동일 |
| 167 | MANJUNG CITY FC | 서울 | 동일 |
| 180 | KEDAH FA | 서울 | 동일 |
| 213 | UM-DAMANSARA UNITED | 상대 | 동일 |
| 231 | PERLIS GSA FC | 상대 | 동일 |

→ 현재 `g.name = null`로 저장, 표시 시 "(정보 없음)" 처리됨

### 11.2 기타 이슈
- substitutes.home/away 분할이 일부 매치에서 부정확할 수 있음
- 중립 경기 display 필드 판별의 불확실성
- DB에 `korean` 카테고리 기사 없음 (버튼은 존재, 선택 시 "검색 결과가 없습니다")

---

## 12. 스크립트 레퍼런스

| 스크립트 | 용도 | 의존성 |
|----------|------|--------|
| `fam-match-parser-v2.js` | FAM CMS 29경기 HTML 파싱 → `fam-match-data.json` | 인터넷 (FAM CMS 접근) |
| `merge_v2_data.js` | v2 데이터 → `a1_2025-26.json` 병합 | `fam-match-data.json` |
| `fix_lineup_swap.js` | 라인업 swap 보정 (1개 매치) | `fam-match-data.json` |
| `add_display_fields.js` | display 필드 추가 | `fam-match-data.json` |
| `fix_goal_scorers.js` | 득점자 팀명 보정 (7건 null 처리) | 없음 |
| `verify_v2_data.js` | 데이터 검증 | 없음 |
| `analyze_lineup_bug.js` | v1 버그 분석 | 없음 |
| `check_gk.js` | GK 확인 | 없음 |

---

## 13. 관리자 / 배포 정보

### 13.1 계정 정보
- **관리자 페이지**: https://soccerline.dothome.co.kr/api/admin.php
- **관리자 계정**: ID: `admin` / PW: `love1004!`
- **FTP 호스트**: soccerline.dothome.co.kr
- **FTP 계정**: soccerline / love1004!
- **FTP 웹루트**: `/html/`
- **DB**: MySQL (soccerline.dothome.co.kr)

### 13.2 리더십팀 (2026.07 기준)
| 직책 | 담당자 |
|------|--------|
| 구단주 | 손진영 |
| 단장 | 권혁민 |
| 테크니컬 디렉터 | 변병주 |
| 이사장 | 김홍범 |
| 사무국장 | 엄민식 |
| 사업본부장 | 이다솜 |
| 사무차장 | 변민기 |
| 감독 | 김두선 |
| 공동감독 | Ariff Hashim (말레이시아) |
| 주장 | 황찬원 |

### 13.3 2026-2027 시즌 주요 일정 및 규정 변경

**출처**: BERNAMA (2026.06.26/29), The Star (2026.05.01), NST (2026.06.08)

| 항목 | 내용 |
|------|------|
| **리그 개막** | 2026년 8월 (2026/2027 M-League) |
| **프리시즌 시작** | 2026년 7월 중순 (구단별 본격 훈련) |
| **감독 자격 요건 변경** | AFL 새 지침: A1 모든 구단 감독은 **AFC Pro Diploma (Pro-A)** 소지 필수 |
| **라이선스 심사** | 2026년 5월 MFL/AFL 라이선스 데드라인 (7개 구단 통과, 일부 연장) |

**영향**: 서울피닉스FC의 차기 감독 선임 시 반드시 AFC Pro Diploma 소지자여야 함. 구단이 고심 중인 '한국인 사령탑' 역시 이 자격要件을 충족해야 함.

**타 구단 동향**:
- Kedah FA: Akmal Rizal Ahmad Rakhli (AFC Pro Licence 보유) 선임 (NST, 2026.06.08)
- Perak FA (PAFA): Pro-A 소지 감독 물색 중, AFL 새 지침에 따른 결정 (BERNAMA, 2026.06.29)
- Terengganu FC (TFC): 7월 중순 프리시즌 앞두고 새 감독 발표 예정 (BERNAMA, 2026.06.26)

### 13.3 PHP API 파일 목록
```
api/
├── admin.php        # 관리자 페이지 (로그인 + 뉴스 CRUD + 문의 관리)
├── auth.php         # 인증 처리 (세션 기반)
├── db.php           # MySQL 연결 설정
├── db-check.php     # DB 상태 확인
├── inquiries.php    # 문의 폼 API (POST → MySQL)
├── news.php         # 뉴스 API (GET → 전체 기사 JSON 반환)
├── upload.php       # 이미지 업로드 (POST multipart, file 필드)
└── schema.sql       # DB 스키마 (테이블 정의)
```

---

## 14. CSS / 디자인 시스템

### 14.1 Tailwind 커스텀 컬러
```css
brand-red: #E63946       /* 메인 포인트 컬러 (버튼, 강조) */
brand-red-dark: #C1121F  /* 호버 상태 */
brand-gold: #D4A373      /* 강조/포인트 */
brand-gold-light: #E8C9A0
brand-black: #1A1A2E     /* 다크 배경 */
brand-gray: #6B7280      /* 보조 텍스트 */
brand-gray-light: #D1D5DB
```

### 14.2 페이지 공통 패턴
- 각 페이지는 `pt-20` (Header 높이 확보)
- 헤더 섹션: `bg-brand-black` + `bg-gradient-to-br from-brand-red/20` 그라디언트
- 컨텐츠 섹션: `bg-white`
- CTA 섹션: `bg-brand-black` + `radial-gradient` 효과

---

## 15. 빌드/배포 명령어

```powershell
# === 빌드 ===
cd seoul-phoenix
npm run build

# === FTP 업로드 (전체) ===
$ftpHost = "soccerline.dothome.co.kr"
$ftpUser = "soccerline"
$ftpPass = 'love1004!'
$outDir = "out"
$baseRemote = "/html/"
$files = Get-ChildItem -Path $outDir -File -Recurse
foreach ($file in $files) {
    $relative = $file.FullName.Substring((Get-Item $outDir).FullName.Length + 1) -replace '\\', '/'
    $remotePath = "$baseRemote$relative"
    curl.exe -T "$($file.FullName)" "ftp://${ftpHost}${remotePath}" --user "${ftpUser}:${ftpPass}" --ftp-create-dirs -s
}

# === FTP 업로드 (특정 파일만) ===
curl.exe -T "out/news/index.html" "ftp://soccerline.dothome.co.kr/html/news/index.html" --user "soccerline:love1004!" --ftp-create-dirs -s

# === 참고 ===
# _next/static/ 해시 변경되므로 매 빌드마다 전체 업로드 필요
# 463-472개 파일, 약 13-14MB
# curl.exe -T 사용, `226 Transfer complete` = 정상
```

---

## 16. 핵심 원칙 (REAME ME FIRST)

1. **FAM CMS를 1차 데이터 소스로 사용** — Wikipedia는 기본 일정만, FAM CMS가 상세 데이터
2. **Team A/B ≠ 실제 홈/원정** — display 필드 시스템으로 추상화
3. **표시는 좌/우 컬럼 기준** — `leftWon`/`leftLost`로 승패 색상 결정
4. **득점 필터는 homeTeamName/awayTeamName 사용** (대문자 영문, display와 별개)
5. **모든 경기 상세는 SSG 정적 생성** — 50페이지, 빌드 시 생성
6. **경고카드는 player 객체에 yellowCard 필드로 포함** — 별도 배열 없음
7. **뉴스는 MySQL DB 기반** — `api/news.php`에서 runtime fetch, 재빌드 불필요
8. **뉴스 상세는 인라인 뷰** (`?id=N` query param) + SSG 정적 페이지 공존
9. **FTP는 `curl.exe -T` 사용**, 전체 파일 업로드 (해시 변경)
10. **득점자 팀명은 데이터 레벨 null 처리** → 프론트에서 "(정보 없음)" fallback
11. **HOME/AWAY 라벨**: 좌측=HOME, 우측=AWAY 고정 (서울 위치 무관)
12. **시즌 페이지는 별도 라우트** (`/squad/2026-27`)로 관리, 시즌 간 전환 버튼
