import React, { useState,useContext } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Context/AuthContext';
// import {useDispatch, useSelector} from 'react-redux'
// import { signInStart, signInFailure, signInSuccess } from "../../app/userSlice";


const SignIn = () => {

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const {loading ,error} = useSelector((state) => state.user)

  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  // const [formValidMessage, setFormValidMessage] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]:e.target.value
  //   })
  //   }

  // console.log(formData);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     dispatch(signInStart())
  //     const res = await fetch("http://localhost:4500/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({email , password}),
  //     });
  //     const data = await res.json();
  //     if (data) {
  //       console.log(data);
  //       dispatch(
  //         setSignin({
  //           user:data.user,
  //           token:data.token
  //         })
  //       )
  //       navigate('/')
  //   //     dispatch(signInFailure(data.message));
  //   //     return;
  //   //   }
  //   //   dispatch(signInSuccess(data));
  //   //   navigate("/")
  //   // } catch (error) {
  //   //   dispatch(signInFailure(error.message));
  //   // }
  //   // setFormData({...formData, [e.target.id]: ''});
  //     }
  // }catch(error) {
  //   console.log('Login failed', error.message)
  // }
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const res = await fetch("http://localhost:4500/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password })
  //     });
  
  //     if (!res.ok) {
  //       throw new Error('Sign in failed. Please check your credentials.');
  //     }
  
  //     const data = await res.json();
  
  //     dispatch(
  //       setSignin({
  //         user: data.user,
  //         token: data.token,
  //       })
  //     );
  //     navigate('/');
  //   } catch (error) {
  //     setError(error.message);
  //     console.log('Login failed', error.message);
  //   }
  // };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      console.error(err);
    }

navigate("/")
    
};

  return (
    <div className={styles.signinContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.formTitle}>Sign In</p>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="example@123.com"
            name="email"
            value={email}
            onChange={(e)=>setEmail (e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button 
        // disabled={loading}
         className={styles.submit} type="submit">
          Sign In
        </button>
        <p className={styles.signupLink}>
          No account?
          <Link to="/register">Sign up</Link>
        </p>
        {/* {error && <p>{error}</p>} */}
      </form>
    </div>
  );
};

export default SignIn;
