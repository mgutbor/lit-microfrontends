import { ref } from "vue";

export const counterStore = ref(0);

export function incrementCounter(value: number = 1) {
  counterStore.value += value;
}

export function resetCounter() {
  counterStore.value = 0;
}
