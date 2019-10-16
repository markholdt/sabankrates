<template>
  <div class="ui">
    <sui-modal v-model="modal">
      <sui-modal-header>South Africa's Free Fixed Deposit Report</sui-modal-header>
      <sui-modal-content image>
        <sui-image wrapped size="medium" src="static/images/avatar/large/rachel.png" />
        <sui-modal-description></sui-modal-description>
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
