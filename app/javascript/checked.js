function check() {
    // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post")
  posts.forEach(function(post){
    // 最初に呼ばれたときは何もせず。クリックした後に読み込まれたときは、処理をSKIPする
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.addEventListener("click",() => {
      // メモをクリックした場合に実行する処理を定義している
      post.setAttribute("data-load","true");
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id")
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
      XHR.open("GET",`/posts/${postId}`,true);
      //レスポンスのタイプを指定する
      XHR.responseType = "json";
      // sendでリクエストを送信する
      XHR.send();
      //レスポンスを受けたとったきの処理を実施する
      XHR.onload = () => {
        //レスポンスがエラーだった場合の処理
        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了している
          return null;          
        }
        // レスポンスされたデータを変数itemに代入している
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}setInterval(check,1000);
