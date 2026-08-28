(function () {
  "use strict";

  var DATA = window.NAV_DATA;

  // ---------- 存储 ----------
  var store = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem("devnav." + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem("devnav." + key, JSON.stringify(value)); } catch (e) {}
    }
  };

  var favs = store.get("favs", []);        // 收藏的 url 列表
  var custom = store.get("custom", []);    // 自定义收录 [{name,url,desc}]
  var theme = store.get("theme", "dark");

  // ---------- 工具 ----------
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function siteUrl(s) { return s.url; }

  function findSite(url) {
    var all = [];
    DATA.categories.forEach(function (c) {
      c.sites.forEach(function (s) { all.push(s); });
    });
    custom.forEach(function (s) { all.push(s); });
    for (var i = 0; i < all.length; i++) if (all[i].url === url) return all[i];
    return null;
  }

  function highlight(text, kw) {
    if (!kw) return document.createTextNode(text);
    var idx = text.toLowerCase().indexOf(kw.toLowerCase());
    if (idx === -1) return document.createTextNode(text);
    var frag = document.createDocumentFragment();
    frag.appendChild(document.createTextNode(text.slice(0, idx)));
    frag.appendChild(el("mark", null, text.slice(idx, idx + kw.length)));
    frag.appendChild(document.createTextNode(text.slice(idx + kw.length)));
    return frag;
  }

  // ---------- 主题 ----------
  var themeBtn = document.getElementById("btn-theme");
  function applyTheme() {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      themeBtn.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeBtn.textContent = "🌙";
    }
  }
  themeBtn.addEventListener("click", function () {
    theme = theme === "light" ? "dark" : "light";
    store.set("theme", theme);
    applyTheme();
  });
  applyTheme();

  // ---------- 时钟与问候 ----------
  var greetings = ["写点好代码", "今天也在变强", "需求砍掉了没", "记得喝水", "离下班又近一步", "少熬夜"];
  function tick() {
    var now = new Date();
    var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
    document.getElementById("clock").textContent =
      now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) +
      " " + pad(now.getHours()) + ":" + pad(now.getMinutes());
  }
  function greet() {
    var h = new Date().getHours();
    var word = greetings[Math.floor(Math.random() * greetings.length)];
    var prefix;
    if (h < 5) prefix = "夜深了";
    else if (h < 11) prefix = "早上好";
    else if (h < 13) prefix = "中午好";
    else if (h < 18) prefix = "下午好";
    else prefix = "晚上好";
    var h1 = document.getElementById("greeting");
    h1.textContent = "";
    h1.appendChild(document.createTextNode(prefix + "，"));
    h1.appendChild(el("span", "grad", word));
  }
  tick(); greet(); setInterval(tick, 30000);

  // ---------- 分类锚航条 ----------
  var catnavEl = document.getElementById("catnav");
  var chips = {};
  DATA.categories.forEach(function (cat) {
    var b = el("button", "cat-chip");
    b.type = "button";
    b.appendChild(el("span", null, cat.icon));
    b.appendChild(el("span", null, cat.name));
    b.addEventListener("click", function () {
      var target = document.getElementById("cat-" + cat.id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    catnavEl.appendChild(b);
    chips[cat.id] = b;
  });

  var sectionObserver = null;
  function observeSections() {
    if (sectionObserver) sectionObserver.disconnect();
    if (typeof IntersectionObserver === "undefined") return;
    sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = en.target.id.replace("cat-", "");
        if (en.isIntersecting) {
          Object.keys(chips).forEach(function (k) { chips[k].classList.remove("active"); });
          if (chips[id]) chips[id].classList.add("active");
        } else if (chips[id] && chips[id].classList.contains("active")) {
          chips[id].classList.remove("active");
        }
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    DATA.categories.forEach(function (cat) {
      var s = document.getElementById("cat-" + cat.id);
      if (s) sectionObserver.observe(s);
    });
  }

  // ---------- 搜索引擎 ----------
  var engineSel = document.getElementById("engine");
  DATA.engines.forEach(function (e, i) {
    var opt = el("option", null, e.name);
    opt.value = i;
    engineSel.appendChild(opt);
  });
  var engineIdx = store.get("engine", 0);
  if (engineIdx >= DATA.engines.length) engineIdx = 0;
  engineSel.value = engineIdx;
  engineSel.addEventListener("change", function () {
    engineIdx = parseInt(engineSel.value, 10);
    store.set("engine", engineIdx);
  });

  // ---------- 卡片渲染 ----------
  var catColorCache = {};
  function avatarColor(hue) {
    if (catColorCache[hue]) return catColorCache[hue];
    var c = "linear-gradient(135deg, hsl(" + hue + ", 65%, 58%), hsl(" + ((hue + 40) % 360) + ", 70%, 48%))";
    catColorCache[hue] = c;
    return c;
  }

  function buildCard(site, kw, isCustom) {
    var a = el("a", "site-card");
    a.href = site.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = site.desc || site.url;

    var avatar = el("div", "avatar", (site.name || "?").charAt(0).toUpperCase());
    avatar.style.background = avatarColor(site.hue || 220);

    var info = el("div", "site-info");
    var name = el("div", "s-name");
    name.appendChild(highlight(site.name, kw));
    var desc = el("div", "s-desc", site.desc || site.url.replace(/^https?:\/\//, ""));
    info.appendChild(name);
    info.appendChild(desc);

    if (site.tags && site.tags.length) {
      var tags = el("div", "s-tags");
      site.tags.forEach(function (t) { tags.appendChild(el("span", null, t)); });
      info.appendChild(tags);
    }

    a.appendChild(avatar);
    a.appendChild(info);

    // 收藏按钮
    var star = el("button", "star-btn", favs.indexOf(site.url) !== -1 ? "★" : "☆");
    star.title = "收藏到「我的常用」";
    if (favs.indexOf(site.url) !== -1) star.classList.add("starred");
    star.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleFav(site.url);
    });
    a.appendChild(star);

    // 自定义站点的删除按钮
    if (isCustom) {
      var del = el("button", "del-btn", "删除");
      del.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        custom = custom.filter(function (s) { return s.url !== site.url; });
        store.set("custom", custom);
        favs = favs.filter(function (u) { return u !== site.url; });
        store.set("favs", favs);
        renderAll(currentKw, false);
      });
      a.appendChild(del);
    }
    return a;
  }

  function buildSection(id, icon, name, count, cards, isEmpty, emptyText) {
    var sec = el("section");
    sec.id = id;
    var head = el("div", "section-head");
    head.appendChild(el("span", "sec-icon", icon));
    head.appendChild(el("h2", null, name));
    head.appendChild(el("span", "sec-count", count));
    sec.appendChild(head);

    if (isEmpty) {
      sec.appendChild(el("div", "empty-tip", emptyText || "暂无内容"));
    } else {
      var grid = el("div", "grid");
      cards.forEach(function (c) { grid.appendChild(c); });
      sec.appendChild(grid);
    }
    return sec;
  }

  // ---------- 渲染主流程 ----------
  var mainEl = document.getElementById("sections");
  var currentKw = "";

  function renderAll(kw, animate) {
    currentKw = kw || "";
    kw = (kw || "").trim().toLowerCase();
    mainEl.textContent = "";
    var idx = 0;

    function mount(sec) {
      if (animate) {
        sec.classList.add("anim");
        sec.style.setProperty("--d", (idx++ * 70) + "ms");
      }
      mainEl.appendChild(sec);
    }

    // 我的常用（收藏）
    var favCards = [];
    favs.forEach(function (url) {
      var s = findSite(url);
      if (s) {
        if (!kw || s.name.toLowerCase().indexOf(kw) !== -1 || (s.desc || "").toLowerCase().indexOf(kw) !== -1) {
          favCards.push(buildCard(s, kw, false));
        }
      }
    });
    if (!kw) {
      mount(buildSection("sec-favs", "⭐", "我的常用", favCards.length, favCards, favCards.length === 0,
        "还没有收藏。把鼠标移到任意站点上，点 ☆ 收藏，它就会出现在这里。"));
    }

    // 我的收录（自定义）
    var customCards = [];
    custom.forEach(function (s) {
      if (!kw || s.name.toLowerCase().indexOf(kw) !== -1 || (s.desc || "").toLowerCase().indexOf(kw) !== -1) {
        s.hue = s.hue || 350;
        customCards.push(buildCard(s, kw, true));
      }
    });
    if (!kw) {
      mount(buildSection("sec-custom", "📌", "我的收录", customCards.length, customCards, customCards.length === 0,
        "点击右上角「＋ 收录」，把常用的内部系统、文档地址加进来（只存在本机浏览器）。"));
    }

    // 内置分类
    var total = 0;
    DATA.categories.forEach(function (cat) {
      var cards = [];
      cat.sites.forEach(function (s) {
        var site = { name: s.name, url: s.url, desc: s.desc, hue: cat.hue, tags: s.tags };
        if (!kw || s.name.toLowerCase().indexOf(kw) !== -1 || (s.desc || "").toLowerCase().indexOf(kw) !== -1) {
          cards.push(buildCard(site, kw, false));
        }
      });
      total += cat.sites.length;
      if (kw && cards.length === 0) return; // 筛选时空分类不显示
      mount(buildSection("cat-" + cat.id, cat.icon, cat.name, cat.sites.length, cards, false));
    });

    document.getElementById("stat").textContent =
      "内置 " + total + " 个站点 · 收藏 " + favs.length + " · 自定义 " + custom.length;

    observeSections();
  }

  function toggleFav(url) {
    var i = favs.indexOf(url);
    if (i === -1) favs.push(url);
    else favs.splice(i, 1);
    store.set("favs", favs);
    renderAll(currentKw, false);
  }

  // ---------- 搜索与联想 ----------
  var input = document.getElementById("search-input");
  var sugBox = document.getElementById("suggestion");
  var sugItems = [];   // [{el, action}]
  var sugActive = -1;

  function collectAllSites() {
    var list = [];
    DATA.categories.forEach(function (c) {
      c.sites.forEach(function (s) { list.push({ name: s.name, url: s.url, desc: s.desc, hue: c.hue, kind: c.name }); });
    });
    custom.forEach(function (s) { list.push({ name: s.name, url: s.url, desc: s.desc, hue: 350, kind: "我的收录" }); });
    return list;
  }

  function closeSug() {
    sugBox.classList.add("hidden");
    sugBox.textContent = "";
    sugItems = [];
    sugActive = -1;
  }

  function buildSug(kw) {
    closeSug();
    var kwLow = kw.toLowerCase();

    // 本地站点匹配
    var hits = collectAllSites().filter(function (s) {
      return s.name.toLowerCase().indexOf(kwLow) !== -1 ||
        (s.desc || "").toLowerCase().indexOf(kwLow) !== -1;
    }).slice(0, 7);

    hits.forEach(function (s) {
      var item = el("div", "sug-item");
      var av = el("div", "avatar", s.name.charAt(0).toUpperCase());
      av.style.width = "26px"; av.style.height = "26px";
      av.style.fontSize = "12px"; av.style.borderRadius = "7px";
      av.style.background = avatarColor(s.hue);
      item.appendChild(av);
      var name = el("span");
      name.appendChild(highlight(s.name, kw));
      item.appendChild(name);
      item.appendChild(el("span", "sug-kind", s.kind));
      item.addEventListener("mousedown", function (e) {
        e.preventDefault();
        window.open(s.url, "_blank", "noopener");
        closeSug();
      });
      sugBox.appendChild(item);
      sugItems.push({ el: item });
    });

    // 引擎搜索入口
    var eng = DATA.engines[engineIdx];
    var searchItem = el("div", "sug-item");
    var icon = el("div", "avatar", "🔍");
    icon.style.width = "26px"; icon.style.height = "26px";
    icon.style.fontSize = "12px"; icon.style.borderRadius = "7px";
    icon.style.background = "linear-gradient(135deg, var(--accent), var(--accent-2))";
    searchItem.appendChild(icon);
    var span = el("span");
    span.appendChild(document.createTextNode("用 " + eng.name + " 搜索 "));
    span.appendChild(el("b", null, "“" + kw + "”"));
    searchItem.appendChild(span);
    searchItem.appendChild(el("span", "sug-kind", "回车"));
    searchItem.addEventListener("mousedown", function (e) {
      e.preventDefault();
      doEngineSearch(kw);
    });
    sugBox.appendChild(searchItem);
    sugItems.push({ el: searchItem });

    if (sugItems.length > 0) sugBox.classList.remove("hidden");
  }

  function doEngineSearch(kw) {
    var eng = DATA.engines[engineIdx];
    window.open(eng.url.replace("%s", encodeURIComponent(kw)), "_blank", "noopener");
    closeSug();
  }

  input.addEventListener("input", function () {
    var kw = input.value.trim();
    renderAll(kw, false);
    if (kw) buildSug(kw);
    else closeSug();
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (sugItems.length === 0) return;
      e.preventDefault();
      if (sugActive !== -1) sugItems[sugActive].el.classList.remove("active");
      sugActive = e.key === "ArrowDown"
        ? (sugActive + 1) % sugItems.length
        : (sugActive - 1 + sugItems.length) % sugItems.length;
      sugItems[sugActive].el.classList.add("active");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (sugActive !== -1) {
        sugItems[sugActive].el.dispatchEvent(new Event("mousedown"));
      } else if (input.value.trim()) {
        doEngineSearch(input.value.trim());
      }
    } else if (e.key === "Escape") {
      closeSug();
      input.blur();
    }
  });

  document.addEventListener("click", function (e) {
    if (!sugBox.contains(e.target) && e.target !== input) closeSug();
  });

  // "/" 快捷聚焦
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== input &&
        !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });

  // ---------- 添加站点弹窗 ----------
  var modal = document.getElementById("modal");
  document.getElementById("btn-add").addEventListener("click", function () {
    modal.classList.remove("hidden");
    document.getElementById("f-name").focus();
  });
  document.getElementById("m-cancel").addEventListener("click", function () {
    modal.classList.add("hidden");
  });
  document.getElementById("m-save").addEventListener("click", function () {
    var name = document.getElementById("f-name").value.trim();
    var url = document.getElementById("f-url").value.trim();
    var desc = document.getElementById("f-desc").value.trim();
    if (!name || !url) { alert("名称和网址都要填哦"); return; }
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    if (custom.some(function (s) { return s.url === url; })) { alert("这个网址已经收录过了"); return; }
    custom.push({ name: name, url: url, desc: desc });
    store.set("custom", custom);
    modal.classList.add("hidden");
    ["f-name", "f-url", "f-desc"].forEach(function (id) { document.getElementById(id).value = ""; });
    renderAll(currentKw, false);
  });

  // ---------- 数据导入导出 ----------
  var dataModal = document.getElementById("data-modal");
  var dataText = document.getElementById("data-text");
  document.getElementById("btn-data").addEventListener("click", function () {
    dataText.value = JSON.stringify({ favorites: favs, custom: custom }, null, 2);
    dataModal.classList.remove("hidden");
  });
  document.getElementById("d-export").addEventListener("click", function () {
    dataText.value = JSON.stringify({ favorites: favs, custom: custom }, null, 2);
    dataText.select();
    try { document.execCommand("copy"); } catch (e) {}
  });
  document.getElementById("d-import").addEventListener("click", function () {
    try {
      var obj = JSON.parse(dataText.value);
      if (!Array.isArray(obj.favorites) || !Array.isArray(obj.custom)) throw new Error("格式不对");
      favs = obj.favorites.filter(function (u) { return typeof u === "string"; });
      custom = obj.custom.filter(function (s) {
        return s && typeof s.name === "string" && typeof s.url === "string";
      });
      store.set("favs", favs);
      store.set("custom", custom);
      dataModal.classList.add("hidden");
      renderAll(currentKw, false);
    } catch (e) {
      alert("导入失败：不是合法的备份数据");
    }
  });
  document.getElementById("d-close").addEventListener("click", function () {
    dataModal.classList.add("hidden");
  });

  // 点遮罩关闭
  [modal, dataModal].forEach(function (m) {
    m.addEventListener("click", function (e) {
      if (e.target === m) m.classList.add("hidden");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
      dataModal.classList.add("hidden");
    }
  });

  // ---------- 启动 ----------
  renderAll("", true);
})();
