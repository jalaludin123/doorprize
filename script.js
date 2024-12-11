document.addEventListener('DOMContentLoaded', function () {
  const winnerDisplay = document.getElementById('winner-display');
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  let isGenerating = false;
  let animationFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const names = [
    { "No": "1", "Nama": "Dedi Iskandar" }, { "No": "2", "Nama": "Ade Usman" },
    { "No": "3", "Nama": "Rifki" }, { "No": "4", "Nama": "Edi Sutardi" },
    { "No": "5", "Nama": "Suparman" }, { "No": "6", "Nama": "Armadhan Nasution" },
    { "No": "7", "Nama": "Pardamean Padang" }, { "No": "8", "Nama": "Slamet Saepudin" },
    { "No": "9", "Nama": "Muhamad Ridwan" }, { "No": "10", "Nama": "Surahmin" },
    { "No": "11", "Nama": "Suripto" }, { "No": "12", "Nama": "Catur Hendri Atmoko" },
    { "No": "13", "Nama": "Bagas Alfiat Prakoso" }, { "No": "14", "Nama": "Eeng Putra" },
    { "No": "15", "Nama": "Muhammad Ahsan" }, { "No": "16", "Nama": "Wastika" },
    { "No": "17", "Nama": "Wahyono" }, { "No": "18", "Nama": "Iyang Rusli" },
    { "No": "19", "Nama": "Suherman" }, { "No": "20", "Nama": "Ahmad Humaedi" },
    { "No": "21", "Nama": "Widi Santoso" }, { "No": "22", "Nama": "Khanapi" },
    { "No": "23", "Nama": "Mohamad Yusuf" }, { "No": "24", "Nama": "Sumiadi" },
    { "No": "25", "Nama": "Tarmidi" }, { "No": "26", "Nama": "Riyanton" },
    { "No": "27", "Nama": "Andi Setyawan" }, { "No": "28", "Nama": "Nurofik" },
    { "No": "29", "Nama": "Heri Yudo Karyono" }, { "No": "30", "Nama": "Encep Deni" },
    { "No": "31", "Nama": "Rudi Hartono" }, { "No": "32", "Nama": "Rojikin" },
    { "No": "33", "Nama": "Hasanudin" }, { "No": "34", "Nama": "Aang Budi Kurniawan" },
    { "No": "35", "Nama": "H Mohammad Suhendar" }, { "No": "36", "Nama": "Cristanto Yudotomo" },
    { "No": "37", "Nama": "Miswanto" }, { "No": "38", "Nama": "Suryono" },
    { "No": "39", "Nama": "Hendy Suhendar" }, { "No": "40", "Nama": "Indro Maryono" },
    { "No": "41", "Nama": "Wais Khamdani" }, { "No": "42", "Nama": "M. Ferdy Setiawan" },
    { "No": "43", "Nama": "Jauharus Izza Ramadhana" }, { "No": "44", "Nama": "Yoseph Ewaldo Putra" },
    { "No": "45", "Nama": "Iik Ardiyanto" }, { "No": "46", "Nama": "Hambar Sinung Mardiko" },
    { "No": "47", "Nama": "Agung Yoga Oktavianto" }, { "No": "48", "Nama": "Yana Suryana" },
    { "No": "49", "Nama": "Moch Anwar Bin Ahmadi" }, { "No": "50", "Nama": "Adang Suyatman" },
    {
      "No": "51",
      "Nama": "Andi Budiono"
    },
    {
      "No": "52",
      "Nama": "Iyon Suryono"
    },
    {
      "No": "53",
      "Nama": "Aditya"
    },
    {
      "No": "54",
      "Nama": "Meilina Puspita Sari"
    },
    {
      "No": "55",
      "Nama": "Hendra Aditya"
    },
    {
      "No": "56",
      "Nama": "Amelia Sofiany Cristy"
    },
    {
      "No": "57",
      "Nama": "Irmalia Dewi "
    },
    {
      "No": "58",
      "Nama": "Erzanita Puspaningrat"
    },
    {
      "No": "59",
      "Nama": "Desi Martini"
    },
    {
      "No": "60",
      "Nama": "Jonathan Sebastian"
    },
    {
      "No": "61",
      "Nama": "Anggi Prasetias Agusti"
    },
    {
      "No": "62",
      "Nama": "Novella Aurora Siahaan"
    },
    {
      "No": "63",
      "Nama": "Rintis Wahyuningsih"
    },
    {
      "No": "64",
      "Nama": "Heryanto Prayogi"
    },
    {
      "No": "65",
      "Nama": "Hadi Sentosa"
    },
    {
      "No": "66",
      "Nama": "Kurnain"
    },
    {
      "No": "67",
      "Nama": "Fakhri Raditya"
    },
    {
      "No": "68",
      "Nama": "Hannisa Yuliandini"
    },
    {
      "No": "69",
      "Nama": "Nadia Rhesti Hanggraeni Handoko"
    },
    {
      "No": "70",
      "Nama": "Arnis Safira"
    },
    {
      "No": "71",
      "Nama": "Mardatillah Chantika"
    },
    {
      "No": "72",
      "Nama": "Giovanni Resa Liano"
    },
    {
      "No": "73",
      "Nama": "Aji Anggono"
    },
    {
      "No": "74",
      "Nama": "Winarto Fajar Shidiq"
    },
    {
      "No": "75",
      "Nama": "Lamtiur Yuliana"
    },
    {
      "No": "76",
      "Nama": "Wakri Badi"
    },
    {
      "No": "77",
      "Nama": "Sinto"
    },
    {
      "No": "78",
      "Nama": "Sigit Surono"
    },
    {
      "No": "79",
      "Nama": "Raden Dandhy Putra Teya Pratama"
    },
    {
      "No": "80",
      "Nama": "Edi Raharjo"
    },
    {
      "No": "81",
      "Nama": "Kukuh"
    },
    {
      "No": "82",
      "Nama": "Eni Fatmasari"
    },
    {
      "No": "83",
      "Nama": "Rutimah"
    },
    {
      "No": "84",
      "Nama": "Tri Andini"
    },
    {
      "No": "85",
      "Nama": "Cokro"
    },
    {
      "No": "86",
      "Nama": "Casmudi"
    },
    {
      "No": "87",
      "Nama": "Sunari"
    },
    {
      "No": "88",
      "Nama": "Rayoto"
    },
    {
      "No": "89",
      "Nama": "Mulyana "
    },
    {
      "No": "90",
      "Nama": "Suyoto"
    },
    {
      "No": "91",
      "Nama": "Andika "
    },
    {
      "No": "92",
      "Nama": "Agung. S"
    },
    {
      "No": "93",
      "Nama": "Khoirul. H"
    },
    {
      "No": "94",
      "Nama": "Bantoro"
    },
    {
      "No": "95",
      "Nama": "Gunawan"
    },
    {
      "No": "96",
      "Nama": "Sopian"
    },
    {
      "No": "97",
      "Nama": "Bondan "
    },
    {
      "No": "98",
      "Nama": "Nurdin"
    },
    {
      "No": "99",
      "Nama": "Herman"
    },
    {
      "No": "100",
      "Nama": "Tatang"
    },
    {
      "No": "101",
      "Nama": "Edi S "
    },
    {
      "No": "102",
      "Nama": "Sopyan "
    },
    {
      "No": "103",
      "Nama": "April R"
    },
    {
      "No": "104",
      "Nama": "Kholis "
    },
    {
      "No": "105",
      "Nama": "Syarifudin"
    }
  ];

  const winners = [];

  function hasRemainingParticipants() {
    return names.length > winners.length;
  }

  function getAvailableParticipants() {
    return names.filter(name => !winners.includes(name));
  }

  // Fireworks class
  class Firework {
    constructor(x, y, targetX, targetY, winnerName) {
      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.winnerName = winnerName;
      this.speed = 2;
      this.angle = Math.atan2(targetY - y, targetX - x);
      this.velocity = {
        x: Math.cos(this.angle) * this.speed,
        y: Math.sin(this.angle) * this.speed
      };
      this.particles = [];
      this.alive = true;
      this.showText = false;
    }

    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (Math.abs(this.x - this.targetX) < 5 && Math.abs(this.y - this.targetY) < 5) {
        this.explode();
        this.alive = false;
      }
    }

    explode() {
      this.showText = true;
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 / 50) * i;
        const velocity = 3;
        this.particles.push({
          x: this.x,
          y: this.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: `hsl(${Math.random() * 360}, 50%, 50%)`
        });
      }
    }

    draw() {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();

      this.particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05;
        particle.alpha -= 0.01;
        if (particle.alpha <= 0) {
          this.particles.splice(index, 1);
        }
        ctx.fillStyle = `hsla(${particle.color}, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      if (this.showText) {
        ctx.save();
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.strokeText(this.winnerName, this.targetX, this.targetY);
        ctx.fillText(this.winnerName, this.targetX, this.targetY);
        ctx.restore();
      }
    }
  }

  let fireworks = [];

  function createFireworks(winnerName) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const targetX = Math.random() * canvas.width;
        const targetY = Math.random() * (canvas.height / 2) + 100;
        fireworks.push(new Firework(
          Math.random() * canvas.width,
          canvas.height,
          targetX,
          targetY,
          winnerName
        ));
      }, i * 200);
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks = fireworks.filter(firework => {
      firework.update();
      firework.draw();
      return firework.alive || firework.particles.length > 0;
    });

    if (fireworks.length > 0) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function generateWinner() {
    if (isGenerating) return;

    if (!hasRemainingParticipants()) {
      winnerDisplay.textContent = 'Semua peserta sudah terpilih!';
      return;
    }

    isGenerating = true;
    winnerDisplay.textContent = 'Selecting winner...';

    let shuffles = 0;
    const maxShuffles = 50;
    let selectedWinner;
    const availableParticipants = getAvailableParticipants();

    const interval = setInterval(() => {
      selectedWinner = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
      winnerDisplay.textContent = selectedWinner.Nama;
      shuffles++;

      if (shuffles >= maxShuffles) {
        clearInterval(interval);
        isGenerating = false;

        winners.push(selectedWinner);
        setTimeout(() => {
          winnerDisplay.textContent = `${selectedWinner.Nama}`;
        }, 1500);

        // Trigger fireworks with winner's name
        // createFireworks(selectedWinner.Nama);
        // animate();
      }
    }, 130);
  }
  document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      generateWinner();
    }
  });

  winnerDisplay.parentElement.addEventListener('click', generateWinner);
});
