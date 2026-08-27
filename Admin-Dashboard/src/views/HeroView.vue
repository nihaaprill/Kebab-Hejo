<script setup>
import { ref } from 'vue'
import { Save } from 'lucide-vue-next'

const franchiseLink = ref('')
const slides = ref([
  { id: 1, note: '', file: null },
  { id: 2, note: '', file: null },
  { id: 3, note: '', file: null },
  { id: 4, note: '', file: null }
])

function handleFileChange(index, event) {
  const file = event.target.files?.[0]
  if (file) slides.value[index].file = file.name
}

function saveChanges() {
  alert('Perubahan hero banner disimpan (hubungkan ke API backend).')
}
</script>

<template>
  <div>
    <h2 class="page-title">Manajemen Hero Banner</h2>

    <div class="btn-group">
      <button type="button" class="btn-primary" @click="saveChanges">
        <Save :size="18" />
        Simpan Perubahan
      </button>
    </div>

    <div class="form-panel">
      <div>
        <div class="form-label">Tombol Franchise</div>
        <input
          v-model="franchiseLink"
          type="url"
          class="form-input"
          placeholder="Isi Link WhatsApp / Franchise"
        />
      </div>

      <div>
        <div class="form-label">Manajemen Slide</div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 80px">Urutan</th>
              <th style="width: 140px">Gambar</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slide, index) in slides" :key="slide.id">
              <td>{{ slide.id }}</td>
              <td>
                <label class="file-btn">
                  Pilih File
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    @change="handleFileChange(index, $event)"
                  />
                </label>
                <span v-if="slide.file" style="margin-left: 8px; font-size: 12px">
                  {{ slide.file }}
                </span>
              </td>
              <td>
                <input
                  v-model="slide.note"
                  type="text"
                  class="form-input"
                  placeholder="Isi Teks"
                  style="border-width: 1px"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
.data-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  background-color: #f3edd9;
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.data-table thead th {
  background-color: #ffd339;
  color: #000;
  font-size: 16px;
  font-weight: 800;
  padding: 14px 16px;
  text-align: left;
  border-bottom: 2px solid #000;
}

.data-table tbody td {
  background-color: #f3edd9;
  color: #000;
  padding: 14px 16px;
  border-bottom: 1px solid #d6d6d6;
  vertical-align: middle;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.file-btn {
  display: inline-block;
  background-color: #ffd339;
  color: #000;
  border: 2px solid #000;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0px 2px 0px #000;
  transition: all 0.1s;
}

.file-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0px 3px 0px #000;
}

.file-btn:active {
  transform: translateY(1px);
  box-shadow: 0px 1px 0px #000;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #000;
}
</style>