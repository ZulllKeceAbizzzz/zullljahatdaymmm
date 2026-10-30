/* ==========================================================
   script.js
   Semua logika portofolio: data, navbar, efek mengetik,
   timeline, kartu hobi/sifat, popup, dan validasi form.
   ========================================================== */

/* ============ DATA: ubah isi di sini ============ */
const FOTO_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#1e3a8a"/><circle cx="100" cy="82" r="34" fill="#93c5fd"/><path d="M30 200c0-44 30-68 70-68s70 24 70 68z" fill="#93c5fd"/></svg>'
  );

const peran = [
  'Mahasiswa Teknik Informatika',
  'Pemain badminton dan catur',
  'Selalu penasaran',
];

const pendidikan = [
  { th: '2013 sampai 2019', nama: 'SDN Bulubonggu', ket: 'Di sinilah saya belajar membaca, berhitung, dan berteman. Kesan saya, masa SD adalah masa yang sederhana dan menyenangkan. Pesan saya, kebiasaan baik dimulai dari hal kecil, dan itu yang membuat saya mau terus belajar.', foto: 'foto-sd.jpg', label: 'SD', ikon: '🎒' },
  { th: '2019 sampai 2022', nama: 'SMPN 21 Bulubonggu', ket: 'Masa saya mulai belajar mandiri dan menemukan hal yang saya suka. Kesan saya, di sinilah rasa penasaran saya tumbuh. Motivasi saya dari masa ini: jangan takut mencoba hal baru, karena dari situ kita tahu apa yang cocok untuk kita.', foto: 'foto-smp.jpg', label: 'SMP', ikon: '📖' },
  { th: '2022 sampai 2025', nama: 'SMAN 01 Dapurang', ket: 'Lulus tahun 2025. Masa menghadapi ujian, menentukan jurusan kuliah, dan belajar bertanggung jawab. Kesan saya, banyak pelajaran hidup yang saya dapat di sini. Pesan saya, tetap tekun dan jangan menyerah saat hasilnya belum terlihat.', foto: 'foto-sma.jpg', label: 'SMA', ikon: '✏️' },
  { th: '2025 sampai sekarang', nama: 'Universitas Sulawesi Barat, Teknik Informatika', ket: 'Sekarang di semester 3. Belajar pemrograman, mengerjakan tugas kelompok, dan mencoba hal baru, termasuk membuat halaman ini dengan Tailwind CSS.', foto: 'foto-kuliah.jpg', label: 'kuliah', ikon: '🎓', aktif: true },
];

const hobi = [
  { ikon: '🏸', warna: 'bg-rose-600', judul: 'Badminton', ringkas: 'Olahraga favorit untuk melepas penat dan menjaga kebugaran.', detail: 'Badminton adalah salah satu hobi yang paling sering saya mainkan. Selain menyehatkan, olahraga ini melatih ketangkasan, disiplin, dan sportivitas. Bermain bersama teman juga membuat suasana lebih akrab.' },
  { ikon: '♟️', warna: 'bg-emerald-600', judul: 'Catur', ringkas: 'Melatih sabar dan berpikir beberapa langkah ke depan. Pernah ikut lomba tingkat kabupaten.', detail: 'Saya pernah mengikuti lomba catur tingkat kabupaten. Dari catur saya belajar sabar, teliti, dan berpikir beberapa langkah ke depan sebelum mengambil keputusan.' },
];

const sifat = [
  { ikon: '🔎', warna: 'bg-blue-600', judul: 'Selalu penasaran', ringkas: 'Senang mencari tahu cara kerja sesuatu.', detail: 'Sebagai mahasiswa Teknik Informatika, saya suka mencoba hal baru dan tidak mudah puas dengan satu jawaban. Kalau ada yang belum saya pahami, saya cari tahu sampai mengerti, termasuk lewat membuat halaman portofolio ini.' },
  { ikon: '♟️', warna: 'bg-emerald-600', judul: 'Sabar dan strategis', ringkas: 'Berpikir dulu sebelum mengambil langkah.', detail: 'Dari catur saya belajar berpikir beberapa langkah ke depan dan tidak terburu-buru mengambil keputusan. Cara berpikir ini saya bawa ke kuliah, terutama saat memecahkan masalah pemrograman.' },
  { ikon: '🤝', warna: 'bg-rose-600', judul: 'Sportif dan disiplin', ringkas: 'Terbiasa berlatih, menang maupun kalah.', detail: 'Badminton mengajarkan saya disiplin berlatih dan menerima kalah dengan lapang dada. Di kampus, sikap ini membantu saya bekerja sama dalam tugas kelompok dan terus berusaha setelah gagal.' },
];

const identitas = [
  ['Nama lengkap', 'Zul Ahyar Baharuddin'],
  ['Program studi', 'Teknik Informatika'],
  ['Universitas', 'Universitas Sulawesi Barat'],
  ['Usia', '20 tahun'],
  ['Semester', '3'],
  ['Domisili', 'Pasangkayu, Sulawesi Barat'],
  ['Email', 'menotmystyle@gmail.com'],
  ['Hobi', 'Badminton dan catur'],
];

/* ============ UTILITAS ============ */
const $ = (id) => document.getElementById(id);
const modal = $('modal');
const isi = $('modal-isi');

// Jika foto tidak ditemukan, tampilkan gambar pengganti
function pasangFoto(root) {
  root.querySelectorAll('img[data-foto]').forEach((img) => {
    img.onerror = () => {
      img.onerror = null;
      img.src = FOTO_FALLBACK;
    };
    if (img.complete && !img.naturalWidth) img.onerror();
  });
}

function popup(html) {
  isi.innerHTML = html;
  pasangFoto(isi);
  if (!modal.open) modal.showModal();
}

$('tutup-modal').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

/* ============ NAVBAR ============ */
const burger = $('burger');
const menu = $('menu');

function setMenu(buka) {
  menu.classList.toggle('hidden', !buka);
  menu.classList.toggle('flex', buka);
  burger.setAttribute('aria-expanded', buka);
  burger.setAttribute('aria-label', buka ? 'Tutup menu' : 'Buka menu');
}

burger.addEventListener('click', () => {
  setMenu(burger.getAttribute('aria-expanded') !== 'true');
});
menu.addEventListener('click', (e) => {
  if (e.target.closest('a') && window.innerWidth < 768) setMenu(false);
});

/* ============ EFEK MENGETIK ============ */
const target = $('ketik');
let p = 0;
let h = 0;
let hapus = false;

(function ketik() {
  const kata = peran[p];
  target.textContent = kata.slice(0, h);
  if (!hapus && h === kata.length) {
    hapus = true;
    return setTimeout(ketik, 1500);
  }
  if (hapus && h === 0) {
    hapus = false;
    p = (p + 1) % peran.length;
  }
  h += hapus ? -1 : 1;
  setTimeout(ketik, hapus ? 40 : 80);
})();

/* ============ TIMELINE PENDIDIKAN ============ */
$('timeline').innerHTML =
  '<div class="absolute bottom-6 left-6 top-6 w-1 -translate-x-1/2 bg-blue-600"></div>' +
  pendidikan
    .map((d, i) => `
      <div class="tl">
        <span class="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full ${d.aktif ? 'bg-green-700' : 'bg-blue-600'} text-xl" aria-hidden="true">${d.ikon}</span>
        <div class="card ${d.aktif ? '!border-green-700' : ''}">
          <p class="${d.aktif ? 'text-green-500' : 'text-blue-500'} font-medium">${d.th}${d.aktif ? ' <span class="ml-2 rounded-md bg-green-700 px-2 py-0.5 text-sm text-white">Sedang berjalan</span>' : ''}</p>
          <h3 class="mt-1 text-xl font-semibold text-white">${d.nama}</h3>
          <p class="mt-2 text-lg text-slate-400">${d.ket}</p>
          <button type="button" data-foto-pendidikan="${i}" class="btn-s mt-4 ${d.aktif ? '!border-green-700 !text-green-500 hover:!bg-green-700 hover:!text-white' : ''}">🖼 Lihat foto ${d.label}</button>
        </div>
      </div>`)
    .join('');

$('timeline').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-foto-pendidikan]');
  if (btn) fotoPendidikan(Number(btn.dataset.fotoPendidikan));
});

function fotoPendidikan(i) {
  const d = pendidikan[i];
  popup(`
    <img data-foto src="${d.foto}" alt="Foto ${d.label}" class="w-full rounded-xl object-cover">
    <h2 class="mt-4 text-xl font-semibold text-white">${d.nama}</h2>
    <p class="text-slate-400">${d.th}</p>`);
}

/* ============ KARTU (HOBI & KEPRIBADIAN) ============ */
function kartuHTML(x, i, jenis) {
  return `
    <div class="card">
      <span class="flex h-16 w-16 items-center justify-center rounded-xl ${x.warna} text-3xl" aria-hidden="true">${x.ikon}</span>
      <h3 class="mt-4 text-2xl font-semibold text-white">${x.judul}</h3>
      <p class="mt-2 text-lg text-slate-400">${x.ringkas}</p>
      <button type="button" data-${jenis}="${i}" class="btn-baca">Baca selengkapnya</button>
    </div>`;
}

function detailHTML(x) {
  return `
    <span class="flex h-14 w-14 items-center justify-center rounded-xl ${x.warna} text-3xl" aria-hidden="true">${x.ikon}</span>
    <h2 class="mt-4 text-2xl font-semibold text-white">${x.judul}</h2>
    <p class="mt-3 text-lg text-slate-300">${x.detail}</p>`;
}

$('hobi-grid').innerHTML = hobi.map((x, i) => kartuHTML(x, i, 'hobi')).join('');
$('sifat-grid').innerHTML = sifat.map((x, i) => kartuHTML(x, i, 'sifat')).join('');

$('hobi-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-hobi]');
  if (btn) popup(detailHTML(hobi[Number(btn.dataset.hobi)]));
});
$('sifat-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-sifat]');
  if (btn) popup(detailHTML(sifat[Number(btn.dataset.sifat)]));
});

/* ============ KARTU IDENTITAS ============ */
function kartuIdentitas() {
  popup(`
    <div class="flex items-center gap-4">
      <img data-foto src="foto-saya.jpg" alt="Foto Zul" class="h-20 w-20 rounded-xl object-cover">
      <div>
        <h2 class="text-2xl font-semibold text-white">Zul Ahyar</h2>
        <p class="text-slate-400">Mahasiswa Teknik Informatika</p>
      </div>
    </div>
    <dl class="mt-6 grid gap-4 sm:grid-cols-2">
      ${identitas.map(([k, v]) => `<div><dt class="text-sm text-slate-400">${k}</dt><dd class="font-medium text-white">${v}</dd></div>`).join('')}
    </dl>`);
}
$('btn-identitas').addEventListener('click', kartuIdentitas);

/* ============ TOMBOL KE ATAS + TOAST ============ */
window.addEventListener(
  'scroll',
  () => $('atas').classList.toggle('invisible', window.scrollY < 400),
  { passive: true }
);

let timerToast;
function toast(teks) {
  const el = $('toast');
  el.textContent = teks;
  el.classList.remove('hidden');
  clearTimeout(timerToast);
  timerToast = setTimeout(() => el.classList.add('hidden'), 3500);
}

/* ============ FORM KONTAK ============ */
const aturan = {
  nama: (v) => (v.trim().length < 3 ? 'Nama minimal 3 karakter.' : ''),
  email: (v) =>
    !v.trim()
      ? 'Email wajib diisi.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? 'Format email tidak valid, contoh: nama@email.com.'
      : '',
  pesan: (v) => (v.trim().length < 10 ? 'Pesan minimal 10 karakter.' : ''),
};

function cek(id) {
  const el = $(id);
  const err = $('e-' + id);
  const pesanError = aturan[id](el.value);
  err.textContent = pesanError;
  err.classList.toggle('hidden', !pesanError);
  el.setAttribute('aria-invalid', !!pesanError);
  el.classList.toggle('!border-red-500', !!pesanError);
  return !pesanError;
}

Object.keys(aturan).forEach((id) => {
  $(id).addEventListener('blur', () => cek(id));
  $(id).addEventListener('input', () => {
    if ($(id).getAttribute('aria-invalid') === 'true') cek(id);
    if (id === 'pesan') $('hitung').textContent = $(id).value.length + ' / 300';
  });
});

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const semuaValid = Object.keys(aturan).map(cek).every(Boolean);
  if (!semuaValid) {
    $('form').querySelector('[aria-invalid="true"]').focus();
    return;
  }
  const tombol = $('kirim');
  tombol.disabled = true;
  tombol.textContent = 'Mengirim...';
  // Simulasi pengiriman (belum ada server)
  setTimeout(() => {
    $('form').reset();
    $('hitung').textContent = '0 / 300';
    tombol.disabled = false;
    tombol.textContent = 'Kirim pesan';
    toast('Pesan terkirim. Terima kasih, saya akan membalas lewat email.');
  }, 900);
});

/* ============ JALANKAN ============ */
pasangFoto(document);