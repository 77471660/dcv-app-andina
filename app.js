const http = require('http');

const PORT = process.env.PORT || 3000;
const VERSION = '3.0';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f8f8f5">
  <title>Andina Market | Compra simple, vive mejor</title>
  <style>
    :root{--ink:#17211c;--muted:#738076;--green:#286a4c;--light:#e7f0e8;--cream:#f8f8f5;--line:#e2e7e0;--white:#fff}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--cream);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink)}
    button,input{font:inherit}button{cursor:pointer}a{color:inherit;text-decoration:none}button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid #83ba9b;outline-offset:3px}
    .shell{max-width:1200px;padding:0 28px;margin:auto}.topbar{background:#173e2d;color:#f2faf4;text-align:center;padding:9px 18px;font-size:12px;letter-spacing:.045em}
    header{position:sticky;top:0;z-index:30;background:rgba(248,248,245,.91);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
    .nav{height:77px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:800;letter-spacing:-.06em}.brand-mark{display:grid;place-items:center;width:37px;height:37px;border-radius:12px;background:var(--green);color:#fff;font-size:23px;font-weight:600}
    .links{display:flex;gap:32px;font-size:13px;color:#59675d}.links a:hover{color:var(--green)}.nav-actions{display:flex;gap:12px;align-items:center}.cart{border:1px solid #d2dbd3;background:#fff;padding:10px 15px;border-radius:100px;color:var(--ink);font-weight:650;font-size:13px}.cart span{display:inline-grid;place-items:center;margin-left:8px;width:21px;height:21px;border-radius:50%;background:var(--green);color:#fff;font-size:11px}
    .hero{padding:64px 0 76px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:55px}.eyebrow{display:inline-flex;align-items:center;gap:9px;color:var(--green);font-weight:750;text-transform:uppercase;letter-spacing:.16em;font-size:11px}.eyebrow:before{content:"";width:23px;height:2px;background:var(--green)}h1{font-size:clamp(48px,6.4vw,90px);line-height:1.01;letter-spacing:-.08em;margin:22px 0 20px;font-weight:800}h1 em{color:var(--green);font-style:normal}.hero-copy{font-size:16px;line-height:1.9;color:#6d796f;max-width:450px}.hero-buttons{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:29px}.btn{border:0;border-radius:100px;padding:15px 24px;background:var(--green);color:white;font-size:13px;font-weight:700;transition:transform .2s,background .2s,box-shadow .2s}.btn:hover{transform:translateY(-3px);background:#1d523a;box-shadow:0 12px 24px #286a4c2a}.link-btn{font-size:13px;font-weight:700;border-bottom:1px solid var(--ink);padding-bottom:5px}.hero-stats{display:flex;gap:38px;margin-top:55px}.stat strong{font-size:24px;letter-spacing:-.05em}.stat p{font-size:11px;color:var(--muted);margin:6px 0}
    .visual{height:480px;position:relative;border-radius:32px;background:radial-gradient(circle at 48% 40%,#ecf7e9 0,#dcece0 48%,#c8dfcd 100%);overflow:hidden;display:grid;place-items:center}.visual:before,.visual:after{content:"";position:absolute;border-radius:50%;border:1px solid #ffffff95}.visual:before{width:370px;height:370px}.visual:after{width:510px;height:510px}.visual-glow{position:absolute;width:220px;height:220px;border-radius:50%;background:#ffffff99;filter:blur(65px)}.bag{position:relative;z-index:2;width:230px;height:260px;background:linear-gradient(135deg,#286a4c,#133e2b);border-radius:15px 15px 26px 26px;transform:rotate(-9deg);box-shadow:25px 30px 40px #234f3359;display:grid;place-items:center;animation:float 5s ease-in-out infinite}.bag:before{content:"";position:absolute;top:-45px;left:70px;width:90px;height:78px;border:13px solid #286a4c;border-radius:50% 50% 0 0;z-index:-1}.bag span{color:#fff;font-size:76px;font-weight:800;letter-spacing:-.11em}.float-tag{position:absolute;z-index:4;background:#ffffffed;border:1px solid #ffffff;border-radius:16px;box-shadow:0 12px 36px #1d4d3021;padding:14px 19px;animation:float 5s ease-in-out infinite}.float-tag b{display:block;font-size:13px}.float-tag small{display:block;color:var(--muted);font-size:11px;margin-top:3px}.tag-one{top:67px;right:25px}.tag-two{bottom:70px;left:20px;animation-delay:-2s}
    .section{padding:65px 0}.heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:30px}.heading h2{font-size:clamp(30px,4vw,44px);margin:12px 0 0;letter-spacing:-.065em}.heading p{color:var(--muted);font-size:13px;max-width:300px;line-height:1.8}.filters{display:flex;gap:9px;flex-wrap:wrap;margin:0 0 26px}.chip{border:1px solid #d9e1d9;color:#627267;background:#fff;border-radius:100px;padding:10px 17px;font-size:12px;transition:.2s}.chip:hover,.chip.active{background:var(--green);color:#fff;border-color:var(--green)}
    .products{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.product{background:var(--white);border:1px solid var(--line);padding:13px;border-radius:22px;transition:transform .25s,box-shadow .25s}.product:hover{transform:translateY(-7px);box-shadow:0 18px 35px #122a1810}.product-art{height:205px;background:#eef2ed;border-radius:15px;display:grid;place-items:center;font-size:75px;position:relative;overflow:hidden}.product-art:after{content:"";width:125px;height:22px;border-radius:50%;background:#355a3b19;position:absolute;bottom:22px;filter:blur(10px)}.product:nth-child(2) .product-art{background:#f7eee3}.product:nth-child(3) .product-art{background:#edf0f7}.product:nth-child(4) .product-art{background:#f3eaf0}.product-label{display:flex;justify-content:space-between;align-items:center;margin:17px 3px 8px;color:var(--muted);font-size:11px}.product h3{font-size:15px;margin:0 3px 6px;letter-spacing:-.02em}.product-foot{display:flex;justify-content:space-between;align-items:center;margin:18px 3px 4px}.price{font-size:18px;font-weight:800;letter-spacing:-.03em}.add{border:0;border-radius:50%;width:37px;height:37px;background:var(--light);color:var(--green);font-size:24px;transition:.2s}.add:hover{background:var(--green);color:#fff;transform:rotate(90deg)}.hide{display:none!important}
    .banner{margin:30px 0 45px;border-radius:30px;background:#193f2e;min-height:245px;color:#fff;display:flex;justify-content:space-between;align-items:center;padding:45px 55px;gap:28px;position:relative;overflow:hidden}.banner:after{content:"✳";position:absolute;color:#ffffff12;font-size:340px;right:12%;top:-125px;pointer-events:none}.banner h2{max-width:560px;line-height:1.1;letter-spacing:-.055em;font-size:clamp(29px,4vw,48px);margin:14px 0}.banner p{color:#b5cfbf;font-size:13px}.banner .btn{background:#fff;color:#17442e;white-space:nowrap;position:relative;z-index:1}.banner .btn:hover{background:#e4f2e8}
    footer{border-top:1px solid var(--line);padding:36px 0 42px}.footer-row{display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap}.footer-row p{font-size:12px;color:var(--muted)}.footer-row .brand{font-size:17px}.toast{position:fixed;bottom:26px;right:26px;background:#163f2b;color:#fff;border-radius:16px;padding:15px 22px;font-size:13px;box-shadow:0 15px 40px #173e2d50;transform:translateY(90px);opacity:0;transition:.3s;z-index:99}.toast.show{transform:translateY(0);opacity:1}
    .reveal{opacity:0;transform:translateY(23px);transition:opacity .7s,transform .7s}.reveal.visible{opacity:1;transform:translateY(0)}@keyframes float{0%,100%{transform:translateY(0) rotate(-9deg)}50%{transform:translateY(-15px) rotate(-7deg)}}@keyframes fadein{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}.hero-content{animation:fadein .8s ease both}
    @media(max-width:900px){.hero{grid-template-columns:1fr;gap:30px}.visual{height:380px}.products{grid-template-columns:repeat(2,minmax(0,1fr))}.links{display:none}.banner{padding:35px}}
    @media(max-width:560px){.shell{padding:0 18px}.nav{height:65px}.brand{font-size:18px}.hero{padding:42px 0 45px}.hero-stats{gap:25px;margin-top:38px}.visual{height:315px}.bag{transform:scale(.76) rotate(-9deg);animation:none}.float-tag{padding:11px}.tag-one{right:9px;top:20px}.tag-two{left:10px;bottom:22px}.section{padding:40px 0}.heading{align-items:start;flex-direction:column;gap:0}.products{gap:10px}.product{padding:9px;border-radius:16px}.product-art{height:140px;font-size:51px}.product h3{font-size:13px}.price{font-size:15px}.banner{flex-direction:column;align-items:start;padding:35px 26px;margin:25px 0 35px}.footer-row{align-items:start;flex-direction:column}}
    @media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.reveal{opacity:1;transform:none}}
  </style>
</head>
<body>
  <div class="topbar">ANDINA MARKET · DESCUBRE UNA FORMA MÁS SIMPLE DE COMPRAR</div>
  <header>
    <div class="shell nav">
      <a class="brand" href="#inicio" aria-label="Andina Market, ir al inicio"><span class="brand-mark">a.</span> andina<span style="color:#286a4c">market</span></a>
      <nav class="links" aria-label="Menú principal"><a href="#inicio">Inicio</a><a href="#productos">Productos</a><a href="#nosotros">Nosotros</a></nav>
      <div class="nav-actions"><button class="cart" id="cart" type="button" aria-label="Ver carrito">Mi carrito <span id="count">0</span></button></div>
    </div>
  </header>
  <main id="inicio">
    <div class="shell hero">
      <div class="hero-content">
        <span class="eyebrow">Bienvenido a Andina Market</span>
        <h1>Lo esencial,<br><em>mejor elegido.</em></h1>
        <p class="hero-copy">Una experiencia de compra sencilla, moderna y pensada para ti. Descubre productos para cada momento de tu día.</p>
        <div class="hero-buttons"><a class="btn" href="#productos">Explorar productos ↗</a><a class="link-btn" href="#nosotros">Conoce Andina Market</a></div>
        <div class="hero-stats"><div class="stat"><strong>01.</strong><p>Descubre</p></div><div class="stat"><strong>02.</strong><p>Elige</p></div><div class="stat"><strong>03.</strong><p>Disfruta</p></div></div>
      </div>
      <div class="visual" role="img" aria-label="Ilustración minimalista de una bolsa de compras Andina Market"><div class="visual-glow"></div><div class="bag"><span>a.</span></div><div class="float-tag tag-one"><b>✦ Compra fácil</b><small>Diseñado para ti</small></div><div class="float-tag tag-two"><b>● Selección especial</b><small>Explora novedades</small></div></div>
    </div>
    <section id="productos" class="section shell">
      <div class="heading reveal"><div><span class="eyebrow">Nuestra selección</span><h2>Productos destacados</h2></div><p>Encuentra lo que necesitas en una experiencia de compra simple y agradable.</p></div>
      <div class="filters reveal" role="group" aria-label="Filtrar productos"><button class="chip active" data-filter="todos" type="button">Todos</button><button class="chip" data-filter="hogar" type="button">Hogar</button><button class="chip" data-filter="tecnologia" type="button">Tecnología</button><button class="chip" data-filter="estilo" type="button">Estilo de vida</button></div>
      <div class="products">
        <article class="product reveal" data-category="hogar"><div class="product-art" aria-label="Taza">☕</div><div class="product-label"><span>Hogar</span><span>Nuevo</span></div><h3>Taza minimalista</h3><div class="product-foot"><span class="price">S/ 29.90</span><button class="add" type="button" data-name="Taza minimalista" aria-label="Agregar taza minimalista">+</button></div></article>
        <article class="product reveal" data-category="tecnologia"><div class="product-art" aria-label="Audífonos">🎧</div><div class="product-label"><span>Tecnología</span><span>Popular</span></div><h3>Audífonos inalámbricos</h3><div class="product-foot"><span class="price">S/ 89.90</span><button class="add" type="button" data-name="Audífonos inalámbricos" aria-label="Agregar audífonos">+</button></div></article>
        <article class="product reveal" data-category="estilo"><div class="product-art" aria-label="Mochila">🎒</div><div class="product-label"><span>Estilo de vida</span><span>Favorito</span></div><h3>Mochila urbana</h3><div class="product-foot"><span class="price">S/ 79.90</span><button class="add" type="button" data-name="Mochila urbana" aria-label="Agregar mochila">+</button></div></article>
        <article class="product reveal" data-category="hogar"><div class="product-art" aria-label="Planta decorativa">🪴</div><div class="product-label"><span>Hogar</span><span>Nuevo</span></div><h3>Planta decorativa</h3><div class="product-foot"><span class="price">S/ 39.90</span><button class="add" type="button" data-name="Planta decorativa" aria-label="Agregar planta">+</button></div></article>
      </div>
      <p style="font-size:11px;color:var(--muted);margin:18px 0 0">Catálogo y precios ilustrativos para la demostración académica. No se realizan compras reales.</p>
    </section>
    <div class="shell" id="nosotros"><div class="banner reveal"><div><span class="eyebrow" style="color:#acd4ba">Una experiencia diferente</span><h2>Menos complicaciones.<br>Más de lo que te gusta.</h2><p>Andina Market · Una demostración de comercio web creada en AWS EC2.</p></div><a class="btn" href="#productos">Ver productos ↗</a></div></div>
  </main>
  <footer><div class="shell footer-row"><a class="brand" href="#inicio"><span class="brand-mark">a.</span> andinamarket</a><p>© 2026 Andina Market · Proyecto académico · Versión ${VERSION}</p><p>Desplegado en AWS EC2 ☁</p></div></footer>
  <div id="toast" class="toast" role="status" aria-live="polite">Producto agregado</div>
  <script>
    (function(){
      var count=0, toast=document.getElementById('toast'), toastTimeout;
      document.querySelectorAll('.add').forEach(function(button){button.addEventListener('click',function(){count+=1;document.getElementById('count').textContent=count;toast.textContent=button.dataset.name+' agregado al carrito (demo)';toast.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(function(){toast.classList.remove('show')},2500)})});
      document.getElementById('cart').addEventListener('click',function(){toast.textContent=count?'Tienes '+count+' producto(s) en tu carrito de demostración':'Tu carrito de demostración está vacío';toast.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(function(){toast.classList.remove('show')},2500)});
      document.querySelectorAll('.chip').forEach(function(chip){chip.addEventListener('click',function(){document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active')});chip.classList.add('active');document.querySelectorAll('.product').forEach(function(p){p.classList.toggle('hide',chip.dataset.filter!=='todos'&&p.dataset.category!==chip.dataset.filter)})})});
      if('IntersectionObserver' in window){var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)})}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible')})}
    })();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url !== '/' && req.url !== '/index.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Página no encontrada');
  }
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Andina Market ${VERSION} - Puerto ${PORT}`);
});
