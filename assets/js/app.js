const STORAGE_KEYS = {
    user: "savor-user",
    recipes: "savor-recipes",
    favorites: "savor-favorites",
};

const starterRecipes = [
    {
        id: "garden-paneer-tikka",
        title: "Makhmali Paneer Tikka",
        category: "Vegetarian",
        time: 35,
        difficulty: "Easy",
        description: "Soft paneer in a creamy, gently spiced marinade with bright green chutney.",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85",
        ingredients: ["250 g paneer, cubed", "1/2 cup thick yogurt", "1 tbsp gram flour", "1 tsp garam masala", "1 bell pepper, chopped", "Lemon and mint chutney, to serve"],
        steps: ["Whisk yogurt, gram flour, spices, and a pinch of salt until smooth.", "Fold in the paneer and bell pepper; marinate for 20 minutes.", "Thread onto skewers and roast in a hot oven or pan until golden.", "Finish with lemon and serve warm with mint chutney."],
    },
    {
        id: "rainbow-veggie-bowl",
        title: "Rainbow Veggie Bowl",
        category: "Vegan",
        time: 25,
        difficulty: "Easy",
        description: "A colorful bowl of crisp vegetables, hearty grains, and a creamy tahini dressing.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
        ingredients: ["2 cups cooked quinoa", "1 avocado, sliced", "1 cup cherry tomatoes", "1 cucumber, sliced", "2 cups leafy greens", "2 tbsp tahini and 1 tbsp lemon juice"],
        steps: ["Divide the cooked quinoa between two bowls.", "Arrange the greens, tomatoes, cucumber, and avocado on top.", "Whisk tahini with lemon juice and a splash of water.", "Drizzle the dressing over the bowls and serve."],
    },
    {
        id: "tomato-basil-pasta",
        title: "Tomato & Basil Pasta",
        category: "Vegetarian",
        time: 30,
        difficulty: "Easy",
        description: "A weeknight favorite with juicy tomatoes, fresh basil, and a little parmesan.",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
        ingredients: ["250 g pasta", "2 cups ripe tomatoes, chopped", "2 garlic cloves, sliced", "A handful of fresh basil", "2 tbsp olive oil", "Parmesan, to serve"],
        steps: ["Cook the pasta in salted water until just tender; reserve a mug of pasta water.", "Warm olive oil and garlic in a pan, then add the tomatoes.", "Simmer for 10 minutes and stir in the cooked pasta with a splash of pasta water.", "Tear over fresh basil and finish with parmesan."],
    },
    {
        id: "golden-lentil-soup",
        title: "Golden Lentil Soup",
        category: "Vegan",
        time: 40,
        difficulty: "Easy",
        description: "Comforting red lentils simmered with turmeric, ginger, and a squeeze of lime.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
        ingredients: ["1 cup red lentils, rinsed", "1 onion, diced", "1 tsp grated ginger", "1 tsp turmeric", "4 cups vegetable stock", "1 lime and fresh coriander"],
        steps: ["Soften the onion and ginger in a little olive oil.", "Add turmeric, lentils, and vegetable stock.", "Simmer for 25 minutes until the lentils are soft.", "Season to taste and serve with lime and coriander."],
    },
    {
        id: "berry-breakfast-oats",
        title: "Berry Breakfast Oats",
        category: "Breakfast",
        time: 10,
        difficulty: "Easy",
        description: "Creamy oats topped with seasonal berries, toasted nuts, and a drizzle of honey.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85",
        ingredients: ["1 cup rolled oats", "2 cups milk or oat milk", "1/2 cup mixed berries", "1 tbsp chopped almonds", "1 tsp honey", "Pinch of cinnamon"],
        steps: ["Bring the oats and milk to a gentle simmer.", "Stir for 5 minutes until creamy.", "Spoon into bowls and top with berries, almonds, honey, and cinnamon."],
    },
    {
        id: "chana-dal-tikki",
        title: "Chana Dal Tikki",
        category: "Vegetarian",
        time: 30,
        difficulty: "Medium",
        description: "Golden, crisp lentil patties with warming spices and a fresh coriander dip.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
        ingredients: ["1 cup cooked chana dal", "1 small onion, finely chopped", "1 green chilli, chopped", "2 tbsp chopped coriander", "1/2 tsp cumin", "2 tbsp breadcrumbs"],
        steps: ["Mash the cooked dal, leaving a little texture.", "Mix in onion, chilli, coriander, cumin, breadcrumbs, and salt.", "Shape into small patties and pan-fry until crisp and golden on both sides.", "Serve warm with coriander chutney."],
    },
];

function readStorage(key, fallback) {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;
    try {
        return JSON.parse(stored);
    } catch (error) {
        console.error(`Could not read saved ${key} data.`, error);
        return fallback;
    }
}

function saveStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[character]);
}

function allRecipes() {
    const customRecipes = readStorage(STORAGE_KEYS.recipes, []);
    return [...customRecipes, ...starterRecipes];
}

function favorites() {
    return readStorage(STORAGE_KEYS.favorites, []);
}

function recipeCard(recipe, saved) {
    return `
        <article class="recipe-card">
            <div class="recipe-image-wrap">
                <img class="recipe-image" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}" loading="lazy">
                <span class="recipe-category">${escapeHtml(recipe.category)}</span>
                <button class="favorite-button" type="button" data-action="favorite" data-id="${escapeHtml(recipe.id)}" aria-label="${saved ? "Remove from" : "Add to"} favorites" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
            </div>
            <div class="recipe-content">
                <div class="recipe-meta"><span>◷ ${escapeHtml(recipe.time)} min</span><span>${escapeHtml(recipe.difficulty)}</span></div>
                <h3>${escapeHtml(recipe.title)}</h3>
                <p>${escapeHtml(recipe.description)}</p>
                <div class="recipe-actions">
                    <span class="recipe-meta">By ${escapeHtml(recipe.author || "Savor community")}</span>
                    <button type="button" data-action="details" data-id="${escapeHtml(recipe.id)}">View recipe →</button>
                </div>
            </div>
        </article>`;
}

function setMessage(element, message, kind = "") {
    if (!element) return;
    element.textContent = message;
    element.dataset.kind = kind;
}

function initializeNavigation() {
    const currentPage = location.pathname.split("/").pop() || "home.html";
    document.querySelectorAll(".site-nav a").forEach((link) => {
        const href = link.getAttribute("href")?.split("/").pop();
        if (href && (href === currentPage || (currentPage === "" && href === "home.html"))) {
            link.setAttribute("aria-current", "page");
        }
    });

    const user = readStorage(STORAGE_KEYS.user, null);
    const accountLink = document.querySelector("[data-account-link]");
    if (accountLink && user) {
        accountLink.textContent = "My kitchen";
        accountLink.href = accountLink.dataset.profileHref || "./profile.html";
        accountLink.classList.remove("nav-cta");
    }
}

function initializeRecipeGrid() {
    const grid = document.querySelector("[data-recipe-grid]");
    if (!grid) return;

    const search = document.querySelector("[data-recipe-search]");
    const category = document.querySelector("[data-recipe-category]");
    const count = document.querySelector("[data-results-count]");
    const featuredOnly = grid.dataset.featured === "true";
    const favoritesOnly = grid.dataset.favorites === "true";

    const render = () => {
        const savedIds = favorites();
        const query = search?.value.trim().toLowerCase() || "";
        const selectedCategory = category?.value || "All";
        let visibleRecipes = allRecipes().filter((recipe) => {
            const searchableText = `${recipe.title} ${recipe.description} ${recipe.category} ${(recipe.ingredients || []).join(" ")}`;
            const matchesQuery = searchableText.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
            const matchesFavorite = !favoritesOnly || savedIds.includes(recipe.id);
            return matchesQuery && matchesCategory && matchesFavorite;
        });
        if (featuredOnly) visibleRecipes = visibleRecipes.slice(0, 3);

        grid.innerHTML = visibleRecipes.length
            ? visibleRecipes.map((recipe) => recipeCard(recipe, savedIds.includes(recipe.id))).join("")
            : `<div class="empty-state"><h3>${favoritesOnly ? "No saved recipes yet" : "No recipes found"}</h3><p>${favoritesOnly ? "Tap the heart on a recipe to keep it here." : "Try another search or choose a different category."}</p></div>`;
        if (count) count.textContent = `${visibleRecipes.length} ${visibleRecipes.length === 1 ? "recipe" : "recipes"}${favoritesOnly ? " saved" : ""}`;
        if (favoritesOnly) {
            const favoriteCount = document.querySelector("[data-favorite-count]");
            if (favoriteCount) favoriteCount.textContent = `${savedIds.length} saved ${savedIds.length === 1 ? "recipe" : "recipes"}`;
        }
    };

    search?.addEventListener("input", render);
    category?.addEventListener("change", render);
    grid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");
        if (!button) return;
        const recipe = allRecipes().find((item) => item.id === button.dataset.id);
        if (!recipe) return;

        if (button.dataset.action === "favorite") {
            const savedIds = favorites();
            const nextFavorites = savedIds.includes(recipe.id)
                ? savedIds.filter((id) => id !== recipe.id)
                : [...savedIds, recipe.id];
            saveStorage(STORAGE_KEYS.favorites, nextFavorites);
            render();
        } else if (button.dataset.action === "details") {
            showRecipeDetails(recipe);
        }
    });
    render();
}

function showRecipeDetails(recipe) {
    const dialog = document.querySelector("#recipe-dialog");
    if (!dialog) return;
    dialog.innerHTML = `
        <button class="dialog-close" type="button" data-close-dialog aria-label="Close recipe">×</button>
        <img class="dialog-image" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}">
        <div class="dialog-body">
            <div class="recipe-meta"><span>${escapeHtml(recipe.category)}</span><span>◷ ${escapeHtml(recipe.time)} min</span><span>${escapeHtml(recipe.difficulty)}</span></div>
            <h2>${escapeHtml(recipe.title)}</h2>
            <p>${escapeHtml(recipe.description)}</p>
            <h3>Ingredients</h3>
            <ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            <h3>Method</h3>
            <ol>${recipe.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
        </div>`;
    dialog.showModal();
    dialog.querySelector("[data-close-dialog]").addEventListener("click", () => dialog.close());
}

function initializeRecipeForm() {
    const form = document.querySelector("[data-recipe-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const fields = new FormData(form);
        const recipe = {
            id: `community-${Date.now()}`,
            title: fields.get("title").trim(),
            category: fields.get("category"),
            time: Number(fields.get("time")),
            difficulty: fields.get("difficulty"),
            description: fields.get("description").trim(),
            image: fields.get("image").trim() || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
            ingredients: fields.get("ingredients").split("\n").map((item) => item.trim()).filter(Boolean),
            steps: fields.get("steps").split("\n").map((item) => item.trim()).filter(Boolean),
            author: readStorage(STORAGE_KEYS.user, null)?.name || "Community cook",
        };
        saveStorage(STORAGE_KEYS.recipes, [recipe, ...readStorage(STORAGE_KEYS.recipes, [])]);
        form.reset();
        setMessage(form.querySelector("[data-form-message]"), "Your recipe is saved on this device. Thanks for sharing!", "success");
        initializeRecipeGridRefresh();
        document.querySelector("[data-recipe-grid]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

function initializeRecipeGridRefresh() {
    const search = document.querySelector("[data-recipe-search]");
    search?.dispatchEvent(new Event("input"));
}

function initializeRegistration() {
    const form = document.querySelector("[data-register-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const fields = new FormData(form);
        const password = fields.get("password");
        if (password !== fields.get("confirmPassword")) {
            setMessage(form.querySelector("[data-form-message]"), "Those passwords do not match yet.", "error");
            form.elements.confirmPassword.focus();
            return;
        }
        saveStorage(STORAGE_KEYS.user, { name: fields.get("name").trim(), email: fields.get("email").trim() });
        location.href = "./home.html";
    });
}

function initializeLogin() {
    const form = document.querySelector("[data-login-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const fields = new FormData(form);
        const savedUser = readStorage(STORAGE_KEYS.user, null);
        const identity = fields.get("identity").trim();
        const user = savedUser || {
            name: identity.includes("@") ? identity.split("@")[0] : identity,
            email: identity.includes("@") ? identity : "",
        };
        saveStorage(STORAGE_KEYS.user, user);
        location.href = "./home.html";
    });
}

function initializeProfile() {
    const form = document.querySelector("[data-profile-form]");
    if (!form) return;
    const user = readStorage(STORAGE_KEYS.user, null) || { name: "Guest cook", email: "" };
    const savedIds = favorites();
    const initials = user.name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

    document.querySelector("[data-profile-name]").textContent = user.name;
    document.querySelector("[data-profile-email]").textContent = user.email || "Add an email to your profile";
    document.querySelector("[data-profile-avatar]").textContent = initials || "SC";
    document.querySelector("[data-favorite-count]").textContent = `${savedIds.length} saved ${savedIds.length === 1 ? "recipe" : "recipes"}`;
    form.elements.name.value = user.name;
    form.elements.email.value = user.email;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const updatedUser = { name: form.elements.name.value.trim(), email: form.elements.email.value.trim() };
        saveStorage(STORAGE_KEYS.user, updatedUser);
        document.querySelector("[data-profile-name]").textContent = updatedUser.name;
        document.querySelector("[data-profile-email]").textContent = updatedUser.email || "Add an email to your profile";
        document.querySelector("[data-profile-avatar]").textContent = updatedUser.name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "SC";
        setMessage(form.querySelector("[data-form-message]"), "Your profile has been updated on this device.", "success");
    });

    document.querySelector("[data-sign-out]")?.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEYS.user);
        location.href = "./index.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeRecipeGrid();
    initializeRecipeForm();
    initializeRegistration();
    initializeLogin();
    initializeProfile();

    document.querySelector("#recipe-dialog")?.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
    });
});
