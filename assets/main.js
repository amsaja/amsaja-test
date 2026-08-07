
const typeLabels = {
  WRITING: 'MY WRITING',
  PRESS: 'PRESS',
  INTERVIEW: 'INTERVIEW',
  TALK: 'TALK',
  AWARD: 'AWARD',
  PUBLICATION: 'PUBLICATION'
};

fetch('data/archive.json')
  .then(r => r.json())
  .then(items => {
    const el = document.getElementById('recent-list');
    if (!el) return;
    const recent = [...items].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
    el.innerHTML = recent.map(item => `
      <a class="archive-card ${item.type === 'WRITING' ? 'is-writing' : ''}" href="${item.url || 'archive.html'}" ${item.url ? 'target="_blank" rel="noopener"' : ''}>
        <div>
          <div class="type">${typeLabels[item.type] || item.type}</div>
          <h3>${item.title}</h3>
          <p>${item.source || ''}</p>
        </div>
        <div class="date">${item.date}</div>
      </a>`).join('');
  });
