const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('start-btn');

// Canvas boyutları
canvas.width = 320;
canvas.height = 350;

// Oyun Değişkenleri
let ducky = { x: 50, y: 150, w: 25, h: 25, v: 0, g: 0.5, jump: -8, sleepyMode: true };
let pipes = [];
let score = 0;
let gameActive = false;
let frame = 0;

// Ana Çizim Fonksiyonu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- UYKUCU ÖRDEĞİ ÇİZ ---
    ctx.fillStyle = ducky.sleepyMode ? '#ffdb58' : '#ffd700'; // Uykuluyken soluk sarı
    ctx.beginPath();
    ctx.arc(ducky.x + ducky.w/2, ducky.y + ducky.h/2, ducky.w/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Gözler (Uykulu Zzz...)
    ctx.fillStyle = '#333';
    if(ducky.sleepyMode) {
        ctx.fillText("Zzz", ducky.x + 5, ducky.y - 5); // Zzz efekti
        ctx.fillRect(ducky.x + 15, ducky.y + 10, 8, 2); // Kapalı göz
    } else {
        ctx.fillRect(ducky.x + 18, ducky.y + 8, 3, 5); // Açık göz
    }

    // --- MERCAN BUZLU CAM ENGELLERİ ÇİZ ---
    pipes.forEach(p => {
        // Mercan Rengi + Şeffaflık (Buzlu Cam efekti)
        ctx.fillStyle = 'rgba(255, 127, 80, 0.5)'; // Yarı şeffaf Mercan
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // Cam kenarlığı
        ctx.lineWidth = 2;

        // Üst Engel
        ctx.fillRect(p.x, 0, p.w, p.t);
        ctx.strokeRect(p.x, 0, p.w, p.t);

        // Alt Engel
        ctx.fillRect(p.x, canvas.height - p.b, p.w, p.b);
        ctx.strokeRect(p.x, canvas.height - p.b, p.w, p.b);
    });

    // --- OYUN MANTIĞI ---
    if(gameActive) {
        ducky.sleepyMode = false; // Oyun başlayınca uyanır
        ducky.v += ducky.g;
        ducky.y += ducky.v;

        // Engel Oluşturma
        if(frame % 100 === 0) {
            let space = 110; // Ördeğin geçeceği boşluk
            let t = Math.random() * (canvas.height - space - 60) + 30;
            pipes.push({x: canvas.width, w: 45, t: t, b: canvas.height - t - space});
        }

        // Engel Hareketi ve Çarpışma
        pipes.forEach(p => {
            p.x -= 1.8; // Hız
            
            // Çarpışma Kontrolü
            if(ducky.x + ducky.w > p.x && ducky.x < p.x + p.w && (ducky.y < p.t || ducky.y + ducky.h > canvas.height - p.b)) {
                gameOver();
            }
            
            // Skor Artışı
            if(p.x === 50) { score++; scoreElement.innerText = score; }
        });

        // Sınır Kontrolleri
        if(ducky.y > canvas.height || ducky.y < 0) gameOver();
        
        // Ekrandan çıkan engelleri temizle
        pipes = pipes.filter(p => p.x + p.w > 0);
        frame++;
    } else {
        ducky.sleepyMode = true; // Beklerken uyur
    }

    requestAnimationFrame(draw);
}

function gameOver() {
    gameActive = false;
    alert("Zzz... Tekrar uykuya daldı! Skorun: " + score);
    ducky.y = 150; ducky.v = 0; pipes = []; score = 0;
    scoreElement.innerText = "0";
    startOverlay.classList.remove('hidden'); // Başlangıç ekranını geri getir
}

// Kontroller
startBtn.addEventListener('click', () => { 
    gameActive = true; 
    startOverlay.classList.add('hidden'); // Başlangıç ekranını gizle
});

// Zıplama Kontrolleri
const jumpAction = (e) => { 
    if(!gameActive) return;
    if(e.type === 'keydown' && e.code !== 'Space') return;
    e.preventDefault(); 
    ducky.v = ducky.jump; 
};

window.addEventListener('keydown', jumpAction);
canvas.addEventListener('mousedown', jumpAction); 
canvas.addEventListener('touchstart', jumpAction); // Mobil desteği

draw();
        
