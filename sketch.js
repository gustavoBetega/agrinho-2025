// Variáveis principais
let cropStatus = "semente";
let soilMoisture = 50;
let soilNutrients = 50;
let growth = 0;
let harvestCount = 0;
let weather = "normal"; // normal, seca, chuva
let frameCounter = 0;

function setup() {
  createCanvas(600, 400);
  frameRate(1); // Simula passagem de tempo (1x por segundo)
}

function draw() {
  background(200, 230, 255);
  drawSoil();
  drawPlant();
  drawUI();
  handleWeather();
  growCrop();
  showIATip();

  frameCounter++;
  if (frameCounter % 5 === 0) {
    changeWeather(); // Muda clima a cada 5 segundos
  }
}

// ---------- VISUALS ----------

function drawSoil() {
  fill(139, 69, 19); // marrom
  rect(0, 300, width, 100);
}

function drawPlant() {
  if (cropStatus === "semente") {
    fill(255, 255, 0);
    ellipse(width/2, 300, 10, 10);
  } else if (cropStatus === "crescendo") {
    fill(34, 139, 34);
    rect(width/2 - 5, 300 - growth, 10, growth);
  } else if (cropStatus === "pronto") {
    fill(255, 165, 0);
    ellipse(width/2, 300 - 50, 30, 30);
  }
}

function drawUI() {
  fill(0);
  textSize(16);
  text("🌤 Clima: " + weather, 20, 30);
  text("💧 Umidade: " + soilMoisture, 20, 60);
  text("🌱 Nutrientes: " + soilNutrients, 20, 90);
  text("📈 Status: " + cropStatus, 20, 120);
  text("🥕 Colheitas: " + harvestCount, 20, 150);

  drawButton(50, 200, "Regar");
  drawButton(200, 200, "Fertilizar");
  drawButton(350, 200, "Colher");
}

function drawButton(x, y, label) {
  fill(220);
  rect(x, y, 120, 40, 10);
  fill(0);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(label, x + 60, y + 20);
  textAlign(LEFT);
}

// ---------- CRESCIMENTO E CLIMA ----------

function growCrop() {
  if (cropStatus === "crescendo" && soilMoisture > 30 && soilNutrients > 30) {
    growth += 10;
    soilMoisture -= 5;
    soilNutrients -= 3;
    if (growth >= 60) {
      cropStatus = "pronto";
    }
  }
}

function changeWeather() {
  let weatherOptions = ["normal", "seca", "chuva"];
  weather = random(weatherOptions);
}

function handleWeather() {
  if (weather === "seca") {
    soilMoisture = max(0, soilMoisture - 5);
  } else if (weather === "chuva") {
    soilMoisture = min(100, soilMoisture + 10);
  }
}

// ---------- AÇÕES ----------

function mousePressed() {
  // Regar
  if (mouseX > 50 && mouseX < 170 && mouseY > 200 && mouseY < 240) {
    soilMoisture = min(100, soilMoisture + 20);
  }

  // Fertilizar
  if (mouseX > 200 && mouseX < 320 && mouseY > 200 && mouseY < 240) {
    soilNutrients = min(100, soilNutrients + 20);
  }

  // Colher
  if (mouseX > 350 && mouseX < 470 && mouseY > 200 && mouseY < 240) {
    if (cropStatus === "pronto") {
      harvestCount++;
      cropStatus = "semente";
      soilMoisture = 50;
      soilNutrients = 50;
      growth = 0;
    } else if (cropStatus === "semente") {
      cropStatus = "crescendo";
    }
  }
}

// ---------- SUGESTÕES DA IA ----------

function showIATip() {
  let msg = "";

  if (cropStatus === "semente") {
    msg = "Plante a semente clicando em COLHER!";
  } else if (cropStatus === "crescendo") {
    if (soilMoisture < 30) {
      msg = "A IA recomenda: REGAR urgentemente!";
    } else if (soilNutrients < 30) {
      msg = "A IA recomenda: FERTILIZAR sua terra!";
    } else {
      msg = "Planta crescendo bem. Continue assim!";
    }
  } else if (cropStatus === "pronto") {
    msg = "A planta está pronta! CLIQUE em COLHER!";
  }

  fill(0);
  textSize(14);
  text("🤖 IA diz: " + msg, 20, 280);
}
