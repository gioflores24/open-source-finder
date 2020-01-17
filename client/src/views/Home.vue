<template>
  <div>
    <main>
      <form @submit.prevent="findProjects" class="project-form">
        <label for="name">Topic</label>
        <input v-model="topic" class="u-full-width" type="text"/>
        <br>
        <label for="name">Language</label>
        <input v-model="language" class="u-full-width" type="text"/>
        <button class="button-primary" type="submit">Find</button>
      </form>
      <ul>
        <li v-for="project in projects" :key="project._id">
          <span>{{project.name}}</span>
          <span>({{project.html_url}})</span>
          <span>💫: {{project.stargazers_count}}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
const API_URL = 'http://localhost:5000/finder';

export default {
  name: 'home',
  data() {
    return {
      topic: '',
      keyword: '',
      language: '',
      projects: [],
    };
  },
  methods: {
    findProjects() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          topic: this.topic,
          language: this.language,
        }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((results) => {
          this.projects = results;
        });
    },
  },
};
</script>
