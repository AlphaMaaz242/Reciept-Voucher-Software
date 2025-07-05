// Convert amount to words
function convertToWords(num) {
  const words = numToWords(parseInt(num));
  document.getElementById("amountWords").value = "SR. " + words + " Only";
}

// Basic number to words converter (for now 0–99999)
function numToWords(num) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  if (isNaN(num) || num === 0) return "Zero Riyals";

  let word = "";

  if (Math.floor(num / 1000) > 0) {
    word += numToWords(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }
  if (Math.floor(num / 100) > 0) {
    word += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }
  if (num > 0) {
    if (num < 10) word += ones[num];
    else if (num < 20) word += teens[num - 10];
    else {
      word += tens[Math.floor(num / 10)];
      if (num % 10 > 0) word += " " + ones[num % 10];
    }
  }
  return word.trim() + " Riyals";
}

// PDF Download with jsPDF
document.getElementById("downloadPdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "pt", "a4");
  doc.html(document.querySelector("#voucher"), {
    callback: function (doc) {
      doc.save("Receipt-Voucher.pdf");
    },
    x: 20,
    y: 20,
    width: 555
  });
});
