function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const name = params.get("name");
    // return {
    //     code: params.get("code"),
    //     name: params.get("name"),
    //     // 기타 데이터 추출
    // };
    console.log();
}
