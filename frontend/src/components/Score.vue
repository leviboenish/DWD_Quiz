<template>
  <div class="container">
    <h1 class="title">Congratulations!</h1>
    <h2 class="title">You scored</h2>
    <h2 class="score">{{scoreCorrect}}/{{questions}}</h2>
    <button v-on:click="playAgain" class="play-again">Play Again?</button>
  </div>
</template>

<script>
export default {
  name: "Score",
  data() {
    return {
        //gets score and question length from local storage for displaying values
      scoreCorrect: window.localStorage.getItem("score"),
      questions: JSON.parse(window.localStorage.getItem("questions")).length
    };
  },
  methods: {
    playAgain: function() {
      //clears local storage and routes to start screen to start the quiz over
      window.localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
$large: 750px;

@mixin lg {
  @media (min-width: #{$large}) {
    @content;
  }
}

.container {
  width: 80%;
  margin: 0 auto;
}

.title {
  color: #939cc5;
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
  min-width: 185px;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  
  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>