class ArticlesController < ApplicationController

 before_action :set_article, only: [:show, :edit, :update, :destroy, :show_history]
  # http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show]
 

  def index
    @articles = Article.all
  end

  def new
    @article = Article.new
  end
  
  def show
    @article = Article.find(params[:id])
  end

  def edit
    @article = Article.find(params[:id])
  end

  def show_version
    @version = PaperTrail::Version.find_by(:id => params[:vid])
    @article = @version.reify(belongs_to: true, has_many: true, has_one: true)

    # binding.remote_pry
    render 'show_version'
  end

  def show_history
    @versions = @article.versions
    # binding.remote_pry
   
    render 'show_history'
  end

  def create 
    @article = Article.new(article_params)
 
    if @article.save
      redirect_to @article
    else
      render 'new'
    end
  end

  def update
    @article = Article.find(params[:id])
   
    if @article.update(article_params)
      redirect_to @article
    else
      render 'edit'
    end
  end
  

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
  
    redirect_to articles_path
  end


  private

    def set_article
      # binding.remote_pry
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :text, :versions)
    end

end
