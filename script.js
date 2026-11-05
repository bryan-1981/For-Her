//an array = a list
const reasons = [
"I love the way you make me feel like I am the only person in the world.",
"I love the way you give me puppy eyes.",
"I love the way you always listen to me even when its something stupid.",
"I love the way you make me a better man.",
"I love the way you make me laugh.",
"I love how smart and disciplined you are.",
"The way you say BYEEEEEEE.",
"I love the way you are when we're on roadtrips how you make me feel like a kid again.",
"I love how we can just be in the car and not say a word and still be happy.",
"I love the fact that you make me hate on ASU just because you're a 'wildcat'",
"I love the way you are with your family and how much you care about them.",
"I love it when we play among us and how you always end up killing me.",
"I love how everytime we go out and eat you make me sit down next to you.",
"I love when we just talk about the future, OUR future.",
"I love how you always want to go looking for packs at frys rather than paying scalper prices.",  
"I love how your always down to go with me on random side quests.",
"I love going to card shows together", 
"I love ripping packs with you", 
];
//TE AMO ANGUIIIIIIIII 

const dateIdeas = [
    "Go to the movies together",
    "Have a picnic but make it fancy (bring a blanket and some wine & dress up)",
    "Try a new restaurant ( we ask a random couple for a recommendation )",
    "Take a cooking class together",
    "Go for a walk around the park and try to catch FISH.",
    "Watch a sunrise or sunset",
    "We buy each other a gift correlated to our favorite color",
    "Go to a museum or art gallery.",
    "Fry's date night, we go to fry's and hunt for some pokemon packs.",
    "Go to a comedy show or live performance",
    "Go to a candle making workshops",
    "Play among us together and the loser has to do a dare from the winner."
    // removed the empty "" at the end, it was a 1-in-14 chance of a blank date lol
];

// ---------- helpers ----------

// picks a random item but never the same one twice in a row
function pickRandom(list, lastIndex) {
    let i;
    do {
        i = Math.floor(Math.random() * list.length);
    } while (i === lastIndex && list.length > 1);
    return i;
}

// swaps the text and replays the fade-in animation
function showText(id, text) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.classList.remove("pop");
    void el.offsetWidth;        // forces the browser to "reset" so the animation can replay
    el.classList.add("pop");
}

let lastReason = -1;
let lastDate = -1;

function showReason() {
    lastReason = pickRandom(reasons, lastReason);
    showText("output", reasons[lastReason]);
    plantFlower();
}

function showDate() {
    lastDate = pickRandom(dateIdeas, lastDate);
    showText("dateOutput", dateIdeas[lastDate]);
    plantFlower();
}

// ---------- the garden ----------

const garden = document.getElementById("garden");
// her colors: rose pink, orange, purple (a couple shades each so it's not flat)
const petalColors = ["#ff8fab", "#ff6b9d", "#ffa94d", "#ff8c42", "#b185db", "#9d6bd6"];
const MAX_FLOWERS = 28;   // so the page doesn't get laggy after 500 clicks

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function plantFlower() {
    const flower = document.createElement("div");
    flower.className = "flower";

    // random spot, height, color, petal size -> CSS reads these as variables (--h, --c, --p)
    flower.style.left = rand(4, 96) + "%";
    flower.style.setProperty("--h", rand(60, 170) + "px");
    flower.style.setProperty("--c", petalColors[Math.floor(Math.random() * petalColors.length)]);
    flower.style.setProperty("--p", rand(12, 20) + "px");
    flower.style.animationDelay = -rand(0, 3.5) + "s";   // negative delay = flowers don't all sway in sync

    // build the petals: each one gets its index (--i) and the total (--n) so CSS can rotate it
    const n = Math.floor(rand(5, 8));
    let petals = "";
    for (let i = 0; i < n; i++) {
        petals += `<div class="petal" style="--i:${i};--n:${n}"></div>`;
    }

    flower.innerHTML = `
        <div class="stem"><div class="leaf"></div></div>
        <div class="head">${petals}<div class="core"></div></div>
    `;

    garden.appendChild(flower);

    // too many flowers? remove the oldest one
    if (garden.children.length > MAX_FLOWERS) {
        garden.removeChild(garden.firstElementChild);
    }
}

// ---------- falling petals ----------

const petalLayer = document.getElementById("petals");
// if her device says "reduce motion", we skip the falling petals entirely
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function dropPetal() {
    const p = document.createElement("div");
    p.className = "fall";

    p.style.left = rand(0, 100) + "%";
    p.style.setProperty("--s", rand(10, 18) + "px");     // size
    p.style.setProperty("--d", rand(8, 14) + "s");       // how long the fall takes
    p.style.setProperty("--x", rand(20, 70) + "px");     // how far it drifts side to side
    p.style.setProperty("--c", petalColors[Math.floor(Math.random() * petalColors.length)]);

    petalLayer.appendChild(p);

    // when the fall animation ends, delete the petal so they don't pile up in the DOM
    p.addEventListener("animationend", () => p.remove());
}

if (!reduceMotion) {
    setInterval(dropPetal, 800);   // a new petal every 0.8 sec
}