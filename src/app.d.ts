// src/app.d.ts
/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Platform {
    env: {
      DB: D1Database;
      API_KEY: string;
    };
  }
}
