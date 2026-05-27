<script>
console.log("🚀 Script loaded");

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("📩 Form submitted");

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  console.log("📦 Sending data:", data);

  try {
    const res = await fetch("https://form-backend-j42i.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    console.log("📡 Response status:", res.status);

    const result = await res.json();
    console.log("✅ Response:", result);

    alert("Sent successfully ✅");

    form.reset();
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Request failed ❌ check console");
  }
});
</script>
