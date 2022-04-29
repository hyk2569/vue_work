import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useCount() {

    const router = useRouter()
    let username = ref(sessionStorage.getItem('user'))
    let king=username.value
    const goout = () => {
      ElMessageBox.confirm('out!!!')
        .then(() => {
          sessionStorage.clear()
        
          router.push({ path: '/' })
        })
        .catch(() => {
          console.log('我取消了')
        })
    }
    return { username, goout,king}




}