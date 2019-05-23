<template>
  <v-app style="backgorund: #E3E3EE">
    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="slideNav">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSlideNav"></v-toolbar-side-icon>
        <router-link to="/" tag='span' style="cursor: pointer">
          <h1 class="title pl-3">PetMate</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Side Navbar Links -->
      <v-list>        
        <v-list-tile ripple v-for="item in sideNavigation" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>            
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>          
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <!-- App title -->
      <v-toolbar-side-icon @click="toggleSlideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag='span' style="cursor: pointer">
          PetMate
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search Input -->
      <v-text-field flex prepend-icon="search" placeholder="Search pets" color="accent" single-line hide-details></v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in navigation" :key="item.title" :to="item.link">
          <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <main>
      <v-container class="mt-5">
        <transition name='fade'>
          <router-view/>         
        </transition>      
      </v-container>    
    </main>

  </v-app>
</template>

<script>
  export default{
    name: 'App',
    data(){
      return{
        slideNav: false
      }
    },
    methods: {
      toggleSlideNav(){
        this.slideNav = !this.slideNav;
      }
    },
    computed: {
      navigation(){
        return[
          {icon: 'chat', title: 'Posts', link: '/posts'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'},
          {icon: 'create', title: 'Sign Up', link: '/signup'},
        ]
      },
      sideNavigation(){
        return[
          {icon: 'chat', title: 'Posts', link: '/posts'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'},
          {icon: 'create', title: 'Sign Up', link: '/signup'},
        ]
      }
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active{
    transition-property: all;
    transition-duration: 0.25s;
  }

  .fade-enter-active{
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active{
    opacity: 0;
    transform: translateY(-25px);
  }
</style>


