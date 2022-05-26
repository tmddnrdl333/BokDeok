<template>
  <b-container class="member-content">
    <b-row class="member-header">
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" align="left">
          <b-form class="text-left" @submit="onSubmit" @reset="onReset">
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.id"
                required
                placeholder="아이디 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.pw"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                id="username"
                v-model="user.name"
                required
                placeholder="이름 입력...."
              ></b-form-input> </b-form-group
            ><b-form-group label="이메일:" label-for="useremail">
              <b-form-input
                id="useremail"
                type="email"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
              ></b-form-input> </b-form-group
            ><b-form-group label="전화번호:" label-for="userphone">
              <b-form-input
                id="userphone"
                v-model="user.phone"
                required
                placeholder="전화번호 입력...."
              ></b-form-input> </b-form-group
            ><b-form-group label="주소:" label-for="useraddress">
              <b-form-input
                id="useraddress"
                v-model="user.address"
                placeholder="주소 입력...."
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" class="m-1"
              >회원가입</b-button
            >
            <b-button type="reset" variant="danger" class="m-1"
              >초기화</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  data() {
    return {
      user: { id: "", pw: "", name: "", email: "", phone: "", address: "" },
    };
  },
  computed: {
    ...mapState(memberStore, ["isRegistError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userRegist"]),
    async onSubmit(event) {
      event.preventDefault();
      await this.userRegist(this.user);
      if (this.isRegistError) {
        alert("회원가입에 실패했습니다");
        this.$router.push("/member/signup");
      } else {
        alert("회원가입에 성공했습니다!");
        this.$router.push("/member/login");
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.user.id = "";
      this.user.pw = "";
      this.user.name = "";
      this.user.email = "";
      this.user.phone = "";
      this.user.address = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style></style>
