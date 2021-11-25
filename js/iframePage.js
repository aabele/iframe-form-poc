
class PaymentForm {

    constructor() {
        this.listenToMessage();
        this.renderStatus('Warning stranger - You are about to start new payment!')
    }

    msg(message) {
        console.log("X1");
        window.parent.postMessage(message, '*');
    }

    renderStatus(message) {
        document.getElementById('statusBlock').innerHTML = message;
    }

    listenToMessage() {
        window.addEventListener('message', event => {
            if (event.data === 'PAYMENT_SUCCESS') {
                this.renderStatus('Congratulations - you have successfully made your payment!')
            }
            if (event.data === 'PAYMENT_FAILURE') {
                this.renderStatus('Unfortunately your payment failed! Sorry!')
            }
        })
    }

    openInternetBank() {
       this.msg('OPEN_INTERNET_BANK');
    }
}
