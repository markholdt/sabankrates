<template>
  <div class="home">
    <RatesList />
  </div>
</template>

<script>
// @ is an alias to /src
import RatesList from "@/components/RatesList.vue";

export default {
  name: "home",
  components: {
    RatesList
  }
};
</script>
