document.addEventListener("DOMContentLoaded", function () {

    const lenis = new Lenis({
        duration: 1.2,      // Durasi durasi scroll (makin besar makin lambat/halus)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fungsi kehalusan (easing)
        smoothWheel: true,  // Mengaktifkan scroll halus pada mouse wheel
        touchMultiplier: 2  // Responsivitas pada layar sentuh
    });

    // Hubungkan Lenis dengan requestAnimationFrame
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrasikan Lenis dengan GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const risingElements = document.querySelectorAll('.rising-mahal');

    risingElements.forEach((element) => {
        gsap.fromTo(element, {
            y: 80,         // Mulai dari 80px di bawah
            opacity: 0     // Mulai dari transparan
        },
            {
                y: 0,          // Naik ke posisi asli
                opacity: 1,    // Muncul penuh
                duration: 1.2, // Durasi 1.2 detik
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%", // Efek mulai saat elemen 90% masuk layar bawah
                    toggleActions: "play none none none"
                }
            }
        );
    });
});


// Menambahkan teks dinamis pada halaman utama
const dynamicText = document.getElementById("dynamic-text");
if (dynamicText) {
    dynamicText.textContent = "SELAMAT BELAJAR - love all";
    dynamicText.style.color = "#7f8c8d";
    dynamicText.style.fontStyle = "italic";
}

// Log navigasi tombol About
const aboutBtn = document.getElementById("aboutBtn");
if (aboutBtn) {
    aboutBtn.addEventListener("click", function () {
        console.log("Mengalihkan ke halaman biodata...");
    });
}
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// Efek Parallax pada lingkaran planet saat di-scroll
gsap.to(".planet-frame", {
    y: -50,
    scrollTrigger: {
        trigger: ".hero-section",
        scrub: true
    }
});


// Fungsi Utama Perhitungan Zakat
function hitungZakat() {
    const inputHarta = document.getElementById("totalHarta").value;
    const harta = parseFloat(inputHarta);
    const tempatHasil = document.getElementById("hasil-simulasi");

    // Validasi input kosong, NaN, atau angka negatif
    if (!inputHarta || isNaN(harta) || harta < 0) {
        tempatHasil.style.display = "block";
        tempatHasil.className = "rugi";
        tempatHasil.innerHTML = "Mohon masukkan nominal harta yang valid dan tidak negatif.";
        return;
    }

    const nisab = 91681728; // Nisab 85 gram emas
    const formatRupiahHarta = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(harta);

    tempatHasil.style.display = "block";

    // Logika penentuan wajib zakat
    if (harta >= nisab) {
        const nominalZakat = harta * 0.025; // 2.5%
        const formatZakat = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(nominalZakat);

        tempatHasil.className = "untung";
        tempatHasil.innerHTML = `Alhamdulillah, harta Anda adalah (<strong>${formatRupiahHarta}</strong>)dan telah mencapai Nisab.<br><br><strong>Zakat Harta yang wajib dikeluarkan(2,5\%):${formatZakat}</strong>`;
    } else {
        tempatHasil.className = "impas"; // Menggunakan kotak warna kuning dari CSS
        tempatHasil.innerHTML = ` Harta simpanan Anda (${formatRupiahHarta}) <strong>belum mencapai Nisab</strong> (Rp 91.681.728).<br><br>Anda belum diwajibkan mengeluarkan zakat harta, namun tetap dianjurkan untuk memperbanyak sedekah.`;
    }





}




