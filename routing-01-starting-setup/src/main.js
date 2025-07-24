/* eslint-disable */

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./components/nav/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams'},
        {
            name: 'teams',
            path: '/teams',
            component: TeamsList,
            children: [
                { name: 'team-members', path: '/teams/:teamId', component: TeamMembers, props: true },
            ]
        },
        { path: '/users', component: UsersList },
        { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
        console.log(to, from, savedPosition);
        if(savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0};
    }
});

router.beforeEach(function(to, from, next) {
    if (to.name === 'team-members'){
        next();
    }else{
        next({name: 'team-members', params: {teamId: 't2'}});
    }
})
const app = createApp(App)

app.use(router);

app.mount('#app');
