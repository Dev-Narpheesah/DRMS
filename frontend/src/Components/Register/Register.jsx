import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import axios from "axios"



const Register = () => {
 

  const navigate = useNavigate();
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const {username, email, password,  confirmPassword} = formData

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    setFormData({...formData, [id] : value})
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if(!username || !password || !email || !confirmPassword){
    toast.error("Please fill all fields")
    return;
  }

  axios.post('/api/user/register', formData)
  .then((response) => {
    console.log(response)
    setIsLoading(false)
   

    toast.success("Registration Successful")
    navigate('/login')
  }).catch((error) => {
    setIsLoading(false)
    const message = error.response?.status === 400 ?
    "User already exist" : "Server error "
    setFormValidMessage(message)
    toast.error(message)
  })

 
};

  return (
    <>
      <div className={styles.container_reg}>
        <form className={styles.container} 
        onSubmit={handleSubmit}
        >
          

          <p>User Name</p>
          <input
           value={formData.username}
            placeholder="eg :username"
            id='username'
            onChange={handleInputChange}
            required
          />

          <p>Email Address</p>
          <input
          //  value={formData.email}
            placeholder="exanmpl@gmail.com"
            onChange={handleInputChange}
            required
          />
          <div className="">
            <label className={styles.password}>Password</label>
            <input
              type="password"
              className={styles.input}
              // value={formData.password}
              placeholder="Enter your password"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="">
            <label className={styles.password}>Confirm Password</label>
            <input
              type="password"
              className={styles.input}
              value={formData.confirmPassword}
              placeholder="Enter your password"
              required
              id='confirmPassword'
              onChange={handleInputChange}
            />
          </div>
          <button className={styles.btn} >
            {isLoading ? "Signing you up..." : "Create Account"}
          </button>
          <div >
            <p style={{text:"center"}}>Already register{' '}
              <Link to='/login'>Sign In</Link>
            </p>
          </div>
        </form>
        {formValidMessage && <p className={styles.error}>{formValidMessage}</p>}
      </div>
    </>
  );
};

export default Register;