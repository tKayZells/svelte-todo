<script lang="ts">
import Panel from "./Panel.svelte";
import { todo } from "../../store/todoStore";

let newPanel: string = "";

const ENTER_KEY = "Enter";
function handlerOnKeyDown(event: KeyboardEvent) {
  if (event.key === ENTER_KEY && newPanel.length > 0) {
    todo.add(newPanel)
    newPanel = "";
  }
}

</script>

<div class="flex flex-row mt-4 items-start gap-5 w-full h-screen overflow-x-auto">
  {#each $todo as panel (panel.id)}
    <Panel id={panel.id} title="{panel.header}" />
  {/each}
  <div
    class="flex flex-col p-5 justify-center border border-dashed rounded-md border-gray-400">
    <label class="mx-2 text-gray-500 text-xs" for="newTask"
      >Add new Panel</label>
    <input
      id="newTask"
      name="newTask"
      on:keydown="{handlerOnKeyDown}"
      bind:value="{newPanel}"
      class="m-2 p-2 border border-gray-300 border-b-black border-b-2"
      type="text" />
  </div>
</div>
