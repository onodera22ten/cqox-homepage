// カウントダウンのターゲット日時（2026年1月1日 00:00:00）
const targetDate = new Date('2026-01-01T00:00:00').getTime();

// 数字に0埋めを追加する関数
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// カウントダウンを更新する関数
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // 時間の計算
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // DOM要素の更新
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // アニメーション効果付きで値を更新
    if (daysElement.textContent !== padZero(days)) {
        animateChange(daysElement, padZero(days));
    }
    if (hoursElement.textContent !== padZero(hours)) {
        animateChange(hoursElement, padZero(hours));
    }
    if (minutesElement.textContent !== padZero(minutes)) {
        animateChange(minutesElement, padZero(minutes));
    }
    if (secondsElement.textContent !== padZero(seconds)) {
        animateChange(secondsElement, padZero(seconds));
    }

    // カウントダウン終了時の処理
    if (distance < 0) {
        clearInterval(countdownInterval);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';

        // リリース時のメッセージを表示
        document.querySelector('.tagline').textContent = 'We Are Live!';
        document.querySelector('.description').textContent = 'プロダクトがリリースされました！';
    }
}

// 値が変わった時のアニメーション
function animateChange(element, newValue) {
    element.style.transform = 'scale(1.1)';
    element.style.transition = 'transform 0.2s ease';

    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
    }, 100);
}

// 初回実行
updateCountdown();

// 1秒ごとに更新
const countdownInterval = setInterval(updateCountdown, 1000);

// パーティクル効果を追加（オプション）
function createParticles() {
    const container = document.querySelector('.background-decoration');

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 102, 241, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(particle);
    }
}

// パーティクルアニメーションのスタイルを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            opacity: 0.8;
        }
        90% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// ページロード時にパーティクルを生成
window.addEventListener('load', createParticles);

// マウス移動による視差効果
document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.circle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    circles.forEach((circle, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});
