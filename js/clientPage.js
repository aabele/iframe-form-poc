
class PaymentFormClient {

    constructor(config) {
        this.config = config;
    }

    get iframeId() {
        return `${this.config.wrapperId}-iframe`;
    }

    clearWrapper() {
        let element = document.getElementById(this.config.wrapperId);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    renderIframe() {
        this.clearWrapper();
        const wrapper = document.getElementById(this.config.wrapperId);
        wrapper.appendChild(document.createElement('iframe'));
        const iframe = wrapper.firstChild;
        iframe.id = this.iframeId;
        iframe.src = './iframe.html'
        this.listenToIframe();
    }

    msgToIframe(message) {
        document.getElementById(this.iframeId).contentWindow.postMessage(message, "*");
    }

    listenToIframe() {
        let bankPopup;
        const closeChildren = () => {
            try {
                bankPopup.close();
            } catch {}
        }

        window.addEventListener('message', event => {
            if (event.data === 'OPEN_INTERNET_BANK') {
                bankPopup = window.open(
                    "./bank.html",
                    "_blank",
                    // "toolbar=no, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes, width=600, height=600, top=100, left=100"
                );
                bankPopup.focus();
            }

            if (event.data === 'CLOSE_INTERNET_BANK_SUCCESS') {
                closeChildren();
                this.msgToIframe('PAYMENT_SUCCESS');
            }

            if (event.data === 'CLOSE_INTERNET_BANK_FAILURE') {
                closeChildren();
                this.msgToIframe('PAYMENT_FAILURE');
            }
        })
    }

}
