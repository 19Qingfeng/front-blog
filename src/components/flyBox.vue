<template>
  <div class="fly-box-cmp" ref="wapper">
    <svg :width="width" :height="height">
      <defs>
        <mask id="mask">
          <circle cx="0" cy="0" :r="starArea" fill="url(#gradient)">
            <animateMotion
              :path="path"
              :dur="`${+duration}s`"
              rotate="auto"
              repeatCount="indefinite"
            ></animateMotion>
          </circle>
        </mask>

        <radialGradient id="gradient" cx=".5" cy=".5" fx="1" fy=".5" r=".5">
          <!-- cx cy 确定渐变圆的位置 结合 r 确定渐变圆 -->
          <!-- 要求到达渐变圆的边界完成渐变(offset:1) -->
          <!-- fx fy 确定渐变起始点 -->
          <!-- 既从fxfy(offset:0) -> 确定圆边界(offset:1) 完成渐变 -->

          <!-- cx cy fx fy r相对于调用者宽高的百分比(坐标系统在调用者内部) -->
          <stop offset="0" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>

        <path id="rect" :d="path" fill="none"></path>
      </defs>
      <use href="#rect" :stroke-width="+lineWidth" :stroke="lineColor"></use>
      <use
        href="#rect"
        :stroke-width="+starWidth"
        :stroke="starColor"
        mask="url(#mask)"
      ></use>
    </svg>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlyBox",
  props: {
    // 宽高继承外层元素
    // 矩形边框颜色
    lineColor: {
      type: String,
      default: "#235fa7",
    },
    // 矩形线宽
    lineWidth: {
      type: [Number, String],
      default: 1,
    },
    // 动画线条（流行）宽度
    starWidth: {
      type: [Number, String],
      default: 3,
    },
    // 动画线条（流星）颜色
    starColor: {
      type: String,
      default: "#4fd2dd",
    },
    // 动画时间
    duration: {
      type: [Number, String],
      default: 2,
    },
    // 动画线条（流行）长度
    starArea: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      width:0,
      height:0
    }
  },
  computed: {
    path() {
      return `M5 5 L${this.width - 5} 5 L${this.width - 5} ${this.height -
        5} L5 ${this.height - 5} Z`;
    },
  },
  methods:{
    init() {
      const dom = this.$refs['wapper']
      this.height = dom.clientHeight;
      this.width = dom.clientWidth;
    }
  },
  mounted() {
    this.init()
  }
};
</script>

<style lang="scss" scoped>
.fly-box-cmp {
  height: 100%;
  width: 100%;
  position: relative;
  svg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .content {
    padding: 5px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
