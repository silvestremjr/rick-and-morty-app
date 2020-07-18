<template>
  <button @click="topFunction" id="myBtn" title="Go to top">Top</button>
</template>

<script>
export default {
  name: "ScrollTop",
  methods: {
    scrollFunction() {
      let mybutton = document.getElementById("myBtn");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    },
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  data: () => ({
    isUserScrolling: false,
  }),
  created() {
    window.addEventListener("scroll", this.scrollFunction);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollFunction);
  },
};
</script>
<style lang="scss" scoped>
#myBtn {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
}

#myBtn:hover {
  background-color: #555;
}
</style>
