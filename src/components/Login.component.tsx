import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

interface JwtPayload {
  sub: string;  
  email: string; 
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const accessToken = data.data.accessToken;
        sessionStorage.setItem("accessToken", accessToken);

        const decoded: JwtPayload = jwt_decode(accessToken);
        const userId = decoded.sub; 
        sessionStorage.setItem("userId", userId); 

        Swal.fire({
          title: "Login successful!",
          text: "Redirecting to dashboard...",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        console.error("Login error response:", data);
        Swal.fire({
          title: "Login failed",
          text: data.message || "Invalid email or password",
          icon: "error",
        });
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          Welcome,
          <br />
          <span>log in to continue</span>
        </div>
        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="input"
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="button-confirm" type="submit">
          Log in
        </button>
        {error && <div className="error-message">{error}</div>}
        <div className="register-link">
          <span>Don't have an account? </span>
          <Link to="/register" className="register-text">Sign up</Link>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: beige;
    --main-color: black;
    padding: 20px;
    background: lightblue;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    max-width: 300px;
  }

  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 25px;
  }

  .title span {
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .input:focus {
    border: 2px solid var(--input-focus);
  }

  .button-confirm {
    margin: 50px auto 0 auto;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
  }

  .register-link {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: var(--font-color);
  }

  .register-text {
    color: var(--input-focus);
    font-weight: 600;
    text-decoration: none;
  }

  .register-text:hover {
    text-decoration: underline;
  }
`;

export default Login;

function jwt_decode(token: string): JwtPayload {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
}
