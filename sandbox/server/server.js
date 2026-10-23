import app from "./src/app.js";

app.listen(3000, () => {
    console.log("Sandbox service is running http://localhost:3000/api/sandbox/health");
});