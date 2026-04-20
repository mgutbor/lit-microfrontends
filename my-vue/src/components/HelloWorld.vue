<script setup lang="ts">
import { counterStore, incrementCounter, resetCounter } from "../store/counterStore";

// Usar el contador del store compartido en lugar de un ref local
// Esto permite que el estado persista entre cambios de ruta
const count = counterStore;
</script>

<template>
  <h1>Hello World</h1>

  <div class="card">
    <button type="button" @click="incrementCounter(1)">count is {{ count }}</button>
    <button type="button" @click="resetCounter()" style="margin-left: 10px;">Reset</button>
    <p>
      <strong>💡 Tip:</strong> Pulsa el botón "Home" en la navegación principal 
      para incrementar este contador en +7 desde otro MFE!
    </p>
    <p style="font-size: 0.9em; color: #666;">
      El contador persiste gracias a un store compartido. 
      Navega a otra ruta y vuelve para verificar.
    </p>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
