<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- #ifndef MP-ALIPAY -->
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!-- #endif -->
			<view v-if="!isSearch" class="navbar-content" :class="{search:isSearch}" @click.stop="open" :style="{height:menuBarHeight + 'px', width:windowWidth + 'px'}">
				<!-- 非搜索 -->
				<view class="navbar-search">
					<view class="navbar-search-icon">
						<uni-icons type="search" size="16" color="#666"></uni-icons>
					</view>
					<view class="navbar-search-text">uni-app、vue</view>
				</view>
			</view>
			<view v-else class="navbar-content" :class="{search:isSearch}" :style="{height:menuBarHeight + 'px', width:windowWidth + 'px'}">
				<!-- 搜索 -->
				<view class="navbar-content-search-icons" @click="back">
					<uni-icons type="back" size="22" color="#999"></uni-icons>
				</view>
				<view class="navbar-search">
					<input class="navbar-search-text" type="text" v-model='val' placeholder="请输入" @input='inputChange' />
				</view>
			</view>
		</view>
		<view :style="{height:menuBarHeight+statusBarHeight + 'px'}"></view>

	</view>
</template>

<script>
	export default {
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			value: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				menuBarHeight: 45,
				windowWidth: 375,
				val: '',
			};
		},
		watch:{
			value(newVal){
				this.val = newVal
			}
		},
		methods: {
			back(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			},
			open() {
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			inputChange(e) {
				const {value} = e.detail
				this.$emit('input',value)
			}
		},
		created() {
			// 同步获取手机信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 获取胶囊的位置
			// #ifndef H5 || APP-PLUS ||MP-ALIPAY
			const menuButtinInfo = uni.getMenuButtonBoundingClientRect()
			// 状态栏高度
			this.menuBarHeight = menuButtinInfo.height + 2 * (menuButtinInfo.top - info.statusBarHeight)
			// 状态栏宽度
			this.windowWidth = menuButtinInfo.left
			// #endif
			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0
			// #endif
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 10px;
				height: 40px;
				box-sizing: border-box;

				.navbar-search {
					height: 30px;
					width: 100%;
					border-radius: 15px;
					padding: 0 10px;
					background-color: #FFFFFF;
					display: flex;
					align-items: center;

					.navbar-search-icon {
						margin-right: 10px;
					}

					.navbar-search-text {
						width: 100%;
						font-size: 16px;
						color: #ababab;
					}
				}

				&.search {
					padding-left: 0;

					.navbar-content-search-icons {
						margin: 0 10px;

					}

					.navbar-search {
						border-radius: 10px;
					}
				}
			}

		}
	}
</style>
