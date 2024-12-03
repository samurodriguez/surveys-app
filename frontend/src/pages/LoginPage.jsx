import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      <h2>Login</h2>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          //   const { email, password } = Object.fromEntries(
          //     new FormData(event.target)
          //   );

          const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const body = await res.json();

          console.log(body);
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Iniciar sesión</button>
      </form>
    </main>
  );
};

export { LoginPage };
