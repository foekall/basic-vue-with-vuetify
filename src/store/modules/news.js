const state = {
    latestHeadlines: []
  };

  const getters = {
    latestHeadlines: state => state.latestHeadlines
  };

  const actions = {
    // fetching headline news from backend
    getLatestHeadlines() {
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e')
          .then((response) => response.json())
          .then((data) => {
            commit('setLatestHeadlines', data);
          })
          .catch((err) => {
            console.error(err);
          });
      },

      // fetching headline source from backend to show in filter menu
      getLatestHeadlinesSource() {
        fetch('https://newsapi.org/v2/sources?apiKey=099148be22804e849a0c6fe022b7cf5e')
          .then((response) => response.json())
          .then((data) => {
            this.headlinesSources = data;
          })
          .catch((err) => {
            console.error(err);
          });
      },
    // async fetchTodos({ commit }) {
    //   const response = await axios.get(
    //     'https://jsonplaceholder.typicode.com/todos'
    //   );

    //   commit('setTodos', response.data);
    // },
    // async addTodo({ commit }, title) {
    //   const response = await axios.post(
    //     'https://jsonplaceholder.typicode.com/todos',
    //     { title, completed: false }
    //   );

    //   commit('newTodo', response.data);
    // },
    // async deleteTodo({ commit }, id) {
    //   await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    //   commit('removeTodo', id);
    // },
    // async filterTodos({ commit }, e) {
    //   // Get selected number
    //   const limit = parseInt(
    //     e.target.options[e.target.options.selectedIndex].innerText
    //   );

    //   const response = await axios.get(
    //     `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    //   );

    //   commit('setTodos', response.data);
    // },
    // async updateTodo({ commit }, updTodo) {
    //   const response = await axios.put(
    //     `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
    //     updTodo
    //   );

    //   console.log(response.data);

    //   commit('updateTodo', response.data);
    // }
  };

  const mutations = {
    // setTodos: (state, todos) => (state.todos = todos),
    // newTodo: (state, todo) => state.todos.unshift(todo),
    // removeTodo: (state, id) =>
    //   (state.todos = state.todos.filter(todo => todo.id !== id)),
    // updateTodo: (state, updTodo) => {
    //   const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    //   if (index !== -1) {
    //     state.todos.splice(index, 1, updTodo);
    //   }
    // }
  };

  export default {
    state,
    getters,
    actions,
    mutations
  };