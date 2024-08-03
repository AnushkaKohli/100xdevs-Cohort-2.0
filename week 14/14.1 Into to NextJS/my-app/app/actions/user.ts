"use server"; // This directive marks the file as containing Server Actions

// similar to /app/api/user/signup/route.ts
export async function signup(username: string, password: string) {
  // You can add validation logic here (e.g., using Zod)
  //   const user = await client.user.create({
  //     data: {
  //       username,
  //       password,
  //     },
  //   });
  console.log("Username: ", username, "\nPassword: ", password);
  return "Signed up!";
}
