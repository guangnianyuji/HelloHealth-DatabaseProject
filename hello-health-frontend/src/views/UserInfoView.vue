<template>
  <!--整个页面是可以上下滚动的-->
  <div  class="wrapper">
    <!--展示信息的分栏，分栏1：用户头像-->
    <div>
      <el-card class="cardStyle">
        <div class="common-layout">
          <el-container>
            <el-aside>
              <div class="avatar-container">
                <el-avatar class="avatar" :src="isLogin ? userInfo.avatarUrl : require('@/assets/SamplePic.png')"></el-avatar>
                <template v-if="isCurrentUser">
                  <el-button class="pic-edit-button" type="primary" icon="el-icon-edit" @click="showPhotoUpload">Edit</el-button>
                  <el-dialog v-model="photoUpload" title="头像上传" width="50%">
                    <div style="text-align: center;">
                      <p>请上传头像</p>
                      <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :auto-upload="false"
                          :on-change="handleChange"
                          accept="image/jpg,image/jpeg,image/png,image/gif"
                      >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">上传文件格式为.jpg、.jpeg、.png、.gif，且不超过 2MB</div>
                      </el-upload>
                    </div>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="photoUpload = false">取 消</el-button>
                      <el-button type="primary" @click="submitPhoto">确 定</el-button>
                    </div>
                  </el-dialog>
                  <el-dialog title="我的关注" v-model="this.myFollowVisible" @close="search">
                    <el-card class="user-card" v-for="user in followList" :key="user.userID">
                      <div class="user-info">
                        <div class="avatar">
                          <el-avatar :src="user.avatarUrl"></el-avatar>
                        </div>
                        <div class="name"  @click="goUserPage(user.userID)">{{user.userName}}</div>
                        <el-button
                            :type="followMap.get(user.userID) ? 'primary' : 'default'"
                            @click="onFollowBtnClick(user.userID)"
                        >
                          {{ followMap.get(user.userID) ? '+ 关注' : '已关注' }}
                        </el-button>
                      </div>
                      <div class="description">
                        {{user.description}}
                      </div>
                    </el-card>
                  </el-dialog>
                </template>
              </div>
            </el-aside>
            <el-main>
              <span class="userName">{{ displayName }}</span>
              <el-button v-if="!isLogin" class="login-button" type="primary" @click="goToLoginPage">请登录</el-button>
              <el-button
                  v-if="isLogin && !isCurrentUser"
                  :type="isFollowed ? 'default' : 'primary'"
                  @click="onFollowBtnClick(null)"
              >
                {{ isFollowed ? '已关注' : '+ 关注' }}
              </el-button>
              <el-button v-else-if="isLogin && isCurrentUser" type="primary" @click="this.myFollowVisible = true">我的关注</el-button>
              <br><br><br>
              <div>
                <span>{{ authenInfo }}</span>
                <template v-if="isLogin">
                  <span v-if="isCurrentUser && !userInfo.isCertified">{{ '未认证' }}</span>
                  <span v-else-if="userInfo.isCertified">{{ certification.professionTitle }}</span>
                  <el-button v-else-if="isCurrentUser && !userInfo.isCertified" type="primary" class="certificated-button" @click="showCertificationDialog">去认证</el-button>
                  <span v-else>{{ '未认证' }}</span>
                  <el-dialog v-model="dialogVisible" title="医师认证" width="50%">
                    <div style="text-align: center;">
                      <p>请上传您的医师资格证照片</p>
                      <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :auto-upload="false"
                          :on-change="handleChange"
                      >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">上传文件格式为.jpg、.jpeg、.png、.gif，且不超过 2MB</div>
                      </el-upload>
                    </div>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="submitCertification">确 定</el-button>
                    </div>
                  </el-dialog>
                </template>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
    <!--展示信息的分栏，分栏2：杏仁币信息-->
    <div>
      <el-card class="cardStyle" v-if="isLogin && !isAdministrator">
        <el-row>
          <div style="font-size: 18px;margin-top: 2px;">
          我的杏仁币：
          </div>
          <div style="color:green;font-size: 22px;">
          {{ numOfCoin }}
          </div>
          <el-button class="coinButton" v-if="isLogin" link @click="goToCoinDetail">
          杏仁币详情>>
          </el-button>
        </el-row>
        <el-container>
            <el-aside class="coin-left">
              <el-row style="margin-left: 1%;margin-bottom: 2%;margin-top: 3.5%;">
                <div style="font-size: 15px;">硬币记录</div>
                <div style="font-size: 14px;color: grey;margin-left: 3px;margin-top: 1px;">
                您最近一周的变化情况
              </div>
              </el-row>
              <el-table :data="CoinRecordList" 
                    :default-sort="{ prop: 'Time', order: 'ascending' }" 
                    height="250" style="width: 100%" class="table">
                <el-table-column prop="Time" label="时间" width="150" />
                <el-table-column prop="Num" label="变化" width="120" />
                <el-table-column prop="Reason" label="原因" width="150"/>
        </el-table>
            </el-aside>
            <el-main class="coin-right">
                <el-row>
                    <div style="font-size: 15px;margin-bottom: 1%;">杏仁币介绍</div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;margin-bottom: 1%;margin-left: 2px;">杏仁币的用处</div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;margin-left: 2px;">
                        杏仁币是本平台中专用的虚拟货币，取自“杏林春暖 ，悬壶济世”之意。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;margin-left: 2px;">
                        • 用于对优秀帖子进行投币。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;margin-left: 2px;">
                        • 可以用来悬赏专业医生用户回答专业问题。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;margin-top: 5%;margin-bottom: 1%;margin-left: 2px;">如何获得杏仁币</div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;margin-left: 2px;">
                        • 每日登录、完成健康计划。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;margin-left: 2px;">
                        • 发帖被投杏仁币、发帖获得较大浏览量和获得高价值流量认可。
                    </div>
                </el-row>
            </el-main>
        </el-container>
      </el-card>
    </div>
    <!--展示信息的分栏，分栏3：基本信息-->
    <div v-if="isLogin">
      <el-card class="cardStyle">
        <el-descriptions
            class="margin-top"
            title="基本信息"
            :column="3"
            :size="size"
            border
        >
          <template #extra v-if="isCurrentUser">
            <!--点“编辑”按钮可以对用户信息进行编辑-->
            <el-button type="primary"  v-if="!isEdit" @click="edit">编辑</el-button>
            <el-button type="primary" v-if="isEdit" @click="save">保存</el-button>
          </template>
          <template>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  用户名：
                </div>
              </template>
              <!--从数据库获取用户名-->
              <div class="input-container">
                <input type="text" name="text" class="input" placeholder="请输入用户名"
                       v-model="userInfo.userName" :disabled="!isEdit">
                <div class="highlight"></div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  性别：
                </div>
              </template>
              <!--从数据库获取性别-->
              <template v-if="!isEdit">
                <!-- 在"编辑"状态下，性别显示框是一个标签组件 -->
                <el-tag>{{ userInfo.gender }}</el-tag>
              </template>
              <template v-if="isEdit">
                <!-- 在"保存"状态下，性别显示框是一个下拉框组件 -->
                <el-select v-model="userInfo.gender">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  生日：
                </div>
              </template>
              <!--从数据库获取出生日期-->
              <template v-if="!isEdit">
                <!-- 在"编辑"状态下，生日显示框是一个数据框 -->
                <el-input v-model="userInfo.birthday" :disabled="!isEdit"></el-input>
              </template>
              <template v-if="isEdit">
                <!-- 在"保存"状态下，生日显示框是一个时间选择框 -->
                <el-date-picker
                    v-model="userInfo.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                ></el-date-picker>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  联系电话：
                </div>
              </template>
              <!--从数据库获取联系电话-->
              <div class="input-container">
                <input type="text" name="text" class="input" placeholder="请输入联系电话"
                       v-model="userInfo.telephone" :disabled="!isEdit">
                <div class="highlight"></div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  邮箱地址：
                </div>
              </template>
              <!--从数据库获取邮箱地址-->
              <div class="input-container">
                <input type="text" name="text" class="input" placeholder="请输入邮箱"
                       v-model="userInfo.email" :disabled="!isEdit">
                <div class="highlight"></div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  个人简介：
                </div>
              </template>
              <!--从数据库获取个人简介-->
              <div class="input-container">
                <input type="text" name="text" class="input" placeholder="请输入简介"
                       v-model="userInfo.description" :disabled="!isEdit">
                <div class="highlight"></div>
              </div>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </el-card>
    </div>
    <!--展示信息的分栏，分栏4：如果用户是医师的话，展示医师信息，否则无-->
    <div v-if="userInfo.isCertified && isLogin && isCurrentUser">
      <el-card class="cardStyle">
        <el-descriptions
            class="margin-top"
            title="医师信息"
            :column="3"
            :size="size"
            border
        >
          <template #extra>
            <!--点“编辑”按钮弹出医师认证框-->
            <el-button type="primary" @click="dialogVisible = true">编辑</el-button>
            <el-dialog v-model="dialogVisible" title="医师认证" width="50%">
              <div style="text-align: center;">
                <p>请上传您的医师资格证照片</p>
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :on-change="handleChange"
                >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">上传文件格式为.jpg、.jpeg、.png、.gif，且不超过 2MB</div>
                </el-upload>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCertification">确 定</el-button>
              </div>
            </el-dialog>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                职称：
              </div>
            </template>
            <!--从数据库获取职称-->
            {{certification.professionTitle}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                认证时间：
              </div>
            </template>
            <!--从后端获取认证时间-->
            {{certification.date}}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <!--展示信息的分栏，分栏5：我的发布-->
    <div v-if="isLogin">
      <el-card class="cardStyle">
        <el-descriptions
            class="margin-top"
            :title="isCurrentUser ? '我的发布' : 'ta的发布'"
            :column="3"
            :size="size"
            border
        >
        </el-descriptions>
        <el-row v-if="userPosts">
          <el-col :span="8" v-for="post in userPosts" :key="post">
            <PostCard :post_info="post" style="margin-left:10% ;margin-right:10% ;margin-bottom: 15%;"></PostCard>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import PostCard from "@/components/postBoardView/PostCard.vue";
import NewsBlockList from "@/components/NewsBlockList.vue";
import globalData from "@/global/global";
import {messageProps} from "element-plus";

export default {
  name: "UserInfoPage",
  components: {NewsBlockList, PostCard},
  data(){
    return{
      isFollowed: false,
      followMap: new Map(), // 用来匹配关注列表的已关注和+关注
      myFollowVisible:false,
      followList:[],

      //从数据库获取的数据
      certification:{},   //认证信息
      userInfo:{},     //用户基本信息，包含numOfCoin,isCertified等信息
      userPosts: [],   // 用户上传的帖子
      isLogin:true ,    //判断正在操控的用户是否处于登陆状态

      //本页面需要的一些变量，不用从数据库获取
      isEdit:false, //是否允许编辑信息
      dialogVisible:false,    //对话框是否可见
      size:'small',

      //用户上传的，要传给数据库的一些数据
      file:null, //上传的文件对象
      photoUpload:false,   //头像上传，初始为false
    }
  },
  //从数据库获取所需的用户信息
  mounted() {
    let userIdNum = parseInt(this.$route.params.userId ? this.$route.params.userId: 0);
    if(isNaN(userIdNum)){
      this.$router.replace("/error");
      return;
    }
    axios.post('/api/UserInfo/Details',{user_id: userIdNum})
        .then(response => {
          const responseData = response.data.data.userInfo;
          this.userInfo = responseData
          // 将gender的值更改为数组
          this.userInfo.gender = ["男", "女"]
          // 将gender的默认值设置为从数据库获取到的性别值
          if (this.userInfo.gender !== '男' && this.userInfo.gender !== '女') {
            this.userInfo.gender = '男'
          }
          const responseData2 = response.data.data.certification;
          this.certification = responseData2
          this.isLogin = !globalData.isLogin; // 获取用户登录状态
          this.followList = response.data.data.followList;
          this.isFollowed = response.data.data.isFollowed;

          console.log(this.followList)

          this.followList.forEach(user => {
            this.followMap.set(user.userID, false)
          })

        })
        .catch(error => {
          console.error(error)
        });
    /* 获取用户发布的帖子 */
    this.fetchUserPosts(this.userInfo.userID);

  },

  //进行一些必要的计算工作
  computed: {
    //判断输出文字
    authenInfo() {
      return this.isLogin ? '认证信息：' : '未登录';
    },
    //根据操控页面的用户的登陆状态来判断是显示要查看的用户信息还是“未登录”字样
    displayName() {
      if(this.isLogin) {
        return this.userInfo.userName;
      } else {
        return '未登录';
      }
    },
    //判断是否是本人在查看信息页面，来判断该用户是否可对信息进行修改
    isCurrentUser() {
      return !this.$route.params.userId;
    }
  },
  methods:{
    goUserPage(userId){
      this.$router.push("/user/"+userId)
    },
    search(){
      let userIdNum = parseInt(this.$route.params.userId ? this.$route.params.userId: 0);
      if(isNaN(userIdNum)){
        this.$router.replace("/error");
        return;
      }
      axios.post('/api/UserInfo/Details',{user_id: userIdNum})
          .then(response => {

            this.isLogin = !globalData.isLogin; // 获取用户登录状态
            this.followList = response.data.data.followList;
            this.isFollowed = response.data.data.isFollowed;

            console.log(this.followList)

            this.followList.forEach(user => {
              this.followMap.set(user.userID, false)
            })

          })
          .catch(error => {
            console.error(error)
          });
    },
    onFollowBtnClick(userId) {

      let isFollowed = this.followMap.get(userId)

      if (this.isFollowed || isFollowed) {
        this.unfollow(userId)
      } else {
        this.followUser(userId)
      }
    },
    unfollow(userId) {
      if(userId){
        axios.post("/api/unfollowUser", { thisUserID: globalData.userInfo.userId ,followUserID: userId })
            .then(response => {
              //如果后端返回的状态码是200，那么将isFollowed设置为false
              this.followMap.set(userId, false)
            })
            .catch(error => {
              console.error(error);
            });
      }
      else {
        axios.post("/api/unfollowUser", {thisUserID: globalData.userInfo.userId ,followUserID: this.userInfo.userID})
            .then(response => {
              //如果后端返回的状态码是200，那么将isFollowed设置为false
              this.isFollowed = false;
            })
            .catch(error => {
              console.error(error);
            });
      }
    },
    //添加一个新的方法，用于处理关注按钮的点击事件
    followUser(userId) {

      if(userId){
        axios.post("/api/followUser", { thisUserID: globalData.userInfo.userId ,followUserID: userId })
            .then(response => {
              //如果后端返回的状态码是200，那么将isFollowed设置为true
              this.followMap.set(userId, true);
            })
            .catch(error => {
              console.error(error);
            });
      }
      else{
        axios.post("/api/followUser", {thisUserID: globalData.userInfo.userId ,followUserID: this.userInfo.userID})
            .then(response => {
              //如果后端返回的状态码是200，那么将isFollowed设置为true
              this.isFollowed = true;
            })
            .catch(error => {
              console.error(error);
            });
      }
    },
    showPhotoUpload(){
      //显示上传头像框
      this.photoUpload = true;
    },
    /*跳转到登陆界面*/
    goToLoginPage(){
      this.$router.push('login')
    },
    /*跳转到杏仁币的流水页面函数*/
    goToCoinDetail(){
      this.$router.push('/detail');
    },
    showCertificationDialog() {
      // 显示认证框
      this.dialogVisible = true;
    },
    edit(){
      this.isEdit = true;
    },
    save(){
      // 将修改后的用户信息保存到数据库
      axios
          .put('/api/UserInfo/Details', {
            userInfo: this.userInfo,
          })
          .then(response => {
            // 保存成功后将isEdit变量设置为false，禁用编辑模式
            this.isEdit = false;
            // 将下拉框选中的值保存到userInfo.gender中
            this.userInfo.gender = this.userInfo.gender;
            // 将下拉框选中的值保存到userInfo.birthday中
            this.userInfo.birthday=this.userInfo.birthday;
          })
          .catch((error) => {
            this.isEdit = false;
            console.error(error);
          });
    },
    handleChange(file,fileList){
      console.log(file,fileList);
    },
    /*将用户上传的医师资格证照片传给后端数据库*/
    submitCertification(){
      // 创建一个 FormData 对象
      const formData = new FormData();
      formData.append('file', this.file);
      // 发起一个 POST 请求，将 formData 发送给后端服务器
      axios.post('/api/uploadDoctorApproval', formData)
          .then(response => {
            console.log(response.data);
            this.dialogVisible = false;
          })
          .catch(error => {
            console.error(error);
          });
    },
    /*将用户上传的头像传给后端数据库*/
    submitPhoto(){
      // 创建一个 FormData 对象
      const formData = new FormData();
      formData.append('file', this.file);
      // 发起一个 POST 请求，将 formData 发送给后端服务器
      axios.post("/api/uploadAvatar", formData)
          .then(response => {
            console.log(response.data);
            this.photoUpload = false;
          })
          .catch(error => {
            console.error(error);
          });
    },
    /* 求获取用户发布的帖子 */
    fetchUserPosts(userID) {
      axios.get("/api/fetchUserPosts", {
        params: {
          userID
        }
      }).then(res => {
        this.userPosts= res.data.data.post_list;
      })
    }
  }
}

</script>

<style scoped>
/*边框样式设置*/
.cardStyle{
  border-color: white;
  border-width:2px;
  margin-bottom:10px;
  margin-top:10px;
}
/*头像部分的容器设置*/
.avatar-container{
  position:relative;
  display:inline-block;
}
/*用户头像样式*/
.avatar{
  border-radius:50%;
  object-fit: cover;
  margin-top:20px;
  margin-left:20px;
  width:100px;
  height:100px;
}
/*头像编辑按钮的样式设置*/
.pic-edit-button{
  position: absolute;
  bottom: 20px;
  right: 0;
  transform: translate(-50%, 50%);
  border-radius:50%;
  width:25px;
  height:25px;
  background-color: transparent;
  border-color: transparent;
  color:#666666;
}
/*鼠标悬浮在编辑按钮时的样式*/
.pic-edit-button:hover {
  background-color: #409EFF;
  border-color: #409EFF;
  color: #ffffff;
}
/*最上方的大的用户名字样*/
.userName{
  font-size:30px;
  /*font-family: 宋体;*/
  font-weight: bold;
  color:black;
}
/*杏仁币“更多详情”样式*/
.coinButton{
  margin-left: 2%;
  font-size:16px;
  color: #409EFF;
}
.coin-left{
  width: auto;
}
.coin-right{
  margin-left: 2%;
}

/*”请登录“按钮样式*/
.login-button{
  background-color: white;
  color: red;
  border-color: white;
  font-size: 30px;
}
/*”去认证“按钮样式*/
.certificated-button{
  background-color: antiquewhite;
  border-color: white;
  color: #666666;
  font-size:20px;
}
/*弹出的医师认证框的按钮设置*/
.dialog-footer {
  text-align: right;
}
.dialog-footer button:first-child {
  margin-right: 20px;
}

.wrapper{
  position: relative;
  width: 85%;
  margin: 0 auto;
}

.input-container {
  position: relative;
}

.input {
  font-size: 1em;
  width: 88%;
  padding: 0.6em 1em;
  border: none;
  border-radius: 6px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  max-width: 600px;
  color: #333;
}

.input:hover {
  background-color: #f2f2f2;
}

.input:focus {
  outline: none;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input::placeholder {
  color: #999;
}

.highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #6cb16a;
  transition: width 0.3s ease;
}

.input:focus + .highlight {
  width: 75%;
}

.user-info {
  display: flex;
  align-items: center;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}

.name {
  flex: 1;
}

.followed-btn {
  margin-left: 10px;
  color: #ccc;
}
</style>