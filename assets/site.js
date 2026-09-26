'use strict';
// Only interface behavior. No network calls, cookies, or persistent storage.
const menu = document.querySelector('.menu-toggle');
if (menu) {
  const nav = document.getElementById(menu.getAttribute('aria-controls'));
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
}

document.querySelectorAll('.demo-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const result = form.querySelector('.form-result');
    result.replaceChildren();
    const heading = document.createElement('h3');
    heading.textContent = '入力内容を確認しました';
    const note = document.createElement('p');
    note.textContent = 'これは制作サンプルです。送信・保存・予約の確定は行っていません。';
    const list = document.createElement('ul');
    form.querySelectorAll('[data-summary]').forEach(el => {
      if (el.type === 'checkbox' && !el.checked) return;
      if (!el.value) return;
      const item = document.createElement('li');
      item.textContent = el.dataset.summary + '：' + (el.tagName === 'SELECT' ? el.selectedOptions[0].text : el.value);
      list.append(item);
    });
    result.append(heading, note, list);
    result.hidden = false;
    result.focus();
    result.scrollIntoView({block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
});

document.querySelectorAll('[data-demo-channel]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.querySelector('[name=channel]');
    if (select) select.value = link.dataset.demoChannel;
  });
});

const estimate = document.getElementById('estimate');
if (estimate) {
  const update = () => {
    const selected = [...estimate.querySelectorAll('input:checked')];
    const total = selected.reduce((n, el) => n + Number(el.value), 0);
    document.getElementById('estimate-total').textContent = total.toLocaleString('ja-JP') + '円';
    document.getElementById('estimate-detail').textContent = selected.length ? selected.map(el => el.dataset.label).join('・') + '／税込・概算' : 'ご希望の清掃箇所を選んでください';
    const target = document.querySelector('[name=message]');
    if (target) target.value = selected.length ? '希望箇所：' + selected.map(el => el.dataset.label).join('、') + '\n概算：' + total.toLocaleString('ja-JP') + '円（税込）' : '';
  };
  estimate.addEventListener('change', update);
  update();
}
