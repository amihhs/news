<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detial-hearder">
			<view class="detail-header-logo">
				<image :src=formData.author.avatar mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}}浏览</text>
					<text>{{formData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button class="detail-header-button" type="default" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<u-parse :content="formData.content" :noData='noData'></u-parse>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="(i, index) in commentList" :key='index'>
					<comments-box :item='i' @reply="reply"></comments-box>
				</view>
			</view>
		</view>

		<view class="detail-bottom">
			<view class="detail-bottom-input" @click="openComment">
				<text>客官请评论</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icon">
				<view class="detail-bottom-icon-box" @click="openDetialComments(formData._id)">
					<uni-icons type="chat" size="16" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="16" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box" @click="likeArticle(formData._id)">
					<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="16" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<release ref="popup" @updataComment="updataComment"></release>
		
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				formData: {},
				noData: '<p style="text-align:center;color:#666">详情加载中..<p>',
				// 评论内容
				commentValue: '',
				commentList: [],
				replyFormData: [],
				
				// 
			}
		},
		components: {
			uParse
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		methods: {
			/* 详细评论 */
			openDetialComments(data) {
				uni.navigateTo({
					url: '/pages/detial-comments/detial-comments?id=' + data
				})
			},
			/* 文章点赞功能 */
			likeArticle(data) {
				this.setUpdataThumbs(data)
			},
			setUpdataThumbs(article_id) {
				uni.showLoading()
				this.$api.updata_thumbs({
					article_id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: this.formData.is_thumbs_up ? '取消点赞' : '点赞成功',
						icon: 'none'
					})
					this.formData.is_thumbs_up = !this.formData.is_thumbs_up
				})
			},
			/* 文章收藏功能 */
			likeTap(data) {
				this.setupdataLikes(data)
			},
			setupdataLikes(article_id) {
				uni.showLoading()
				this.$api.updata_likes({
					article_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('updata_article','follow')
					uni.showToast({
						title: this.formData.is_like ? '取消收藏' : '收藏成功',
						icon: 'none'
					})
					
				})
			},
			/* 作者关注功能 */
			follow(data) {
				this.setUpdataAuthor(data)
			},
			setUpdataAuthor(author_id) {
				uni.showLoading()
				this.$api.updata_author({
					author_id
				}).then(res => {
					uni.hideLoading()
					uni.$emit('updata_author')
					uni.showToast({
						title: this.formData.is_author_like ? '已取消关注' : '已关注',
						icon: 'none'
					})
					this.formData.is_author_like = !this.formData.is_author_like
				})
			},
			
			/* 评论功能 */
			close() {
				this.$refs.popup.close()
			},
			// 打开评论
			openComment() {
				// 需组件内有open方法
				this.$refs.popup.open()
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
					article_id: this.formData._id,
					...content
				}
				uni.showLoading()
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
			// 获取评论
			getComments() {
				this.$api.get_comment({
					article_id: this.formData._id,
					page: 1,
					pageSize: 10
				}).then(res => {
					const {
						data
					} = res
					this.commentList = data
				})
			},
			
			/* 获取文章功能 */
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then(res => {
					const {
						data
					} = res
					this.formData = data
				})
			},
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		height: 100%;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		margin-top: 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.detial-hearder {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header-logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			margin-right: 10px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header-content {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header-content-title {
				font-size: 14px;
				color: #333333;
			}

			.detail-header-content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}

		.detail-header-button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			background-color: $mk-base-color;
			color: #fff;
		}

	}

	.detail-content {
		margin: 10px 15px;

		.detail-comment {
			margin-top: 30px;

			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666666;
				border-bottom: 1px #f5f5f5 solid;

			}

			.comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}

		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		background-color: #FFFFFF;
		border-top: 1px solid #f5f5f5;
		box-sizing: border-box;

		.detail-bottom-input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;

			}
		}

		.detail-bottom-icon {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom-icon-box {
				position: relative;
				display: flex;
				align-items: center;
				width: 44px;
				justify-content: center;
			}
		}

	}
</style>
