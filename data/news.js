export const categories = [
  { id: 'all', label: '전체' },
  { id: 'club', label: '클럽 소식' },
  { id: 'korean', label: '한국 축구' },
  { id: 'malaysia', label: '말레이시아 축구' },
  { id: 'interview', label: '인터뷰' },
];

// News data is now fetched from the MySQL database via API.
// See lib/news-api.js for fetchAllNews() and fetchNewsById().
// Admin: https://soccerline.dothome.co.kr/api/admin.php
export { fetchAllNews, fetchNewsById } from '@/lib/news-api';

const allNews = [];
export default allNews;
