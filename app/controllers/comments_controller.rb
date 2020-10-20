class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy, :show_history]
  # http_basic_authenticate_with name: "dhh", password: "secret", only: :destroy
  

  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    redirect_to edit_article_path(@comment.article_id)
  end

  def edit
    @comment = Comment.find(params[:id])
    # @article = Article.find(@comment.article_id)
    # binding.remote_pry
  end

  def update
    # binding.remote_pry
    
    @comment = Comment.find(params[:id])
    # @comment.update(comment_params)

    # @article = Article.find(@comment.article_id)
    # @article.comments.each do |c|
    #   if c.id == @comment.id
    #     c.update(comment_params)
    #   end
    # end
    # @article.save
  
   
    if @comment.update(comment_params)
   
      redirect_to edit_article_path(@comment.article_id)
    else
      render 'edit'
    end
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    redirect_to edit_article_path(@comment.article_id)
  end
 
  private

    def set_comment
    
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:commenter, :body, :version)
    end
end
