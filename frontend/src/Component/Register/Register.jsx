import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import {Link} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
// import Axios from 'axios'

const Register = () => {

  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)


//   const [error, setError] = useState(null)
//   const[form, setForm] = useState({
//    username: "",
//   //  lastName: "",
//    email: "",
//    password: "",
//    confirmPassword: "",
//   //  isSubmitting: null,
//   })
// console.log(form)
  // const [passwordMatch,setPasswordMatch] = useState(true)
//   useEffect(()=> {
// setPasswordMatch(form.password === form.confirmPassword
// || form.confirmPassword ===''
// );
//   })

  //  const handleChange = (e) => {
  //   const{name, value} = e.target;
  //   setForm({
  //     ...form,
  //     [name]: value,
      
  //   })
  //  }
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.id]:e.target.value
//     })
//     }


//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       setIsLoading(true)
//       const response = await fetch('http://localhost:4500/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: form
//       })

// const data  = await response.json()
// if (data.success === false) {
//   console.log(data)
//   setError("could not signup",error.message)
//   setIsLoading(false)
//   return;
// }
// setIsLoading(false)
// setError(null)
// navigate('/signin')

//      } catch (err) {
//        console.error(err);
//       setIsLoading(false)
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await signUp(username, email, password);
  } catch (err) {
    console.error(err);
  }
  setIsLoading(false)
  navigate("/signin")
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
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <p>Email Address</p>
          <input
           value={email}
            placeholder="exanmpl@gmail.com"
            // id='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="">
            <label className={styles.password}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              placeholder="Enter your password"
              required
              // id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="">
            <label className={styles.password}>Confirm Password</label>
            <input
              type="password"
              className={styles.input}
              value={confirmPassword}
              placeholder="Enter your password"
              required
              id='confirmPassword'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className={styles.btn} >
            {isLoading ? "Signing you up..." : "Create Account"}
          </button>
          <div >
            <p style={{text:"center"}}>Already register{' '}
              <Link to='/signin'>Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
