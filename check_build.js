const fs = require('fs');
const html = fs.readFileSync('out/news/index.html', 'utf8');
// Count script elements
const scriptCount = (html.match(/<script /g) || []).length;
console.log('Script elements:', scriptCount);
// Check for __NEXT_DATA__
console.log('Has __NEXT_DATA__:', html.includes('__NEXT_DATA__'));
console.log('Has next-build-id:', html.includes('next-build-id'));
console.log('HTML size:', html.length, 'bytes');
// Find all script src
const srcs = html.match(/src="[^"]+\.js[^"]*"/g);
if (srcs) {
  srcs.forEach(s => console.log('Script src:', s));
} else {
  console.log('No JS src found in scripts');
}
