<template>
	<view class="scroll">
		<!-- <scroll-view scroll-y class="list-scroll" enable-flex="true" @scrolltolower="loadmore" :style="{height:windowHeight + 'px'}">
			<view>
				<slot></slot>
			</view>
		</scroll-view> -->
		<scroll-view scroll-y class="list-scroll" enable-flex="true" @scrolltolower="loadmore">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 617,
			};
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.windowHeight = info.windowHeight - (info.screenHeight - info.windowHeight) * 2
		},
		methods: {
			loadmore() {
				this.$emit("loadmore")
			}
		},
	}
</script>

<style lang="scss" scoped>
	page{
		display: flex;
		height: 100%;
	}
	.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
