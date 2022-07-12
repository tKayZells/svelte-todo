<svelte:options immutable />

<script lang="ts">
	import { fly } from "svelte/transition"
    export let task : string = ""
</script>

<div
    in:fly={{ y: 25, duration: 250 }} out:fly={{ y: -25, duration: 250 }}
    class="m-2 p-2 border border-gray-300 rounded flex items-center justify-between bg-white"
>
    <p>{ task }</p>
    <button on:click><i class="fa-solid fa-xmark"></i></button>
</div>
