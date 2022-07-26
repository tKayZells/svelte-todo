import {writable} from "svelte/store";

export type Task = { id: string, text: string }
export type ToDo = { id: string, header: string, items: Task[] }
export type UpdateFn = ( args : ToDo) => ToDo

function createTODO(){

	const { subscribe, set, update } = writable<ToDo[]>([])

	function defaultUpdate( props : Partial<ToDo> ) : (todo: ToDo) => ToDo {
		return (toDo : ToDo) => {
			return { ...toDo, ...props };
		};
	}

	return {
		subscribe,
		add: ( header: string) => update( todos => {
			todos.push({id: window.crypto.randomUUID(), header: header, items: []})
			return todos
		}),
		update: (props: Partial<ToDo>, fn : UpdateFn = defaultUpdate(props) ) => {
			update(todos => [...todos.map(panel => panel.id === props.id ? fn(panel) : panel)] )
		},
		remove : ( id: string) => update( todos => todos.filter( el => el.id !== id)),
		clear: () => set([])
	}
}

export const todo = createTODO()

export const tasks = {
	forList : ( toDoId : string) => {
		return {
			add: ( task : string) => todo.update({id: toDoId}, toDo => {
				toDo.items.push({ id: window.crypto.randomUUID(), text: task })
				return toDo
			}),
			remove: (taskId : string) => todo.update({id: toDoId}, toDo => {
				toDo.items = toDo.items.filter(el => el.id !== taskId)
				return toDo
			}),
			swap: ( originIdx: number, targetIdx : number) => todo.update({ id: toDoId }, toDo =>{
				const ele = toDo.items[targetIdx]
				toDo.items[targetIdx] = toDo.items[originIdx];
				toDo.items[originIdx] = ele
				return toDo;
			}),
			update: (task: Partial<Task>) => todo.update({id: toDoId}, toDo => {
				toDo.items = toDo.items.map(el => el.id === task.id ? {...el, ...task} : el)
				return toDo
			})
		}
	}
}
