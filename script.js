// Base de dados expandida de produtos com ingredientes
const products = [
    // Almoço
    { 
        id: 101, 
        name: 'Prato Feito Tradicional', 
        price: 15.00, 
        category: 'Almoço', 
        desc: 'Arroz, feijão, bife acebolado, farofa e salada.', 
        ingredients: ['Arroz branco', 'Feijão carioca', 'Bife bovino (contrafilé)', 'Acebolado', 'Farofa caseira', 'Alface e Tomate'],
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150' 
    },
    { 
        id: 102, 
        name: 'Strogonoff de Frango', 
        price: 16.50, 
        category: 'Almoço', 
        desc: 'Servido com arroz branco e batata palha.', 
        ingredients: ['Peito de frango em cubos', 'Creme de leite', 'Molho de tomate', 'Champignon', 'Arroz branco', 'Batata palha extra fina'],
        img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=150' 
    },
    { 
        id: 103, 
        name: 'Opção Vegetariana', 
        price: 14.00, 
        category: 'Almoço', 
        desc: 'Omelete de legumes, arroz integral, feijão e salada.', 
        ingredients: ['Ovos selecionados', 'Cenoura ralada', 'Abobrinha', 'Arroz integral', 'Feijão preto', 'Mix de folhas verdes'],
        img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150' 
    },

    // Lanches
    { 
        id: 1, 
        name: 'X-Burger Artesanal', 
        price: 12.00, 
        category: 'Lanches', 
        desc: 'Pão brioche, hambúrguer 150g, queijo prato e maionese.', 
        ingredients: ['Pão Brioche artesanal', 'Blend bovino 150g', 'Queijo Prato derretido', 'Alface americana', 'Maionese da casa'],
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150' 
    },
    { 
        id: 3, 
        name: 'Misto Quente Especial', 
        price: 7.00, 
        category: 'Lanches', 
        desc: 'Pão de fôrma, presunto, queijo e manteiga na chapa.', 
        ingredients: ['Pão de fôrma tradicional', 'Presunto cozido', 'Queijo mussarela', 'Manteiga'],
        img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=150' 
    },
    { 
        id: 4, 
        name: 'Salgado Assado (Frango)', 
        price: 6.50, 
        category: 'Lanches', 
        desc: 'Esfiha ou maromba assada com recheio de frango e catupiry.', 
        ingredients: ['Farinha de trigo', 'Peito de frango desfiar', 'Requeijão tipo catupiry', 'Tempero verde'],
        img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=150' 
    },

    // Bebidas
    { 
        id: 2, 
        name: 'Suco Natural (Laranja)', 
        price: 5.00, 
        category: 'Bebidas', 
        desc: 'Copo de 400ml feito na hora sem adição de açúcar.', 
        ingredients: ['100% Suco de Laranja Pera fresca natural'],
        img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=150' 
    },
    { 
        id: 5, 
        name: 'Refrigerante Lata', 
        price: 5.50, 
        category: 'Bebidas', 
        desc: 'Lata 350ml (Coca-Cola, Guaraná ou Soda).', 
        ingredients: ['Água gaseificada', 'Xarope de refrigerante', 'Açúcar/Adoçante'],
        img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150' 
    },

    // Doces
    { 
        id: 6, 
        name: 'Brownie de Chocolate', 
        price: 5.00, 
        category: 'Doces', 
        desc: 'Com chocolate meio amargo e nozes.', 
        ingredients: ['Chocolate 50%', 'Farinha de trigo', 'Manteiga', 'Ovos', 'Nozes picadas'],
        img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150' 
    },
    { 
        id: 7, 
        name: 'Bolo no Pote (Ninho com Nutella)', 
        price: 8.00, 
        category: 'Doces', 
        desc: 'Camadas generosas de bolo de chocolate e recheio.', 
        ingredients: ['Massa de bolo de cacau', 'Leite Ninho', 'Creme de avelã (Nutella)', 'Leite condensado'],
        img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150' 
    }
];

// Estado global da aplicação
const state = {
    currentUser: null,
    registeredUsers: JSON.parse(localStorage.getItem('registeredUsers')) || [],
    cart: [],
    orders: [
        { date: '08/05/2024 - 10:30', itemsCount: 3, total: 27.50, status: 'Concluído' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    setupAuthTabs();
    setupNavigation();
    renderMenu('Todos');
    updateHistoryTable();
    initCharts();
});

// Controle de Cadastro Obrigatório e Login
function setupAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-form');
            document.getElementById('form-login').style.display = target === 'login' ? 'flex' : 'none';
            document.getElementById('form-register').style.display = target === 'register' ? 'flex' : 'none';
            document.getElementById('login-error').style.display = 'none';
        });
    });
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;

    const exists = state.registeredUsers.find(u => u.email === email);
    if (exists) {
        alert('Este e-mail já está cadastrado! Faça login.');
        return;
    }

    const newUser = { name, email, password };
    state.registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(state.registeredUsers));

    alert('🎉 Cadastro realizado com sucesso! Agora você pode fazer o login.');
    document.querySelector('[data-form="login"]').click();
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    const user = state.registeredUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        document.getElementById('login-error').style.display = 'block';
        return;
    }

    state.currentUser = user;
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-container').classList.remove('hidden');

    document.getElementById('user-welcome-name').innerText = user.name.split(' ')[0];
    document.getElementById('profile-name').value = user.name;
    document.getElementById('profile-email').value = user.email;
}

function logout() {
    state.currentUser = null;
    state.cart = [];
    updateCartUI();
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-screen').style.display = 'flex';
}

// Navegação
function setupNavigation() {
    const navItems = document.querySelectorAll('nav ul li[data-tab]');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchTab(item.getAttribute('data-tab'));
        });
    });
}

function switchTab(tabId) {
    const navItems = document.querySelectorAll('nav ul li[data-tab]');
    const sections = document.querySelectorAll('.view-section');

    navItems.forEach(nav => {
        nav.classList.toggle('active', nav.getAttribute('data-tab') === tabId);
    });

    sections.forEach(sec => {
        sec.classList.toggle('active', sec.id === tabId);
    });
}

// Cardápio e Modal de Ingredientes
function renderMenu(category) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    
    const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);
    
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="menu-card-header">
                <img src="${p.img}" alt="${p.name}">
                <div class="menu-card-info">
                    <h5>${p.name}</h5>
                    <p>${p.desc}</p>
                    <span class="price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
            <div class="menu-card-actions">
                <button class="btn-ingredients" onclick="showIngredients(${p.id})">Ver Ingredientes</button>
                <button class="btn-add" onclick="addToCart(${p.id})">+</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(cat);
}

function showIngredients(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('ing-item-title').innerText = product.name;
    document.getElementById('ing-item-desc').innerText = product.desc;
    
    const list = document.getElementById('ing-item-list');
    list.innerHTML = '';
    product.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.innerText = ing;
        list.appendChild(li);
    });

    document.getElementById('ingredients-modal').classList.remove('hidden');
}

function closeIngredientsModal() {
    document.getElementById('ingredients-modal').classList.add('hidden');
}

// Carrinho de Compras
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const itemInCart = state.cart.find(item => item.id === productId);

    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function updateCartQuantity(productId, delta) {
    const itemInCart = state.cart.find(item => item.id === productId);
    if (itemInCart) {
        itemInCart.quantity += delta;
        if (itemInCart.quantity <= 0) {
            state.cart = state.cart.filter(item => item.id !== productId);
        }
    }
    updateCartUI();
    renderCartModal();
}

function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cart-items-count').innerText = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;
    document.getElementById('cart-total-price').innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

function openCartModal() {
    renderCartModal();
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCartModal() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function renderCartModal() {
    const container = document.getElementById('modal-cart-items');
    container.innerHTML = '';

    if (state.cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 12px;">Seu carrinho está vazio.</p>';
        document.getElementById('modal-cart-total').innerText = 'R$ 0,00';
        return;
    }

    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    state.cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding: 8px 0; border-bottom: 1px solid var(--border-color);';
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small style="color:var(--text-muted);">R$ ${item.price.toFixed(2).replace('.', ',')} cada</small>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <button onclick="updateCartQuantity(${item.id}, -1)" style="padding:2px 8px;">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, 1)" style="padding:2px 8px;">+</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById('modal-cart-total').innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

// Finalização da Compra
function checkout() {
    if (state.cart.length === 0) {
        alert('Adicione itens ao carrinho antes de finalizar.');
        return;
    }

    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('pt-BR')} - ${now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}`;

    const newOrder = {
        date: dateStr,
        itemsCount: totalItems,
        total: totalPrice,
        status: 'Concluído'
    };

    state.orders.unshift(newOrder);
    updateHistoryTable();
    renderCurrentReservation(state.cart, totalPrice, dateStr);

    state.cart = [];
    updateCartUI();
    closeCartModal();

    alert('🎉 Pedido realizado com sucesso! Sua reserva foi atualizada.');
    switchTab('reservas');
}

function renderCurrentReservation(items, total, date) {
    const listContainer = document.getElementById('reserva-items-list');
    listContainer.innerHTML = '';
    
    items.forEach(item => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;';
        row.innerHTML = `<span>${item.quantity}x ${item.name}</span><span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>`;
        listContainer.appendChild(row);
    });

    document.getElementById('reserva-date').innerText = date;
    document.getElementById('reserva-total-value').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function updateHistoryTable() {
    const tbody = document.getElementById('history-table-body');
    tbody.innerHTML = '';

    let grandTotal = 0;

    state.orders.forEach(order => {
        grandTotal += order.total;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.date}</td>
            <td>${order.itemsCount} ${order.itemsCount === 1 ? 'item' : 'itens'}</td>
            <td>R$ ${order.total.toFixed(2).replace('.', ',')}</td>
            <td>PIX</td>
            <td><span class="status-badge concluido">${order.status}</span></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('profile-orders-count').innerText = state.orders.length;
    document.getElementById('profile-total-spent').innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
}

function initCharts() {
    const ctxCat = document.getElementById('chartCategoria');
    const ctxDia = document.getElementById('chartDia');

    if (ctxCat) {
        new Chart(ctxCat.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Almoço', 'Lanches', 'Bebidas', 'Doces'],
                datasets: [{ data: [35, 30, 20, 15], backgroundColor: ['#107c41', '#34d399', '#60a5fa', '#f472b6'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    if (ctxDia) {
        new Chart(ctxDia.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                datasets: [{ label: 'Vendas (R$)', data: [120, 150, 180, 140, 210, 90], backgroundColor: '#107c41' }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}