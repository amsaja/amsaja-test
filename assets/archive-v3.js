
fetch('data/archive-v3.json')
  .then(r => r.json())
  .then(data => {
    const columns = document.getElementById('column-list');
    columns.innerHTML = data.writing.map(x => {
      const inner = `
        <div class="column-date">${x.date}</div>
        <div class="column-main">
          <h3>${x.title}</h3>
          <p>${x.source}</p>
        </div>
        <div class="column-action">${x.url ? '원문 ↗' : '링크 확인 중'}</div>`;
      return x.url
        ? `<a class="column-row has-link" href="${x.url}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="column-row no-link">${inner}</div>`;
    }).join('');

    const media = document.getElementById('media-list');
    media.innerHTML = data.media.map(x => {
      const inner = `
        <div class="media-meta"><span>${x.kind}</span><span>${x.date}</span></div>
        <h3>${x.title}</h3>
        <p class="media-source">${x.source}</p>
        <p class="media-note">${x.note}</p>
        <div class="media-action">${x.url ? '원문 보기 ↗' : '원문 링크 확인 중'}</div>`;
      return x.url
        ? `<a class="media-card has-link" href="${x.url}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="media-card no-link">${inner}</div>`;
    }).join('');

    const history = document.getElementById('history-list');
    history.innerHTML = data.history.map(group => `
      <div class="history-year-group">
        <div class="history-year">${group.year}</div>
        <div class="history-events">
          ${group.items.map(item => `<div class="history-event"><span class="history-dot"></span><p>${item}</p></div>`).join('')}
        </div>
      </div>`).join('');
  });
