function checkResult() {
    const roll = document.getElementById("rollNo").value.trim();
    const resultBox = document.getElementById("resultBox");
    const errorBox = document.getElementById("errorBox");
    const resultText = document.getElementById("resultText");
    const downloadBtn = document.getElementById("downloadBtn");

    resultBox.classList.add("hidden");
    errorBox.classList.add("hidden");

    let pdfName = null;

    // NORMAL STUDENTS
    // 241650800001 → 1.pdf
    // 241650800068 → 68.pdf
    if (/^2416508000\d{2,3}$/.test(roll)) {
        const lastDigits = parseInt(roll.slice(-3));
        if (lastDigits >= 1 && lastDigits <= 68) {
            pdfName = lastDigits + ".pdf";
        }
    }

    // DETL STUDENTS
    // 241650825001 → D1.pdf
    // 241650825006 → D6.pdf
    else if (/^24165082500[1-6]$/.test(roll)) {
        const detNo = roll.slice(-1);
        pdfName = "D" + detNo + ".pdf";
    }

    // SPECIAL CASE
    // 231650800055 → P55.pdf
    else if (roll === "231650800055") {
        pdfName = "P55.pdf";
    }

    if (pdfName) {
        // SAME FOLDER → no path needed
        fetch(pdfName, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    resultText.innerHTML =
                        `Result found for Roll No <b>${roll}</b>`;
                    downloadBtn.href = pdfName;
                    resultBox.classList.remove("hidden");
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                errorBox.innerText = "❌ Result not found.";
                errorBox.classList.remove("hidden");
            });
    } else {
        errorBox.innerText = "❌ Invalid roll number or result not available.";
        errorBox.classList.remove("hidden");
    }
}
