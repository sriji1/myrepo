import useSWR, { mutate } from "swr";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";
import FormItem from "antd/es/form/FormItem";

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
const fetcher = async(url) => {
  try{
  const {data} = await axios.get(url);
    return data;
  }
  catch(err){
   throw new Error(err);
  }
}
const UsersList = () => {
  
    const [userform] = Form.useForm();
    const [open, setOpen] =useState(false);
    const [edit, setEdit] = useState(null);
    const {data, error, isLoading} =useSWR('/users', fetcher);

    if(isLoading){
        return (
            <div className="bg-gray-200 h-screen flex items-center justify-center">
             <h1 className="font-bold text-4xl ">Loading...</h1>
            </div>
        )
    }
    if(error){
        return (
            <div className="bg-gray-200 h-screen flex items-center justify-center">
             <h1 className="font-bold text-4xl ">{error.message}</h1>
            </div>
        )
    }

    const usdel = async (i) => {
      try{
        console.log(i);
       const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${i}`);
      
        if(response.status === 200){
            alert('User Deleted Successfully');
        }
        else{
            alert('Deletion failed');
        }
        
      }
      catch(err){
       alert('Deletion failed');
      }
    }

    const createuser = async(values) => {
  try{
  const response = await axios.post('/users', values);
  setOpen(false);
  userform.resetFields();
  if(response.status === 201){
    alert('User Added Successfully');
  }
  else{
    console.log('Error while inserting');
    
  }
  }
  catch(err){
    console.log(err.message);
    
  }
    }

    const userEdit = (userdata) => {
     userform.setFieldsValue(userdata);
      setOpen(true);
      setEdit(userdata);
    }

    const userupdt = async (values) => {
 try{
   const response = await axios.put(`/users/${edit.id}`,values);
   setOpen(false);
   setEdit(null);
   userform.resetFields();
   if(response.status === 200){
    alert('User Updated Successfully');
  }
  else{
    console.log('Error while updating');
    
  }
 }
 catch(err){
   alert(`Failed- ${err.message}`);
 }
    }

return (
<div className="bg-gray-200 min-h-screen">
<div className=" w-11/12 p-4 mx-auto space-y-4">
<h1 className="text-xl font-semibold">All Users</h1>
<button className="bg-indigo-600 px-5 py-2 rounded-md text-white font-semibold my-3"
onClick={()=>setOpen(true)}
>Add User</button>
<table className="w-full bg-white">
    <thead>
        <tr className="bg-gray-100 text-center text-xl">
            <th className="py-2">id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
       {data && data.map((item,index)=>(
        <tr key={index} className="border-b text-center capitalize">
           <td className="text-sm py-3">{index+1}</td> 
           <td className="text-sm">{item.name}</td> 
           <td className="text-sm">{item.username}</td> 
           <td className="text-sm">{item.email}</td> 
           <td>
            <div className="space-x-7">
            <button className="" onClick={()=>userEdit(item)}><CiEdit size={"25px"}/></button>
            <button onClick={()=>usdel(item.id)}><MdDelete size={"25px"}/></button>
            </div>
           </td>
        </tr>
       ))}
    </tbody>
</table>
</div>
<Modal open={open} footer={null} onCancel={()=>{
    setOpen(false);
    setEdit(null);
}} title='New User'>
    <Form layout="vertical" onFinish={edit ? userupdt :createuser} form={userform}>
        <Form.Item name='name' rules={[{required: true}]}>
            <Input size="large" placeholder="Enter Name"/>
        </Form.Item>
        <Form.Item name='username' rules={[{required: true}]}>
            <Input size="large" placeholder="Enter Username"/>
        </Form.Item>
        <Form.Item name='email' rules={[{required: true}]}>
            <Input size="large" placeholder="Enter Email"/>
        </Form.Item>
        {edit ? <Form.Item >
           <Button htmlType="submit" type="primary" size="large" className="bg-green-600">Update</Button>
        </Form.Item> : <Form.Item >
           <Button htmlType="submit" type="primary" size="large" className="bg-indigo-600">Submit</Button>
        </Form.Item>}
        
    </Form>
</Modal>
</div>
);
}
export default UsersList;