class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end


  def create
    post = Post.create(content:params[:content],checked: false)
    render json: {post: post}
  end

  def checked
    #  checked.jsからsend()で送られてきた情報
    post = Post.find(params[:id])
    if post.checked 
      # 既読なら解除するためにfalseに置き換える
      post.update(checked: false)
    else
      # 未読なら既読にするためtrueに変更
      post.update(checked: true)
    end
    # 更新したレコードを取得し直し、checked.jsへjson形式でデータを返却 
    item = Post.find(params[:id])
    render json: {post: item}
  end
end
