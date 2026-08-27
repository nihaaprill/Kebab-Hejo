<script setup>
import { ref, onMounted } from 'vue'
import { Save, Plus } from 'lucide-vue-next'

const locations = ref([])

onMounted(() => {
  const saved = localStorage.getItem('outlet_locations')
  if (saved) {
    try {
      locations.value = JSON.parse(saved)
    } catch (e) {
      loadDefaultLocations()
    }
  } else {
    loadDefaultLocations()
  }
})

function loadDefaultLocations() {
  locations.value = [
    { nama: 'Alfamidi Cikarang Pusat', link: 'https://maps.google.com/?q=Alfamidi+Cikarang+Pusat' },
    { nama: 'Medirosa', link: 'https://maps.google.com/?q=Medirosa' },
    { nama: 'Grand Kebab Hejo Bekasi', link: 'https://maps.google.com/?q=Kebab+Hejo+Bekasi' }
  ]
}

const newLocationName = ref('')
const newLocationLink = ref('')

function addLocation() {
  const name = newLocationName.value.trim()
  const link = newLocationLink.value.trim()
  if (!name) {
    alert('Nama lokasi tidak boleh kosong!')
    return
  }
  if (!link) {
    alert('Link lokasi tidak boleh kosong!')
    return
  }
  locations.value.push({ nama: name, link: link })
  newLocationName.value = ''
  newLocationLink.value = ''
}

function removeLocation(index) {
  if (confirm(`Apakah Anda yakin ingin menghapus lokasi "${locations.value[index].nama}"?`)) {
    locations.value.splice(index, 1)
  }
}

function saveChanges() {
  localStorage.setItem('outlet_locations', JSON.stringify(locations.value))
  alert('Perubahan lokasi outlet berhasil disimpan!')
}
</script>

<template>
  <div class="lokasi-view">
    <div class="header-container">
      <h2 class="manajemen-title">Manajemen Lokasi Outlet</h2>
      <button type="button" class="btn-save" @click="saveChanges">
        <Save :size="18" />
        <span>Simpan Perubahan</span>
      </button>
    </div>

    <div class="form-grid">
      <div class="kolom-kiri">
        <h3 class="section-title">Manajemen Lokasi</h3>
        
        <div class="edit-lokasi">
          <div class="input-row">
            <div class="input-field">
              <label class="input-label">Nama Lokasi</label>
              <input
                v-model="newLocationName"
                type="text"
                class="text-input"
                placeholder="Contoh: Alfamidi Cikarang Pusat"
              />
            </div>
            <div class="input-field">
              <label class="input-label">Link Lokasi (Google Maps)</label>
              <input
                v-model="newLocationLink"
                type="text"
                class="text-input"
                placeholder="Contoh: https://maps.google.com/..."
              />
            </div>
            <button type="button" class="btn-add" @click="addLocation">
              <Plus :size="18" />
              <span>Tambah Lokasi</span>
            </button>
          </div>

          <!-- Table -->
          <div class="grup-tabel">
            <div class="header-tabel">
              <div class="col-urutan">Urutan</div>
              <div class="col-lokasi">Lokasi</div>
              <div class="col-link">Link Lokasi</div>
              <div class="col-aksi">Aksi</div>
            </div>
            
            <div 
              v-for="(loc, index) in locations" 
              :key="index" 
              :class="index === locations.length - 1 ? 'tabel-row-last' : 'tabel-row'"
            >
              <div class="col-urutan">{{ index + 1 }}</div>
              <div class="col-lokasi">{{ loc.nama }}</div>
              <div class="col-link">
                <a :href="loc.link" target="_blank" class="link-anchor">{{ loc.link }}</a>
              </div>
              <div class="col-aksi">
                <button type="button" class="btn-hapus" @click="removeLocation(index)">
                  Hapus
                </button>
              </div>
            </div>
            
            <div v-if="locations.length === 0" class="tabel-row-last empty-row">
              Belum ada lokasi outlet yang terdaftar.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lokasi-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.manajemen-title {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin: 0;
}

.btn-save {
  border-radius: 8px;
  background-color: #ffd339;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 8px;
  color: #000;
  cursor: pointer;
  font-weight: 700;
  border: 2px solid #000;
  font-size: 16px;
  box-shadow: 0px 4px 0px #000;
  transition: all 0.1s;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 0px #000;
}

.btn-save:active {
  transform: translateY(2px);
  box-shadow: 0px 2px 0px #000;
}

.form-grid {
  align-self: stretch;
}

.kolom-kiri {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.edit-lokasi {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: transparent;
}

.input-row {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 250px;
}

.input-label {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.text-input {
  border-radius: 8px;
  border: 2px solid #000;
  padding: 12px 16px;
  font-size: 15px;
  color: #000;
  background: #fff;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}

.text-input:focus {
  border-color: #ffd339;
}

.btn-add {
  border-radius: 8px;
  background-color: #ffd339;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 8px;
  color: #000;
  cursor: pointer;
  font-weight: 700;
  border: 2px solid #000;
  font-size: 15px;
  height: 48px;
  box-shadow: 0px 4px 0px #000;
  transition: all 0.1s;
  box-sizing: border-box;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 0px #000;
}

.btn-add:active {
  transform: translateY(2px);
  box-shadow: 0px 2px 0px #000;
}

.grup-tabel {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: #000;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.15);
  border-radius: 8px;
  overflow: hidden;
}

.header-tabel {
  background-color: #ffd339;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 800;
  border-bottom: 2px solid #000;
}

.tabel-row {
  background-color: #f3edd9ff;
  border-right: 2px solid #000;
  border-bottom: 1px solid #e0e0e0;
  border-left: 2px solid #000;
  display: flex;
  align-items: center;
  padding: 14px 16px;
}

.tabel-row-last {
  background-color: #f3edd9ff;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  border-left: 2px solid #000;
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 0px 0px 8px 8px;
}

.empty-row {
  justify-content: center;
  color: #666;
  font-style: italic;
  padding: 24px;
}

.col-urutan {
  width: 80px;
  font-weight: 800;
  text-align: center;
}

.col-lokasi {
  flex: 2;
  font-weight: 700;
  padding-right: 16px;
}

.col-link {
  flex: 3;
  padding-right: 16px;
  word-break: break-all;
}

.link-anchor {
  color: #02a554;
  text-decoration: underline;
  font-weight: 600;
}

.link-anchor:hover {
  color: #65be3e;
}

.col-aksi {
  width: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.btn-hapus {
  background: #ff4d4d;
  border: 2px solid #000;
  border-radius: 6px;
  color: #fff;
  font-weight: 700;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 13px;
  box-shadow: 0px 2px 0px #000;
  transition: all 0.1s;
}

.btn-hapus:hover {
  transform: translateY(-1px);
  box-shadow: 0px 3px 0px #000;
}

.btn-hapus:active {
  transform: translateY(1px);
  box-shadow: 0px 1px 0px #000;
}
</style>
