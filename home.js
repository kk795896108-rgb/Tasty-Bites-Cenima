function searchFood() {
    const input = document.getElementById("search");
    const searchText = input.value.toLowerCase().trim();
    const targetSection = document.getElementById("topSearchableFoods");
    if (!targetSection) return;

    const foods = targetSection.querySelectorAll(".food");
    const noResult = document.getElementById("noResult");
    let foundCount = 0;

    foods.forEach(function (food) {
        const nameAttr = food.dataset.name || "";
        const titleEl = food.querySelector("h2");
        const descEl = food.querySelector("p");
        
        const titleText = titleEl ? titleEl.textContent : "";
        const descText = descEl ? descEl.textContent : "";

        const searchableText = `${nameAttr} ${titleText} ${descText}`.toLowerCase();

        if (!searchText || searchableText.includes(searchText)) {
            food.style.display = "flex";
            foundCount++;
        } else {
            food.style.display = "none";
        }
    });

    if (noResult) {
        if (foundCount > 0) {
            noResult.style.display = "none";
        } else {
            noResult.style.display = "block";
        }
    }
}

function filterCategory(category) {
    const targetSection = document.getElementById("topSearchableFoods");
    if (!targetSection) return;

    const foods = targetSection.querySelectorAll(".food");
    const noResult = document.getElementById("noResult");
    const filterButtons = document.querySelectorAll(".dishes button");
    let foundCount = 0;

    filterButtons.forEach(btn => {
        const btnCat = btn.getAttribute("data-category") || "all";
        if (btnCat.toLowerCase() === category.toLowerCase() || (category === "all" && !btn.hasAttribute("data-category"))) {
            btn.classList.add("active-cat");
        } else {
            btn.classList.remove("active-cat");
        }
    });

    foods.forEach(function (food) {
        const itemCategory = (food.dataset.category || "").toLowerCase();
        
        if (category === "all" || itemCategory === category.toLowerCase()) {
            food.style.display = "flex";
            foundCount++;
        } else {
            food.style.display = "none";
        }
    });

    if (noResult) {
        if (foundCount > 0) {
            noResult.style.display = "none";
        } else {
            noResult.style.display = "block";
        }
    }
}

function off1() {
    buy('offer1', 160, 'images/offer1.jpg');
}

function off2() {
    buy('offer2', 40, 'images/offer2.jpg');
}

function off3() {
    buy('offer3', 199, 'images/offer3.jpg');
}

function off4() {
    buy('offer4', 12, 'images/offer4.jpg');
}