function numberToWords(amount) {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
  const teens = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const thousands = ["","Thousand","Million","Billion"];

  function convertHundreds(num) {
    let word = "";
    if(num > 99) {
      word += ones[Math.floor(num/100)] + " Hundred ";
      num = num % 100;
    }
    if(num > 19) {
      word += tens[Math.floor(num/10)] + " ";
      num = num % 10;
    } else if(num >= 10) {
      word += teens[num-10] + " ";
      num = 0;
    }
    if(num > 0) word += ones[num] + " ";
    return word.trim();
  }

  if (isNaN(amount)) return "";

  const parts = amount.toString().split(".");
  const riyals = parseInt(parts[0]) || 0;
  const halalas = parts[1] ? parseInt(parts[1].substring(0,2).padEnd(2,'0')) : 0;

  if (riyals === 0 && halalas === 0) return "SR. Zero Riyal's Only.";

  let words = "";
  let riyalPart = riyals;
  let thousandCounter = 0;

  while (riyalPart > 0) {
    let chunk = riyalPart % 1000;
    if (chunk) {
      words = convertHundreds(chunk) + (thousands[thousandCounter] ? " " + thousands[thousandCounter] : "") + " " + words;
    }
    riyalPart = Math.floor(riyalPart / 1000);
    thousandCounter++;
  }

  words = words.trim();

  if (halalas > 0) {
    let halalaWords = "";
    if(halalas < 10) {
      halalaWords = ones[halalas];
    } else if(halalas < 20) {
      halalaWords = teens[halalas - 10];
    } else {
      halalaWords = tens[Math.floor(halalas/10)] + " " + ones[halalas % 10];
    }
    halalaWords = halalaWords.trim();

    return `SR. ${words} and ${halalaWords} Halala's Only.`;
  } else {
    return `SR. ${words} Riyal's Only.`;
  }
}

// This function is called by oninput event in your index.html amount input field
function convertAmountToWords() {
  const amountInput = document.getElementById("amount");
  const amountWordsInput = document.getElementById("amountWords");

  if (!amountInput || !amountWordsInput) return;

  const value = parseFloat(amountInput.value);
  if (!isNaN(value) && value >= 0) {
    amountWordsInput.value = numberToWords(value);
  } else {
    amountWordsInput.value = "";
  }
}
