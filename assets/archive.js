
let allItems = [];
let currentFilter = 'ALL';

function esc(s='') {
  return String(s);
}

function renderWriting() {
  const el = document.getElementById('writing-list');
  if (!el) return;
  const writing = allItems
    .filter(x => x.type === 'WRITING')
    .sort((a,b)=>b.date.localeCompare(a.date));

  el.innerHTML = writing.length ? writing.map(item => `
    <a class="writing-card" href="${item.url || '#'}" ${item.url ? 'target="_blank" rel="noopener"' : ''}>
      <div class="writing-top">
        <span>${item.date}</span>
        <span>${item.source || ''}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary || ''}</p>
      <span class="writing-read">${item.url ? '글 보기 ↗' : '칼럼'}</span>
    </a>
  `).join('') : '<p class="empty-state">등록된 칼럼이 없습니다.</p>';
}

function renderArchive() {
  const q = document.getElementById('archive-search').value.trim().toLowerCase();
  const year = document.getElementById('archive-year').value;
  const list = document.getElementById('archive-list');

  const filtered = allItems
    .filter(x => x.type !== 'WRITING')
    .filter(x => currentFilter === 'ALL' || x.type === currentFilter)
    .filter(x => year === 'ALL' || x.date.startsWith(year))
    .filter(x => [x.title,x.source,x.summary,x.type,x.date].join(' ').toLowerCase().includes(q))
    .sort((a,b)=>b.date.localeCompare(a.date));

  list.innerHTML = filtered.length ? filtered.map(item => `
    <a class="archive-row ${item.url ? '' : 'no-link'}" href="${item.url || 'javascript:void(0)'}" ${item.url ? 'target="_blank" rel="noopener"' : ''}>
      <div class="date">${item.date}</div>
      <div class="type">${item.type}</div>
      <div class="main">
        <h3>${item.title}</h3>
        <p>${item.summary || ''}</p>
      </div>
      <div class="source">${item.source || ''} ${item.url ? '↗' : ''}</div>
    </a>`).join('') : '<p class="empty-state">해당 기록이 없습니다.</p>';
}

fetch('data/archive.json')
  .then(r=>r.json())
  .then(items=>{
    allItems=items;
    renderWriting();
    renderArchive();
  });

document.getElementById('archive-search').addEventListener('input',renderArchive);
document.getElementById('archive-year').addEventListener('change',renderArchive);

document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter=btn.dataset.filter;
    renderArchive();
  });
});
