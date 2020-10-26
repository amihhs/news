<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x :scroll-left='scrollLeft' scroll-with-animation>
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" :class="{active: activeIndex === index}" v-for="(item, index) in list" :key='index'
				 @click="clickTab(item, index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons">
			<uni-icons type="gear" size='26' color='#666'  @click="openSet"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			tabIndex:{
				type:Number,
				default: 0
			}
		},
		data() {
			return {
				activeIndex: 0,
				scrollLeft: 0,
			};
		},
		watch:{
			tabIndex(newVal, oldVal){
				this.activeIndex = newVal
				this.scrollLeft = 30 * newVal
			}
		},
		methods: {
			openSet(){
				uni.navigateTo({
					url:"/pages/home-label/home-label"
				})
			},
			clickTab(item, index) {
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index: index
				})
			}
		}

	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom: #fff6fa solid 1px;
		box-sizing: border-box;
		width: 100%;
		// #ifdef MP-WEIXIN
		width: 750rpx;
		// #endif

		.tab-scroll {
			// #ifdef MP-WEIXIN
			width: 700rpx;
			//  #endif
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;

			.tab-scroll-box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				flex-direction: row;
				box-sizing: border-box;
				height: 40px;

				.tab-scroll-item {
					flex-shrink: 0;
					padding: 0 10px;
					font-size: 14px;
					color: #333;

					&.active {
						color: $mk-base-color;
					}

				}
			}
		}

		.tab-icons {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			height: 40px;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}




	}
</style>
