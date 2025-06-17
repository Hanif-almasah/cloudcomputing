  import { db, collection, onSnapshot } from '../../firebase-config.js';

  let semuaProduk = [];
  let produkDipilih = null;

  function tampilkanProduk() {
    const selected = document.getElementById("kategori").value;
    const produkList = document.getElementById("produkList");
    produkList.innerHTML = "";
    const filtered = selected === "Semua" ? semuaProduk : semuaProduk.filter(p => p.category === selected);
    const displayProduk = filtered.slice(0, 9);
    if (displayProduk.length === 0) {
      produkList.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>Tidak ada produk.</p>";
      return;
    }
    displayProduk.forEach((data) => {
      const card = document.createElement("div");
      card.className = "card";
      const encodedData = encodeURIComponent(JSON.stringify(data));
      card.innerHTML = `
        <img src="${data.image}" alt="${data.name}" />
        <div class="card-body">
          <h5>${data.name}</h5>
          <p><strong>Kategori:</strong> ${data.category}</p>
          <p>${data.description.substring(0, 60)}...</p>
          <p class="harga">Rp${parseInt(data.price).toLocaleString()}</p>
          <button onclick='openForm("${encodedData}")'>Beli</button>
        </div>`;
      produkList.appendChild(card);
    });
  }

  window.openForm = function (data) {
    produkDipilih = JSON.parse(decodeURIComponent(data));
    document.getElementById("formModal").style.display = "flex";
  }

  window.closeForm = function () {
    document.getElementById("formModal").style.display = "none";
  }

  window.submitToWA = function () {
    const nama = document.getElementById("buyerName").value.trim();
    const hp = document.getElementById("buyerPhone").value.trim();
    const alamat = document.getElementById("buyerAddress").value.trim();
    if (!nama || !hp || !alamat) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Harap lengkapi semua data sebelum melanjutkan.'
      });
      return;
    }
    const pesan = `Halo! Saya ingin membeli:%0A%0A` +
      `*${produkDipilih.name}*%0A` +
      `Kategori: ${produkDipilih.category}%0A` +
      `Harga: Rp${parseInt(produkDipilih.price).toLocaleString()}%0A%0A` +
      `Nama: ${nama}%0A` +
      `No. WA: ${hp}%0A` +
      `Alamat: ${alamat}`;
    const url = `https://wa.me/6282386341131?text=${pesan}`;
    window.open(url, "_blank");
    closeForm();
  }

  document.getElementById("kategori").addEventListener("change", tampilkanProduk);

  // Ambil data dari Firebase
  onSnapshot(collection(db, "products"), (snapshot) => {
    semuaProduk = [];
    snapshot.forEach(doc => semuaProduk.push(doc.data()));
    tampilkanProduk();
  });