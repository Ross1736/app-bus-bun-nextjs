"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface FormAuthProps {
  readonly type: "login" | "register";
}

function FormAuth({ type }: FormAuthProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "user4@gmail.com",
    password: "123123",
    confirm_password: "123123",
  });

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (type === "login") {
        const res = await axios.post("/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data) {
          router.push("/");
        }
      } else if (type === "register") {
        if (formData.password !== formData.confirm_password) {
          alert("Passwords do not match");
          return;
        } else if (formData.password.length < 6) {
          alert("Password must be at least 6 characters");
          return;
        }

        const res = await axios.post("/api/auth/register", {
          email: formData.email,
          password: formData.confirm_password,
        });

        if (res.data) {
          const resLogin = await axios.post("/api/auth/login", {
            email: formData.email,
            password: formData.confirm_password,
          });

          if (resLogin.data) {
            router.push("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
      <div>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChangeInput}
        />
      </div>

      {type === "register" && (
        <div>
          <label htmlFor="password">confirm password</label>
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChangeInput}
          />
        </div>
      )}

      <button>login</button>
    </form>
  );
}

export default FormAuth;
