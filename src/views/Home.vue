<template>
  <div class="home">
    <h1>{{ storedData }}</h1>
    <form @submit.prevent="submitData">
      <input type="text" name="data">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      storedData: 0
    }
  },
  methods: {
    submitData (event) {
      let data = event.target.elements.data.value;

      console.log(data);
    }
  }
}
</script>
