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
      scoreCorrect: window.localStorage.getItem("score"),
      questions: JSON.parse(window.localStorage.getItem("questions")).length
    };
  },
  methods: {
    playAgain: function() {
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @include lg {
    grid-template-columns: repeat(12, 1fr);
  }
}

.title {
  color: #939cc5;
  grid-column: 1/5;
  @include lg {
    grid-column: 6/9;
  }
}

.score {
  grid-column: 1/5;
  @include lg {
    grid-column: 6/9;
  }
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
  grid-column: 2/4;
  min-width: 185px;
  @include lg {
    grid-column: 6/9;
  }
  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>