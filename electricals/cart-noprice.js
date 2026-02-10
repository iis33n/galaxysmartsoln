(function(){
  function getCart(){ try { return JSON.parse(localStorage.getItem('gss_cart_np')||'[]'); } catch(e){ return []; } }
  function saveCart(items){ localStorage.setItem('gss_cart_np', JSON.stringify(items)); }

  const tbody = document.querySelector('#cartTable tbody');
  function render(){
    const cart = getCart();
    tbody.innerHTML = '';
    cart.forEach((item, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <img src="${item.img}" alt="${item.name}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;background:#0f0f0f" />
            <div>${item.name}</div>
          </div>
        </td>
        <td><input type="number" min="1" value="${item.qty}" class="qty" data-index="${i}" /></td>
        <td><button class="btn btn-remove" data-index="${i}">Remove</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  tbody.addEventListener('input', e => {
    if(e.target.classList.contains('qty')){
      const idx = parseInt(e.target.dataset.index);
      const val = Math.max(1, parseInt(e.target.value || '1'));
      const cart = getCart();
      cart[idx].qty = val;
      saveCart(cart);
    }
  });

  tbody.addEventListener('click', e => {
    if(e.target.classList.contains('btn-remove')){
      const idx = parseInt(e.target.dataset.index);
      const cart = getCart();
      cart.splice(idx,1);
      saveCart(cart);
      render();
    }
  });

  const form = document.getElementById('checkoutForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const items = getCart();
    const summary = { name, email, notes, items };
    console.log('Quote request (demo):', summary);
    alert('Thank you! Your quote request has been received. We will reply by email/WhatsApp.');
    localStorage.removeItem('gss_cart_np');
    render();
    form.reset();
  });

  render();
})();