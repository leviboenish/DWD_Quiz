<template>
  <div class="container">
    <h1 id="title">Welcome to the Dire Wolf Digital Quiz</h1>
    <h3 id="sub-title">Coded and designed by Levi Boenish</h3>
    <button v-on:click="start" class="start-button">Get Started</button>
  </div>
</template>

<script>
export default {
  name: "Start",
  methods: {
    start: function () {
      this.$router.push("Quiz");
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

#title {
  color: #939cc5;
  grid-column: 1/5;
  @include lg {
    grid-column: 4/11;
  }
}

#sub-title {
  grid-column: 1/5;
  @include lg {
    grid-column: 5/10;
  }
}

.start-button {
  color: white;
  font-weight: bold;
  background: #117deb;
  padding: 1rem 1.5rem 1rem 1.5rem;
  font-size: 1.5rem;
  border-radius: 40px;
  margin-top: 3rem;
  border: none;
  grid-column: 2/4;
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