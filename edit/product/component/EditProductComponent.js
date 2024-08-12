export default class EditProductComponent {
    constructor(logger, controller) {
        this.logger = logger;
        this.controller = controller;
        this.prodCode;
        this.prodName;
        this.price;
    }

    //신규 등록 모드
    init() {
        this.logger.log("EditProductComponent add mode init()");
        this.initEventListner();
    }
    //수정 모드
    initModify(params) {
        this.logger.log("EditProductComponent modify mode init()");
        this.initEventListner();
    }

    //이벤트리스너 부착
    initEventListner() {
        //저장버튼
        const saveBtn = document.getElementById("save-btn");
        saveBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const prodCode = document.getElementById("prodCode").value;
            const prodName = document.getElementById("prodName").value;
            const price = Number(document.getElementById("price").value).toLocaleString();
            if(!prodCode || !prodName || price <= 0) {
                alert("올바른 값을 입력하세요");
                return;
            }

            const isUpdated = this.controller.saveProduct([prodCode, { prodName : prodName, price: price }]);
            if(isUpdated) {
                alert("품목 등록이 완료되었습니다.");
                const modal = document.getElementById("myModal");
                modal.style.display = "none";

            } else {
                alert("이미 등록된 품목 코드입니다.");
            }
        });
        //다시쓰기 버튼
        const rewriteBtn = document.getElementById("rewrite-btn");
        rewriteBtn.addEventListener("click", (event) => {
            event.preventDefault();
            document.getElementById("prodCode").value = "";
            document.getElementById("prodName").value = "";
            document.getElementById("price").value = "";
        })
    }
} //class SearchProductComponent
