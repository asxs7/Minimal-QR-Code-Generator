function getCurrentUTCTimestamp() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

let qrInstance = null;

function updateTimestamp() {
    document.getElementById('timestamp').textContent = `UTC: ${getCurrentUTCTimestamp()}`;
}

function setUser() {
    document.getElementById('user').textContent = 'asxs7';
}

document.getElementById('qrForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const text = document.getElementById('text').value;
    
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    
    try {
        const container = document.getElementById('qrCodeContainer');
        container.innerHTML = '';
        
        qrInstance = new QRCode(container, {
            text: text,
            width: 256,
            height: 256,
            colorDark: "#2C1810",
            colorLight: "#F5F1E9",
            correctLevel: QRCode.CorrectLevel.L
        });
        
        updateTimestamp();
        
        setTimeout(() => {
            document.getElementById('result').classList.remove('hidden');
            
            document.getElementById('result').scrollIntoView({ 
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 300);
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
});

function downloadQR() {
    if (!qrInstance) return;
    
    const qrCanvas = document.querySelector('#qrCodeContainer canvas');
    const link = document.createElement('a');
    link.download = 'minimal-qr.png';
    link.href = qrCanvas.toDataURL('image/png');
    
    const btn = document.querySelector('.download-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 150);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimestamp();
    setUser();
    
    setInterval(updateTimestamp, 1000);
});
