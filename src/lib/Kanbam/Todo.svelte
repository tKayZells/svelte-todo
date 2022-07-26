<svelte:options immutable />

<script lang="ts">
import { fly } from "svelte/transition";
export let task: string = "";
export let dragged : boolean = false;
export let hasElementOver : boolean = false;
</script>

<div
  draggable="true"
  on:drag
  on:drop
  on:dragend
  on:dragover|preventDefault
  on:dragenter
  on:dragleave
  in:fly="{{ y: 25, duration: 250 }}"
  out:fly="{{ y: -25, duration: 250 }}"
  class="m-2 p-2 border border-gray-300 rounded flex items-center justify-between bg-white"
  class:bg-red-50={dragged}
  class:bg-blue-50={hasElementOver}
>
  <p>{task}</p>
  <button on:click><i class="fa-solid fa-xmark"></i></button>
</div>
