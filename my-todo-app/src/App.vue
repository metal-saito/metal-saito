<template>
  <div id="app">
    <h1>ToDoリスト</h1>
    <div class="controls">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="新しいタスクを追加">
      <button @click="addTodo">追加</button>
      <button @click="filter = 'all'">全て</button>
      <button @click="filter = 'active'">未完了</button>
      <button @click="filter = 'completed'">完了</button>
    </div>

    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <input type="checkbox" @change="toggleComplete(todo.id)" :checked="todo.completed">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all'
    };
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(t => !t.completed);
        case 'completed':
          return this.todos.filter(t => t.completed);
        default:
          return this.todos;
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ id: Date.now(), text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    toggleComplete(id) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },
  watch: {
    todos: {
      handler(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
      },
      deep: true
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #e6f2ff; /* 薄い青色の背景 */
}

h1 {
  font-size: 2em;
  color: #0056b3; /* 濃い青色 */
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.controls input[type="text"] {
  padding: 10px 15px;
  border: 2px solid #0056b3;
  border-radius: 4px;
  width: 300px;
  font-size: 16px;
  box-sizing: border-box;
  height: 48px;
  margin-right: 10px;
}

.controls button {
  background-color: #007bff; /* 明るい青色 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  height: 48px;
  line-height: 1.5;
  margin-right: 5px;
}

.controls button:hover {
  background-color: #0056b3; /* ホバー時の濃い青色 */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.completed {
  text-decoration: line-through;
  color: #aaa;
}
</style>
