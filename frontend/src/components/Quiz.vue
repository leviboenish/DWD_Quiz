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
    };
  },
  mounted() {
    //checks to see if questions are already stored before making the call
    if (!window.localStorage.getItem('questions')) {
      axios
      .get("http://localhost:3000")
      .then(
        response => (
          //sets and shuffles question order
          this.questions = this.shuffle(response.data.questions), 
          //shuffles options so that the correct answer is not always A
          this.options = this.shuffle(this.questions[this.currentQuestion].questionOptions),
          //stores variables in local storage for saving progress
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
      //sets all data from local storage if progress has been saved
      this.questions = JSON.parse(window.localStorage.getItem('questions'))
      this.currentQuestion = window.localStorage.getItem('currentQuestion');
      this.options = this.shuffle(this.questions[this.currentQuestion].questionOptions);
      this.scoreCorrect =  window.localStorage.getItem('score', this.scoreCorrect);
      this.questionCount = window.localStorage.getItem('count', this.questionCount)
    }
  },
  methods: {
    //shuffles the array passed in for randomized questions and options
    shuffle: function(questions) {
      let shuffled = [];
      shuffled = shuffle(questions);
      return shuffled;
    },
    questionStep: function() {
      //increments current question and question count to progress
      this.currentQuestion ++;
      this.questionCount ++;
      //sets and shuffles options of next question
      let options = this.questions[this.currentQuestion].questionOptions;
      this.options = shuffle(options);
      //stores new values for saving
      window.localStorage.setItem('currentQuestion', this.currentQuestion);
      window.localStorage.setItem('score', this.scoreCorrect);
      window.localStorage.setItem('count', this.questionCount);
    },
    submitGuess: function () {
      //queries the service with question ID and guess
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
      //if guess was correct increments score counter
      if(res === true) {
        this.scoreCorrect++;
      }
      if(this.currentQuestion < this.questions.length - 1){
        //steps to next question if there are still questions left
        this.questionStep();
      } else {
        //ends the quiz once the final answer has been submitted
        this.endQuiz();
      }
      //resets selected guess for next question
      this.selectedGuess = '';
    },
    endQuiz: function  () {
      //saves final score and routes to score page
      window.localStorage.setItem('score', this.scoreCorrect);
      this.$router.push('Score');
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
  margin-bottom: 6rem;
  color: white;
  text-align: left;
  width: 80%;
  justify-self: center;
   @include lg {
    grid-column: 4/10;
    width: 80%;
    margin: 0 auto 2rem auto;
  }
}

.questions__answers {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;

  @include lg {
    grid-column: 4/10;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 5rem;
    width: 80%;
    margin: 0 auto 5rem auto;
  }

  label {
    border: 1px solid $info;
    padding: .5rem;
    margin-bottom: 1rem;
    width: 80%;
    border-radius: 25px;
    transition: .5s;
    
    &:nth-child(even) {
      justify-self: end;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid white;
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
  padding: .5rem;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
  height: 40px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
  &:focus {
    outline: none;
    border: 1px solid white;
  }

  &:hover {
    cursor: pointer;
  }

  @include lg {
    grid-column: 6/8;
  }
}

.disabled {
  background: #117DEB;
  opacity: .4;
  border: none;
  
  &:hover {
    cursor: not-allowed;
  }
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
