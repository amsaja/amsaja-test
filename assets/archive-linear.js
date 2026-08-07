
fetch('data/archive-v3.json')
  .then(r => r.json())
  .then(data => {
    document.getElementById('column-list').innerHTML = data.writing.map(x => {
      const row = `
        <span class="linear-date">${x.date.slice(0,4)}</span>
        <span class="linear-title">${x.title}</span>
        <span class="linear-source">${x.source.replace(' · 아침숲길','')}</span>
        <span class="linear-arrow">${x.url ? '↗' : ''}</span>`;
      return x.url
        ? `<a class="linear-row" href="${x.url}" target="_blank" rel="noopener">${row}</a>`
        : `<div class="linear-row no-link">${row}</div>`;
    }).join('');

    document.getElementById('media-list').innerHTML = data.media.map(x => {
      const row = `
        <span class="linear-date">${x.date.slice(0,4)}</span>
        <span class="linear-title">${x.title}</span>
        <span class="linear-source">${x.source} · ${x.kind === 'INTERVIEW' ? '인터뷰' : '기사'}</span>
        <span class="linear-arrow">${x.url ? '↗' : ''}</span>`;
      return x.url
        ? `<a class="linear-row" href="${x.url}" target="_blank" rel="noopener">${row}</a>`
        : `<div class="linear-row no-link">${row}</div>`;
    }).join('');

    document.getElementById('history-list').innerHTML = data.history.map(group => `
      <div class="linear-history-group">
        <div class="linear-history-year">${group.year}</div>
        <div class="linear-history-items">
          ${group.items.map(item => `<p>${item}</p>`).join('')}
        </div>
      </div>`).join('');
  });
