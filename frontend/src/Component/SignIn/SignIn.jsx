import React, { useState, useContext, useCallback } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../passwordInput/passwordInput";
import { AuthContext } from "../../../Context/AuthContext";

const SignIn = () => {
  const { setUser } = useContext(AuthContext); // Get setUser from context
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { email, password } = formData;

      if (!email || !password) {
        setFormValidMessage("Please fill in all required fields");
        return;
      }
      
      setIsSubmitting(true); // Disable the button

      axios
        .post("http://localhost:4000/api/admin/login", formData)
        .then((response) => {
          setUser(response.data); // Set user in context
          setIsSubmitting(false);
          toast.success("Login Successful");
          navigate("/user", { state: { user: response.data } });
        })
        .catch((error) => {
          setIsSubmitting(false);
          const message =
            error.response?.status === 400
              ? "Invalid Credentials"
              : "Server error. Please try again later.";
          setFormValidMessage(message);
          toast.error(message);
        });
    },
    [formData, navigate, setUser]
  );

  return (
    <div className={styles.signinContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.formTitle}>Sign In</p>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="example@123.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <PasswordInput
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className={styles.submit}
          type="submit"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        <p className={styles.signupLink}>
          No account?
          <Link to="/signup">Sign up</Link>
        </p>
        {formValidMessage && <p className={styles.errorMessage}>{formValidMessage}</p>}
      </form>
    </div>
  );
};

export default SignIn;
