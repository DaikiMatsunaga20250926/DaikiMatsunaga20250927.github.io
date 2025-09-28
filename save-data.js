// 入力保存
document.addEventListener("input", function (e) {
  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
    localStorage.setItem(e.target.name || e.target.id, e.target.value);
  }
});

// 保存した内容を復元
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input, select").forEach(el => {
    const key = el.name || el.id;
    if (key && localStorage.getItem(key)) {
      el.value = localStorage.getItem(key);
    }
  });
});

function clearAllData() {
  // localStorage のデータを削除
  localStorage.clear();

  // 入力欄とセレクトをリセット
  document.querySelectorAll("input, select").forEach(el => {
    if (el.tagName === "INPUT") {
      el.value = "";
    } else if (el.tagName === "SELECT") {
      el.selectedIndex = 0; // 最初の空欄に戻す
    }
  });
}

function exportToCSV() {
  let rows = [];

  // ページ内の全テーブルを対象
  document.querySelectorAll("table").forEach(table => {
    table.querySelectorAll("tr").forEach(tr => {
      let cells = [];
      tr.querySelectorAll("th, td").forEach(cell => {
        // セル内の input/select/テキストをチェック
        let input = cell.querySelector("input, select");
        if (input) {
          cells.push(input.value || "");
        } else {
          cells.push(cell.innerText.trim());
        }
      });
      rows.push(cells.join(","));
    });
  });

  // CSVにまとめる
  let csvContent = rows.join("\n");

  // ダウンロード処理
  let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  let blob = new Blob([bom, csvContent], { type: "text/csv" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "scorebook.csv";
  link.click();
}

