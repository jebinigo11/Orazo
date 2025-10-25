// src/utils/downloadBilling.js
export async function downloadBillingPdf(userId, month, accountType) {
  try {
    // Determine backend URL
    let url = "";
    if (accountType.toUpperCase() === "POSTPAID") {
      url = `http://localhost:8080/billing/generate/${userId}/${month}/${accountType}`;
    } else if (accountType.toUpperCase() === "PREPAID") {
      url = `http://localhost:8081/bill/${userId}?month=${month}`; // alert-service
    } else {
      throw new Error("Unknown account type: " + accountType);
    }

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const blob = await response.blob();
    const filename = `bill_${userId}_${month}.pdf`;

    // Trigger download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

  } catch (error) {
    console.error("PDF download failed:", error.message);
    alert(error.message);
  }
}
