// === NOMOR WHATSAPP ===
const NOMOR_WA = '62882005944577'; // Ganti nomor kamu

// === DATA PRODUK — HANYA JILBAB ===
const DAFTAR_PRODUK = [
  {
    id: 1,
    nama: 'Jilbab Bergo Instan',
    harga: 35000,
    gambar: 'instan-bergo.png',
    deskripsi: 'Jilbab instan bahan rayon premium. Lembut, adem, tidak panas dipakai seharian. Langsung pakai tanpa perlu diatur.',
    ukuran: ['S', 'M', 'L'],
    warna: ['Hitam', 'Coklat Susu', 'Dusty Pink', 'Mocca', 'Putih'],
    spesifikasi: ['Bahan: Rayon', 'Model: Instan Bergo', 'Panjang Depan: 70-85cm', 'Panjang Belakang: 110-130cm'],
    label: 'Terlaris'
  },
  {
    id: 2,
    nama: 'Pashmina Viscose',
    harga: 45000,
    gambar: 'viscose.png',
    deskripsi: 'bahan viscose premium, karteristik bahannya lembut dan mudah di bentuk, finishing tepi double jahit .',
    ukuran: ['S', 'M', 'L'],
    warna: ['Hitam', 'Coklat Susu', 'Dusty Pink', 'Mocca', 'Navy', 'Abu Muda'],
    spesifikasi: ['Bahan: Viscose Premium', 'Ukuran: 170cm x 70cm', 'Tepi Jahit Rapi'],
    label: 'Baru'
  },
  {
    id: 3,
    nama: 'Segiempat Paris',
    harga: 15000,
    gambar: "segiempat.jpg",
    deskripsi: 'KERUDUNG SEGI EMPAT PARIS POLOS VARISHA NECI 2 SISI. Berbahan dasar katun paris dengan tekstur halus dan lembut sehingga nyaman digunakan sehari-hari. Permukaannya yang sedikit mengkilap membuat hijab terlihat lebih menarik .',
    ukuran: ['S', 'M', 'L'],
    warna: ['Hitam', 'Coklat Tua', 'Mocca', 'Maroon', 'Ivory', 'Navy', 'Putih'],
    spesifikasi: ['Bahan: Katun Paris', 'Ukuran: 110-110cm'],
    label: 'Diskon'
  },
  {
    id: 4,
    nama: 'Pashmina Viscose Motif Premium',
    harga: 50000,
    gambar: "printed.png",
    deskripsi: 'Hadir dengan motif watercolor yang lembut namun memikat, pashmina ini terbuat dari material katun viscose pilihan yang dikenal ringan, adem, dan nyaman dipakai seharian. Ukurannya 180x75 cm memberi keleluasaan dalam berbagai gaya, sementara detail jahit babyseam menambah kesan rapi dan eksklusif. Tampil dalam warna-warna vibrant yang dirancang khusus untuk memberikan efek elegan dan berkelas di setiap penampilanmu—baik untuk tampilan formal maupun kasual.',
    ukuran: ['S', 'M', 'L'],
    warna: ['Hitam', 'Putih', 'Dusty Pink', 'Biru Langit', 'Coklat Susu'],
    spesifikasi: ['Bahan: Viscose Premium', 'Ukuran: 180cm x 75cm', 'Tepi Jahit Rapi'],
    label: 'Terlaris'
  },
  {
    id: 5,
    nama: 'Jilbab Voal Motif Premium',
    harga: 37000,
    gambar: "motif.png",
    deskripsi: 'Jilbab segi empat bahan voal premium. Bahan adem, mudah digunakan, mudah dibentuk.',
    ukuran: ['S', 'M', 'L'],
    warna: ['Hitam', 'Putih', 'Dusty Pink', 'Biru Langit', 'Coklat Susu'],
    spesifikasi: ['Bahan: Voal Premium'],
    label: 'Baru'
  },
  {
    id: 6,
    nama: 'Bergo Sport',
    harga: 25000,
    gambar: "bergosport.png",
    deskripsi: 'Bergo Sport Super Ped Antem Tegak 8MM Tidak Letoy Bikin Wajah Tirus dan Rapi.Bahan Jersey Premium adem, lembut, menyerap keringat. Nyaman untuk Olahraga, Sekolah, Kerja dan Harian.',
    ukuran: ['S','M', 'L'],
    warna: ['Hitam', 'Putih', 'Dusty Pink', 'Mocca', 'Coklat Susu', 'Navy'],
    spesifikasi: ['Bahan: Jersey Premium', 'Ukuran: 110cm x 110cm', 'Tidak Menerawang'],
    label: 'Terlaris'
  }
];

// === KERANJANG ===
let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

function simpanKeranjang() {
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
}

function tampilkanJumlah() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = keranjang.reduce((sum, i) => sum + i.jumlah, 0);
}

function addToCart(id, nama, harga, gambar, ukuran, warna) {
  const item = keranjang.find(i => i.id === id && i.ukuran === ukuran && i.warna === warna);
  if (item) {
    item.jumlah++;
  } else {
    keranjang.push({ id, nama, harga, gambar, ukuran, warna, jumlah: 1 });
  }
  simpanKeranjang();
  tampilkanJumlah();
  alert('✅ Ditambahkan ke keranjang!');
}

function ubahJumlah(selisih) {
  const input = document.getElementById('qty');
  let nilai = parseInt(input.value) + selisih;
  if (nilai < 1) nilai = 1;
  input.value = nilai;
}

function tampilkanKeranjang() {
  const list = document.getElementById('cart-items');
  const kosong = document.getElementById('cart-empty');
  const ringkasan = document.getElementById('cart-summary');
  if (!list) return;

  if (keranjang.length === 0) {
    list.style.display = 'none';
    kosong.style.display = 'block';
    ringkasan.style.display = 'none';
    return;
  }

  list.style.display = 'block';
  kosong.style.display = 'none';
  ringkasan.style.display = 'block';

  list.innerHTML = keranjang.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.gambar}" alt="${item.nama}">
      <div class="cart-info">
        <h4>${item.nama}</h4>
        <p>Ukuran: ${item.ukuran} | Warna: ${item.warna}</p>
        <p class="price">Rp ${item.harga.toLocaleString('id-ID')}</p>
        <div class="qty-box">
          <button class="qty-btn" onclick="keranjang[${idx}].jumlah--; simpanKeranjang(); tampilkanKeranjang(); tampilkanJumlah();">-</button>
          <span>${item.jumlah}</span>
          <button class="qty-btn" onclick="keranjang[${idx}].jumlah++; simpanKeranjang(); tampilkanKeranjang(); tampilkanJumlah();">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="keranjang.splice(${idx},1); simpanKeranjang(); tampilkanKeranjang(); tampilkanJumlah();">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  const subtotal = keranjang.reduce((sum, i) => sum + i.harga * i.jumlah, 0);
  const ongkir = subtotal >= 150000 ? 0 : 15000;
  document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById('shipping').textContent = ongkir === 0 ? 'GRATIS' : `Rp ${ongkir.toLocaleString('id-ID')}`;
  document.getElementById('grand-total').textContent = `Rp ${(subtotal + ongkir).toLocaleString('id-ID')}`;
}

function kosongkanKeranjang() {
  if (confirm('Yakin kosongkan keranjang?')) {
    keranjang = [];
    simpanKeranjang();
    tampilkanKeranjang();
    tampilkanJumlah();
  }
}

function kirimKeWA() {
  if (keranjang.length === 0) return alert('Keranjang masih kosong!');
  let teks = 'Assalamu\'alaikum Kak Fitra Hijab 🤍\nSaya ingin memesan:\n\n';
  keranjang.forEach(i => {
    teks += `✅ ${i.nama}\n   Ukuran: ${i.ukuran}\n   Warna: ${i.warna}\n   Jumlah: ${i.jumlah} pcs\n   Harga: Rp ${(i.harga * i.jumlah).toLocaleString('id-ID')}\n\n`;
  });
  const subtotal = keranjang.reduce((sum, i) => sum + i.harga * i.jumlah, 0);
  const ongkir = subtotal >= 150000 ? 0 : 15000;
  teks += `────────────────────\nSubtotal: Rp ${subtotal.toLocaleString('id-ID')}\nOngkir: ${ongkir === 0 ? 'GRATIS' : 'Rp ' + ongkir.toLocaleString('id-ID')}\nTOTAL: Rp ${(subtotal + ongkir).toLocaleString('id-ID')}\n\nMohon info pemesanan lengkapnya Kak. Terima kasih 🤍`;
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`, '_blank');
}

function tampilkanDetailProduk() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const produk = DAFTAR_PRODUK.find(p => p.id === id);
  if (!produk) return;

  document.getElementById('prod-img').src = produk.gambar;
  document.getElementById('prod-name').textContent = produk.nama;
  document.getElementById('prod-price').textContent = 'Rp ' + produk.harga.toLocaleString('id-ID');
  document.getElementById('prod-desc').textContent = produk.deskripsi;
  document.getElementById('prod-spec').innerHTML = produk.spesifikasi.map(s => `<li>${s}</li>`).join('');

  // Pilihan Ukuran
  const opsiUkuran = document.getElementById('opsi-ukuran');
  opsiUkuran.innerHTML = produk.ukuran.map((u, i) => `
    <label class="opsi-label ${i === 0 ? 'terpilih' : ''}">
      <input type="radio" name="ukuran" value="${u}" ${i === 0 ? 'checked' : ''}>
      ${u}
    </label>
  `).join('');

  // Pilihan Warna
  const opsiWarna = document.getElementById('opsi-warna');
  opsiWarna.innerHTML = produk.warna.map((w, i) => `
    <label class="opsi-label ${i === 0 ? 'terpilih' : ''}">
      <input type="radio" name="warna" value="${w}" ${i === 0 ? 'checked' : ''}>
      ${w}
    </label>
  `).join('');

  // Tombol Tambah Keranjang
  document.getElementById('btn-add-cart').onclick = () => {
    const ukuran = document.querySelector('input[name="ukuran"]:checked').value;
    const warna = document.querySelector('input[name="warna"]:checked').value;
    const jumlah = parseInt(document.getElementById('qty').value);
    for (let i = 0; i < jumlah; i++) {
      addToCart(produk.id, produk.nama, produk.harga, produk.gambar, ukuran, warna);
    }
  };
}

function tampilkanSemuaProduk() {
  const wadah = document.getElementById('daftar-produk');
  if (!wadah) return;
  wadah.innerHTML = DAFTAR_PRODUK.map(p => `
    <div class="product-card">
      ${p.label ? `<span class="badge ${p.label === 'Diskon' ? 'diskon' : p.label === 'Terlaris' ? 'laris' : 'baru'}">${p.label === 'Diskon' ? '-20%' : p.label}</span>` : ''}
      <img src="${p.gambar}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p class="price">Rp ${p.harga.toLocaleString('id-ID')}</p>
      <div class="btn-group">
        <a href="product-detail.html?id=${p.id}" class="btn btn-sm">Detail</a>
        <button class="btn btn-primary btn-sm" onclick="window.location.href='product-detail.html?id=${p.id}'">Pilih</button>
      </div>
    </div>
  `).join('');
}

function kirimPesan(e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const kontak = document.getElementById('kontak').value;
  const pesan = document.getElementById('pesan').value;
  const teks = `Assalamu'alaikum Kak Fitra Hijab 🤍\nSaya: ${nama}\nKontak: ${kontak}\n\nPesan:\n${pesan}`;
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`, '_blank');
  e.target.reset();
  alert('✅ Pesan dikirim! Terima kasih sudah menghubungi 🤍');
}

// Menu HP
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.onclick = () => navMenu.classList.toggle('aktif');
}

// Jalankan saat buka
window.onload = () => {
  tampilkanJumlah();
  if (document.getElementById('daftar-produk')) tampilkanSemuaProduk();
  if (document.getElementById('cart-items')) tampilkanKeranjang();
  if (document.getElementById('prod-name')) tampilkanDetailProduk();
};
