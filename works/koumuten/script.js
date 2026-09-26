
/* ことばの間取り */
const ROOMS={
  ldk:{n:'LDK',img:'photo-1560185007-cde436f6a4d0',w:'「朝ごはんのとき、庭の木が見えるといいな」',who:'— 暮らしのご希望例',d:'ダイニングの東側に、座ったときの目線に合わせた高さ90cmの横長窓を設けるプランです。庭のヤマボウシが、朝日と一緒に見えます。'},
  tatami:{n:'畳コーナー',img:'photo-1712232907812-4bd219a99a49',w:'「ごろんと昼寝できる場所がほしい」',who:'— 暮らしのご希望例',d:'LDKから床を40cm上げた4.5帖の畳コーナー。段差に腰かけられ、下は大きな引き出し収納になっています。'},
  bath:{n:'浴室・洗面',img:'photo-1631048499052-e6d9f305d2c0',w:'「洗濯物を持って階段を上りたくない」',who:'— 暮らしのご希望例',d:'平屋にして、洗う・干す・しまうを浴室まわりの1か所に集めました。室内干しの竿は天井に2本あります。'},
  doma:{n:'土間玄関',img:null,w:'「自転車を雨にぬらしたくない」',who:'— 暮らしのご希望例',d:'玄関を3帖の土間にし、自転車2台とベビーカーを置けるようにしました。壁には趣味の釣り道具を掛けるフックを設けます。'},
  kitchen:{n:'キッチン',img:'photo-1651765895131-1ae059a5f9ed',w:'「料理しながら、子どもの宿題を見たい」',who:'— 暮らしのご希望例',d:'対面キッチンのカウンターを奥行き45cm広げ、子どもが勉強できる机を兼ねています。キッチンのまわりをぐるっと回れる動線です。'},
  deck:{n:'ウッドデッキ',img:null,w:'「夏は外でごはんを食べたい」',who:'— 暮らしのご希望例',d:'LDKの床と同じ高さで南側にウッドデッキを。窓を開けると、部屋が外まで広がります。'}
};
const rooms=document.querySelectorAll('.plan .room');
function pick(g){
  const r=ROOMS[g.dataset.r];
  rooms.forEach(x=>x.setAttribute('aria-pressed',x===g));
  const img=document.getElementById('rcImg');
  img.parentElement.hidden = !r.img;
  if (r.img) {
    img.src='../../assets/images/'+r.img.replace('photo-','')+'.webp';
    img.alt=r.n+'の空間イメージ（提案そのものの写真ではありません）';
  }
  document.getElementById('rcName').textContent=r.n;
  document.getElementById('rcWord').textContent=r.w;
  document.getElementById('rcWho').textContent=r.who;
  document.getElementById('rcDesign').textContent=r.d;
}
rooms.forEach(g=>{
  g.addEventListener('click',()=>pick(g));
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(g);}});
});

/* フォーム */
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  const m=document.getElementById('msg'),er=[];
  if(!document.querySelectorAll('input[name=t]:checked').length)er.push('ご用件を1つ以上選んでください。');
  if(!document.getElementById('nm').value.trim())er.push('お名前を入力してください。');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(document.getElementById('em').value.trim()))er.push('メールアドレスを正しく入力してください。');
  if(er.length){m.className='msg err';m.textContent=er.join(' ');m.focus();return;}
  m.className='msg ok';m.textContent='入力内容を確認しました。制作サンプルのため送信・保存は行っておらず、予約や資料請求は成立していません。';
});
