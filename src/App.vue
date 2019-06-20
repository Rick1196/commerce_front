<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Nav'
export default {
  name: 'App',
  components:{
    'Navigation': Navigation
  }
}
</script>

