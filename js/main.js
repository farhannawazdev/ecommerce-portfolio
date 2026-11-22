// Mobile menu
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));

// Hero 3D tilt (desktop only)
const t=document.getElementById('tilt'),f=t.querySelector('.frame');
if(matchMedia('(hover:hover)').matches){
  t.addEventListener('mousemove',e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    f.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg)`});
  t.addEventListener('mouseleave',()=>f.style.transform='rotate(2deg)');
}

// Project cards: reveal on scroll + category filter
const cards=[...document.querySelectorAll('.card')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.animationDelay=(cards.indexOf(e.target)%3)*.1+'s';e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
cards.forEach(c=>{c.style.opacity=0;c.addEventListener('animationend',()=>c.style.opacity=1);io.observe(c)});
document.getElementById('filters').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('on',x===b));
  cards.forEach(c=>{const show=b.dataset.f==='all'||c.dataset.cat===b.dataset.f;c.classList.toggle('hide',!show);
    if(show){c.style.animationDelay='0s';c.classList.remove('in');void c.offsetWidth;c.classList.add('in')}});
});
