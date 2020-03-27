<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
/*eslint-disable */
import axios from 'axios'
import { requestGeetest } from "@/api/login";
export default {
    name: 'Captcha',
    props: {
        parm: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        scene: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            
        }
    },
    created(){
        
    },
    mounted(){
        this.init();
    },
    methods: {
        // 验证失败
        error(res){
            this.$emit('callback', 0,res);
        },
        // 验证成功
        success(res){
            this.$emit('callback', 1,res);
        },
        // 验证中
        loading(res){
            this.$emit('callback', 2,res);
        },
        // 验证之前
        before(){
            this.$emit('before');
        },
        init(){
            // 腾讯验证码
            if(this.type == 'TencentCaptcha'){
                if (typeof window.TencentCaptcha !== 'function') {
                    const URL = 'https://ssl.captcha.qq.com/TCaptcha.js';
                    const scriptHeat = document.createElement('script');
                    scriptHeat.type = 'text/javascript';
                    scriptHeat.src = URL;
                    document.body.appendChild(scriptHeat);
                    scriptHeat.onload = () => {
                        this.TencentCaptchaInit();
                    }
                }else{
                    this.TencentCaptchaInit();
                }
            }
            // 极验验证码
            else if(this.type == 'Geetest'){
                if (typeof window.initGeetest !== 'function') {
                    const URL = 'http://www.geetest.com/demo/libs/gt.js';
                    const scriptHeat = document.createElement('script');
                    scriptHeat.type = 'text/javascript';
                    scriptHeat.src = URL;
                    document.body.appendChild(scriptHeat);
                    scriptHeat.onload = () => {
                        this.GeetestInit();
                    }
                }else{
                    this.GeetestInit();
                }
            }
        },
        TencentCaptchaInit(){
            const t = this;
            new TencentCaptcha(
                document.getElementById(t.id),
                t.parm.appid,
                function(res) {
                    //console.log(res)
                    if(res.ret === 0){
                        t.loading(res);
                        // 成功
                        axios.get(t.url,{
                            params: {
                                g_type: t.type,
                                g_scene: t.scene,
                                ticket: res.ticket,
                                randstr: res.randstr,
                                bizState: res.bizState
                            }
                        }).then((response) => {
                            if(response.data.code == 1){
                                t.success(response.data);
                            }else{
                                t.error(response.data);
                            }
                        }).catch(function (error) {
                            t.error(error);
                        })
                    }else{
                        // 失败
                        t.error(res);
                    }
                }
            );
        },
        GeetestInit(){
            const t = this;
            requestGeetest().then((res) => {
                if(res.success == 1){
                    const o = {
                        // 以下配置参数来自服务端 SDK
                        gt: res.gt,
                        challenge: res.challenge,
                        offline: !res.success, // 表示用户后台检测极验服务器是否宕机
                        new_captcha: true // 用于宕机时表示是新验证码的宕机
                    }
                    initGeetest(Object.assign(o,t.parm), function (captchaObj) {
                        captchaObj.appendTo("#"+t.id);
                        captchaObj.onReady(function(){
                        }).onSuccess(function(){
                            t.success();
                        }).onError(function(){
                            t.error();
                        })
                        document.getElementById(t.id).addEventListener('click', function(){
                            t.before();
                            captchaObj.verify();
                        }, false)
                    })
                }else{
                    t.error(res.data);
                }
            }).catch(function (error) {
                t.error(error);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>