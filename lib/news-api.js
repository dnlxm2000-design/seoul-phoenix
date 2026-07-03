const API_BASE = 'https://soccerline.dothome.co.kr/api';
let cachePromise = null;

export async function fetchAllNews() {
  if (cachePromise) return cachePromise;
  cachePromise = (async () => {
    try {
      // Fetch first page to get total count
      const res = await fetch(`${API_BASE}/news.php`);
      const data = await res.json();
      if (!data.success) return [];
      let all = [...data.data];
      const totalPages = data.pagination?.totalPages || 1;
      // Fetch remaining pages in parallel
      if (totalPages > 1) {
        const pages = [];
        for (let p = 2; p <= totalPages; p++) {
          pages.push(fetch(`${API_BASE}/news.php?page=${p}`).then(r => r.json()));
        }
        const results = await Promise.all(pages);
        results.forEach(r => {
          if (r.success) all = all.concat(r.data);
        });
      }
      return all;
    } catch {
      return [];
    }
  })();
  return cachePromise;
}

export async function fetchNewsById(id) {
  const all = await fetchAllNews();
  return all.find((item) => item.id === parseInt(id)) || null;
}
