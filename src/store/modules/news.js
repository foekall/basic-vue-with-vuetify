const getters = {
  latestHeadlines: (state) => state.latestHeadline,
  headlinesSources: (state) => state.headlinesSource,
  headlineAutocompletes: (state) => state.headlineAutocomplete,
  isLoading: (state) => state.loading,
  objNews: (state) => state.news,
  objVisitedHeadlines: (state) => state.visitedHeadline,
};

const actions = {
  // fetching headline news from backend
  getLatestHeadlines({ commit }) {
    commit('setLoadingStatus', true);
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=159a9223ab1447fe8342a2e8f4bf75eb')
      .then((response) => response.json())
      .then((data) => {
        commit('setLoadingStatus', false);
        commit('setLatestHeadline', data.articles);
      })
      .catch((err) => {
        commit('setLoadingStatus', false);
        console.error(err);
      });
  },

  // fetching headline source from backend to show in filter menu
  getHeadlinesSources({ commit }) {
    commit('setLoadingStatus', true);
    fetch('https://newsapi.org/v2/sources?apiKey=159a9223ab1447fe8342a2e8f4bf75eb')
      .then((response) => response.json())
      .then((data) => {
        commit('setLoadingStatus', false);
        commit('setHeadlinesSource', data);
      })
      .catch((err) => {
        commit('setLoadingStatus', false);
        console.error(err);
      });
  },

  // fetching headline to show at search box
  getHeadlinesAutocomplete({ commit }, e) {
    const keywords = e.target.value;
    if (keywords.length > 2) {
      commit('setLoadingStatus', true);
      fetch(`https://newsapi.org/v2/top-headlines?q=${keywords}&apiKey=159a9223ab1447fe8342a2e8f4bf75eb`)
        .then((response) => response.json())
        .then((data) => {
          commit('setLoadingStatus', false);
          commit('setHeadlinesAutocomplete', data.articles);
        })
        .catch((err) => {
          commit('setLoadingStatus', false);
          console.error(err);
        });
    }
  },

  filterLatestHeadlines({ commit }, headline) {
    commit('setFilterLatestHeadlines', headline);
  },

  setDetailNews({ commit }, news) {
    commit('setDetailState', news);
  },

};

const mutations = {
  setLatestHeadline(state, latestHeadline) {
    state.originLatesHeadline = latestHeadline;
    state.latestHeadline = latestHeadline;
  },
  setHeadlinesSource(state, headlinesSource) {
    state.headlinesSource = headlinesSource;
  },
  setFilterLatestHeadlines(state, headline) {
    console.log(headline);
    if (headline === undefined || headline.length === 0) {
      state.latestHeadline = state.originLatesHeadline;
    } else {
      const result = state.originLatesHeadline.filter((e) => headline.indexOf(e.source.name) !== -1);
      state.latestHeadline = result;
    }
  },
  setHeadlinesAutocomplete(state, headlineAutocomplete) {
    state.originLatesHeadline = headlineAutocomplete;
    state.latestHeadline = headlineAutocomplete;
    // const arrHeadline = [];
    // headlineAutocomplete.articles.forEach((element) => {
    //   arrHeadline.push(element.title);
    // });
    // state.headlineAutocomplete = arrHeadline;
  },
  setLoadingStatus(state, status) {
    state.loading = status;
  },
  setDetailState(state, news) {
    state.news = news;
    const isDuplicate = state.visitedHeadline.filter((h) => h.title === news.title);
    if (isDuplicate.length === 0) {
      state.visitedHeadline.push(news);
    }
  },
//   updateTodo: (state, updTodo) => {
//     const index = state.todos.findIndex(todo => todo.id === updTodo.id);
//     if (index !== -1) {
//       state.todos.splice(index, 1, updTodo);
//     }
//   }
};

const state = {
  latestHeadline: [],
  originLatesHeadline: [],
  headlinesSource: [],
  filterLatestHeadline: [],
  headlineAutocomplete: [],
  loading: false,
  news: {},
  visitedHeadline: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};
