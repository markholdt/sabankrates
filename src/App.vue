<template>
  <div class="ui">
    <div class="ui large top pointing attached left menu inverted">
      <router-link to="/">
        <div class="ui dropdown icon item">
          <i class="ui home icon"></i>
        </div>
      </router-link>

      <div class="header item">SA Bank Rates</div>
    </div>
    <div class="ui main container fluid centered">
      <router-view></router-view>
    </div>
  </div>
</template>

