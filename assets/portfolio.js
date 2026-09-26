"use strict";
const copyButton = document.getElementById('copy-note');
copyButton?.addEventListener('click', async () => {
  const note = document.getElementById('consultation-note');
  const result = document.getElementById('copy-result');
  try {
    await navigator.clipboard.writeText(note.value);
    result.textContent = 'コピーしました。応募元のメッセージへ貼り付けてください。';
  } catch {
    note.focus(); note.select();
    result.textContent = 'メモを選択しました。お使いの端末のコピー操作でコピーしてください。';
  }
});
