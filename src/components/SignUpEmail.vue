<template>
  <div class="ui">
    <sui-modal v-model="modal">
      <sui-modal-header>Select a Photo</sui-modal-header>
      <sui-modal-content image>
        <sui-image wrapped size="medium" src="static/images/avatar/large/rachel.png" />
        <sui-modal-description>
          <sui-header>Default Profile Image</sui-header>
          <p>We've found the following gravatar image associated with your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click="$emit('close')">OK</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
export default {
  name: "SignUpEmail",
  components: {},
  props: {
    modal: Boolean
  },
  data() {
    return {};
  },
  methods: {
    toggle() {
      this.modal = !this.modal;
    },
    async signUp() {
      this.modal = false;
    }
  },
  async mounted() {}
};
</script>
