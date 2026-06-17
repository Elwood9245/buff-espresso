<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { CuppingRecord } from './types'
import { defaultRecord } from './types'
import { useExport } from './composables/useExport'
import CoffeeInfo from './components/CoffeeInfo.vue'
import ExtractionParams from './components/ExtractionParams.vue'
import TasteAcid from './components/TasteAcid.vue'
import TasteSweet from './components/TasteSweet.vue'
import TasteBitter from './components/TasteBitter.vue'
import TasteBalance from './components/TasteBalance.vue'
import Mouthfeel from './components/Mouthfeel.vue'
import Flavor from './components/Flavor.vue'
import Adjustment from './components/Adjustment.vue'
import Result from './components/Result.vue'

const steps = [
  { id: 1, title: '信息与萃取' },
  { id: 2, title: '味觉' },
  { id: 3, title: '触感' },
  { id: 4, title: '风味' },
  { id: 5, title: '调整' },
  { id: 6, title: '结果' },
]

const currentStep = ref(1)

const record = reactive<CuppingRecord>(defaultRecord())

const { exportToExcel } = useExport()

function handleExport() {
  exportToExcel(record)
}

function reset() {
  Object.assign(record, defaultRecord())
  goToStep(1)
}

function goToStep(step: number) {
  currentStep.value = step
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function next() {
  if (currentStep.value < 6) goToStep(currentStep.value + 1)
}
function prev() {
  if (currentStep.value > 1) goToStep(currentStep.value - 1)
}
</script>

<template>
  <div class="min-h-screen bg-stone-100">
    <header class="sticky top-0 z-10 bg-stone-900 text-white shadow-lg">
      <div class="max-w-lg mx-auto px-4 py-2.5 flex items-center justify-between">
        <h1 class="text-base font-bold">萃取调整记录</h1>
        <button
          @click="reset"
          class="px-2.5 py-1 rounded-lg bg-stone-700 text-xs hover:bg-stone-600 transition-colors min-h-[40px]"
        >
          🔄 重新开始
        </button>
      </div>

      <div class="max-w-lg mx-auto px-4 pb-2.5">
        <div class="flex items-center gap-0.5">
          <template v-for="(step, idx) in steps" :key="step.id">
            <button
              @click="goToStep(step.id)"
              :class="[
                'flex-shrink-0 w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center',
                currentStep === step.id
                  ? 'bg-amber-500 text-white'
                  : currentStep > step.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-700 text-stone-400'
              ]"
            >
              {{ step.id }}
            </button>
            <span
              v-if="idx < steps.length - 1"
              :class="[
                'flex-1 h-0.5',
                currentStep > step.id ? 'bg-emerald-600' : 'bg-stone-700'
              ]"
            />
          </template>
        </div>
        <p class="text-center text-xs text-stone-400 mt-1">{{ steps[currentStep - 1].title }}</p>
      </div>
    </header>

    <main class="max-w-lg mx-auto px-4 py-4">
      <div class="bg-white rounded-2xl shadow-sm p-5 space-y-6">
        <section v-show="currentStep === 1" class="space-y-6">
          <CoffeeInfo v-model="record.coffeeInfo" />
          <hr class="border-stone-200" />
          <ExtractionParams v-model="record.extraction" />
        </section>

        <section v-show="currentStep === 2" class="space-y-8">
          <TasteAcid v-model="record.acid" />
          <hr class="border-stone-200" />
          <TasteSweet v-model="record.sweet" />
          <hr class="border-stone-200" />
          <TasteBitter v-model="record.bitter" />
          <hr class="border-stone-200" />
          <TasteBalance v-model="record.balance" />
        </section>

        <section v-show="currentStep === 3">
          <Mouthfeel v-model="record.mouthfeel" />
        </section>

        <section v-show="currentStep === 4">
          <Flavor v-model="record.flavor" />
        </section>

        <section v-show="currentStep === 5">
          <Adjustment v-model="record.adjustment" />
        </section>

        <section v-show="currentStep === 6">
          <Result :record="record" @export="handleExport" />
        </section>
      </div>

      <div class="flex gap-3 mt-4 pb-6">
        <button
          v-if="currentStep > 1"
          @click="prev"
          class="flex-1 py-3 rounded-xl bg-stone-200 text-stone-700 font-medium hover:bg-stone-300 transition-colors min-h-[48px]"
        >
          ← 上一步
        </button>
        <button
          v-if="currentStep < 6"
          @click="next"
          class="flex-1 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors min-h-[48px]"
        >
          下一步 →
        </button>
      </div>
    </main>
  </div>
</template>
