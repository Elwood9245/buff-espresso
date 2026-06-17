<script setup lang="ts">
import type { MouthfeelData } from '../types'
import { WEIGHT_OPTIONS, TEXTURE_OPTIONS, SCORE_LABELS } from '../types'
import { ref } from 'vue'

const model = defineModel<MouthfeelData>({ required: true })

const customInput = ref('')

function selectWeight(opt: string) {
  model.value.weight = model.value.weight === opt ? '' : opt
}

function toggleTexture(opt: string) {
  const idx = model.value.textureSelected.indexOf(opt)
  if (idx >= 0) model.value.textureSelected.splice(idx, 1)
  else model.value.textureSelected.push(opt)
}

function addCustom() {
  const word = customInput.value.trim()
  if (word && !model.value.textureCustom.includes(word)) {
    model.value.textureCustom.push(word)
  }
  customInput.value = ''
}

function removeCustom(word: string) {
  const idx = model.value.textureCustom.indexOf(word)
  if (idx >= 0) model.value.textureCustom.splice(idx, 1)
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">口腔触感</h3>

    <div>
      <p class="text-sm text-stone-500 mb-2">重量感（单选）</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in WEIGHT_OPTIONS"
          :key="opt"
          @click="selectWeight(opt)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
            model.weight === opt
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          ]"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div>
      <p class="text-sm text-stone-500 mb-2">质地（可多选）</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in TEXTURE_OPTIONS"
          :key="opt"
          @click="toggleTexture(opt)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
            model.textureSelected.includes(opt)
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          ]"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div>
      <p class="text-sm text-stone-500 mb-2">自定义质地词</p>
      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="word in model.textureCustom"
          :key="word"
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm"
        >
          {{ word }}
          <button @click="removeCustom(word)" class="text-orange-400 hover:text-orange-600">&times;</button>
        </span>
      </div>
      <div class="flex gap-2">
        <input
          v-model="customInput"
          type="text"
          placeholder="+ 添加自定义词"
          class="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          @keyup.enter="addCustom"
        />
        <button
          @click="addCustom"
          class="px-4 py-2.5 rounded-xl bg-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-300 min-h-[44px]"
        >
          添加
        </button>
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-1">
        <p class="text-sm text-stone-500">触感品质评分</p>
        <span class="text-2xl font-bold text-amber-600">{{ model.score }}</span>
      </div>
      <p class="text-xs text-amber-600 mb-2">{{ SCORE_LABELS[model.score] ?? model.score }}</p>
      <input
        v-model.number="model.score"
        type="range"
        min="0"
        max="4"
        step="1"
        class="w-full"
      />
      <div class="flex justify-between text-xs text-stone-400 mt-1">
        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
      </div>
    </div>
  </div>
</template>
