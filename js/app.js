async function loadCompanyData() {
  const res = await fetch('data/company.json');
  const data = await res.json();

  document.querySelectorAll(".company-name").forEach(e=>{
    e.innerText = data.companyName;
  });

  if (document.getElementById('aum-value')) {
    document.getElementById('aum-value').innerText = data.aum;
  }

  if (document.getElementById('contact-info')) {
    document.getElementById('contact-info').innerHTML = `
      <p><b>Address:</b> ${data.contact.address}</p>
      <p><b>Phone:</b> ${data.contact.phone}</p>
      <p><b>Email:</b> ${data.contact.email}</p>
    `;
  }

  if (document.getElementById('leadership-list')) {
    let html="";
    data.leadership.forEach(p=>{
      html += `
        <div class="card">
          <span>${p.name}</span><br/>
          <span>${p.role}</span>
        </div>
      `;
    });
    document.getElementById('leadership-list').innerHTML = html;
  }
}

async function loadArticles() {
  const res = await fetch('data/articles.json');
  window.articleCache = await res.json();
  renderArticles();
}

function renderArticles() {
  const container = document.getElementById('articles-container');
  if (!container) return;

  let html="";
  window.articleCache.forEach(a=>{
    html += `
      <div class="card" data-id="${a.id}">
        <b>${a.title}</b>
        <p>${a.date}</p>
        <a href="${a.file}" target="_blank">Read Article</a>
      </div>
    `;
  });
  container.innerHTML = html;
}

function addArticle() {
  const title=document.getElementById('new-title').value;
  const date=document.getElementById('new-date').value;

  if(!title||!date) return alert("Fill fields");

  const newId=Math.max(...window.articleCache.map(a=>a.id))+1;

  window.articleCache.push({
    id:newId,
    title,
    date,
    file:"articles/article"+newId+".html"
  });

  renderArticles();

  alert("Added locally. Update JSON + add HTML file before commit.");
}

window.onload=()=>{
  loadCompanyData();
  loadArticles();
};
