const form = document.getElementById('generate-form');

const qr = document.getElementById('qr-code');

const onGenerateSubmit = (event) => {
    event.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    let qrName = document.getElementById('qr-name').value;

    if (qrName === '') {
        qrName = 'qr' + Date.now()
    }

    if (qrName !== '') {
        qrName = qrName.split(' ').join('-');
    }

    if (url === '') {
        alert('Please enter a URL!');
        document.getElementById('url').focus();
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner()

            const qrCode = generateQr(url, size);
            qrCode.append(qr);

            createSaveBtn(qrCode, qrName);
        }, 1000);
    }
}

const generateQr = (url, size) => {
    const qrCode = new QRCodeStyling({
        width: size,
        height: size,
        data: url,
        dotsOptions: {
            color: "#000",
            type: "rounded"
        },
    })

    return qrCode;
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

const clearUI = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('save-img-btn');
    if (saveBtn) {
        saveBtn.remove()
    }
}

const createSaveBtn = (qrCode, qrName) => {
    const btn = document.createElement('button');
    btn.id = 'save-img-btn';
    btn.classList = 'bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 rounded w-1/3 m-auto mb-20 my-5';
    btn.innerHTML = 'Save Image';
    btn.addEventListener('click', () => {
        qrCode.download({ name: qrName, extension: 'png' })
    })
    document.getElementById('generated').appendChild(btn)
}

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);