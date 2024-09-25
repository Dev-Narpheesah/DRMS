import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import PasswordInput from '../passwordInput/passwordInput'


const initialState = {
  name: "",
  age: "",
  roomNum: "",
  email: "",
  gender: "",
  g_name: "",
  g_email: "",
  nationality: "",
};
const Register = () => {
 
  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { username, email, password, confirmPassword} =
    formData;

  const navigate = useNavigate();

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
  
    axios.post('http://localhost:4000/api/admin/register' ,formData)
    .then((response) => {
      console.log(response)
      setIsSubmitting(false)
     
  
      toast.success("Registration Successful")
      navigate('/signin')
    }).catch((error) => {
      setIsSubmitting(false)
      const message = error.response?.status === 400 ?
      "User already exist" : "Server error "
      setFormValidMessage(message)
      toast.error(message)
    })
  
   
  };

  return (
    <>
      <div className={styles.container_reg}>
        <form className={styles.container} onSubmit={handleSubmit}>
          

          <p>User Name</p>
          <input
           value={username}
            placeholder="eg :username"
            id='username'
            onChange={handleInputChange}
            required
          />

          <p>Email Address</p>
          <input
           value={email}
            placeholder="exanmpl@gmail.com"
            id='email'
            onChange={handleInputChange}
            required
          />
          <div className="">
            <label className={styles.password}>Password</label>
            <PasswordInput
              type="password"
              className={styles.input}
              value={password}
              placeholder="Enter your password"
              required
              id='password'
              onChange={handleInputChange}
            />
          </div>

          <div className="">
            <label className={styles.password}>Confirm Password</label>
            <PasswordInput
              type="password"
              className={styles.input}
              value={confirmPassword}
              placeholder="Enter your password"
              required
              id='confirmPassword'
              onChange={handleInputChange}
            />
          </div>
          <button className={styles.btn} >
            {isSubmitting ? "Signing you up..." : "Create Account"}
          </button>
          <div >
            <p style={{text:"center"}}>Already register{' '}
              <Link to='/signin' style={{color: "#11648a"}}>Sign In</Link>
            </p>

          </div>
          {formValidMessage && <p className="erro-message">{formValidMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;