<template>
  <div id="aptList">
    <h4 v-if="dong.fullName">{{ dong.fullName }}</h4>
    <h4 v-else>아파트 목록</h4>
    <b-button
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="filter-collapse"
      @click="visible = !visible"
      >필터</b-button
    >
    <b-collapse id="filter-collapse" v-model="visible" class="mt-2" visible>
      <b-card>
        <p class="card-text">Collapse contents Here</p>
      </b-card>
    </b-collapse>
    <div id="houseinfo-list" v-if="houseInfos.length">
      <b-list-group v-for="house in houseInfos" :key="house.aptCode">
        <b-list-group-item @click="moveDetail(house)">
          <h5>{{ house.aptName }}</h5>

          <!-- <b-card
            img-height="100px"
            img-src="https://placekitten.com/100/100"
            img-left
            class="mb-3"
            ><b-card-text>{{ house.aptName }}</b-card-text></b-card
          > -->
        </b-list-group-item>
      </b-list-group>
    </div>
    <div v-else>조회된 아파트가 없습니다!</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const mapStore = "mapStore";
export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState(mapStore, ["houseInfos", "dong"]),
  },
  methods: {
    ...mapActions(mapStore, ["getSelectHouse"]),
    moveDetail(house) {
      this.$router.push("/apt/deal/" + house.aptCode);
      this.getSelectHouse(house);
    },
  },
};
</script>

<style>
#houseinfo-list {
  position: relative;
  height: 500px;
  overflow-y: scroll;
}
</style>
