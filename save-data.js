// ���͕ۑ�
document.addEventListener("input", function (e) {
  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
    localStorage.setItem(e.target.name || e.target.id, e.target.value);
  }
});

// �ۑ��������e�𕜌�
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input, select").forEach(el => {
    const key = el.name || el.id;
    if (key && localStorage.getItem(key)) {
      el.value = localStorage.getItem(key);
    }
  });
});

function clearAllData() {
  // localStorage �̃f�[�^���폜
  localStorage.clear();

  // ���͗��ƃZ���N�g�����Z�b�g
  document.querySelectorAll("input, select").forEach(el => {
    if (el.tagName === "INPUT") {
      el.value = "";
    } else if (el.tagName === "SELECT") {
      el.selectedIndex = 0; // �ŏ��̋󗓂ɖ߂�
    }
  });
}

function exportToCSV() {
  let rows = [];

  // �y�[�W���̑S�e�[�u����Ώ�
  document.querySelectorAll("table").forEach(table => {
    table.querySelectorAll("tr").forEach(tr => {
      let cells = [];
      tr.querySelectorAll("th, td").forEach(cell => {
        // �Z������ input/select/�e�L�X�g���`�F�b�N
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

  // CSV�ɂ܂Ƃ߂�
  let csvContent = rows.join("\n");

  // �_�E�����[�h����
  let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  let blob = new Blob([bom, csvContent], { type: "text/csv" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "scorebook.csv";
  link.click();
}

