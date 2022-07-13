<script lang="ts">

import Board from "./lib/Kanbam/Board.svelte";
</script>

<main class="flex flex-col items-center h-screen m-auto md:max-w-1280 sm:max-w-720">
  <h1 class="text-4xl mb-2 mt-4">TODOs</h1>
  <div class="mb-4 w-1/3 border border-b-gray-400 h-0.5" ></div>
  <Board />
</main>
