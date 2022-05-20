<template>
  <div id="aptList">
    <h3>아파트 목록</h3>
    <b-button v-b-toggle.collapse-filter variant="primary">필터</b-button>
    <b-collapse id="collapse-filter" class="mt-2">
      <b-card>
        <p class="card-text">Collapse contents Here</p>
      </b-card> </b-collapse
    ><b-table></b-table>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
