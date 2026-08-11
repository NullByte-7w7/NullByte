(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var glitchChars = '!<>-_\\/[]{}—=+*^?#01';

  function scramble(el){
    if(!el) return;
    var final = el.getAttribute('data-text');
    if(!final) return;
    if(reduceMotion){ el.textContent = final; return; }
    var frame = 0, totalFrames = 9;
    clearInterval(el._glitchInterval);
    el._glitchInterval = setInterval(function(){
      var revealCount = Math.floor((frame / totalFrames) * final.length);
      var out = '';
      for(var c = 0; c < final.length; c++){
        out += (c < revealCount || final[c] === '-') ? final[c] : glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      el.textContent = out;
      frame++;
      if(frame > totalFrames){ el.textContent = final; clearInterval(el._glitchInterval); }
    }, 26);
  }

  document.addEventListener('DOMContentLoaded', function(){

    /* ---------- photo fallback (main page) ---------- */
    var photo = document.getElementById('profilePhoto');
    var photoWrap = document.getElementById('photoWrap');
    if(photo && photoWrap){
      photo.addEventListener('error', function(){ photoWrap.classList.add('no-photo'); });
    }

    /* ---------- thread cards: count + hover glitch (main page) ---------- */
    var threads = document.querySelectorAll('.thread-card');
    var countBadge = document.getElementById('countBadge');
    if(threads.length && countBadge){
      countBadge.textContent = String(threads.length).padStart(2, '0');
    }
    threads.forEach(function(card){
      var title = card.querySelector('.thread-title');
      card.addEventListener('mouseenter', function(){ scramble(title); });
      card.addEventListener('focus', function(){ scramble(title); });
    });

    /* ---------- paper title glitch-in on load (paper pages) ---------- */
    var paperTitle = document.querySelector('.paper-title');
    if(paperTitle){ scramble(paperTitle); }

    /* ---------- footer flourishes (all pages) ---------- */
    var hashId = document.getElementById('hashId');
    if(hashId){
      hashId.textContent = '0x' + Array.from({length:12}, function(){
        return Math.floor(Math.random() * 16).toString(16);
      }).join('');
    }
    var yearEl = document.getElementById('year');
    if(yearEl){ yearEl.textContent = new Date().getFullYear(); }
  });
})();
