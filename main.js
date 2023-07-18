const i18n_file_list = await fetch("https://api.github.com/repos/fa0311/TwitterInternalAPIDocument/git/trees/master?recursive=1");
const i18n_list_json = await i18n_file_list.json();

let arr = [];

console.log(i18n_list_json);

for (const a of i18n_list_json.tree) {
  if (a.path.startsWith("docs/json/i18n/")) {
    if (!a.path.startsWith("docs/json/i18n/emoji")) {
      //console.log(a.path.replace("docs/json/i18n/", ""));
      arr.push(a.path.replace("docs/json/i18n/", ""));
    }
  }
}

console.log(arr);
const intl_en = new Intl.DisplayNames(["en"], { type: "language" });

const sel = document.querySelector("select, #sel_lang");
for (const a of arr) {
  const op = document.createElement("option");
  op.value = a;
  const lang = a.replace(".json", "");
  try {
    op.textContent = `${intl_en.of(lang)} (${new Intl.DisplayNames([lang], { type: "language" }).of(lang)})`;
  } catch (err) {
    continue;
  }

  sel.appendChild(op);
}

let jaJson = await (await fetch(`https://raw.githubusercontent.com/fa0311/TwitterInternalAPIDocument/master/docs/json/i18n/ja.json`)).json();
let targetJson = null;

document.querySelector("select").addEventListener("change", async (e) => {
  document.cookie = `lang=${e.target.value}`;
  targetJson = await (await fetch(`https://raw.githubusercontent.com/fa0311/TwitterInternalAPIDocument/master/docs/json/i18n/${e.target.value}`)).json();
  const value = document.querySelector("input").value;
  document.querySelector("div,#result").textContent = `${jaJson[value]} | ${targetJson[value]}`;
});

document.querySelector("input").addEventListener("input", async () => {
  const value = document.querySelector("input").value;
  document.querySelector("div,#result").textContent = `${jaJson[value]} | ${targetJson[value]}`;
});

if (location.search.startsWith("?search=")) {
  document.querySelector("input").value = location.search.replace("?search=", "");
}

if (document.cookie.startsWith("lang=")) {
  document.querySelector("select").value = document.cookie.replace("lang=", "");
}
targetJson = await (await fetch(`https://raw.githubusercontent.com/fa0311/TwitterInternalAPIDocument/master/docs/json/i18n/${document.querySelector("select,#sel").value}`)).json();
const value = document.querySelector("input").value;
document.querySelector("div,#result").textContent = `${jaJson[value]} | ${targetJson[value]}`;