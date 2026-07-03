const fs = require('fs');
const html = fs.readFileSync('out/news/index.html', 'utf8');
const matches = html.match(/block group bg-white rounded/g);
console.log('Article count:', matches ? matches.length : 0);
console.log('Has JDT:', html.includes('JDT'));
console.log('Has JDT (조호르):', html.includes('조호르'));
console.log('Has Kedah FA:', html.includes('Kedah FA'));
console.log('Has 손진영:', html.includes('손진영'));
console.log('Has 권혁훈:', html.includes('권혁훈'));
// Find first few article h2 titles
const h2Titles = html.match(/<h2[^>]*>[^<]+<\/h2>/g);
if (h2Titles) {
  h2Titles.slice(0, 6).forEach((t, i) => {
    console.log(`Title ${i+1}:`, t.replace(/<[^>]*>/g, ''));
  });
}
