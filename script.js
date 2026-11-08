// === KONFIGURASI ===
const KUNCI_KERANJANG = 'fitra_hijab_keranjang';
const NOMOR_WA = '+62882005944577'; // GANTI PAKAI NOMOR WA KAMU!

const DAFTAR_PRODUK = [
  {
    id: 1,
    nama: 'Hijab Syari Premium',
    harga: 65000,
    gambar: 'https://images.unsplash.com/photo-1593030760247-85d313165c40?w=400&q=80',
    deskripsi: 'Terbuat dari bahan Ceruty Babydoll berkualitas tinggi...',
    spesifikasi: ['Bahan: Ceruty Babydoll', 'Ukuran: 110cm x 140cm', 'Warna: 12 pilihan']
  },
  {
    id: 2,
    nama: 'Pashmina Ceruty',
    harga: 45000,
    gambar: 'https://images.unsplash.com/photo-1583391631042-4a4935ebf0f4?w=400&q=80',
    deskripsi: 'Pashmina bahan ceruty yang sangat populer...',
    spesifikasi: ['Bahan: Ceruty', 'Ukuran: 75cm x 180cm']
  },
  {
    id: 3,
    nama: 'Khimar Syari Set',
    harga: 96000,
    gambar: 'https://images.unsplash.com/photo-1609058356391-0e6e631b4785?w=400&q=80',
    deskripsi: 'Paket lengkap khimar + rok seragam...',
    spesifikasi: ['Isi: Khimar + Rok', 'Bahan: Katun Premium']
  },
  {
    id: 4,
    nama: 'Bergo Sporty',
    harga: 38000,
    gambar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    deskripsi: 'Model instan yang praktis banget!',
    spesifikasi: ['Bahan: Jersey Premium', 'Model: Instan']
  },
  {
    id: 5,
    nama: 'Segi Empat Paris',
    harga: 32000,
    gambar: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80',
    deskripsi: 'Kain paris kualitas bagus...',
    spesifikasi: ['Bahan: Kain Paris', 'Ukuran: 110cm x 110cm']
  },
  {
    id: 6,
    nama: 'Gamis Busui Ramah',
    harga: 145000,
    gambar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80',
    deskripsi: 'Gamis cantik & nyaman untuk ibu menyusui...',
    spesifikasi: ['Bahan: Katun Toyobo', 'Fitur: Resleting depan']
  }
];



// === FUNGSI KERANJANG ===
function ambilKeranjang() {
  const data = localStorage.getItem(KUNCI_KERANJANG);
  return data ? JSON.parse(data) : [];
}

function simpanKeranjang(keranjang) {
  localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang));
}

function tambahKeKeranjang(id, nama, harga) {
  const keranjang = ambilKeranjang();
  const ada = keranjang.find(b => b.id === id);
  if (ada) {
    ada.jumlah++;
  } else {
    keranjang.push({ id, nama, harga, jumlah: 1 });
  }
  simpanKeranjang(keranjang);
  alert('✅ Ditambahkan ke keranjang!');
  tampilkanJumlah();
}

function ubahJumlahDiKeranjang(id, jumlah) {
  const keranjang = ambilKeranjang();
  const barang = keranjang.find(b => b.id === id);
  if (barang) {
    if (jumlah <= 0) {
      hapusDariKeranjang(id);
      return;
    }
    barang.jumlah = jumlah;
    simpanKeranjang(keranjang);
    tampilkanKeranjang();
    tampilkanJumlah();
  }
}

function hapusDariKeranjang(id) {
  let keranjang = ambilKeranjang();
  keranjang = keranjang.filter(b => b.id !== id);
  simpanKeranjang(keranjang);
  tampilkanKeranjang();
  tampilkanJumlah();
}

function kosongkanKeranjang() {
  if (confirm('Yakin ingin mengosongkan keranjang?')) {
    localStorage.removeItem(KUNCI_KERANJANG);
    tampilkanKeranjang();
    tampilkanJumlah();
  }
}

function tampilkanJumlah() {
  const keranjang = ambilKeranjang();
  const totalItem = keranjang.reduce((sum, b) => sum + b.jumlah, 0);
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = totalItem;
  });
}

function tampilkanKeranjang() {
  const keranjang = ambilKeranjang();
  const wadah = document.getElementById('cart-items');
  const kosong = document.getElementById('cart-empty');
  const ringkasan = document.getElementById('cart-summary');
  
  if (!wadah) return;
  
  if (keranjang.length === 0) {
    wadah.innerHTML = '';
    if (kosong) kosong.style.display = 'block';
    if (ringkasan) ringkasan.style.display = 'none';
    return;
  }
  
  if (kosong) kosong.style.display = 'none';
  if (ringkasan) ringkasan.style.display = 'block';
  
  wadah.innerHTML = '';
  let subtotal = 0;
  
  keranjang.forEach(barang => {
    const total = barang.harga * barang.jumlah;
    subtotal += total;
    wadah.innerHTML += `
      <div class="cart-item">
        <div class="info">
          <h4>${barang.nama}</h4>
          <p>Rp ${barang.harga.toLocaleString()}</p>
        </div>
        <div class="jumlah">
          <button class="qty-btn" onclick="ubahJumlahDiKeranjang(${barang.id}, ${barang.jumlah - 1})">−</button>
          <span>${barang.jumlah}</span>
          <button class="qty-btn" onclick="ubahJumlahDiKeranjang(${barang.id}, ${barang.jumlah + 1})">+</button>
        </div>
        <div class="subtotal">
          <strong>Rp ${total.toLocaleString()}</strong>
        </div>
        <span class="hapus" onclick="hapusDariKeranjang(${barang.id})">
          <i class="fas fa-trash"></i>
        </span>
      </div>
    `;
  });
  
  const ongkir = subtotal >= 150000 ? 0 : 15000;
  const totalAkhir = subtotal + ongkir;
  
  const elSub = document.getElementById('subtotal');
  const elOngkir = document.getElementById('shipping');
  const elTotal = document.getElementById('grand-total');
  
  if (elSub) elSub.textContent = `Rp ${subtotal.toLocaleString()}`;
  if (elOngkir) elOngkir.textContent = ongkir === 0 ? 'GRATIS!' : `Rp ${ongkir.toLocaleString()}`;
  if (elTotal) elTotal.textContent = `Rp ${totalAkhir.toLocaleString()}`;
}

function kirimKeWA() {
  const keranjang = ambilKeranjang();
  if (keranjang.length === 0) return alert('Keranjang masih kosong!');
  
  let pesan = 'Assalamu\'alaikum kak Fitra Hijab 🤍\nSaya mau pesan:\n\n';
  let subtotal = 0;
  
  keranjang.forEach(b => {
    const total = b.harga * b.jumlah;
    subtotal += total;
    pesan += `• ${b.nama}\n  ${b.jumlah} x Rp ${b.harga.toLocaleString()} = Rp ${total.toLocaleString()}\n`;
  });
  
  const ongkir = subtotal >= 150000 ? 0 : 15000;
  const totalAkhir = subtotal + ongkir;
  
  pesan += `\n────────────────────\n`;
  pesan += `Subtotal: Rp ${subtotal.toLocaleString()}\n`;
  pesan += `Ongkos kirim: ${ongkir === 0 ? 'GRATIS (min. belanja Rp 150.000)' : 'Rp ' + ongkir.toLocaleString()}\n`;
  pesan += `TOTAL: Rp ${totalAkhir.toLocaleString()}\n\n`;
  pesan += `Mohon info ketersediaan, alamat pengiriman, & cara pembayarannya ya kak. Terima kasih! 🤍`;
  
  const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

// === HALAMAN DETAIL PRODUK ===
function ambilIdDariUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

function tampilkanDetailProduk() {
  const id = ambilIdDariUrl();
  if (!id) return;
  
  const produk = DAFTAR_PRODUK.find(p => p.id === id);
  if (!produk) return;
  
  const img = document.getElementById('prod-img');
  const nama = document.getElementById('prod-name');
  const harga = document.getElementById('prod-price');
  const desc = document.getElementById('prod-desc');
  const spec = document.getElementById('prod-spec');
  const btn = document.getElementById('btn-add-cart');
  
  if (img) { img.src = produk.gambar; img.alt = produk.nama; }
  if (nama) nama.textContent = produk.nama;
  if (harga) harga.textContent = `Rp ${produk.harga.toLocaleString()}`;
  if (desc) desc.textContent = produk.deskripsi;
  
  if (spec) {
    spec.innerHTML = '';
    produk.spesifikasi.forEach(s => {
      spec.innerHTML += `<li>✅ ${s}</li>`;
    });
  }
  
  if (btn) {
    btn.onclick = () => tambahKeKeranjang(produk.id, produk.nama, produk.harga);
  }
}

function ubahJumlah(selisih) {
  const input = document.getElementById('qty');
  if (!input) return
    let nilai = parseInt(input.value) + selisih;
  if (nilai < 1) nilai = 1;
  input.value = nilai;
}

// === HALAMAN KONTAK ===
function kirimPesan(e) {
  e.preventDefault();
  const nama = document.getElementById('nama')?.value || '';
  const kontak = document.getElementById('kontak')?.value || '';
  const pesan = document.getElementById('pesan')?.value || '';
  
  const teks = `Assalamu'alaikum kak Fitra Hijab 🤍\nSaya ${nama}\nKontak: ${kontak}\n\nPesan:\n${pesan}`;
  const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`;
  window.open(url, '_blank');
  e.target.reset();
  alert('✅ Pesan dikirim! Terima kasih sudah menghubungi Fitra Hijab 🤍');
}

// === MENU HP ===
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.onclick = () => navMenu.classList.toggle('aktif');
}

// === JALANKAN SAAT BUKA ===
window.onload = () => {
  tampilkanJumlah();
  if (document.getElementById('cart-items')) tampilkanKeranjang();
  if (document.getElementById('prod-name')) tampilkanDetailProduk();
};

