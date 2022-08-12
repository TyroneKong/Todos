import axios from 'axios'

const todosurl = axios.create({
    baseURL:"http://localhost:4002"
})


export const getTodos= async()=>{
    try {
  const {data} = await todosurl.get("/todos")
  return data

    } catch (error) {
        console.log(error)
    }
}





