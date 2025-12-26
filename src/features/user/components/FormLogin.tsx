"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

function FormLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "user1@gmail.com",
    password: "123123",
  });

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await axios.post("/api/auth", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data) {
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button>login</button>
    </form>
  );
}

export default FormLogin;
