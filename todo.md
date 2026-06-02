# 서울피닉스 FC 홈페이지 — 진행 상황

## ✅ 완료

### 기초
- [x] Next.js 16 + Tailwind CSS v4 프로젝트 생성
- [x] 브랜드 컬러 시스템 (Red #E63946 / Black #1D1D1D / Gold #F4A261)
- [x] Pretendard 폰트 적용
- [x] DESIGN.md 디자인 시스템 정의
- [x] 반응형 레이아웃

### 공통 컴포넌트
- [x] Header — 스크롤 감지, 모바일 메뉴
- [x] Footer — 링크, 소셜, 저작권

### 페이지
- [x] `/` — 홈 (Hero, 퀵스탯, 예정경기, 최신뉴스, CTA)
- [x] `/about/` — 클럽 소개 (비전, 핵심가치, 타임라인, 코치진)
- [x] `/news/` — 뉴스 목록 (카테고리 필터)
- [x] `/news/[id]/` — 기사 상세 (본문, 관련기사)
- [x] `/squad/` — 선수단 (포지션별 그룹)
- [x] `/schedule/` — 경기 일정 (예정/결과)
- [x] `/gallery/` — 갤러리 (앨범 탭, 라이트박스)
- [x] `/contact/` — 연락처 (정보 + 문의 폼)

### 인프라
- [x] 정적 내보내기 (output: 'export')
- [x] `.htaccess` (캐싱, Gzip, 보안)
- [x] FTP 배포 (soccerline.dothome.co.kr)
- [x] 전체 페이지 200 확인

---

## 📋 할 일

### Phase 2 — DB 연동 (MySQL 8.0)
- [ ] `data/news.js` → PHP API + MySQL `news` 테이블로 대체
- [ ] `GET /api/news.php` (목록)
- [ ] `GET /api/news.php?id=N` (상세)
- [ ] 관리자 페이지 (뉴스 CRUD)

### Phase 3 — CMS 완성
- [ ] 관리자 로그인 (`/admin`)
- [ ] 이미지 업로드
- [ ] 발행/임시저장
- [ ] RSS 피드

### 개선 아이디어
- [ ] 실제 선수단 사진 업로드
- [ ] 경기 결과 자동 업데이트
- [ ] SNS 공유 기능
- [ ] 구글 애널리틱스
- [ ] 댓글 시스템
