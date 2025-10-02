async function processPayment() {
  const btn = document.getElementById("payerBtn");
  const submitText = document.getElementById("submitText");
  const spinner = document.getElementById("spinner");

  btn.disabled = true;
  submitText.textContent = "Traitement...";
  spinner.classList.remove("d-none");

  try {
    // 🔥 CORRECTION : "genre" au lieu de "gender"
    const genreInput = document.querySelector('input[name="genre"]:checked');
    if (!genreInput) {
      throw new Error("Veuillez sélectionner votre genre");
    }

    const formData = {
      genre: genreInput.value,
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
      date_inscription: new Date().toLocaleString("fr-FR"),
    };

    // Validation
    if (!formData.email || !formData.message) {
      throw new Error("Veuillez remplir tous les champs obligatoires");
    }

    // 🔥 CORRECTION : URL complète avec le bon endpoint
    const response = await fetch(
      "https://www.solutionconfidence.com/api/paiement1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'inscription.");
    }

    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
    } else {
      throw new Error("Lien de paiement introuvable.");
    }
  } catch (error) {
    alert("Erreur: " + error.message);
    resetButton();
  }
}

function resetButton() {
  const btn = document.getElementById("payerBtn");
  const submitText = document.getElementById("submitText");
  const spinner = document.getElementById("spinner");

  btn.disabled = false;
  submitText.textContent = "Payer et soumettre";
  spinner.classList.add("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("payerBtn");
  if (btn) {
    btn.addEventListener("click", processPayment);
  }
});
