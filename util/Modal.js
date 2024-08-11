class Modal {
    constructor() {
        this.modal = null;
        this.overlay = null;
    }

    createModal(content) {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        document.body.appendChild(this.overlay);

        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'modal-container';
        this.modal.innerHTML = `
            <div class="modal-header">
                <button class="modal-close-btn">&times;</button>
                <h2>모달 제목</h2>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="modal-ok-btn">확인</button>
                <button class="modal-cancel-btn">취소</button>
            </div>
        `;
        document.body.appendChild(this.modal);

        // Add event listeners
        this.addEventListeners();
        
        return this.modal;
    }

    addEventListeners() {
        // Close button
        const closeButton = this.modal.querySelector('.modal-close-btn');
        closeButton.addEventListener('click', () => this.closeModal());

        // OK button
        const okButton = this.modal.querySelector('.modal-ok-btn');
        okButton.addEventListener('click', () => this.closeModal());

        // Cancel button
        const cancelButton = this.modal.querySelector('.modal-cancel-btn');
        cancelButton.addEventListener('click', () => this.closeModal());

        // Overlay click
        this.overlay.addEventListener('click', () => this.closeModal());
    }

    closeModal() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.modal = null;
        }
        if (this.overlay) {
            document.body.removeChild(this.overlay);
            this.overlay = null;
        }
    }
}

// 사용 예제
const modal = new Modal();
const modalContent = '<p>여기에 모달 내용이 들어갑니다.</p>';
const modalElement = modal.createModal(modalContent);
