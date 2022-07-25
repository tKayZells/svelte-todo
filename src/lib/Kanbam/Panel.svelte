<script lang="ts">
import type { Task, ToDo } from "../../store/todoStore"
import { fade } from "svelte/transition";
import Todo from "./Todo.svelte";
import { todo, tasks } from "../../store/todoStore";
import { onDestroy } from "svelte";
import Input from "../../components/Input/Input.svelte";

export let title: string = "Pending";
export let id: string = ""

const { add, remove } = tasks.forList(id)

let items : Task[] = []
let newTask: string = "";

const todoUnsubscribe = todo.subscribe( (todo : ToDo[]) => {
  items = todo.find( el => el.id === id).items
})

onDestroy( () => {
  todoUnsubscribe()
})

const ENTER_KEY = "Enter";
function handlerOnKeyDown(event: KeyboardEvent) {
  if (event.key === ENTER_KEY && newTask.length > 0) {
    add(newTask)
    newTask = "";
  }
}

</script>

<div class="flex flex-col p-5 border border-dashed rounded-md border-gray-800">
  <h1 class="text-xl text-center mb-2 font-bold">{title}</h1>
  {#each items as task (task.id)}
    <Todo bind:task="{task.text}" on:click="{() => remove(task.id)}" />
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
    <Input
      label="Add new Task"
      name="newTask"
      bind:value={newTask}
      handlerOnKeyDown={handlerOnKeyDown}
    />
  </div>
</div>
