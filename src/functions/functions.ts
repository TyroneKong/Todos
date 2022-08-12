import axios from 'axios'

const todosurl = axios.create({
    baseURL:"http://localhost:4002"
})




export const getTodos= async()=>{
    try {
  return todosurl.get("/todos")

    } catch (error) {
        console.log(error)
    }
}





