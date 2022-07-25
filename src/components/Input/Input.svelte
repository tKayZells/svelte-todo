<script lang="ts">
    export let handlerOnKeyDown = () => null
    export let label: string = ""
    export let name : string = ""
    export let value;

    $: id = name + '_id'
</script>

<label class="mx-2 text-gray-500 text-xs" for="{id}">{ label }</label>
<input
    id="{id}"
    name="{name}"
    on:keydown="{handlerOnKeyDown}"
    bind:value="{value}"
    class="m-2 p-2 border border-gray-300 border-b-black border-b-2"
    type="text"
/>