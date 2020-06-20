<template>
    <div class="container">
        <h1 id="title">Congratulations! You scored</h1>
        <h2>{{scoreCorrect}}/{{questions}}</h2>
        <button v-on:click="playAgain" class="play-again">Play Again?</button>
    </div>
</template>

<script>
export default {
    name: "Score",
    data(){
        return {
            scoreCorrect: window.localStorage.getItem('score'),
            questions: JSON.parse(window.localStorage.getItem('questions')).length
        }
    },
    methods: {
        playAgain: function () {
            window.localStorage.clear();
            this.$router.push('/');
        }
    }
 };
</script>

<style lang="scss">
#title {
 color: #939CC5; 
}

.play-again {
  color: white;
  font-weight: bold;
  background: #117deb;
  padding: 1rem 1.5rem 1rem 1.5rem;
  font-size: 1.5rem;
  border-radius: 40px;
  margin-top: 3rem;
  border: none;
   &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>