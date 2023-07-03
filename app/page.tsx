import { getTodos } from '@/services/todoService'
import TodoItem from './components/TodoItem'
import NewTodo from './components/NewTodo'

export default async function Home() {
  const { todos } = await getTodos()
  return (
    <section className='py-20'>
      <div className="mt-3">
        <h1>Todos</h1>
        <NewTodo/>
        <h2 className='text-xl font-semibold mt-10 border-b pb-2'>Previous todos:</h2>
        <ul className='list-group'>
          {todos?.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </section>
  )
}
