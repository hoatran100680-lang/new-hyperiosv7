document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. HỆ THỐNG PHÁT ÂM THANH CƠ HỌC ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let globalVolume = 0.8; 

    function playSound(freq, type, duration) {
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type; 
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(globalVolume * 0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch(e) {}
    }

    const volControl = document.getElementById("volume-control");
    if (volControl) {
        volControl.addEventListener("input", (e) => { globalVolume = e.target.value / 100; });
    }

    // --- 2. SỬA TRIỆT ĐỂ LỖI KẸT THANH TAB ---
    const tabs = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".tab-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => {
                p.classList.remove("active");
                p.style.display = "none"; 
            });
            
            tab.classList.add("active");
            const targetPanel = document.getElementById(tab.dataset.tab);
            if (targetPanel) {
                targetPanel.classList.add("active");
                targetPanel.style.display = "block"; 
            }
            playSound(420, 'sine', 0.05); 
        });
    });

    // --- 3. KHỞI TẠO 12 CHỨC NĂNG PHẦN FUNC ---
    const funcGrid = document.getElementById("func-grid");
    const funcs = ["Aimbot Smooth", "Silent Aim", "AIMLOCK", "STABILITY ASSIST",
    "AIM HOLD", "AIM LOCKDOWN", "Ghim tâm đầu", "SENSITIVITY BOOSTER",
    "SCREEN BOOSTER", "SCREEN BOOSTER", "REFLEX BOOST", "PERFORMANCE MODE"];
    
    if (funcGrid) {
        funcs.forEach((name, i) => {
            const item = document.createElement("div");
            item.className = "switch-item";
            item.innerHTML = `<span>${i+1}. ${name}</span><label class="switch"><input type="checkbox" class="func-toggle"><span class="slider"></span></label>`;
            funcGrid.appendChild(item);
        });
        funcGrid.addEventListener("change", (e) => {
            if (e.target.classList.contains("func-toggle")) { playSound(e.target.checked ? 650 : 320, 'sine', 0.08); }
        });
    }

    // --- 4. KHỞI TẠO 12 MỨC TRƯỢT PHẦN BOOST (ĐẶT VỀ 0) ---
    const boostGrid = document.getElementById("boost-grid");
    const boosts = [ "PHANTOM AIM", "TITAN LOCK", "NOVA REFLEX", "SHADOW TRACKER",
    "QUANTUM TOUCH", "CYBER STABILITY", "VORTEX FOCUS", "APEX RESPONSE",
    "INFINITY CONTROL", "VELOCITY TRACKING", "NEON PRECISION", "HYPER BOOST"];
    
    if (boostGrid) {
        boosts.forEach((name, i) => {
            const item = document.createElement("div");
            item.className = "range-item";
            item.innerHTML = `<div class="range-label-row"><span>${i+1}. ${name}</span><span class="range-val" id="val-boost-${i}">0%</span></div><input type="range" min="0" max="100" value="0" class="range-input boost-slider" data-index="${i}">`;
            boostGrid.appendChild(item);
        });
        boostGrid.addEventListener("input", (e) => {
            if (e.target.classList.contains("boost-slider")) {
                const val = e.target.value;
                document.getElementById(`val-boost-${e.target.dataset.index}`).innerText = `${val}%`;
                playSound(250 + (val * 4), 'triangle', 0.04); 
            }
        });
    }

    // --- 5. GIẢ LẬP RAM & AUTO RUN CONSOLE THỜI GIAN THỰC ---
    const cOut = document.getElementById("console-output");
    const rText = document.getElementById("ram-text");
    const rFill = document.getElementById("ram-fill");
    const cleanBtn = document.getElementById("clean-ram-btn");
    
    function log(msg) {
        if (cOut) {
            cOut.innerHTML += `\n[${new Date().toLocaleTimeString()}] ${msg}`;
            cOut.scrollTop = cOut.scrollHeight;
        }
    }

    const systemLogs = ["Tối ưu hóa bộ nhớ cache...", "Quét hệ thống bảo mật [AN TOÀN]...", "Đồng bộ hóa tần số quét GPU...", "Bảo vệ bypass tài khoản..."];
    setInterval(() => {
        log(`[HỆ THỐNG] ${systemLogs[Math.floor(Math.random() * systemLogs.length)]}`);
    }, 4000);

    setInterval(() => {
        if(rText && rFill) {
            let cur = parseInt(rText.innerText);
            let next = Math.max(30, Math.min(90, cur + (Math.floor(Math.random() * 6) - 3)));
            rText.innerText = `${next}%`; rFill.style.width = `${next}%`;
        }
    }, 3000);

    if (cleanBtn) {
        cleanBtn.addEventListener("click", () => {
            playSound(800, 'sawtooth', 0.25);
            log("🔥 [CRIMSON-QUÉT] Tiến hành giải phóng bộ nhớ RAM ngầm...");
            setTimeout(() => { log("♻️ [XỬ LÝ] Đang giải phóng phân vùng đệm log game..."); }, 400);
            setTimeout(() => {
                if (rText && rFill) { rText.innerText = "10%"; rFill.style.width = "10%"; }
                log("✅ [XONG] Đã dọn sạch cấu trúc bộ nhớ! Đạt trạng thái tối ưu.");
            }, 900);
        });
    }

    // --- 6. KHỞI CHẠY GAME CHUYỂN HƯỚNG CHUẨN ĐƯỜNG DẪN STORE ---
    const maxBtn = document.getElementById("btn-ffmax");
    const thBtn = document.getElementById("btn-ffth");

    if (maxBtn) {
        maxBtn.addEventListener("click", (e) => {
            e.preventDefault();
            log("🚀 Đang mở Free Fire MAX...");
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                window.location.href = "freefiremax://";
                setTimeout(() => { window.location.href = "https://apple.com"; }, 1500);
            } else { window.location.href = "https://google.com"; }
        });
    }

    if (thBtn) {
        thBtn.addEventListener("click", (e) => {
            e.preventDefault();
            log("🚀 Đang mở Free Fire Thường...");
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                window.location.href = "freefire://";
                setTimeout(() => { window.location.href = "https://apple.com"; }, 1500);
            } else { window.location.href = "https://google.com"; }
        });
    }
});
