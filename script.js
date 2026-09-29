const news = [
  {
    title: "Yapay zekâ medya sektörünü nasıl değiştiriyor?",
    category: "Teknoloji",
    date: "27 Eylül 2026",
    sortDate: "2026-09-27",
    status: "Yayında",
  },
  {
    title: "Şahin JavaScript öğrenmeye devam ediyor",
    category: "Eğitim",
    date: "25 Eylül 2026",
    sortDate: "2026-09-25",
    status: "Taslak",
  },
  {
    title: "Yeni dijital yayın platformu kullanıma açıldı",
    category: "Medya",
    date: "26 Eylül 2026",
    sortDate: "2026-09-26",
    status: "Yayında",
  },
];

const newsList = document.querySelector(".news-list");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const sortOrder = document.querySelector("#sort-order");

function renderNews(items) {
  newsList.innerHTML = "";

  if (items.length === 0) {
    newsList.innerHTML = `
      <p class="no-results">Aramanızla eşleşen haber bulunamadı.</p>
    `;
    return;
  }

  items.forEach((item) => {
    newsList.innerHTML += `
      <article class="news-card">
        <h2>${item.title}</h2>
        <p><strong>Kategori:</strong> ${item.category}</p>
        <p><strong>Yayın tarihi:</strong> ${item.date}</p>
        <p><strong>Durum:</strong> ${item.status}</p>
      </article>
    `;
  });
}

function applyFilters() {
  const searchTerm = searchInput.value.toLocaleLowerCase("tr-TR");
  const selectedCategory = categoryFilter.value;

  const filteredNews = news.filter((item) => {
    const matchesTitle = item.title
      .toLocaleLowerCase("tr-TR")
      .includes(searchTerm);

    let matchesCategory = true;

    if (selectedCategory !== "Tümü") {
      matchesCategory = item.category === selectedCategory;
    }

    return matchesTitle && matchesCategory;
  });

  const sortedNews = [...filteredNews].sort((firstItem, secondItem) => {
    if (sortOrder.value === "oldest") {
      return firstItem.sortDate.localeCompare(secondItem.sortDate);
    }

    return secondItem.sortDate.localeCompare(firstItem.sortDate);
  });

  renderNews(sortedNews);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortOrder.addEventListener("change", applyFilters);

console.log("Haberler:", news);
applyFilters();
