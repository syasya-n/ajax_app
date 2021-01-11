function memo() {
  const submit = document.getElementById("submit")
  submit.addEventListener("click",(e) => {
    const formdata = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    // openでリクエストを初期化する(create action)
    XHR.open("POST","/posts",true);
    XHR.responseType = "json";
    XHR.send(formdata);
    XHR.onload = () => {
      //レスポンスがエラーだった場合の処理
      if (XHR.status != 200) {
        // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // 処理を終了している
        return null;          
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
      <div class="post" data-id=${item.id} >
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
    list.insertAdjacentHTML("afterend",HTML);
    };
    e.preventDefault();
  });
}
addEventListener("load",memo);