/* =============================================================
   NerdHub – script.js
   Shared JavaScript for all pages.
   Each section is guarded so it only runs when the relevant
   elements are present on the page.
   ============================================================= */


/* ─────────────────────────────────────────────────────────────
   1. ACCORDION  (Table-Top RPGs, Homepage)
   ───────────────────────────────────────────────────────────── */
document.querySelectorAll('.acc-btn').forEach(function (btn) {
	btn.addEventListener('click', function () {
		var expanded = this.getAttribute('aria-expanded') === 'true';
		var bodyId   = this.getAttribute('aria-controls');

		// Collapse every open item first
		document.querySelectorAll('.acc-btn').forEach(function (b) {
			b.setAttribute('aria-expanded', 'false');
			b.querySelector('.acc-arrow').textContent = '▼';
			document.getElementById(b.getAttribute('aria-controls')).hidden = true;
		});

		// Then open the clicked one (unless it was already open)
		if (!expanded) {
			this.setAttribute('aria-expanded', 'true');
			this.querySelector('.acc-arrow').textContent = '▲';
			document.getElementById(bodyId).hidden = false;
		}
	});
});


/* ─────────────────────────────────────────────────────────────
   2. PC BUILDING – Build Submission Form
   ───────────────────────────────────────────────────────────── */
var buildForm = document.querySelector('.build-form');
if (buildForm) {
	buildForm.addEventListener('submit', function (e) {
		e.preventDefault();
		var thanks = document.getElementById('form-thanks');
		if (!thanks) return;
		thanks.hidden = false;
		buildForm.querySelectorAll('input, select, textarea, button[type=submit]').forEach(function (el) {
			el.disabled = true;
		});
		thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
	});
}


/* ─────────────────────────────────────────────────────────────
   3. HOMEPAGE – Live Event Countdown Timers
   ───────────────────────────────────────────────────────────── */
var countdownTargets = {
	'countdown-sgf': new Date('2026-06-05T00:00:00'),
	'countdown-fcs': new Date('2026-08-08T00:00:00'),
	'countdown-pax': new Date('2026-09-04T00:00:00')
};

function updateCountdowns() {
	var now = new Date();
	for (var id in countdownTargets) {
		var el   = document.getElementById(id);
		if (!el) continue;
		var diff = countdownTargets[id] - now;
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

if (document.getElementById('countdown-sgf')) {
	updateCountdowns();
	setInterval(updateCountdowns, 1000);
}


/* ─────────────────────────────────────────────────────────────
   4. HOMEPAGE – Topic Tile Animated Entrance
   ───────────────────────────────────────────────────────────── */
var topicTiles = document.querySelectorAll('.topic-tile');
if (topicTiles.length > 0) {
	topicTiles.forEach(function (tile, i) {
		tile.style.opacity    = '0';
		tile.style.transform  = 'translateY(20px)';
		tile.style.transition = 'opacity 0.45s ease ' + (i * 0.1) + 's, transform 0.45s ease ' + (i * 0.1) + 's';
	});
	window.addEventListener('load', function () {
		topicTiles.forEach(function (tile) {
			tile.style.opacity   = '1';
			tile.style.transform = 'translateY(0)';
		});
	});
}


/* ─────────────────────────────────────────────────────────────
   5. HOMEPAGE – Article Card Focus Highlight on Hover
   ───────────────────────────────────────────────────────────── */
var articleCards = document.querySelectorAll('.article-card');
if (articleCards.length > 0) {
	articleCards.forEach(function (card) {
		card.addEventListener('mouseenter', function () {
			articleCards.forEach(function (c) { c.style.opacity = '0.5'; });
			this.style.opacity = '1';
		});
		card.addEventListener('mouseleave', function () {
			articleCards.forEach(function (c) { c.style.opacity = '1'; });
		});
	});
}


/* ─────────────────────────────────────────────────────────────
   6. VIDEO GAMES – Platform Picker Quiz (dynamically injected)
   ───────────────────────────────────────────────────────────── */
(function () {
	var mainEl = document.querySelector('main.content-page');
	var linkSection = document.querySelector('.link-section');
	// Only run on Video Games page
	if (!mainEl || !linkSection || !document.title.includes('Video Games')) return;

	var section = document.createElement('section');
	section.className = 'content-section';
	section.innerHTML =
		'<h2>Not Sure Which Platform? Take Our Quick Quiz!</h2>' +
		'<p>Answer one question and we will point you in the right direction.</p>' +
		'<div id="quiz-box"></div>';
	mainEl.insertBefore(section, linkSection);

	var question = 'What matters most to you in a gaming experience?';
	var options  = [
		{ text: 'Huge game library &amp; upgradeable hardware', result: 'PC' },
		{ text: 'Beautiful exclusives &amp; story-driven games',  result: 'PlayStation 5' },
		{ text: 'Playing anywhere — on TV and on the go',        result: 'Nintendo Switch' },
		{ text: 'Lots of great games for one monthly fee',       result: 'Xbox Series X/S' }
	];

	var box = document.getElementById('quiz-box');
	var html = '<p style="font-weight:bold;color:#2F0060;margin-bottom:10px;">' + question + '</p><div class="quiz-options">';
	options.forEach(function (opt) {
		html += '<button class="quiz-btn" data-result="' + opt.result + '">' + opt.text + '</button>';
	});
	html += '</div><p id="quiz-result"></p>';
	box.innerHTML = html;

	box.querySelectorAll('.quiz-btn').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var result = this.getAttribute('data-result');
			box.querySelectorAll('.quiz-btn').forEach(function (b) {
				b.disabled = true;
				b.style.opacity = '0.5';
			});
			this.style.opacity = '1';
			this.style.background = 'rgba(106,13,173,0.25)';
			var r = document.getElementById('quiz-result');
			r.innerHTML = '🎮 Based on your answer, <strong>' + result + '</strong> sounds like a great fit! Check out its section above to learn more.';
			r.style.cssText = 'margin-top:12px;padding:12px 16px;background:rgba(50,205,50,0.2);border:2px solid #32CD32;border-radius:8px;color:#1a5e1a;font-weight:bold;text-align:left;';
		});
	});

	// Inject quiz button styles once
	var style = document.createElement('style');
	style.textContent =
		'.quiz-options{display:flex;flex-direction:column;gap:8px;margin-top:8px;}' +
		'.quiz-btn{background:rgba(255,255,255,0.5);border:2px solid rgba(106,13,173,0.3);border-radius:6px;padding:10px 14px;text-align:left;font-family:"OpenDyslexic",Arial,sans-serif;font-size:.95em;cursor:pointer;transition:background .2s,border-color .2s;color:#2F0060;}' +
		'.quiz-btn:hover:not(:disabled){background:rgba(106,13,173,0.15);border-color:#6A0DAD;}';
	document.head.appendChild(style);
})();


/* ─────────────────────────────────────────────────────────────
   7. COLLECTIBLE CARDS – Pack Opener Simulator (dynamically injected)
   ───────────────────────────────────────────────────────────── */
(function () {
	var mainEl = document.querySelector('main.content-page');
	var linkSection = document.querySelector('.link-section');
	if (!mainEl || !linkSection || !document.title.includes('Collectible')) return;

	var rarities = [
		{ label: 'Common',       emoji: '⚪', chance: 60, color: '#888' },
		{ label: 'Uncommon',     emoji: '🔷', chance: 25, color: '#1E90FF' },
		{ label: 'Rare',         emoji: '⭐', chance: 10, color: '#DC143C' },
		{ label: 'Holo Rare',    emoji: '✨', chance:  4, color: '#FFC107' },
		{ label: 'Ultra Rare!',  emoji: '🌟', chance:  1, color: '#6A0DAD' }
	];
	var cardNames = {
		'Common':     ['Pidgey', 'Rattata', 'Weedle', 'Caterpie', 'Drowzee'],
		'Uncommon':   ['Wartortle', 'Haunter', 'Kadabra', 'Machoke', 'Weepinbell'],
		'Rare':       ['Charizard (Base)', 'Blastoise', 'Venusaur', 'Gengar', 'Alakazam'],
		'Holo Rare':  ['Charizard Holo ✨', 'Blastoise Holo ✨', 'Mewtwo Holo ✨', 'Gyarados Holo ✨'],
		'Ultra Rare!':['Shining Charizard 🌟', 'Gold Star Rayquaza 🌟', 'Crystal Lugia 🌟']
	};

	var section = document.createElement('section');
	section.className = 'content-section';
	section.innerHTML =
		'<h2>🎴 Pack Opener Simulator</h2>' +
		'<p>Ever wondered what it feels like to open a booster pack? Click the button below to find out what you pulled!</p>' +
		'<div style="text-align:center;margin-top:12px;">' +
		'  <button id="open-pack-btn" class="submit-btn">Open a Pack!</button>' +
		'  <div id="pack-result" style="display:none;margin-top:16px;"></div>' +
		'</div>';
	mainEl.insertBefore(section, linkSection);

	document.getElementById('open-pack-btn').addEventListener('click', function () {
		var roll = Math.random() * 100;
		var cumulative = 0;
		var rarity = rarities[rarities.length - 1];
		for (var i = 0; i < rarities.length; i++) {
			cumulative += rarities[i].chance;
			if (roll < cumulative) { rarity = rarities[i]; break; }
		}
		var names = cardNames[rarity.label];
		var card  = names[Math.floor(Math.random() * names.length)];
		var result = document.getElementById('pack-result');
		result.style.cssText = 'display:block;padding:20px;background:rgba(255,255,255,0.45);border-radius:12px;border:3px solid ' + rarity.color + ';text-align:center;animation:popIn 0.3s ease;';
		result.innerHTML =
			'<div style="font-size:2.5em;">' + rarity.emoji + '</div>' +
			'<div style="font-weight:bold;font-size:1.3em;color:' + rarity.color + ';margin:6px 0;">' + rarity.label + '</div>' +
			'<div style="font-size:1.1em;color:#2F0060;font-weight:bold;">' + card + '</div>' +
			'<p style="font-size:0.85em;color:#555;margin-top:8px;">Click again to open another pack!</p>';
	});

	// Pop-in keyframe
	var style = document.createElement('style');
	style.textContent = '@keyframes popIn{from{transform:scale(0.8);opacity:0;}to{transform:scale(1);opacity:1;}}';
	document.head.appendChild(style);
})();


/* ─────────────────────────────────────────────────────────────
   8. BOOKS, VIDEOS & MORE – Random Recommendation Generator (dynamically injected)
   ───────────────────────────────────────────────────────────── */
(function () {
	var mainEl = document.querySelector('main.content-page');
	var linkSection = document.querySelector('.link-section');
	if (!mainEl || !linkSection || !document.title.includes('Books')) return;

	var recs = {
		anime: [
			{ title: 'Attack on Titan',                      note: 'Epic action with a deep story. Rated TV-MA.' },
			{ title: 'My Hero Academia',                     note: 'Superhero school adventure. Great for teens.' },
			{ title: 'Fullmetal Alchemist: Brotherhood',     note: 'Widely considered one of the best anime ever made.' },
			{ title: 'Demon Slayer',                         note: 'Stunning animation with a heartfelt story. Rated TV-14.' },
			{ title: 'Studio Ghibli Films',                  note: 'Magical animated movies perfect for all ages.' }
		],
		manga: [
			{ title: 'One Piece',    note: 'The longest-running adventure manga — over 1,100 chapters!' },
			{ title: 'Naruto',       note: 'Classic ninja epic. A great starting manga for new readers.' },
			{ title: 'Chainsaw Man', note: 'Dark and creative. Best for older teens and adults.' },
			{ title: 'Dragon Ball',  note: 'The iconic series that inspired countless others.' },
			{ title: 'Spy x Family', note: 'A funny, heartwarming story about a fake family on secret missions.' }
		],
		book: [
			{ title: 'The Hobbit – J.R.R. Tolkien',         note: 'The adventure that started the modern fantasy genre.' },
			{ title: "Ender's Game – Orson Scott Card",      note: 'A sci-fi masterpiece about a boy training to save Earth.' },
			{ title: 'Mistborn – Brandon Sanderson',         note: 'Epic fantasy with one of the most creative magic systems ever.' },
			{ title: 'The Name of the Wind – Patrick Rothfuss', note: "A legendary story of a legendary wizard." },
			{ title: 'Ready Player One – Ernest Cline',      note: 'A love letter to gaming and pop culture.' }
		]
	};

	var section = document.createElement('section');
	section.className = 'content-section';
	section.innerHTML =
		'<h2>🎲 Random Recommendation Generator</h2>' +
		'<p>Can\'t decide what to watch or read next? Let us pick for you!</p>' +
		'<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:12px;">' +
		'  <button class="submit-btn rec-btn" data-type="anime">Surprise me: Anime</button>' +
		'  <button class="submit-btn rec-btn" data-type="manga" style="background:#DC143C;">Surprise me: Manga</button>' +
		'  <button class="submit-btn rec-btn" data-type="book" style="background:#FFC107;color:#333;">Surprise me: Book</button>' +
		'</div>' +
		'<div id="rec-result" style="display:none;margin-top:16px;padding:16px;background:rgba(255,255,255,0.45);border-radius:10px;border:2px solid #6A0DAD;text-align:left;"></div>';
	mainEl.insertBefore(section, linkSection);

	document.querySelectorAll('.rec-btn').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var type  = this.getAttribute('data-type');
			var list  = recs[type];
			var pick  = list[Math.floor(Math.random() * list.length)];
			var label = type.charAt(0).toUpperCase() + type.slice(1);
			var result = document.getElementById('rec-result');
			result.style.display = 'block';
			result.innerHTML =
				'<strong style="color:#6A0DAD;">📖 ' + label + ' Pick:</strong><br>' +
				'<span style="font-size:1.1em;font-weight:bold;color:#2F0060;">' + pick.title + '</span><br>' +
				'<span style="font-size:0.9em;color:#444;">' + pick.note + '</span>';
		});
	});
})();


/* ─────────────────────────────────────────────────────────────
   9. ALL PAGES – Content Table Row Click Highlight
   ───────────────────────────────────────────────────────────── */
document.querySelectorAll('.content-table tbody tr').forEach(function (row) {
	row.style.cursor = 'pointer';
	row.addEventListener('click', function () {
		var tbody = this.closest('tbody');
		tbody.querySelectorAll('tr').forEach(function (r) { r.style.background = ''; });
		this.style.background = 'rgba(106,13,173,0.18)';
	});
});
