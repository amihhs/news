<template>
	<view class="home">
		<!-- 自定义头部组件 -->
		<navbar></navbar>
		<view class="home-tab">
			<tab :list='tabList' :tabIndex='tabIndex' @tab='tab'></tab>
		</view>
		<view class="home-list">
			<list :tab='tabList' :activeIndex='activeIndex' @changeTab='changeTab'></list>
		</view>


	</view>
</template>


<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex: 0,
				activeIndex: 0,
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		watch: {
			userInfo(newVal) {
				this.getLabel()
			}
		},
		methods: {
			getLabel() {
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					data.unshift({
						name: '全部'
					})
					this.tabList = data
				})
			},
			tab({
				data,
				index
			}) {
				this.activeIndex = index
			},
			changeTab(current) {
				this.tabIndex = current
				this.activeIndex = current
			}
		},

		// 生命周期
		onLoad() {
			uni.$on('labelChange', (res) => {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})

		},
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		display: flex;
	}
	.home {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.home-list {
			height: 100%;
		}
	}
</style>
