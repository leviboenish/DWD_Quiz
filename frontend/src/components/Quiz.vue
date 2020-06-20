<template>
  <div class="container">
    <h1 id="title">Question {{ questionCount }}<span id="total">/{{questions.length}}</span></h1>
      <h3 id="question__content" v-if="questions.length">{{ questions[currentQuestion].questionContent }}</h3>
      <div class="questions__answers" v-if="questions.length">
        <label v-for="option in options" v-bind:key="option" :class="selectedGuess == option ? 'label-active' : '' ">
          <input v-model="selectedGuess" :value="option" name="answer" type="radio" />
          {{ option }}
        </label>
      </div>
    <button :disabled="!selectedGuess" class="submit" v-on:click="submitGuess" :class="!selectedGuess ? 'disabled' : ''">Accept</button>
    <div class="score" :class="!endOfQuiz ? 'hide' : 'show'">
      <h1>Score</h1>
      <h2><span>{{ this.scoreCorrect }}</span>/{{this.questions.length}}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import shuffle from "lodash/shuffle";

export default {
  name: "Quiz",
  data() {
    return {
      questions: [],
      currentQuestion: 0,
      options: [],
      selectedGuess: '',
      scoreCorrect: 0,
      questionCount: 1,
      endOfQuiz: false
    };
  },
  mounted() {
    if (!window.localStorage.getItem('questions')) {
      axios
      .get("http://localhost:3000")
      .then(
        response => (
          this.questions = this.shuffle(response.data.questions), 
          this.options = this.shuffle(this.questions[this.currentQuestion].questionOptions),
          window.localStorage.setItem('questions', JSON.stringify(this.questions))
          ),
          window.localStorage.setItem('currentQuestion', this.currentQuestion),
          window.localStorage.setItem('score', this.scoreCorrect),
          window.localStorage.setItem('count', this.questionCount)
      )
      .catch(error => {
        console.log(error);
      });
    } else {
      this.questions = JSON.parse(window.localStorage.getItem('questions'))
      this.currentQuestion = window.localStorage.getItem('currentQuestion');
      this.options = this.shuffle(this.questions[this.currentQuestion].questionOptions);
      this.scoreCorrect =  window.localStorage.getItem('score', this.scoreCorrect);
      this.questionCount = window.localStorage.getItem('count', this.questionCount)
    }
  },
  methods: {
    shuffle: function(questions) {
      let shuffled = [];
      shuffled = shuffle(questions);
      return shuffled;
    },
    questionStep: function() {
      this.currentQuestion ++;
      this.questionCount ++;
      let options = this.questions[this.currentQuestion].questionOptions;
      this.options = shuffle(options);
      window.localStorage.setItem('currentQuestion', this.currentQuestion);
      window.localStorage.setItem('score', this.scoreCorrect);
      window.localStorage.setItem('count', this.questionCount);
    },
    submitGuess: function () {
      axios
      .get(`http://localhost:3000/answers/${this.questions[this.currentQuestion].questionId}/${this.selectedGuess}`)
      .then(
        response => (
          this.handleScore(response.data)
        )
      ).catch(error => {
        console.log(error);
      });
    },
    handleScore: function (res) {
      if(res === true) {
        console.log('yes');
        this.scoreCorrect++;
      } else {
        console.log('no');
      }
      if(this.currentQuestion < this.questions.length - 1){
        this.questionStep();
      } else {
        this.endQuiz();
      }
      this.selectedGuess = '';
    },
    endQuiz: function  () {
      this.endOfQuiz = true;
    }
  } 
};
</script>

<style scoped lang="scss">
$success: green;
$info: #204A6C;
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

#title, #question__content, .questions__answers {
  grid-column: 1/5;
}

#title {
  color: #939CC5;
   @include lg {
    grid-column: 6/8;
  }
}

#total {
  font-size: 1rem;
}

#question__content {
  height: 4rem;
  margin-bottom: 2rem;
  color: white;
  text-align: left;
  width: 80%;
  justify-self: center;
   @include lg {
    grid-column: 4/10;
  }
}

.questions__answers {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  @include lg {
    grid-column: 4/10;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 10rem;
  }

  label {
    border: 1px solid $info;
    padding: .5rem;
    margin: 1rem;
    width: 80%;
    border-radius: 25px;
    transition: .5s;

    &:hover {
      cursor: pointer;
    }
  }

  .label-active {
    background-color: $info;
    transition: .5s;
  }

  input[type="radio"] {
    display: none;
  }
}

.submit {
  grid-column: 2/4;
  color: white;
  font-weight: bold;
  background: #117DEB;
  padding: .5rem 1rem .5rem 1rem;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
  
  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  @include lg {
    grid-column: 6/8;
  }
}

.disabled {
  background: grey;
  border: none;
}

.hide {
  display: none;
}

.show {
  display: inline-block;
}

.score{
  grid-column: 6/8;
}

.play-again {
   grid-column: 2/4;
  color: white;
  font-weight: bold;
  background: #117DEB;
  padding: .5rem 1rem .5rem 1rem;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
}



</style>
