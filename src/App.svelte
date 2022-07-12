<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import Todo from "./lib/Todo.svelte";

  let tasks : { text: string, id: string }[] = []
  let newTask : string = ""

  function handlerOnDelete( id: string){
    tasks = tasks.filter( el => el.id !== id)
  }

  const ENTER_KEY = 'Enter'
  function handlerOnKeyDown( event : KeyboardEvent ){
    if(event.key === ENTER_KEY){
      tasks = [...tasks, {
        text: newTask,
        id: window.crypto.randomUUID()
      }]
      newTask = ""
    }
  }

</script>

<main class="flex flex-col items-center h-screen m-auto md:max-w-1280 sm:max-w-720 bg-gray-200">
  <h1 class="text-4xl mb-2 mt-4">TODOs</h1>
  <div class="mb-4 w-1/3 border border-b-gray-400 h-0.5" ></div>
  <div class="flex flex-col w-1/3">
    {#if tasks.length > 0 }
      <h1 class="text-xl text-center">Uncategorized</h1>
    {/if}
    {#each tasks as task (task.id)}
      <Todo bind:task={task.text} on:click={() => handlerOnDelete(task.id)} />
    {:else}
      <p in:fade out:fade={{ duration: 250 }} class="m-auto italic text-s">No tasks left</p>
    {/each}
    <div class="my-4 border border-b-gray-400 h-0.5"></div>
    <div class="flex flex-col my-6">
      <label class="mx-2 text-gray-500 text-xs" for="newTask" >Add new Task</label>
      <input id="newTask" name="newTask" on:keydown={handlerOnKeyDown} bind:value={newTask} class="m-2 p-2 border border-gray-300 border-b-black border-b-2" type="text"/>
    </div>
  </div>
</main>
