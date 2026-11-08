// === KONFIGURASI ===
const KUNCI_KERANJANG = 'toko_saya_keranjang';
const NOMOR_WA = '6281234567890'; // Ganti nomor WA kamu
const DAFTAR_PRODUK = [
  {
    id: 1,
    nama: 'Produk A — Kualitas Premium',
    harga: 50000,
    gambar: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
    deskripsi: 'Bahan berkualitas tinggi, awet dipakai lama. Pilihan tepat untuk kebutuhan sehari-hari atau hadiah spesial.',
    spesifikasi: ['Bahan: Premium', 'Warna: Hitam', 'Garansi: 1 Tahun']
  },
  {
    id: 2,
    nama: 'Produk B — Desain Elegan',
    harga: 75000,
    gambar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    deskripsi: 'Tampilan cantik & modern, cocok dipakai ke acara santai maupun resmi. Nyaman dipakai seharian.',
    spesifikasi: ['Bahan: Sintetis berkualitas', 'Warna: Merah', 'Ukuran: Standar']
  },
  {
    id: 3,
    nama: 'Produk C — Pilihan Terbaik',
    harga: 120000,
    gambar: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300',
    deskripsi: 'Paling laris! Fitur lengkap, kualitas terjamin, disukai ratusan pelanggan kami.',
    spesifikasi: ['Bahan: Campuran premium', 'Warna: Cokelat', 'Stok: Terbatas']
  },
  {
    id: 4,
    nama: 'Produk D — Spesial Edisi',
    harga: 95000,
    gambar: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300',
    deskripsi: 'Edisi terbatas! Desain eksklusif, stok sedikit. Dapatkan sebelum kehabisan.',
    spesifikasi: ['Edisi: Terbatas', 'Warna: Putih', 'Tersedia: 20 unit']
  },
  {
    id: 5,
    nama: 'Produk E — Fitur Lengkap',
    harga: 85000,
    gambar: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    deskripsi: 'Banyak keunggulan dengan harga tetap ramah. Praktis, awet, dan bergaya.',
    spesifikasi: ['Fitur: Lengkap', 'Koneksi: Universal', 'Garansi: 6 Bulan']
  },
  {
    id: 6,
    nama: 'Produk F — Paling Populer',
    harga: 65000,
    gambar: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
    deskripsi: 'Favorit pelanggan! Sudah dinilai bintang 5 oleh banyak pembeli. Terbukti memuaskan.',
    spesifikasi: ['Bahan: Lembut & kuat', 'Warna: Hitam elegan', 'Ulasan: ⭐⭐⭐⭐⭐']
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
  if (elOngkir) elOngkir.textContent = ongkir === 0 ? 'Gratis!' : `Rp ${ongkir.toLocaleString()}`;
  if (elTotal) elTotal.textContent = `Rp ${totalAkhir.toLocaleString()}`;
}

function kirimKeWA() {
  const keranjang = ambilKeranjang();
  if (keranjang.length === 0) return alert('Keranjang masih kosong!');
  
  let pesan = 'Halo! Saya mau pesan:\n\n';
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
  pesan += `Ongkos kirim: ${ongkir === 0 ? 'GRATIS' : 'Rp ' + ongkir.toLocaleString()}\n`;
  pesan += `TOTAL: Rp ${totalAkhir.toLocaleString()}\n\n`;
  pesan += `Mohon info ketersediaan & alamat pengiriman ya. Terima kasih!`;
  
  const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

// === HALAMAN DETAIL PRODUK ===
let produkTerpilih = null;
let jumlahBeli = 1;

function ambilIdDariUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

function tampilkanDetailProduk() {
  const id = ambilIdDariUrl();
  if (!id) return;
  
  produkTerpilih = DAFTAR_PRODUK.find(p => p.id === id);
  if (!produkTerpilih) return;
  
  const img = document.getElementById('prod-img');
  const nama = document.getElementById('prod-name');
  const harga = document.getElementById('prod-price');
  const desc = document.getElementById('prod-desc');
  const spec = document.getElementById('prod-spec');
  const btn = document.getElementById('btn-add-cart');
  
  if (img) img.src = produkTerpilih.gambar;
  if (img) img.alt = produkTerpilih.nama;
  if (nama) nama.textContent = produkTerpilih.nama;
  if (harga) harga.textContent = `Rp ${produkTerpilih.harga.toLocaleString()}`;
  if (desc) desc.textContent = produkTerpilih.deskripsi;
  
  if (spec) {
    spec.innerHTML = '';
    produkTerpilih.spesifikasi.forEach(s => {
      spec.innerHTML += `<li>✅ ${s}</li>`;
    });
  }
  
  if (btn) {
    btn.onclick = () => {
      tambahKeKeranjang(
        produkTerpilih.id,
        produkTerpilih.nama,
        produkTerpilih.harga
      );
    };
  }
}

function ubahJumlah(selisih) {
  const input = document.getElementById('qty');
  if (!input) return;
  
  let nilai = parseInt(input.value) + selisih;
  if (nilai < 1) nilai = 1;
  input.value = nilai;
  jumlahBeli = nilai;
}

// === HALAMAN KONTAK ===
function kirimPesan(e) {
  e.preventDefault();
  const nama = document.getElementById('nama')?.value || '';
  const kontak = document.getElementById('kontak')?.value || '';
  const pesan = document.getElementById('pesan')?.value || '';
  
  const teks = `Halo, saya ${nama}.\nKontak saya: ${kontak}\n\nPesan:\n${pesan}`;
  const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`;
  window.open(url, '_blank');
  e.target.reset();
  alert('✅ Pesan dikirim! Terima kasih.');
}

// === MENU HP ===
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.onclick = () => {
    navMenu.classList.toggle('aktif');
  };
}

// === JALANKAN SAAT HALAMAN DIBUKA ===
window.onload = () => {
  tampilkanJumlah();
  
  if (document.getElementById('cart-items')) {
    tampilkanKeranjang();
  }
  
  if (document.getElementById('prod-name')) {
    tampilkanDetailProduk();
  }
};

