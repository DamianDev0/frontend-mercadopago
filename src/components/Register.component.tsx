import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error during registration");
        throw new Error(data.message || "Error during registration");
      }

      Swal.fire({
        title: "Registration successful!",
        text: "You will be redirected to login.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err instanceof Error ? err.message : "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          Welcome,
          <br />
          <span>sign up to continue</span>
        </div>
        <input
          className="input"
          name="name"
          placeholder="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
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
        <input
          className="input"
          name="address"
          placeholder="Address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          className="input"
          name="phone"
          placeholder="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <button className="button-confirm" type="submit">
          Register
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: beige;
    --main-color: black;
    padding: 40px;
    background: lightblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    width: 400px;
  }

  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 30px;
    margin-bottom: 25px;
    text-align: center;
  }

  .input {
    width: 350px;
    height: 45px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .button-confirm {
    margin: 50px auto 0 auto;
    width: 140px;
    height: 45px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 18px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }
`;

export default Register;
