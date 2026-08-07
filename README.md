# Kim Seulgi — Clean Archive v1.1

## 구조
ABOUT / CONTACT
→ SELECTED ACTIVITIES
→ WORK
→ AWARDS & SELECTIONS
→ TRANSLATED EDITIONS
→ BLURBS / 추천사
→ COLUMN
→ TALKS & WORKSHOPS
→ PRESS & INTERVIEW
→ SOCIAL MEDIA

기존 홈페이지 코드를 수정해서 만든 것이 아니라 Clean Archive 기준본을 확장한 버전입니다.

## 가장 중요한 관리 원칙

일상적인 홈페이지 업데이트는 `data/site.json`만 수정합니다.

### 추천사 추가

`blurbs` 배열에 아래 한 항목만 추가합니다.

```json
{
  "year": "2026",
  "title": "책 제목",
  "author": "저자명",
  "publisher": "출판사",
  "role": "추천사",
  "url": "https://..."
}
```

현재 첫 추천사 항목은 사용자가 제공한 교보문고 URL을 보존했으나,
교보문고 페이지에서 서지정보를 안정적으로 불러오지 못해
`도서 정보 업데이트 예정`으로 두었습니다.
제목/저자/출판사를 확인하면 JSON의 해당 항목만 수정하면 됩니다.

### Selected Activities

대표적인 발자취만 넣습니다.
모든 활동을 중복해서 복사하는 섹션이 아니라,
방문자가 작가의 성장 흐름을 짧게 파악하는 용도입니다.

### 새 기사
`press` 배열 맨 위에 한 항목 추가.

### 새 칼럼
`columns` 배열에 한 항목 추가.

### 새 강연
`talks`에서 해당 카테고리 `items`에 한 항목 추가.

### 새 작품
책은 `works.books`, 단편은 `works.short_fiction`에 추가.

## GitHub Pages

ZIP을 풀고 내부 파일/폴더 전체를 저장소 루트에 업로드하세요.
이후 일상 업데이트에서는 가능하면 `data/site.json` 파일 하나만 교체하세요.
