<template>
	<view class="feedback">
		<view class="feedback-title">意见反馈</view>
		<view class="feedback-content">
			<textarea class="feedback-content-area" v-model="content" placeholder="内容" />
			</view>
		<view class="feedback-title">
			反馈图片
		</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imgList" :key='index'>
				<view class="close-icon" @click="closeImage(index)">
					<uni-icons type="closeempty" color="#fff" size="18"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if='imgList.length <5' class="feedback-image-item" @click="addImage">
				<view class="image-box">
					<uni-icons type="plusempty" color="#d6d6d6" size="50"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[],
				content:'',
			};
		},
		methods:{
			addImage(){
				const count = 5 - this.imgList.length
				uni.chooseImage({
					count:count,
					success: res => {
						const {tempFilePaths, tempFiles} = res
						tempFilePaths.forEach((item,index) => {
							// 处理H5
							if(index < count){
								this.imgList.push({
									url:item,
									file:tempFiles[index]
								})
							}
						})
					}
				})
			},
			// 取消选择图片
			closeImage(index){
				this.imgList.splice(index, 1)
			},
			// 提交
			async submit(){
				let imagesPathList = []
				uni.showLoading()
				for(let i = 0; i<this.imgList.length; i++){
					const file = this.imgList[i]
					const imagesPath = await this.uploadFiles(file)
					imagesPathList.push(imagesPath)
				}
				this.updataFeedback(this.content, imagesPathList)
			},
			// 上传文件
			async uploadFiles(file){
				const result = await uniCloud.uploadFile({
					filePath:file.url,
					cloudPath:file.file.name,
				})
				return result.fileID
			},
			// 上传反馈内容数据
			updataFeedback(content,feedbackImages){
				this.$api.updata_feedback({
					content,
					feedbackImages
				}).then(res => {
					this.content =''
					this.imgList = []
					uni.hideLoading()
					uni.showToast({
						title:'反馈成功',
						icon:"none"
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/tabbar/my/my'
						})
					},1000)
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈失败',
						icon:"none"
					})
				}
					
				)
			}
			
		}
	}
</script>

<style lang="scss">
.feedback-title{
	font-size: 16px;
	margin: 15px;
	margin-bottom: 0;
	color: #666666;
}
.feedback-content{
	margin: 15px;
	padding: 10px;
	// #ifdef MP-ALIPAY
	padding:0;
	// #endif
	box-sizing: border-box;
	border: 1px solid #d8d8d8;
	.feedback-content-area{
		font-size: 14px;
		width: 100%;
		height: 100px;
		box-sizing: border-box;
	}
}
.feedback-image-box{
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	.feedback-image-item{
		position: relative;
		width: 33.33%;
		height: 0;
		padding-top: 33.33%;
		box-sizing: border-box;
		.close-icon{
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background-color: #ff5a5a;
			z-index: 2;
		}
		.image-box{
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 5px;
			left: 5px;
			bottom: 5px;
			right: 5px;
			border: 1px #d8d8d8 solid;
			border-radius: 5px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
			
		}
	}
}
.feedback-button{
	margin: 0 15px;
	background-color: $mk-base-color;
	border: none;
}

</style>
