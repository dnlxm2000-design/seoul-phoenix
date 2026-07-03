# 쇼핑/굿즈 연동 계획

> 논의일: 2026-07-02
> 상태: 계획만 저장 (미구현)

## 배경
서울피닉스FC 구단 굿즈 판매를 위해 사이트에 쇼핑 기능 연동 검토.

## 고려 사항
- 현재 사이트는 **Static Export** (Next.js `output: "export"`)
- 서버사이드 API는 `/api/` 아래 PHP로 운영 중 (Dothome 호스팅)
- 결제/재고/배송 모두 처리 가능한 솔루션 필요

## 3가지 옵션

### 옵션 1: 외부 플랫폼 링크 (가장 쉬움)
- **방식**: 네이버 스마트스토어 / 쿠팡 / 11번가 입점
- **사이트 작업**: `/shop` 페이지 만들어 상품 진열 + 외부 링크
- **장점**: 개발 zero, 결제/재고/배송 모두 플랫폼 처리
- **단점**: 사이트 이탈 발생, 플랫폼 수수료
- **추정 작업량**: 하루 (페이지 하나)

### 옵션 2: Shopify 임베드
- **방식**: Shopify 스토어 개설 → Buy Button 위젯 삽입 or Storefront API
- **장점**: 사이트 내 구매 가능, 결제/재고 Shopify 처리
- **단점**: Shopify 월 비용 ($29+/월), 디자인 제약
- **참고**: Next.js + Shopify Storefront API 조합으로 SSG에서도 상품 조회 가능

### 옵션 3: 자체 PHP + PG 연동 (추천)
- **방식**: 현재 PHP API(`api/`) 확장, MySQL에 상품/주문 테이블 추가
- **결제**: 토스페이먼츠 or 포트원(PortOne) API 연동
- **장점**: 완전 자체 운영, 사이트 이탈 없음, 디자인 자유도 최고
- **단점**: PG사 가입(+심사) 필요, 보안 구현 필요
- **추정 구조**:

```
api/
├── products.php    # 상품 목록/상세 CRUD
├── cart.php        # 장바구니 (세션 기반)
├── order.php       # 주문 생성/조회/상태관리
└── payment.php     # 결제 처리 (토스 or 포트원)

app/
├── shop/           # 상품 목록 (Static + Client fetch)
├── shop/[id]/      # 상품 상세 (정적 생성 or Client)
├── cart/           # 장바구니 ('use client')
├── order/          # 주문/결제 ('use client')
└── order/complete/ # 주문 완료 페이지

DB tables:
- products (id, name, description, price, image, stock, options, status)
- cart (id, session_id, product_id, quantity, options)
- orders (id, session_id, total, status, payment_method, created_at)
- order_items (id, order_id, product_id, quantity, price, options)
- payments (id, order_id, method, amount, status, tx_id, paid_at)
```

## 정적 export 제약 대응
- 장바구니/결제/주문조회는 **필수로 `'use client'`** (실시간 데이터 필요)
- 상품 목록은 SSG로 생성 가능 (빌드 시점 상품 리스트)
- 상품 상세는 SSG or Client fetch 혼합 가능

## 다음 단계
- [ ] 방향성 결정 (옵션 1/2/3)
- [ ] PG사 계정 생성 (옵션 3 선택 시)
- [ ] 상품 데이터 준비 (디자인 시안, 가격 정책)
