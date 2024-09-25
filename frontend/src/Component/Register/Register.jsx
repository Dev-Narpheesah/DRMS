import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import {Link} from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext';


const Register = () => {
 

  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await signUp(username, email, password);
  } catch (err) {
    console.error(err);
  }
  setIsLoading(false)
  navigate("/card")
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