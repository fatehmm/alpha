import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { trpc, trpcClient } from "../../../lib/trpc";

export const Route = createFileRoute("/_main/projects")({
  component: RouteComponent,
  loader: async () => {
    console.log(
      "Running on:",
      typeof window === "undefined" ? "server" : "client"
    );
    const todos = await trpcClient.todo.getAll.query();
    return { todos };
  },
});

function RouteComponent() {
  const { todos } = Route.useLoaderData();
  const [newTodoText, setNewTodoText] = useState("");

  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const toggleTodo = trpc.todo.toggle.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      createTodo.mutate({ text: newTodoText.trim() });
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleTodo.mutate({ id, completed: !completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo.mutate({ id });
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Todo Management</h1>

      {/* Create Todo Form */}
      <form onSubmit={handleCreateTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Enter a new todo..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={createTodo.isPending}
          />
          <button
            type="submit"
            disabled={createTodo.isPending || !newTodoText.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createTodo.isPending ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div className="space-y-3">
        {todos?.map(
          (todo: { id: number; text: string; completed: boolean }) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                disabled={toggleTodo.isPending}
                className="h-4 w-4"
              />
              <span
                className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : ""}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                disabled={deleteTodo.isPending}
                className="rounded px-3 py-1 text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          )
        )}
        {todos?.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            No todos found. Create one above!
          </p>
        )}
      </div>
    </div>
  );
}
