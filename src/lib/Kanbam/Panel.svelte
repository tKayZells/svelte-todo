<svelte:options immutable />

<script lang="ts">
import { fade } from "svelte/transition";
import Todo from "./Todo.svelte";

export let title: string = "Pending";

let tasks: { text: string; id: string }[] = [];
let newTask: string = "";

function handlerOnDelete(id: string) {
  tasks = tasks.filter((el) => el.id !== id);
}

const ENTER_KEY = "Enter";
function handlerOnKeyDown(event: KeyboardEvent) {
  if (event.key === ENTER_KEY && newTask.length > 0) {
    tasks = [
      ...tasks,
      {
        text: newTask,
        id: window.crypto.randomUUID(),
      },
    ];
    newTask = "";
  }
}
</script>

<div class="flex flex-col p-5 border border-dashed rounded-md border-gray-800">
  <h1 class="text-xl text-center mb-2 font-bold">{title}</h1>
  {#each tasks as task (task.id)}
    <Todo bind:task="{task.text}" on:click="{() => handlerOnDelete(task.id)}" />
  {:else}
    <p
      in:fade
      out:fade="{{ duration: 250 }}"
      class="mx-auto italic text-sm text-gray-500">
      No tasks left on this panel
    </p>
  {/each}
  <div class="my-4 border border-b-gray-400 h-0.5"></div>
  <div class="flex flex-col my-6">
    <label class="mx-2 text-gray-500 text-xs" for="newTask">Add new Task</label>
    <input
      id="newTask"
      name="newTask"
      on:keydown="{handlerOnKeyDown}"
      bind:value="{newTask}"
      class="m-2 p-2 border border-gray-300 border-b-black border-b-2"
      type="text" />
  </div>
</div>
