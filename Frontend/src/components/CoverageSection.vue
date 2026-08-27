<script setup>
import { ref, computed } from 'vue'
import { MapPin } from 'lucide-vue-next'
import ScrollReveal from './ScrollReveal.vue'

const cityRows = [
  ['Cikarang', 'Bekasi', 'Bogor', 'Tangerang', 'Karawang'],
  ['Cikampek', 'Purwakarta', 'Subang', 'Bandung', 'Majalengka'],
]

const activeCity = ref('Cikarang')

const mapPins = [
  { left: '48%', top: '22%' },
  { left: '18%', top: '38%' },
  { left: '50%', top: '36%' },
  { left: '35%', top: '48%' },
  { left: '62%', top: '44%' },
  { left: '28%', top: '26%' },
  { left: '72%', top: '32%' },
  { left: '42%', top: '58%' },
  { left: '58%', top: '55%' },
]

const outletsByCity = {
  Cikarang: [
    { name: 'Alfamidi Cikarang Pusat', supporting: '' },
    { name: 'Medirosa', supporting: '' },
    { name: 'Label', supporting: '' },
    { name: 'Label', supporting: '' },
    { name: 'Label', supporting: '' },
    { name: 'Label', supporting: '' },
  ],
  Bekasi: [
    { name: 'Medirosa', supporting: '' },
    { name: 'Label', supporting: '' },
    { name: 'Label', supporting: '' },
  ],
  Bogor: [{ name: 'Label', supporting: '' }],
  Tangerang: [{ name: 'Kebab Hejo Outlet 1', supporting: '' }],
  Karawang: [{ name: 'Label', supporting: '' }],
  Cikampek: [{ name: 'Label', supporting: '' }],
  Purwakarta: [{ name: 'Label', supporting: '' }],
  Subang: [{ name: 'Label', supporting: '' }],
  Bandung: [{ name: 'Label', supporting: '' }],
  Majalengka: [{ name: 'Label', supporting: '' }],
}

const visibleOutlets = computed(
  () => outletsByCity[activeCity.value] ?? [{ name: 'Label', supporting: '' }],
)
</script>

<template>
  <section id="coverage" class="section-brand py-12 lg:py-16 border-t-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal animation="fade-up" :duration="600" class="text-center mb-8 lg:mb-10">
        <p class="section-brand-label">Jangkauan Kami</p>
        <h2 class="mt-2 section-brand-title">Tersebar di berbagai kota</h2>
      </ScrollReveal>

      <div class="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
        <!-- Map -->
        <ScrollReveal animation="fade-left" :duration="600" class="h-full">
          <div class="card-brand p-5 sm:p-6 h-full min-h-[480px] lg:min-h-[560px] flex">
            <div class="relative flex-1 rounded-3xl overflow-hidden bg-[#e8e0c8]">
              <iframe
                title="Peta jangkauan Grand Kebab Hejo"
                class="absolute inset-0 w-full h-[calc(100%+28px)] -top-0 border-0 pointer-events-none scale-[1.02]"
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.42%2C-6.95%2C107.55%2C-5.85&layer=mapnik"
                loading="lazy"
              />
              <div
                v-for="(pin, i) in mapPins"
                :key="i"
                class="absolute -translate-x-1/2 -translate-y-full z-10 pointer-events-none"
                :style="{ left: pin.left, top: pin.top }"
              >
                <MapPin class="w-[18px] h-7 text-[#65be3e] fill-[#65be3e] stroke-[#1e1e1e]" stroke-width="1" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <!-- Cari area + pills + outlet list -->
        <ScrollReveal animation="fade-right" :duration="600" class="h-full flex flex-col min-h-[480px] lg:min-h-[560px]">
          <h3 class="text-[28px] sm:text-[32px] font-bold text-white text-center mb-5 leading-tight">
            Cari Area Mu
          </h3>

          <div class="space-y-2.5 mb-6">
            <div
              v-for="(row, rowIndex) in cityRows"
              :key="rowIndex"
              class="grid grid-cols-3 sm:grid-cols-5 gap-2"
            >
              <button
                v-for="city in row"
                :key="city"
                type="button"
                class="cursor-pointer px-3 py-2.5 text-center whitespace-nowrap text-xs sm:text-sm font-bold border-2 border-black rounded-xl transition-all duration-150 active:translate-y-0"
                :class="activeCity === city 
                  ? 'bg-[#ffd339] text-[#1e1e1e] shadow-[0_4px_0_rgba(0,0,0,1)] -translate-y-0.5' 
                  : 'bg-white text-[#1e1e1e] hover:bg-[#fffbeb] shadow-[0_2px_0_rgba(0,0,0,1)] hover:shadow-[0_4px_0_rgba(0,0,0,1)] hover:-translate-y-0.5'"
                @click="activeCity = city"
              >
                {{ city }}
              </button>
            </div>
          </div>

          <div class="flex-1 rounded-2xl bg-white border-3 border-black overflow-hidden flex flex-col shadow-[0_8px_0_rgba(0,0,0,1)]">
            <!-- Table Header -->
            <div class="bg-[#ffd339] border-b-3 border-black px-5 py-4 flex items-center justify-between">
              <span class="font-bold text-lg text-[#1e1e1e]">Daftar Outlet: {{ activeCity }}</span>
              <span class="text-xs bg-white border border-black font-bold px-2.5 py-1 rounded-full text-[#1e1e1e]">
                {{ visibleOutlets.length }} Lokasi
              </span>
            </div>
            
            <!-- Table Rows -->
            <div class="flex-1 overflow-y-auto max-h-[350px] divide-y-2 divide-black bg-[#fbfbfb]">
              <div
                v-for="(outlet, index) in visibleOutlets"
                :key="index"
                class="px-5 py-4 flex items-center justify-between hover:bg-[#fffbeb] transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-[#65be3e]/20 border border-black flex items-center justify-center shrink-0">
                    <MapPin class="w-4.5 h-4.5 text-[#02a554]" />
                  </div>
                  <div>
                    <p class="text-[#1e1e1e] font-bold text-base leading-tight">
                      {{ outlet.name }}
                    </p>
                    <p class="text-xs text-[#49454f] mt-0.5 font-medium">
                      {{ outlet.supporting || 'Grand Kebab Hejo Outlet' }}
                    </p>
                  </div>
                </div>
                
                <a
                  :href="'https://maps.google.com/?q=' + encodeURIComponent(outlet.name + ' ' + activeCity)"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#65be3e] hover:bg-[#5aad38] text-white text-xs font-bold border-2 border-black rounded-lg shadow-[0_2px_0_rgba(0,0,0,1)] transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Peta</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              
              <div v-if="visibleOutlets.length === 0" class="p-8 text-center text-gray-500 italic font-medium">
                Tidak ada outlet di kota ini.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
