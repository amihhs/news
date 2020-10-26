<template>
	<view class="comments">
		<view class="detail-comment">
			<view class="comment-title">全部评论</view>
			<view class="comment-content" v-for="(i, index) in commentList" :key='index'>
				<comments-box :item='i' @reply="reply"></comments-box>
			</view>
			<uni-load-more v-if='commentList.length !== 0' iconType="snow" :status="loading"></uni-load-more>
			<release ref="popup" @updataComment="updataComment"></release>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList: [],
				article_id: '',
				loading: "noMore",
				page: 1,
				pageSize: 5,
			};
		},
		onLoad(query) {
			this.article_id = query.id
			this.getComments()
		},
		onReachBottom() {
			if (this.loading === 'noMore') return
			this.page++
			this.getComments()
		},
		methods: {
			getComments() {
				this.$api.get_comment({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					if (data.length === 0) {
						this.loading = 'noMore'
						return
					}
					let oldValue = JSON.parse(JSON.stringify(this.commentList))
					oldValue.push(...data)
					this.commentList = oldValue
				})
			},
			// 打开评论发布窗口
			openComment() {
				this.$refs.popup.open()
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
			},
			reply(e) {
				this.replyFormData = {
					'comment_id': e.item.comment_id,
					'is_reply': e.is_reply
				}
				if (e.item.reply_id) {
					this.replyFormData.reply_id = e.item.reply_id
				}
				this.openComment()
			},
			setUpdataComment(content) {
				const formdata = {
					article_id: this.article_id,
					...content
				}
				// 数据重置，避免key重复，添加重复数据
				this.commentsList = []
				this.page = 1
				this.loading = 'loading'
				this.$api.updata_comment(formdata).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '发布成功',
						icon: 'none'
					})
					this.getComments()
					this.close()
					this.commentValue = ''
					this.replyFormData = {}
				})
			},
			updataComment(content) {
				this.setUpdataComment({
					content,
					...this.replyFormData
				})
			},
		},

	}
</script>

<style lang="scss">
	.comments {
		padding-bottom: 30px;
	}

	.detail-comment {
		margin-top: 10px;

		.comment-title {
			padding: 10px 15px;
			font-size: 20px;
			font-weight: bold;
			color: #666666;
			border-bottom: 1px #f5f5f5 solid;
		}

		.comment-content {
			padding: 0 15px;
			border-top: 1px #eee solid;
		}

	}
</style>
