
import axios from 'axios'
export default function ajax(url,data={},type='GET') {
  return new Promise((resolve)=>{
    let promise
    if(type==='GET'){
      promise =  axios.get(url,{params:data})
    }else{
      promise =  axios.post(url,data)
    }
    promise.then(response =>{
      resolve(response.data)
    }).catch(error=>{
      alert('请求出错: '+ error.message)
    })
  })
}


async function login() {
  await ajax('/login',{name:'tom',pwd:'123'},'POST')
}
