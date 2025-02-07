import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal();
    } catch (res) {
      const data = await res.json();
      console.log(data);
      if (data?.errors) {
        setErrors(data.errors);
      } else if (data?.message) {
        setErrors({ general: data.message });
      }
    }
  };

  return (
    <div className="login-form-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>Username or Email</label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Enter your email or username"
        />
        {errors.credential && <p className="error">{errors.credential}</p>}

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {/* General error handling (e.g., invalid login credentials) */}
        {errors.general && <p className="error">{errors.general}</p>}

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
