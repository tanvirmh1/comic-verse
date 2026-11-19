var comics = [
  {
    id: "eleceed",
    title: "Eleceed",
    chapter: 1,
    rating: "4.9 (2k)",
    status: "Ongoing",
    type: "Comic",
    genres: ["Action", "Fantasy", "Adventure"],
    comments: 128,
    cover: "images/eleceed/cover.webp",
    description:
      "A kind-hearted young man with extraordinary speed meets a powerful secretive figure. Together, they face dangerous opponents and discover the world of awakened abilities.",
    chapterPages: {
      1: (function () {
        var pageList = [];
        var pageNumber;

        for (pageNumber = 1; pageNumber <= 41; pageNumber++) {
          pageList.push(
            "images/eleceed/chapter-1/page-" + pageNumber + ".webp",
          );
        }

        return pageList;
      })(),
    },
  },
  {
    id: "shadow-realm",
    title: "Shadow Realm Chronicles",
    chapter: 45,
    rating: "4.7 (1.2k)",
    status: "Ongoing",
    type: "Comic",
    genres: ["Action", "Fantasy", "Adventure"],
    comments: 128,
    cover: "images/shadow-realm/cover.webp",
    description:
      "A young fighter discovers a hidden power and enters a dangerous world of shadows.",
    chapterPages: {},
  },
  {
    id: "crimson-moon",
    title: "Crimson Moon",
    chapter: 40,
    rating: "4.8 (980)",
    status: "Ongoing",
    type: "Comic",
    genres: ["Fantasy", "Mystery"],
    comments: 86,
    cover: "images/crimson-moon/cover.webp",
    description:
      "A mysterious moon brings secrets, danger and unexpected discoveries.",
    chapterPages: {},
  },
  {
    id: "last-guardian",
    title: "The Last Guardian",
    chapter: 46,
    rating: "4.6 (760)",
    status: "Ongoing",
    type: "Comic",
    genres: ["Action", "Adventure"],
    comments: 64,
    cover: "images/last-guardian/cover.webp",
    description:
      "The last protector must defend a world on the edge of destruction.",
    chapterPages: {},
  },
  {
    id: "neon-city",
    title: "Neon City",
    chapter: 49,
    rating: "4.5 (540)",
    status: "Ongoing",
    type: "Comic",
    genres: ["Sci-Fi", "Action"],
    comments: 42,
    cover: "images/neon-city/cover.webp",
    description: "In a futuristic city, one discovery changes everything.",
    chapterPages: {},
  },
  {
    id: "silent-oath",
    title: "Silent Oath",
    chapter: 52,
    rating: "4.9 (2k)",
    status: "Completed",
    type: "Novel",
    genres: ["Romance", "Drama"],
    comments: 210,
    cover: "images/silent-oath/cover.webp",
    description:
      "A quiet promise connects two lives through difficult choices.",
    chapterPages: {},
  },
  {
    id: "dragon-path",
    title: "Dragon's Path",
    chapter: 55,
    rating: "4.7 (870)",
    status: "Ongoing",
    type: "Comic",
    genres: ["Fantasy", "Adventure"],
    comments: 73,
    cover: "images/dragon-path/cover.webp",
    description:
      "A young adventurer follows an ancient path linked to dragons.",
    chapterPages: {},
  },
  {
    id: "starfall",
    title: "Starfall Academy",
    chapter: 58,
    rating: "4.4 (620)",
    status: "Ongoing",
    type: "Comic",
    genres: ["Fantasy", "School"],
    comments: 51,
    cover: "images/starfall/cover.webp",
    description:
      "Students at an unusual academy uncover the secrets of their abilities.",
    chapterPages: {},
  },
];

function getElement(id) {
  return document.getElementById(id);
}

function getComicId() {
  var parts = window.location.search.substring(1).split("&");
  var i;
  for (i = 0; i < parts.length; i++) {
    if (parts[i].indexOf("id=") == 0) {
      return parts[i].substring(3);
    }
  }
  return "eleceed";
}

function getChapterNumber() {
  var parts = window.location.search.substring(1).split("&");
  var i;
  for (i = 0; i < parts.length; i++) {
    if (parts[i].indexOf("chapter=") == 0) {
      return parts[i].substring(8);
    }
  }
  return "1";
}

function findComic(id) {
  var i;
  for (i = 0; i < comics.length; i++) {
    if (comics[i].id == id) {
      return comics[i];
    }
  }
  return comics[0];
}

function makeComicCard(comic) {
  var card = '<a class="comic-card" href="series.html?id=' + comic.id + '">';
  card +=
    '<div class="comic-cover cover-art"><img src="' +
    comic.cover +
    '" alt=""></div>';
  card += '<h3 class="comic-title">' + comic.title + "</h3>";
  card += '<span class="comic-subtitle">Ch. ' + comic.chapter + "</span>";
  card += "</a>";
  return card;
}

function showHomePage() {
  var popularGrid = getElement("popularGrid");
  var updatesGrid = getElement("updatesGrid");
  var popularText = "";
  var updateText = "";
  var i;

  if (popularGrid != null) {
    for (i = 0; i < comics.length; i++) {
      popularText += makeComicCard(comics[i]);
    }
    popularGrid.innerHTML = popularText;
  }

  if (updatesGrid != null) {
    for (i = 0; i < 4; i++) {
      updateText +=
        '<a class="update-card" href="series.html?id=' + comics[i].id + '">';
      updateText +=
        '<div class="update-cover cover-art"><img src="' +
        comics[i].cover +
        '" alt=""></div>';
      updateText +=
        '<div><h3 class="update-title">' + comics[i].title + "</h3>";
      updateText +=
        '<span class="update-meta">Chapter ' +
        comics[i].chapter +
        "</span></div></a>";
    }
    updatesGrid.innerHTML = updateText;
  }
}

function showDetailsPage() {
  var chapterList = getElement("chapterList");
  if (chapterList == null) {
    return;
  }

  var comic = findComic(getComicId());
  document.title = comic.title + " - ComicVerse";
  getElement("seriesTitle").innerHTML = comic.title;
  getElement("seriesRating").innerHTML = comic.rating;
  getElement("seriesStatus").innerHTML = comic.status;
  getElement("seriesType").innerHTML = comic.type;
  getElement("chapterCount").innerHTML = comic.chapter;
  getElement("seriesDescription").innerHTML = comic.description;
  getElement("detailCover").innerHTML =
    '<img src="' + comic.cover + '" alt="">';

  getElement("readFirst").href = "reader.html?id=" + comic.id + "&chapter=1";
  getElement("continueReading").innerHTML = "Continue Ch. " + comic.chapter;
  getElement("continueReading").href =
    "reader.html?id=" + comic.id + "&chapter=" + comic.chapter;

  var genreText = "";
  var i;
  for (i = 0; i < comic.genres.length; i++) {
    genreText += "<span>" + comic.genres[i] + "</span>";
  }
  getElement("seriesGenres").innerHTML = genreText;

  showChapters(comic, "desc");
  getElement("chapterSort").onchange = function () {
    showChapters(comic, this.value);
  };

  getElement("bookmarkButton").onclick = function () {
    if (this.innerHTML == "♥ Bookmark") {
      this.innerHTML = "♥ Bookmarked";
      showMessage("Added to bookmarks");
    } else {
      this.innerHTML = "♥ Bookmark";
      showMessage("Removed from bookmarks");
    }
  };
}

function showChapters(comic, order) {
  var chapterList = getElement("chapterList");
  var chapterText = "";
  var i;
  var chapterNumber;

  for (i = 0; i < comic.chapter; i++) {
    if (order == "desc") {
      chapterNumber = comic.chapter - i;
    } else {
      chapterNumber = i + 1;
    }
    chapterText +=
      '<a class="chapter-row" href="reader.html?id=' +
      comic.id +
      "&chapter=" +
      chapterNumber +
      '">';
    chapterText +=
      "<span>Chapter " +
      chapterNumber +
      '</span><span class="chapter-date"></span></a>';
  }
  chapterList.innerHTML = chapterText;
}

function showReaderPage() {
  var readerPages = getElement("readerPages");
  if (readerPages == null) {
    return;
  }

  var comic = findComic(getComicId());
  var chapter = getChapterNumber();
  var pages = comic.chapterPages[chapter];
  var pageText = "";
  var i;

  getElement("readerTitle").innerHTML = comic.title;
  getElement("readerChapter").innerHTML = "Chapter " + chapter;
  document.title = comic.title + " Chapter " + chapter + " - ComicVerse";
  getElement("backToSeries").href = "series.html?id=" + comic.id;

  if (pages == null) {
    pages = ["images/" + comic.id + "/chapter-" + chapter + "/page-1.webp"];
  }

  for (i = 0; i < pages.length; i++) {
    pageText += '<img src="' + pages[i] + '" alt="">';
  }
  readerPages.innerHTML = pageText;

  var previous = Number(chapter) - 1;
  var next = Number(chapter) + 1;
  var previousButton = getElement("previousChapter");
  var nextButton = getElement("nextChapter");

  if (previous < 1) {
    previousButton.style.visibility = "hidden";
  } else {
    previousButton.href = "reader.html?id=" + comic.id + "&chapter=" + previous;
  }
  if (next > comic.chapter) {
    nextButton.style.visibility = "hidden";
  } else {
    nextButton.href = "reader.html?id=" + comic.id + "&chapter=" + next;
  }
}

function showMessage(message) {
  var box = getElement("toast");
  if (box != null) {
    box.innerHTML = message;
    box.className = "toast show";
    setTimeout(function () {
      box.className = "toast";
    }, 2000);
  }
}

function showCollectionPage() {
  var grid = getElement("collectionGrid");
  if (grid == null) {
    return;
  }

  var pageType = window.COMICVERSE_PAGE;
  var selectedGenre = "all";
  var list = [];
  var i;

  for (i = 0; i < comics.length; i++) {
    if (pageType == "novels" && comics[i].type == "Novel") {
      list.push(comics[i]);
    }
    if (pageType == "comics" && comics[i].type == "Comic") {
      list.push(comics[i]);
    }
  }

  drawCollection(list, selectedGenre);
  getElement("collectionFilters").onclick = function (event) {
    if (event.target.getAttribute("data-filter") != null) {
      selectedGenre = event.target.getAttribute("data-filter");
      var buttons = this.getElementsByTagName("button");
      var j;
      for (j = 0; j < buttons.length; j++) {
        buttons[j].className = "filter-chip";
      }
      event.target.className = "filter-chip active";
      drawCollection(list, selectedGenre);
    }
  };
  getElement("collectionSort").onchange = function () {
    drawCollection(list, selectedGenre);
  };
}

function drawCollection(list, genre) {
  var grid = getElement("collectionGrid");
  var count = getElement("collectionCount");
  var text = "";
  var total = 0;
  var i;
  var j;

  for (i = 0; i < list.length; i++) {
    var showThis = false;
    if (genre == "all") {
      showThis = true;
    } else {
      for (j = 0; j < list[i].genres.length; j++) {
        if (list[i].genres[j] == genre) {
          showThis = true;
        }
      }
    }
    if (showThis) {
      total++;
      text += makeComicCard(list[i]);
    }
  }
  if (total == 0) {
    text =
      '<div class="empty-state">No titles found in this category yet.</div>';
  }
  grid.innerHTML = text;
  count.innerHTML = total + " titles found";
}

function showGenresPage() {
  var genreGrid = getElement("genreGrid");
  if (genreGrid == null) {
    return;
  }

  var genres = [
    "Action",
    "Adventure",
    "Fantasy",
    "Romance",
    "Mystery",
    "Sci-Fi",
    "Drama",
    "School",
  ];
  var symbols = ["⚔", "➤", "✦", "♡", "⌕", "◈", "✧", "▤"];
  var text = "";
  var i;
  var j;
  var total;

  for (i = 0; i < genres.length; i++) {
    total = 0;
    for (j = 0; j < comics.length; j++) {
      if (comics[j].genres.indexOf(genres[i]) != -1) {
        total++;
      }
    }
    text +=
      '<button class="genre-card" type="button" data-genre="' +
      genres[i] +
      '">';
    text +=
      "<span><strong>" +
      genres[i] +
      "</strong><span>" +
      total +
      " titles</span></span>";
    text += '<span class="genre-symbol">' + symbols[i] + "</span></button>";
  }
  genreGrid.innerHTML = text;

  genreGrid.onclick = function (event) {
    var genre = event.target.getAttribute("data-genre");
    if (genre == null && event.target.parentNode.getAttribute) {
      genre = event.target.parentNode.getAttribute("data-genre");
    }
    if (genre != null) {
      var resultText = "";
      var k;
      for (k = 0; k < comics.length; k++) {
        if (comics[k].genres.indexOf(genre) != -1) {
          resultText += makeComicCard(comics[k]);
        }
      }
      getElement("genreResultsSection").hidden = false;
      getElement("genreResultsTitle").innerHTML = genre + " titles";
      getElement("genreResults").innerHTML = resultText;
    }
  };
  getElement("clearGenre").onclick = function () {
    getElement("genreResultsSection").hidden = true;
  };
}

function setupSearch() {
  var form = getElement("searchForm");
  if (form == null) {
    return;
  }
  form.onsubmit = function (event) {
    event.preventDefault();
    var word = getElement("searchInput").value.toLowerCase();
    var i;
    for (i = 0; i < comics.length; i++) {
      if (comics[i].title.toLowerCase().indexOf(word) != -1) {
        window.location.href = "series.html?id=" + comics[i].id;
        return;
      }
    }
    showMessage("No matching series found");
  };
}

function setupMenu() {
  var menuButton = getElement("menuToggle");
  if (menuButton != null) {
    menuButton.onclick = function () {
      var menu = document.querySelector(".main-nav");
      if (menu.className.indexOf("open") == -1) {
        menu.className += " open";
      } else {
        menu.className = "main-nav";
      }
    };
  }
}

window.onload = function () {
  showHomePage();
  showDetailsPage();
  showReaderPage();
  showCollectionPage();
  showGenresPage();
  setupSearch();
  setupMenu();
  showAccountArea();
  setupRegistration();
  setupLogin();
};

function getSavedUsers() {
  var users = localStorage.getItem("comicverseUsers");
  if (users == null) {
    return [];
  }
  return JSON.parse(users);
}

function showAccountArea() {
  var area = getElement("accountArea");
  if (area == null) {
    return;
  }

  var currentUser = localStorage.getItem("comicverseCurrentUser");
  if (currentUser == null) {
    area.innerHTML =
      '<a class="login-link" href="login.html">Login</a><a class="register-link" href="register.html">Register</a>';
  } else {
    var firstLetter = currentUser.substring(0, 1).toUpperCase();
    area.innerHTML =
      '<div class="account-profile"><span class="user-name" id="accountUsername"></span><span class="avatar" id="accountAvatar"></span><button class="logout-link" id="logoutButton" type="button">Logout</button></div>';
    getElement("accountUsername").textContent = currentUser;
    getElement("accountAvatar").textContent = firstLetter;
    getElement("logoutButton").onclick = function () {
      localStorage.removeItem("comicverseCurrentUser");
      window.location.href = "index.html";
    };
  }
}

function setupRegistration() {
  var form = getElement("registerForm");
  if (form == null) {
    return;
  }

  form.onsubmit = function (event) {
    event.preventDefault();

    var email = getElement("registerEmail").value.trim().toLowerCase();
    var username = getElement("registerUsername").value.trim();
    var password = getElement("registerPassword").value;
    var confirmPassword = getElement("confirmPassword").value;
    var error = getElement("registerError");
    var users = getSavedUsers();
    var i;

    error.textContent = "";

    if (
      email == "" ||
      username == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      error.textContent = "Please fill in all fields.";
      return;
    }
    if (password.length < 6) {
      error.textContent = "Password must be at least 6 characters.";
      return;
    }
    if (password != confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }
    for (i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        error.textContent = "An account with this email already exists.";
        return;
      }
    }

    users.push({ email: email, username: username, password: password });
    localStorage.setItem("comicverseUsers", JSON.stringify(users));
    localStorage.setItem("comicverseCurrentUser", username);
    window.location.href = "index.html";
  };
}

function setupLogin() {
  var form = getElement("loginForm");
  if (form == null) {
    return;
  }

  form.onsubmit = function (event) {
    event.preventDefault();

    var email = getElement("loginEmail").value.trim().toLowerCase();
    var password = getElement("loginPassword").value;
    var error = getElement("loginError");
    var users = getSavedUsers();
    var i;

    error.textContent = "";
    for (i = 0; i < users.length; i++) {
      if (users[i].email == email && users[i].password == password) {
        localStorage.setItem("comicverseCurrentUser", users[i].username);
        window.location.href = "index.html";
        return;
      }
    }
    error.textContent = "Incorrect email or password.";
  };
}
