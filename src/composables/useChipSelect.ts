import { ref, type Ref } from 'vue'

// 胶囊按钮多选逻辑
export function useChipSelect(selectedRef: Ref<string[]>) {
  const customInput = ref('')

  function toggle(option: string) {
    const arr = selectedRef.value
    const idx = arr.indexOf(option)
    if (idx >= 0) {
      arr.splice(idx, 1)
    } else {
      arr.push(option)
    }
  }

  function isSelected(option: string): boolean {
    return selectedRef.value.includes(option)
  }

  function addCustom() {
    const word = customInput.value.trim()
    if (word && !selectedRef.value.includes(word)) {
      selectedRef.value.push(word)
    }
    customInput.value = ''
  }

  function removeCustom(word: string) {
    const arr = selectedRef.value
    const idx = arr.indexOf(word)
    if (idx >= 0) arr.splice(idx, 1)
  }

  return { customInput, toggle, isSelected, addCustom, removeCustom }
}
