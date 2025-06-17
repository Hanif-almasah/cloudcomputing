  import {
    db, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot
  } from '../../firebase-config.js';

  const produkList = document.getElementById('produkList');

  document.getElementById('gambarProduk').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById('previewImg');
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  onSnapshot(collection(db, "products"), (snapshot) => {
    produkList.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-id', docSnap.id);
      card.innerHTML = `
        <img src="${data.image}" alt="Gambar ${data.name}" />
        <div class="card-body">
          <h5>${data.name}</h5>
          <p><strong>Kategori:</strong> ${data.category}</p>
          <p><strong>Deskripsi:</strong> ${data.description}</p>
          <p><strong>Harga:</strong> Rp${parseInt(data.price).toLocaleString()}</p>
          <div class="action-buttons">
            <button class="edit-btn" onclick="editProduk(this)" data-id="${docSnap.id}">Edit</button>
            <button class="delete-btn" onclick="hapusProduk(this)" data-id="${docSnap.id}">Hapus</button>
          </div>
        </div>
      `;
      produkList.appendChild(card);
    });
  });

  window.tambahProduk = async function () {
    const nama = document.getElementById('namaProduk').value.trim();
    const kategori = document.getElementById('kategoriProduk').value.trim();
    const deskripsi = document.getElementById('deskripsiProduk').value.trim();
    const harga = document.getElementById('hargaProduk').value.trim();
    const gambarInput = document.getElementById('gambarProduk');
    const file = gambarInput.files[0];

    if (!nama || !kategori || !deskripsi || !harga || !file) {
      return Swal.fire({
        icon: 'warning',
        title: 'Form belum lengkap',
        text: 'Harap lengkapi semua kolom dan unggah gambar.'
      });
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
      const imageBase64 = e.target.result;

      try {
        await addDoc(collection(db, "products"), {
          name: nama,
          category: kategori,
          description: deskripsi,
          price: harga,
          image: imageBase64
        });

        document.getElementById('namaProduk').value = '';
        document.getElementById('kategoriProduk').value = '';
        document.getElementById('deskripsiProduk').value = '';
        document.getElementById('hargaProduk').value = '';
        document.getElementById('gambarProduk').value = '';
        document.getElementById('previewImg').style.display = 'none';

        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Produk berhasil ditambahkan.'
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menyimpan',
          text: err.message
        });
      }
    };
    reader.readAsDataURL(file);
  };

  window.hapusProduk = async function (btn) {
    const docId = btn.getAttribute('data-id');

    const konfirmasi = await Swal.fire({
      title: 'Hapus Produk?',
      text: "Data tidak dapat dikembalikan setelah dihapus.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal'
    });

    if (!konfirmasi.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "products", docId));
      Swal.fire({
        icon: 'success',
        title: 'Terhapus',
        text: 'Produk berhasil dihapus.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menghapus',
        text: err.message
      });
    }
  };

  window.editProduk = async function (btn) {
    const docId = btn.getAttribute('data-id');
    const card = btn.closest('.card');
    const name = card.querySelector('h5').innerText;
    const category = card.querySelector('p:nth-of-type(1)').innerText.replace('Kategori: ', '');
    const description = card.querySelector('p:nth-of-type(2)').innerText.replace('Deskripsi: ', '');
    const priceText = card.querySelector('p:nth-of-type(3)').innerText.replace('Harga: Rp', '').replace(/\./g, '');

    const { value: formValues } = await Swal.fire({
      title: 'Edit Produk',
      html:
        `<input id="swal-nama" class="swal2-input" placeholder="Nama Produk" value="${name}">
         <input id="swal-kategori" class="swal2-input" placeholder="Kategori" value="${category}">
         <textarea id="swal-deskripsi" class="swal2-textarea" placeholder="Deskripsi">${description}</textarea>
         <input id="swal-harga" type="number" class="swal2-input" placeholder="Harga" value="${priceText}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('swal-nama').value,
          category: document.getElementById('swal-kategori').value,
          description: document.getElementById('swal-deskripsi').value,
          price: document.getElementById('swal-harga').value
        };
      },
      showCancelButton: true,
      confirmButtonText: 'Simpan'
    });

    if (!formValues) return;

    try {
      const docRef = doc(db, "products", docId);
      await updateDoc(docRef, {
        name: formValues.name,
        category: formValues.category,
        description: formValues.description,
        price: formValues.price
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Produk berhasil diperbarui.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengupdate',
        text: err.message
      });
    }
  };