<template>
  <div class="container">
    <h2 style="margin: 0; padding: 0;">{{header}}</h2>
    <span style="margin-top: -0.1em;">
      <small>{{subHeader}}</small>
      <i :class="icon"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: ["header", "subHeader", "icon"]
};
</script>