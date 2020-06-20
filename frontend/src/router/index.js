import Vue from 'vue'
import Router from 'vue-router'
import Quiz from '@/components/Quiz'
import Start from '@/components/Start'

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
        }
    ]
})
