/*!
 * nb-animations.js — Numberbender Scroll Animations
 * Version: v2.0 (May 2026)
 * Pages: teach-it-like-you-stream-it, speaking, press, about, blog, speaking-archive
 * Dependencies: GSAP 3.12.5 + ScrollTrigger (loaded via CDN in each HTML file)
 *
 * Animation map:
 *   All pages   — section headings fade up · final CTA cascades
 *   TILYSI      — hero sequence · why cards · episode cards · syllabus modules · workshop split
 *   Speaking    — hero sequence · keynote video scale · topic/format cards · credibility counters · book-btn pulse
 *   Press       — hero split (text left / photo right) · coverage cards · video slots
 *   About       — hero split · tags stagger · story split · philosophy cascade · stats · award/research/work cards
 *   Blog        — hero tags stagger · featured post · blog cards
 *   Archive     — hero sequence · archive cards (initial load only) · why-archive cards
 *
 * Accessibility: exits immediately if prefers-reduced-motion is set.
 * SEO: zero impact — GSAP runs only in the browser after page load.
 */
(function(){
  'use strict';
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  function fadeUp(sel,vars,trig){var els=gsap.utils.toArray(sel);if(!els.length)return;var t=trig?document.querySelector(trig):els[0];if(!t)return;gsap.from(els,Object.assign({scrollTrigger:{trigger:t,start:'top 88%',toggleActions:'play none none none'},opacity:0,y:30,duration:.65,ease:'power3.out'},vars));}
  function stag(sel,vars,st,trig){var els=gsap.utils.toArray(sel);if(!els.length)return;var t=trig?document.querySelector(trig):els[0];if(!t)return;gsap.from(els,Object.assign({scrollTrigger:{trigger:t,start:'top 88%',toggleActions:'play none none none'},opacity:0,y:36,duration:.65,ease:'power3.out',stagger:st||.1},vars));}
  function fadeLeft(sel,vars){var el=document.querySelector(sel);if(!el)return;gsap.from(el,Object.assign({scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},opacity:0,x:-36,duration:.75,ease:'power3.out'},vars));}
  function fadeRight(sel,vars){var el=document.querySelector(sel);if(!el)return;gsap.from(el,Object.assign({scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},opacity:0,x:36,duration:.75,ease:'power3.out'},vars));}

  // ── Section heads — all pages ──────────────────────────────────────────────
  gsap.utils.toArray('.section-head').forEach(function(el){gsap.from(el,{scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},opacity:0,y:26,duration:.65,ease:'power3.out'});});

  // ── Hero sequences — TILYSI / Speaking / Blog / Archive ───────────────────
  var heroSec=document.querySelector('.page-hero,.page-head');
  if(heroSec){
    var ey=heroSec.querySelector('.eyebrow');
    var h1=heroSec.querySelector('h1');
    var ld=heroSec.querySelector('.lead');
    var ct=heroSec.querySelector('.hero-ctas,.hero-tags,.filters');
    var tl=gsap.timeline({defaults:{ease:'power3.out'}});
    if(ey)tl.from(ey,{opacity:0,y:-16,duration:.55});
    if(h1)tl.from(h1,{opacity:0,y:32,duration:.75},ey?'-=.3':0);
    if(ld)tl.from(ld,{opacity:0,y:22,duration:.6},'-=.45');
    if(ct)tl.from(ct,{opacity:0,y:16,duration:.5},'-=.4');
  }

  // ── About hero — split left/right ─────────────────────────────────────────
  var aPhoto=document.querySelector('.about-photo-big');
  var aContent=document.querySelector('.about-hero-content');
  if(aPhoto&&aContent){
    gsap.from(aPhoto,{opacity:0,x:-36,duration:.8,ease:'power3.out'});
    gsap.from(aContent,{opacity:0,x:36,duration:.8,ease:'power3.out',delay:.1});
    var tags=gsap.utils.toArray('.about-tags .tag');
    if(tags.length)gsap.from(tags,{delay:.7,opacity:0,y:12,duration:.45,ease:'power2.out',stagger:.07});
  }

  // ── Press hero — split left/right ─────────────────────────────────────────
  fadeLeft('.press-hero-text');
  fadeRight('.press-hero-img',{delay:.1});

  // ── Final CTA cascade — all pages ─────────────────────────────────────────
  gsap.utils.toArray('.final-cta,.archive-cta').forEach(function(cta){
    var h2=cta.querySelector('h2'),p=cta.querySelector('p'),b=cta.querySelector('.final-ctas,div[style*="flex"]');
    var tl=gsap.timeline({scrollTrigger:{trigger:cta,start:'top 85%',toggleActions:'play none none none'},defaults:{ease:'power3.out'}});
    if(h2)tl.from(h2,{opacity:0,y:28,duration:.65});
    if(p)tl.from(p,{opacity:0,y:20,duration:.55},'-=.4');
    if(b)tl.from(b,{opacity:0,y:14,duration:.5},'-=.35');
  });

  // ── TILYSI ────────────────────────────────────────────────────────────────
  stag('.why-grid .why-card',{y:36,duration:.65},.12,'.why-grid');
  stag('.episodes-grid .ep-card',{y:44,duration:.7},.09,'.episodes-grid');
  var mods=gsap.utils.toArray('.syllabus-list .module');
  if(mods.length)gsap.from(mods,{scrollTrigger:{trigger:'.syllabus-list',start:'top 88%',toggleActions:'play none none none'},opacity:0,x:-32,duration:.6,ease:'power2.out',stagger:.1});

  // ── Speaking ──────────────────────────────────────────────────────────────
  fadeUp('.keynote-video',{scale:.94,y:0,duration:.75,ease:'back.out(1.3)'});
  fadeUp('.keynote-description',{duration:.65});
  stag('.topics-grid .topic-card',{y:36,duration:.65},.12,'.topics-grid');
  stag('.formats-grid .format-card',{y:40,duration:.7},.13,'.formats-grid');

  // Credibility counters
  var cblocks=gsap.utils.toArray('.cred-grid .cred-block');
  if(cblocks.length){
    gsap.from(cblocks,{scrollTrigger:{trigger:'.cred-grid',start:'top 88%',toggleActions:'play none none none'},opacity:0,scale:.88,duration:.6,stagger:.1,ease:'back.out(1.4)'});
    cblocks.forEach(function(b){
      var n=b.querySelector('.n');if(!n)return;
      var raw=n.textContent.trim(),m=raw.match(/^([\d,]+)(.*)/);if(!m)return;
      var target=parseInt(m[1].replace(/,/g,''),10),suf=m[2]||'';if(isNaN(target))return;
      var obj={val:0};
      gsap.to(obj,{scrollTrigger:{trigger:b,start:'top 88%',once:true},val:target,duration:1.6,ease:'power2.out',
        onUpdate:function(){n.textContent=Math.round(obj.val).toLocaleString()+suf;}});
    });
  }

  // "Book Dr. E" button pulse
  var bookBtn=document.querySelector('.btn-yellow');
  if(bookBtn)gsap.fromTo(bookBtn,{boxShadow:'0 0 0 0 rgba(250,204,21,0)'},{boxShadow:'0 0 0 0 rgba(250,204,21,0)',duration:1.2,repeat:3,delay:1.5,ease:'power2.inOut',yoyo:true});

  // ── Press ─────────────────────────────────────────────────────────────────
  stag('.coverage-grid .coverage-card',{y:36,duration:.65},.1,'.coverage-grid');
  stag('.video-grid .video-slot',{scale:.95,y:0,duration:.7},.14,'.video-grid');

  // ── About ─────────────────────────────────────────────────────────────────
  (function(){
    var cols=gsap.utils.toArray('.story-grid > div');
    if(!cols.length)return;
    gsap.from(cols[0],{scrollTrigger:{trigger:'.story-grid',start:'top 88%',toggleActions:'play none none none'},opacity:0,x:-32,duration:.75,ease:'power3.out'});
    if(cols[1])gsap.from(cols[1],{scrollTrigger:{trigger:'.story-grid',start:'top 88%',toggleActions:'play none none none'},opacity:0,x:32,duration:.75,ease:'power3.out',delay:.1});
  })();
  (function(){
    var inner=document.querySelector('.why-inner');if(!inner)return;
    var q=inner.querySelector('.why-quote'),h=inner.querySelector('.why-tagline'),
        b=inner.querySelector('.why-body'),s=inner.querySelector('.why-signature');
    var tl=gsap.timeline({scrollTrigger:{trigger:inner,start:'top 85%',toggleActions:'play none none none'},defaults:{ease:'power3.out'}});
    if(q)tl.from(q,{opacity:0,scale:.6,duration:.5});
    if(h)tl.from(h,{opacity:0,y:24,duration:.65},'-=.2');
    if(b)tl.from(b,{opacity:0,y:18,duration:.6},'-=.4');
    if(s)tl.from(s,{opacity:0,y:10,duration:.45},'-=.35');
  })();
  gsap.utils.toArray('.stats-grid .stat-block').forEach(function(el){
    gsap.from(el,{scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'},opacity:0,scale:.88,duration:.6,ease:'back.out(1.4)'});
  });
  stag('.awards-grid .award-card',{y:36,duration:.65},.09,'.awards-grid');
  stag('.research-list .research-card',{y:32,duration:.6},.1,'.research-list');
  stag('.work-grid .work-card',{y:36,duration:.65},.13,'.work-grid');

  // ── Blog ──────────────────────────────────────────────────────────────────
  (function(){
    var tags=gsap.utils.toArray('.hero-tags .hero-tag');
    if(tags.length)gsap.from(tags,{delay:.9,opacity:0,y:10,duration:.4,ease:'power2.out',stagger:.08});
  })();
  fadeUp('.featured-post',{y:24,duration:.7});
  stag('.blog-grid .post-card',{y:24,duration:.6},.1,'.blog-grid');

  // ── Archive — initial load only (filter JS runs independently) ────────────
  (function(){
    var grid=document.getElementById('archive-grid');if(!grid)return;
    var cards=gsap.utils.toArray('#archive-grid .post-card');if(!cards.length)return;
    gsap.from(cards,{scrollTrigger:{trigger:grid,start:'top 88%',toggleActions:'play none none none'},opacity:0,y:36,duration:.65,ease:'power3.out',stagger:.1});
  })();
  stag('.why-archive-grid .why-card',{y:32,duration:.6},.12,'.why-archive-grid');

})();
