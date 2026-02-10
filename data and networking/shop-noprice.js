(function(){
  const buttons = document.querySelectorAll('.category-btn');
  const cards = document.querySelectorAll('.product-card');
  const search = document.getElementById('search');

  function setActiveCategory(cat){
    let target = cat || 'all';
    let found = null;
    buttons.forEach(b => { if(b.dataset.category === target){ found = b; } });
    buttons.forEach(b => b.classList.remove('active'));
    (found || document.querySelector('.category-btn[data-category="all"]')).classList.add('active');
  }

  function applyFilters(){
    const active = document.querySelector('.category-btn.active');
    const category = active ? active.dataset.category : 'all';
    const query = (search?.value || '').toLowerCase();

    cards.forEach(card => {
      const cardCat = card.dataset.category;
      const name = (card.dataset.name || '').toLowerCase();
      const matchesCategory = (category === 'all') || (cardCat === category);
      const matchesText = name.includes(query);
      card.style.display = (matchesCategory && matchesText) ? '' : 'none';
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveCategory(btn.dataset.category);
      if(history.pushState){ history.replaceState(null, '', '#' + btn.dataset.category); }
      else{ location.hash = btn.dataset.category; }
      applyFilters();
    });
  });

  if (search){ search.addEventListener('input', applyFilters); }

  function initFromHash(){
    const hash = (location.hash || '').replace('#','').trim();
    if(hash){ setActiveCategory(hash); }
    applyFilters();
  }
  window.addEventListener('hashchange', initFromHash);
  initFromHash();

  function getCart(){ try { return JSON.parse(localStorage.getItem('gss_cart_np')||'[]'); } catch(e){ return []; } }
  function saveCart(items){ localStorage.setItem('gss_cart_np', JSON.stringify(items)); }
  function addToCart(prod){
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === prod.id);
    if(idx >= 0){ cart[idx].qty += 1; }
    else{ cart.push({id: prod.id, name: prod.name, img: prod.img, qty: 1}); }
    saveCart(cart);
    alert('Added to cart: ' + prod.name);
  }

  document.querySelectorAll('.product-card .add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.product-card');
      const prod = {
        id: card.dataset.id,
        name: card.dataset.name,
        img: card.dataset.img
      };
      addToCart(prod);
    });
  });
})();