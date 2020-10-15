<template>
  <div class="home">
    <h1>{{ storedData }}</h1>
    <form @submit.prevent="submitData">
      <input type="text" name="data">
    </form>
  </div>
</template>

<script>
const SimpleStorage = require("@/lib/SimpleStorage.js");

console.log(SimpleStorage);

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      storedData: '-'
    }
  },
  created() {
    SimpleStorage.getStoredData()
      .then(_storedData => {
        this.storedData = _storedData;
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    submitData (event) {
      let data = event.target.elements.data.value;

      console.log(data);
    }
  }
}
</script>
