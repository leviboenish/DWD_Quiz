import Vue from 'vue'
import Router from 'vue-router'
import Quiz from '@/components/Quiz'
import Start from '@/components/Start'
import Score from '@/components/Score'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: "/",
            name: "Start",
            component: Start
        },
        {
            path: "/quiz",
            name: "Quiz",
            component: Quiz
        },
        {
            path: "/score",
            name: "Score",
            component: Score
        }
    ]
})
