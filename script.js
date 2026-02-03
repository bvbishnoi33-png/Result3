function checkResult() {
    const roll = document.getElementById("rollNo").value.trim();
    const resultBox = document.getElementById("resultBox");
    const errorBox = document.getElementById("errorBox");
    const resultText = document.getElementById("resultText");
    const downloadBtn = document.getElementById("downloadBtn");
    const pdfPreview = document.getElementById("pdfPreview");

    resultBox.classList.add("hidden");
    errorBox.classList.add("hidden");

    let pdfName = null;

    // NORMAL STUDENTS
    if (/^2416508000\d{2,3}$/.test(roll)) {
        const num = parseInt(roll.slice(-3));
        if (num >= 1 && num <= 68) {
            pdfName = num + ".pdf";
        }
    }

    // DETL STUDENTS
    else if (/^24165082500[1-6]$/.test(roll)) {
        pdfName = "D" + roll.slice(-1) + ".pdf";
    }

    // SPECIAL CASE
    else if (roll === "231650800055") {
        pdfName = "P55.pdf";
    }

    if (!pdfName) {
        errorBox.innerText = "❌ Invalid roll number or result not available.";
        errorBox.classList.remove("hidden");
        return;
    }

    fetch(pdfName, { method: "HEAD" })
        .then(res => {
            if (!res.ok) throw new Error();

            resultText.innerHTML = `Result found for Roll No <b>${roll}</b>`;
            pdfPreview.src = pdfName;
            downloadBtn.href = pdfName;

            resultBox.classList.remove("hidden");
        })
        .catch(() => {
            errorBox.innerText = "❌ Result not found.";
            errorBox.classList.remove("hidden");
        });
}
