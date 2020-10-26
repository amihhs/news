<script>
	export default {
		onLaunch() {
			this.getUser()
		},
		methods: {
			getUser() {
				this.$api.get_user({
					user_id: '5f95205a5fb6630001dc0101'
				}).then(res => {
					this.$store.dispatch('set_user_info', res.data)
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '/components/gaoyia-parse/parse.css';

	/* 解决小程序和app滚动条的问题 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
	::-webkit-scrollbar {
		display: none;
	}

	/* #endif */
	/* 解决H5 的问题 */
	/* #ifdef H5 */
	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	/* #endif */
</style>
