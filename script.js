// Buton ve mesaj alanını seçelim
const btn = document.getElementById('magic-btn');
const card = document.querySelector('.glass-card');

// Butona tıklandığında olacaklar
btn.addEventListener('click', () => {
    // 1. Eğlenceli bir efekt: Kartı hafifçe salla
    card.style.transform = "scale(1.02) rotate(1deg)";
    
    // 2. Butonun rengini anlık değiştir
    btn.textContent = "Sihir Gerçekleşti! ✨";
    btn.style.background = "linear-gradient(45deg, #ff7f50, #0f52ba)"; // Renkleri ters çevir
    
    // 3. Konsola selam gönder (F12 ile görülebilir)
    console.log("Safir ve Mercan uyumu harika!");

    // 4. Yarım saniye sonra kartı eski haline getir
    setTimeout(() => {
        card.style.transform = "scale(1) rotate(0deg)";
    }, 500);
});

// Fare butonun üzerindeyken küçük bir parlama efekti ekleyelim
btn.addEventListener('mouseover', () => {
    btn.style.boxShadow = "0 0 25px rgba(255, 255, 255, 0.4)";
});

btn.addEventListener('mouseout', () => {
    btn.style.boxShadow = "0 0 15px rgba(255, 127, 80, 0.5)";
});
