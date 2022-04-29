
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

export function useCount () {
    const router = useRouter()
    let user = ref('')
    let pwd = ref('')
    const zhuce = () => {
        // 做了一个简单验证, 是否为空
        if (user.value != '' && pwd.value != '') {
            sessionStorage.user = user.value
            sessionStorage.pwd = pwd.value
            ElMessage({
                message: '注册成功',
                type: 'success',
            })
                router.push({path:'/'})
        } else {
            ElMessage({
                message: '用户名和密码不能为空',
                type: 'warning',
            })
        }
    }
    return {zhuce,pwd,user}
}