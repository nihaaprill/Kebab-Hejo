<script setup>
import { ref } from 'vue'
import { Save, Plus, Trash2 } from 'lucide-vue-next'

const galleryItems = ref([
  { id: 1, note: '', file: null },
  { id: 2, note: '', file: null },
  { id: 3, note: '', file: null },
  { id: 4, note: '', file: null }
])

function handleFileChange(index, event) {
  const file = event.target.files?.[0]
  if (file) galleryItems.value[index].file = file.name
}

function addPhoto() {
  galleryItems.value.push({
    id: galleryItems.value.length + 1,
    note: '',
    file: null
  })
}

function removeItem(index) {
  galleryItems.value.splice(index, 1)
}

function saveChanges() {
  alert('Perubahan galeri disimpan (hubungkan ke API backend).')
}
</script>

<template>
  <div>
    <h2 class="page-title">Manajemen Galeri</h2>

    <div class="btn-group">
      <button type="button" class="btn-primary" @click="saveChanges">
        <Save :size="18" />
        Simpan Perubahan
      </button>
      <button type="button" class="btn-primary" @click="addPhoto">
        <Plus :size="18" />
        Tambah Foto
      </button>
    </div>

    <div class="form-panel">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 80px">Urutan</th>
            <th style="width: 140px">Gambar</th>
            <th>Catatan</th>
            <th style="width: 60px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in galleryItems" :key="item.id">
            <td>{{ index + 1 }}</td>
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
              <span v-if="item.file" style="margin-left: 8px; font-size: 12px">
                {{ item.file }}
              </span>
            </td>
            <td>
              <input
                v-model="item.note"
                type="text"
                class="form-input"
                placeholder="Isi Teks"
                style="border-width: 1px"
              />
            </td>
            <td>
              <button
                type="button"
                style="background: none; border: none; color: #c00; cursor: pointer"
                title="Hapus"
                @click="removeItem(index)"
              >
                <Trash2 :size="20" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
</style>