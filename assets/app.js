
const $ = (id) => document.getElementById(id);
const external = (url, text) => url
  ? `<a href="${url}" target="_blank" rel="noopener">${text}</a>`
  : text;

function row({year="", title="", sub="", right="", url=""}) {
  return `<div class="row ${url ? "linked" : ""}">
    <span class="year">${year}</span>
    <span class="main"><span class="title">${external(url,title)}</span>${sub ? `<span class="sub">${sub}</span>` : ""}</span>
    <span class="right">${right || (url ? "Open ↗" : "")}</span>
  </div>`;
}

fetch("data/site.json")
  .then(r => {
    if (!r.ok) throw new Error("site.json load failed");
    return r.json();
  })
  .then(d => {
    $("name").textContent = d.profile.name_ko;
    $("roles").textContent = d.profile.roles;
    $("summary").textContent = d.profile.summary;
    $("focus").textContent = d.profile.focus;
    $("location").textContent = d.profile.location;
    $("email").textContent = d.profile.email;
    $("instagram").href = d.profile.instagram;
    $("blog").href = d.profile.blog;
    $("social-instagram").href = d.profile.instagram;
    $("social-blog").href = d.profile.blog;

    $("selected-list").innerHTML = d.selected_activities.map(x => row({
      year:x.year, title:x.title, sub:x.detail, right:x.type
    })).join("");

    $("blurbs-list").innerHTML = d.blurbs.map(x => {
      const sub = [x.author, x.publisher].filter(Boolean).join(" · ");
      return row({
        year:x.year,
        title:x.title,
        sub:sub,
        right:x.role || "추천사",
        url:x.url
      });
    }).join("");

    $("books").innerHTML = d.works.books.map(x => row({
      year:x.year, title:x.title, sub:x.publisher, right:x.type, url:x.url
    })).join("");

    $("short-fiction").innerHTML = d.works.short_fiction.map(x => row({
      year:x.year, title:`「${x.title}」`, sub:x.publication, right:x.url ? "Open ↗" : "", url:x.url
    })).join("");

    $("awards-list").innerHTML = d.awards.map(x => row({
      year:x.year, title:x.title, right:x.result
    })).join("");

    $("translations-list").innerHTML = d.translations.map(x => row({
      year:x.year, title:x.title, sub:[x.language,x.publisher].filter(Boolean).join(" · "), right:x.status
    })).join("");

    $("columns-list").innerHTML = d.columns.map(x => row({
      year:x.date.slice(0,4), title:x.title, sub:x.publication, right:"Read ↗", url:x.url
    })).join("");

    $("talks-list").innerHTML = d.talks.map(g => `
      <div class="talk-group">
        <h3>${g.label}</h3>
        <div class="talk-list">
          ${g.items.map(x => `<div class="talk-item">
            <span class="talk-place">${x.year ? `<em class="talk-year">${x.year}</em>` : ""}${x.place}</span>
            <span class="talk-title">${x.title}</span>
            <span class="talk-detail">${x.detail || ""}</span>
          </div>`).join("")}
        </div>
      </div>`).join("");

    $("press-list").innerHTML = d.press.map(x => row({
      year:x.date.slice(0,4), title:x.title, sub:`${x.source} · ${x.type}`, right:"Read ↗", url:x.url
    })).join("");

    $("updated").textContent = `Last updated ${d.updated}`;
  })
  .catch(err => {
    console.error(err);
    document.body.insertAdjacentHTML("beforeend",
      '<p style="max-width:920px;margin:20px auto;color:#a33">콘텐츠 파일을 불러오지 못했습니다.</p>');
  });
