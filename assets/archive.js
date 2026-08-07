
let allItems = [];
let currentFilter = 'ALL';

function render() {
  const q = document.getElementById('archive-search').value.trim().toLowerCase();
  const year = document.getElementById('archive-year').value;
  const list = document.getElementById('archive-list');
  const filtered = allItems
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
fetch('data/archive.json').then(r=>r.json()).then(items=>{allItems=items;render();});
document.getElementById('archive-search').addEventListener('input',render);
document.getElementById('archive-year').addEventListener('change',render);
document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter=btn.dataset.filter;
    render();
  });
});
