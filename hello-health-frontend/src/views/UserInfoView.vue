<!--
用户个人信息界面
作者：张安琦，吴可非
-->
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
                <el-avatar class="avatar" :src="isAdministrator ? 'administrator.portrait' : avatarUrl"></el-avatar>
                <el-button class="pic-edit-button" type="primary" icon="el-icon-edit" @click="showPhotoUpload">Edit</el-button>
                <el-dialog v-model="photoUpload" title="头像上传" width="50%">
                  <div style="text-align: center;">
                    <p>请上传头像</p>
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
                    <el-button @click="photoUpload = false">取 消</el-button>
                    <el-button type="primary" @click="submitPhoto">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-aside>
            <el-main>
              <span class="userName">{{ displayName }}</span>
              <el-button v-if="!isLogin" class="login-button" type="primary" @click="goToLoginPage">请登录</el-button>
              <br><br><br>
              <template v-if="!isAdministrator">
                <span class="autnenInfoStyle">{{ authenInfo }}</span>
                <template v-if="isLogin">
                  <span v-if="isCertified">{{ certification.professionTitle }}</span>
                  <el-button v-else type="primary" class="certificated-button" @click="showCertificationDialog">去认证</el-button>
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
              </template>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
    <!--展示信息的分栏，分栏2：杏仁币信息-->
    <div>
      <el-card class="cardStyle" v-if="isLogin && !isAdministrator">
        <el-button class="coinButton" v-if="isLogin" link @click="goToCoinDetail">
          我的杏仁币：
          {{ numOfCoin }}
        </el-button>
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
          <template #extra>
            <!--点“编辑”按钮可以对用户信息进行编辑-->
            <el-button type="primary"  v-if="!isEdit" @click="edit">编辑</el-button>
            <el-button type="primary" v-if="isEdit" @click="save">保存</el-button>
          </template>
          <template v-if="isAdministrator">
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  工号：
                </div>
              </template>
              <!--从数据库获取管理员的工号-->
              <el-input v-model="administrator.id" :disabled="!isEdit"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  名称：
                </div>
              </template>
              <!--从数据库获取管理员的名称-->
              <el-input v-model="administrator.name" :disabled="!isEdit"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  联系方式：
                </div>
              </template>
              <!--从数据库获取管理员的联系方式-->
              <el-input v-model="administrator.telephone" :disabled="!isEdit"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  邮箱：
                </div>
              </template>
              <!--从数据库获取管理员的邮箱-->
              <el-input v-model="administrator.email" :disabled="!isEdit"></el-input>
            </el-descriptions-item>
          </template>
          <template v-else>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  用户名：
                </div>
              </template>
              <!--从数据库获取用户名-->
              <el-input v-model="userInfo.userName" :disabled="!isEdit"></el-input>
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
              <el-input v-model="userInfo.telephone" :disabled="!isEdit"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  邮箱地址：
                </div>
              </template>
              <!--从数据库获取邮箱地址-->
              <el-input v-model="userInfo.email" :disabled="!isEdit"></el-input>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  个人简介：
                </div>
              </template>
              <!--从数据库获取个人简介-->
              <el-input v-model="userInfo.description" :disabled="!isEdit"></el-input>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </el-card>
    </div>
    <!--展示信息的分栏，分栏4：如果用户是医师的话，展示医师信息，否则无-->
    <div v-if="isCertified && isLogin && !isAdministrator"    >
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
              姓名：
            </div>
          </template>
          <!--从数据库获取姓名-->
          {{certification.name}}
        </el-descriptions-item>
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
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              （曾）就职医院：
            </div>
          </template>
          <!--从数据库获取就职医院信息-->
          {{certification.hospital}}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
    <!--展示信息的分栏，分栏5：我的发布-->
    <div v-if="isLogin && !isAdministrator">
      <el-card class="cardStyle">
        <el-descriptions
            class="margin-top"
            title="我的发布"
            :column="3"
            :size="size"
            border
        >
        </el-descriptions>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
      </el-card>
    </div>
</div>
</template>

<script>
import axios from "axios"
export default {
  name: "UserInfoPage",
  data(){
    return{
      //用户头像图片的URL
      avatarUrl:'https://example.com/avatar.jpg',
      //用户医师认证信息
      isCertified: true, //初始状态为未认证
      isAdministrator: false, //是否为管理员
      administrator: {},    //管理员信息
      certification:{},   //认证信息
      userInfo:{},     //用户基本信息
      isLogin :true,    //初始状态未登录
      numOfCoin: 0,    //杏仁币数量，初始为0
      isEdit:false, //是否允许编辑信息
      dialogVisible:false,    //对话框是否可见
      size:'small',
      file:null, //上传的文件对象
      photoUpload:false   //头像上传，初始为false
    }
  },
  mounted() {
    // 从后端API获取医师认证信息
      let userIdNum = parseInt(this.$route.params.userId ? this.$route.params.userId: 0);
      console.log(userIdNum)
      if(isNaN(userIdNum)){
          this.$router.replace("/error");
          return;
      }
    axios.post('/api/UserInfo/Details',{user_id: userIdNum})
        .then(response => {
          const responseData = response.data.data.userInfo;
          this.userInfo = responseData
          //     .map(userData => ({
          //   userID: userData.userID,
          //   userName: userData.userName,
          //   gender: userData.gender,
          //   birthday: userData.birthday,
          //   telephone: userData.telephone,
          //   email: userData.email,
          //   description: userData.description
          // }))
          // 将gender的值更改为数组
          this.userInfo.gender = ["男", "女"]
          // 将gender的默认值设置为从数据库获取到的性别值
          if (this.userInfo.gender !== '男' && this.userInfo.gender !== '女') {
            this.userInfo.gender = '男'
          }
          const responseData2 = response.data.data.certification;
          this.certification = responseData2
          //     .map(doctorData => ({
          //   name: doctorData.name,
          //   date: doctorData.date,
          //   professionTitle: doctorData.professionTitle,
          //   hospital: doctorData.hospital,
          // }))
          const responseData3 = response.data.data.administrator;
          this.administrator = responseData3
            //   .map(administratorData => ({
            // name: administratorData.name,     //名称
            // telephone: administratorData.telephone,    //联系方式
            // email: administratorData.email,    //邮箱
            // id: administratorData.id,    //工号
            // portait: administratorData.portait,    //管理员头像
          // }))
        })
        .catch(error => {
          console.error(error)
        });
  },
  computed: {
    authenInfo() {
      return this.isLogin ? '认证信息：' : '未登录';
    },
    displayName() {
      if (this.isLogin && this.isAdministrator) {
        // 如果用户已登录并且是管理员，则显示管理员名称
        return /*this.administrator.name*/ "管理员名";
      } else if (this.isLogin) {
        // 否则，如果用户已登录，则显示普通用户名
        return /*this.userInfo.userName*/ "用户名";
      } else {
        // 否则，如果用户未登录，则不显示任何名称
        return '';
      }
    }
  },
  methods:{
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
      this.$router.push('/coin/detail');
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
      axios.post('/api/certification', formData)
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
      axios.post('/api/certification', formData)
          .then(response => {
            console.log(response.data);
            this.photoUpload = false;
          })
          .catch(error => {
            console.error(error);
          });
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
/*杏仁币按钮样式*/
.coinButton{
  font-size:16px;
  color: #409EFF;
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
</style>