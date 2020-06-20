<template>
  <div class="container">
    <h1 id="title">Welcome to the Dire Wolf Digital Quiz</h1>
    <h3>Coded and designed by Levi Boenish</h3>
    <router-link to="Quiz">
      <button class="start-button">Get Started</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Start"
};
</script>

<style lang="scss">
#title {
 color: #939CC5; 
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
   &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>