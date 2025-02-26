<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { elements_with_help_text } from './help';

const current_texts = ref([]);
const current_page_num = ref(0);

let current_element_style: string = "";

async function focus_elem(elem: HTMLElement) {
  // let styles = window.getComputedStyle(elem);
  current_element_style = elem.style.cssText;
  // current_element_border = styles.getPropertyValue('border');
  elem.style.border = "10px var(--palette-help)";
  // current_element_borderRadius = styles.getPropertyValue('border-radius');
  elem.style.borderRadius = "5px";
  // current_element_borderStyle = styles.getPropertyPriority('border-style');
  elem.style.borderStyle = "solid";
}

async function clear_elem(elem: HTMLElement) {
  elem.style = current_element_style;
}

async function update_cursor(old_elem: HTMLElement, new_elem: HTMLElement) {
  await clear_elem(old_elem);
  await focus_elem(new_elem);
}

async function next() {
  let old_elem = elements_with_help_text.value.values()[current_page_num.value][1];
  current_page_num.value = (current_page_num.value + 1) % elements_with_help_text.value.size;
  let new_elem = elements_with_help_text.value.values()[current_page_num.value][1];
  update_cursor(old_elem, new_elem);
}

async function previous() {
  let old_elem = elements_with_help_text.value.values()[current_page_num.value][1];
  if (current_page_num.value == 0) {
    current_page_num.value = elements_with_help_text.value.size;
  } else {
    current_page_num.value = (current_page_num.value - 1) % elements_with_help_text.value.size;
  }
  let new_elem = elements_with_help_text.value.values()[current_page_num.value][1];
  update_cursor(old_elem, new_elem);
}
</script>

<template>
  <div>
    <span v-for="target in elements_with_help_text.entries()">
      {{ target }}
    </span>
    <span>
      {{ elements_with_help_text.size }}
    </span>
  </div>
</template>
