/* =============================================================
   NerdHub – script.js
   Shared JavaScript for all pages
   ============================================================= */

/* -------------------------------------------------------------
   1. ACCORDION
   Used on: Table_Top_RPGs.html, Homepage.html
   ------------------------------------------------------------- */
function initAccordion() {
	document.querySelectorAll('.acc-btn').forEach(function(btn) {
		btn.addEventListener('click', function() {
			var expanded = this.getAttribute('aria-expanded') === 'true';
			var bodyId   = this.getAttribute('aria-controls');
			document.querySelectorAll('.acc-btn').forEach(function(b) {
				b.setAttribute('aria-expanded', 'false');
				b.querySelector('.acc-arrow').textContent = '▼';
				document.getElementById(b.getAttribute('aria-controls')).hidden = true;
			});
			if (!expanded) {
				this.setAttribute('aria-expanded', 'true');
				this.querySelector('.acc-arrow').textContent = '▲';
				document.getElementById(bodyId).hidden = false;
			}
		});
	});
}

/* -------------------------------------------------------------
   2. LIVE EVENT COUNTDOWN TIMERS
   Used on: Homepage.html
   ------------------------------------------------------------- */
function initCountdowns() {
	var targets = {
		'countdown-sgf': new Date('2026-06-05T00:00:00'),
		'countdown-fcs': new Date('2026-08-08T00:00:00'),
		'countdown-pax': new Date('2026-09-04T00:00:00')
	};
	var anyFound = false;
	for (var id in targets) { if (document.getElementById(id)) { anyFound = true; break; } }
	if (!anyFound) return;

	function tick() {
		var now = new Date();
		for (var id in targets) {
			var diff = targets[id] - now;
			var el   = document.getElementById(id);
			if (!el) continue;
			if (diff <= 0) {
				el.textContent = '🎉 Happening now!';
			} else {
				var days = Math.floor(diff / 86400000);
				var hrs  = Math.floor((diff % 86400000) / 3600000);
				var mins = Math.floor((diff % 3600000)  / 60000);
				var secs = Math.floor((diff % 60000)    / 1000);
				el.textContent = days + 'd ' + hrs + 'h ' + mins + 'm ' + secs + 's';
			}
		}
	}
	tick();
	setInterval(tick, 1000);
}

/* -------------------------------------------------------------
   3. TOPIC TILE ANIMATED ENTRANCE
   Used on: Homepage.html
   ------------------------------------------------------------- */
function initTileEntrance() {
	var tiles = document.querySelectorAll('.topic-tile');
	if (!tiles.length) return;
	tiles.forEach(function(tile, i) {
		tile.style.opacity    = '0';
		tile.style.transform  = 'translateY(20px)';
		tile.style.transition = 'opacity 0.45s ease ' + (i * 0.1) + 's, transform 0.45s ease ' + (i * 0.1) + 's';
	});
	window.addEventListener('load', function() {
		tiles.forEach(function(tile) {
			tile.style.opacity   = '1';
			tile.style.transform = 'translateY(0)';
		});
	});
}

/* -------------------------------------------------------------
   4. ARTICLE CARD FOCUS HIGHLIGHT ON HOVER
   Used on: Homepage.html
   ------------------------------------------------------------- */
function initArticleHover() {
	var cards = document.querySelectorAll('.article-card');
	if (!cards.length) return;
	cards.forEach(function(card) {
		card.addEventListener('mouseenter', function() {
			cards.forEach(function(c) { c.style.opacity = '0.5'; });
			this.style.opacity = '1';
		});
		card.addEventListener('mouseleave', function() {
			cards.forEach(function(c) { c.style.opacity = '1'; });
		});
	});
}

/* -------------------------------------------------------------
   5. PC BUILDING FORM SUBMIT HANDLER
   Used on: PC_Building.html  (called via onsubmit="handleSubmit(event)")
   ------------------------------------------------------------- */
function handleSubmit(e) {
	e.preventDefault();
	var thanks = document.getElementById('form-thanks');
	if (!thanks) return;
	thanks.hidden = false;
	e.target.querySelectorAll('input, select, textarea, button[type=submit]').forEach(function(el) {
		el.disabled = true;
	});
	thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* -------------------------------------------------------------
   6. PLATFORM QUIZ
   Used on: Video_Games.html
   ------------------------------------------------------------- */
function initPlatformQuiz() {
	if (!document.title.includes('Video Games')) return;
	var options = [
		{ text: 'Huge game library & upgradeable hardware', result: 'PC' },
		{ text: 'Beautiful exclusives & story-driven games', result: 'PlayStation 5' },
		{ text: 'Playing anywhere – on TV and on the go',   result: 'Nintendo Switch' },
		{ text: 'Lots of great games for one monthly fee',  result: 'Xbox Series X/S' }
	];
	var section = document.createElement('section');
	section.className = 'content-section';
	var html =
		'<h2>Not Sure Which Platform? Take Our Quick Quiz!</h2>' +
		'<p>Answer one question and we will point you in the right direction.</p>' +
		'<div id="quiz-box">' +
		'<p style="font-weight:bold;color:#2F0060;margin-bottom:10px;">What matters most to you in a gaming experience?</p>' +
		'<div class="quiz-options">';
	options.forEach(function(opt) {
		html += '<button class="quiz-btn" data-result="' + opt.result + '">' + opt.text + '</button>';
	});
	html += '</div><div id="quiz-result" style="display:none;"></div></div>';
	section.innerHTML = html;
	var main = document.querySelector('main');
	var link = document.querySelector('.link-section');
	main.insertBefore(section, link);
	section.querySelectorAll('.quiz-btn').forEach(function(btn) {
		btn.addEventListener('click', function() {
			var result = this.getAttribute('data-result');
			section.querySelectorAll('.quiz-btn').forEach(function(b) { b.disabled = true; b.style.opacity = '0.5'; });
			this.style.opacity = '1';
			this.style.background = 'rgba(106,13,173,0.25)';
			var r = document.getElementById('quiz-result');
			r.style.cssText = 'display:block;margin-top:12px;padding:12px 16px;background:rgba(50,205,50,0.2);border:2px solid #32CD32;border-radius:8px;color:#1a5e1a;font-weight:bold;text-align:left;';
			r.innerHTML = '🎮 Based on your answer, <strong>' + result + '</strong> sounds like a great fit! Check out its section above to learn more.';
		});
	});
}

/* -------------------------------------------------------------
   7. TABLE ROW CLICK HIGHLIGHT
   Used on: Video_Games.html, Collectible_Cards.html, others
   ------------------------------------------------------------- */
function initTableHighlight() {
	var color = 'rgba(106,13,173,0.15)';
	if (document.title.includes('Video Games'))   color = 'rgba(50,205,50,0.15)';
	if (document.title.includes('Collectible'))   color = 'rgba(220,20,60,0.15)';
	if (document.title.includes('PC Building'))   color = 'rgba(30,144,255,0.15)';
	document.querySelectorAll('.content-table tbody tr').forEach(function(row) {
		row.style.cursor = 'pointer';
		row.addEventListener('click', function() {
			document.querySelectorAll('.content-table tbody tr').forEach(function(r) { r.style.background = ''; });
			this.style.background = color;
		});
	});
}

/* -------------------------------------------------------------
   8. PACK OPENER SIMULATOR
   Used on: Collectible_Cards.html
   ------------------------------------------------------------- */
function initPackOpener() {
	if (!document.title.includes('Collectible')) return;
	var rarities = [
		{ label: 'Common',      emoji: '⚪', chance: 60, color: '#888888' },
		{ label: 'Uncommon',    emoji: '🔷', chance: 25, color: '#1E90FF' },
		{ label: 'Rare',        emoji: '⭐', chance: 10, color: '#DC143C' },
		{ label: 'Holo Rare',   emoji: '✨', chance: 4,  color: '#FFC107' },
		{ label: 'Ultra Rare!', emoji: '🌟', chance: 1,  color: '#6A0DAD' }
	];
	var cardNames = {
		'Common':      ['Pidgey', 'Rattata', 'Weedle', 'Caterpie', 'Drowzee'],
		'Uncommon':    ['Wartortle', 'Haunter', 'Kadabra', 'Machoke', 'Weepinbell'],
		'Rare':        ['Charizard (Base)', 'Blastoise', 'Venusaur', 'Gengar', 'Alakazam'],
		'Holo Rare':   ['Charizard Holo ✨', 'Blastoise Holo ✨', 'Mewtwo Holo ✨', 'Gyarados Holo ✨'],
		'Ultra Rare!': ['Shining Charizard 🌟', 'Gold Star Rayquaza 🌟', 'Crystal Lugia 🌟']
	};
	var section = document.createElement('section');
	section.className = 'content-section';
	section.innerHTML =
		'<h2>🎴 Pack Opener Simulator</h2>' +
		'<p>Ever wondered what it feels like to open a booster pack? Click the button to find out what you pulled!</p>' +
		'<div style="text-align:center;margin-top:12px;">' +
		'<button id="open-pack-btn" class="submit-btn">Open a Pack!</button>' +
		'<div id="pack-result" style="display:none;margin-top:16px;"></div></div>';
	var main = document.querySelector('main');
	var link = document.querySelector('.link-section');
	main.insertBefore(section, link);
	document.getElementById('open-pack-btn').addEventListener('click', function() {
		var roll = Math.random() * 100, cum = 0, rarity = rarities[rarities.length - 1];
		for (var i = 0; i < rarities.length; i++) {
			cum += rarities[i].chance;
			if (roll < cum) { rarity = rarities[i]; break; }
		}
		var names = cardNames[rarity.label];
		var card  = names[Math.floor(Math.random() * names.length)];
		var r     = document.getElementById('pack-result');
		r.style.cssText = 'display:block;padding:20px;background:rgba(255,255,255,0.45);border-radius:12px;border:3px solid ' + rarity.color + ';text-align:center;animation:popIn 0.3s ease;';
		r.innerHTML =
			'<div style="font-size:2.5em;">' + rarity.emoji + '</div>' +
			'<div style="font-weight:bold;font-size:1.3em;color:' + rarity.color + ';margin:6px 0;">' + rarity.label + '</div>' +
			'<div style="font-size:1.1em;color:#2F0060;font-weight:bold;">' + card + '</div>' +
			'<p style="font-size:0.85em;color:#555;margin-top:8px;">Click again to open another pack!</p>';
	});
}

/* -------------------------------------------------------------
   9. RANDOM RECOMMENDATION GENERATOR
   Used on: Books_Videos_and_More!.html
   ------------------------------------------------------------- */
function initRecommendations() {
	if (!document.title.includes('Books')) return;
	var recs = {
		anime: [
			{ title: 'Attack on Titan',                         note: 'Epic action with a deep story. Rated TV-MA.' },
			{ title: 'My Hero Academia',                        note: 'Superhero school adventure. Great for teens.' },
			{ title: 'Fullmetal Alchemist: Brotherhood',        note: 'Widely considered one of the best anime ever made.' },
			{ title: 'Demon Slayer',                            note: 'Stunning animation with a heartfelt story. Rated TV-14.' },
			{ title: 'Studio Ghibli Films',                     note: 'Magical animated movies perfect for all ages.' }
		],
		manga: [
			{ title: 'One Piece',    note: 'The longest-running adventure manga — over 1,100 chapters!' },
			{ title: 'Naruto',       note: 'Classic ninja epic. A great starting manga for new readers.' },
			{ title: 'Chainsaw Man', note: 'Dark and creative. Best for older teens and adults.' },
			{ title: 'Dragon Ball',  note: 'The iconic series that inspired countless others.' },
			{ title: 'Spy x Family', note: 'Funny and heartwarming — a fake family on secret missions.' }
		],
		book: [
			{ title: 'The Hobbit – J.R.R. Tolkien',               note: 'The adventure that started the modern fantasy genre.' },
			{ title: "Ender's Game – Orson Scott Card",            note: 'A sci-fi masterpiece about a boy training to save Earth.' },
			{ title: 'Mistborn – Brandon Sanderson',               note: 'Epic fantasy with one of the most creative magic systems ever.' },
			{ title: 'The Name of the Wind – Patrick Rothfuss',    note: 'A legendary story of a legendary wizard.' },
			{ title: 'Ready Player One – Ernest Cline',            note: 'A love letter to gaming and pop culture.' }
		]
	};
	var section = document.createElement('section');
	section.className = 'content-section';
	section.innerHTML =
		'<h2>🎲 Random Recommendation Generator</h2>' +
		"<p>Can't decide what to watch or read next? Let us pick for you!</p>" +
		'<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:12px;">' +
		'<button class="submit-btn rec-btn" data-type="anime">Surprise me: Anime</button>' +
		'<button class="submit-btn rec-btn" data-type="manga" style="background:#DC143C;">Surprise me: Manga</button>' +
		'<button class="submit-btn rec-btn" data-type="book" style="background:#FFC107;color:#333;">Surprise me: Book</button>' +
		'</div>' +
		'<div id="rec-result" style="display:none;margin-top:16px;padding:16px;background:rgba(255,255,255,0.45);border-radius:10px;border:2px solid #6A0DAD;text-align:left;"></div>';
	var main = document.querySelector('main');
	var link = document.querySelector('.link-section');
	main.insertBefore(section, link);
	section.querySelectorAll('.rec-btn').forEach(function(btn) {
		btn.addEventListener('click', function() {
			var type  = this.getAttribute('data-type');
			var list  = recs[type];
			var pick  = list[Math.floor(Math.random() * list.length)];
			var label = type.charAt(0).toUpperCase() + type.slice(1);
			var r     = document.getElementById('rec-result');
			r.style.display = 'block';
			r.innerHTML =
				'<strong style="color:#6A0DAD;">📖 ' + label + ' Pick:</strong><br>' +
				'<span style="font-size:1.1em;font-weight:bold;color:#2F0060;">' + pick.title + '</span><br>' +
				'<span style="font-size:0.9em;color:#444;">' + pick.note + '</span>';
		});
	});
}

/* -------------------------------------------------------------
   10. INFO TILE CLICK ZOOM
   Used on: Books_Videos_and_More!.html
   ------------------------------------------------------------- */
function initTileZoom() {
	if (!document.title.includes('Books')) return;
	document.querySelectorAll('.info-tile').forEach(function(tile) {
		tile.addEventListener('click', function() {
			var isZoomed = this.style.transform === 'scale(1.06)';
			document.querySelectorAll('.info-tile').forEach(function(t) {
				t.style.transform = '';
				t.style.boxShadow = '';
			});
			if (!isZoomed) {
				this.style.transform = 'scale(1.06)';
				this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
			}
		});
	});
}

/* =============================================================
   SHARED CSS – injected once for JS-powered widgets
   ============================================================= */
(function injectStyles() {
	var style = document.createElement('style');
	style.textContent =
		'@keyframes popIn { from { transform:scale(0.8); opacity:0; } to { transform:scale(1); opacity:1; } }' +
		'.quiz-options { display:flex; flex-direction:column; gap:8px; margin-top:8px; }' +
		'.quiz-btn { background:rgba(255,255,255,0.5); border:2px solid rgba(106,13,173,0.3); border-radius:6px; padding:10px 14px; text-align:left; font-family:inherit; font-size:0.95em; cursor:pointer; transition:background 0.2s,border-color 0.2s; color:#2F0060; }' +
		'.quiz-btn:hover:not(:disabled) { background:rgba(106,13,173,0.15); border-color:#6A0DAD; }';
	document.head.appendChild(style);
})();

/* =============================================================
   INIT – run everything on DOMContentLoaded
   ============================================================= */
document.addEventListener('DOMContentLoaded', function() {
	initAccordion();
	initCountdowns();
	initTileEntrance();
	initArticleHover();
	initTableHighlight();
	initPlatformQuiz();
	initPackOpener();
	initRecommendations();
	initTileZoom();
});
