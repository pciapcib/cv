<template lang="pug">
  #app
    img(src="./assets/logo.png")
    h1 {{ msg }}
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style lang="sass">
  body
    font-family: Helvetica, sans-serif
</style>
