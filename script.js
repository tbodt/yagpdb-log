import { g, x, h, t } from "https://unpkg.com/@xeserv/xeact@0.70.0/xeact.js";

function kamaLipuOOpen(nasinLipu) {
  g('pakala').innerText = '';
  iloLiKamaPaliAlaPali(true);
  lipuOKama(nasinLipu)
    .catch(pkl => {
      console.error(pkl);
      g('pakala').innerText = pkl;
    })
    .finally(() => iloLiKamaPaliAlaPali(false));
}

function iloLiKamaPaliAlaPali(paliAlaPali) {
  g('o-awen').style.display = paliAlaPali ? '' : 'none';
  g('nena-pana').disabled = paliAlaPali;
}

async function lipuOKama(nasinLipu) {
  let nasin = new URL('https://fucking-cors.tbodt.repl.co');
  nasin.search = nasinLipu;
  if (new URL(nasinLipu).hostname !== 'cdn.discordapp.com')
    throw new Error('link must be to cdn.discordapp.com');
  let lipu = await (await fetch(nasin)).text();


  x(g('lipu'));
  let open = lipu.split('\n\n')[0];
  if (!open.startsWith('Transcript of ticket') || open.includes('/n')) {
    throw new Error('doesn\'t look like the right format');
  }
  lipu = lipu.slice(open.length + 2);
  
  let tokiAle = [...lipu.matchAll(/\[\d{4} \w{3} \d{2} \d{2}:\d{2}:\d{2}\] .*?(#\d+)? \(\d+\):/gd)];
  for (let [i, toki] of tokiAle.entries()) {
    g('lipu').appendChild(
      h('div', {className: 'poki-toki'}, [
        h('p', {
          innerText: toki,
          className: 'nimi',
        }),
        h('p', {
          innerText: lipu.slice(toki.indices[0][1], i == tokiAle.length-1 ? -1 : tokiAle[i+1].indices[0][0]),
        })
      ])
    );
  }
}

g('pana-pi-nasin-lipu').addEventListener('submit', (e) => {
  e.preventDefault();
  let nasinLipu = g('nasin-lipu').value;
  location.hash = `#${nasinLipu}`;
})

function oLukinESitelenNanpa() {
  let nasin = location.hash.slice(1);
  g('nasin-lipu').value = nasin;
  kamaLipuOOpen(nasin);
}

addEventListener('hashchange', oLukinESitelenNanpa);
oLukinESitelenNanpa();