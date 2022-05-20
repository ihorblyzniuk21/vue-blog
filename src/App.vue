<template>
  <app-top-bar/>
  <router-view/>
</template>
<script>
import { actionTypes } from '@/store/modules/auth'
import AppTopBar from '@/components/Topbar'
export default {
  name: 'App',
  components: {
    AppTopBar
  },
  mounted () {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>