// Captura de elementos do DOM:

// Campo onde será gerado a senha
const inputEl = document.querySelector("#password");

// Indicador de segurança senha
const indicadorBarEl = document.querySelector("#indicadorBar");

// Tamanho da senha(Slider)
const passwordLengthEl = document.querySelector("#password-length");

// Checkboxes
const uppercaseCheckEl = document.querySelector("#uppercaseCheck");
const numberCheckEl = document.querySelector("#numberCheck");
const symbolCheckEl = document.querySelector("#symbolCheck");

// Variavel de estado:
let passwordLength = 16;

// Função responsavel por calcular a "força" da senha
function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 64) * 25 + //Peso do tamanho da senha
      (uppercaseCheckEl.checked ? 15 : 0) + //Peso de maiúsculas
      (numberCheckEl.checked ? 25 : 0) + //Peso de números
      (symbolCheckEl.checked ? 35 : 0), //Peso de simbolos
  );

  // Definir largura do indicador proporcional a força da senha
  indicadorBarEl.style.width = `${percent}%`;

  //   Classificação visual por nível de segurança
  if (percent > 69) {
    // Senha forte
    indicadorBarEl.classList.remove("critical");
    indicadorBarEl.classList.remove("warning");
    indicadorBarEl.classList.add("safe");
  } else if (percent > 50) {
    // Senha média
    indicadorBarEl.classList.remove("critical");
    indicadorBarEl.classList.add("warning");
    indicadorBarEl.classList.remove("safe");
  } else {
    // Senha fraca
    indicadorBarEl.classList.add("critical");
    indicadorBarEl.classList.remove("warning");
    indicadorBarEl.classList.remove("safe");
  }

  //   Quando atingir 100%, marcar como completa
  if (percent >= 100) {
    indicadorBarEl.classList.add("completed");
  } else {
    indicadorBarEl.classList.remove("completed");
  }
}

// Função gerar senha
function generatePassword() {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "1234567890";
  const symbolChars = "!@#$&*^~";

  // Quando o checkbox estiver marcado, irá adicionar ao conjunto
  if (uppercaseCheckEl.checked) {
    chars += uppercaseChars;
  }
  if (numberCheckEl.checked) {
    chars += numberChars;
  }
  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  //   Variável onde irá armazenar a senha final:
  let password = "";

  //   Loop que gera cada caracter da senha:
  for (let i = 0; i < passwordLength; i++) {
    // Gera um número aleatório do conjunto de caracter
    const randomNumber = Math.floor(Math.random() * chars.length);

    // Pega 1 caractere aleatório da string
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  //   Exibe a senha no input
  inputEl.value = password;

  //   Exibe o indicador de força
  calculateQuality();

  // Ajusta tamanho da fonte
  calculateFontSize();
}

// Evento do slider tamanho da senha:
passwordLengthEl.addEventListener("input", function () {
  // Atualizar o valor da variavel global
  passwordLength = passwordLengthEl.value;

  // Atualizar o valor do texto
  document.querySelector("#passwordLengthText").innerHTML = passwordLength;

  // Gera nova senha automaticamente
  generatePassword();
});

function copy() {
  navigator.clipboard.writeText(inputEl.value);
}

function calculateFontSize() {
  // Se senha muito grande, então fonte pequena
  if (passwordLength > 45) {
    inputEl.classList.remove("font-small");
    inputEl.classList.remove("font-mid");
    inputEl.classList.add("font-big");
    // Se senha grande, então fonte pequena
  } else if (passwordLength > 32) {
    inputEl.classList.remove("font-small");
    inputEl.classList.add("font-mid");
    inputEl.classList.remove("font-big");
  } else if (passwordLength > 22) {
    inputEl.classList.add("font-small");
    inputEl.classList.remove("font-mid");
    inputEl.classList.remove("font-big");
  } else {
    inputEl.classList.remove("font-small");
    inputEl.classList.remove("font-mid");
    inputEl.classList.remove("font-big");
  }
}

// Eventos do checkboxes:
uppercaseCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);

// Evento Copiar
document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);

// Evento atualiza senha
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();
