class RoomsController < ApplicationController

  before_action :set_room, only: [:show, :edit, :update, :destroy, :show_history]
   # http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show]
  
 
   def index
     @rooms = Room.all
     @room_types = RoomType.all
   end
 
   def new
     @room = Room.new

     @is_new = true
     @room_save_path = false
   end
   
   def show
     @room = Room.find(params[:id])
   end
 
   def edit
     @room = Room.find(params[:id])
     @is_new = false
     @room_save_path = room_save_path(@room.id)
   end
 
   def show_version
    #  binding.remote_pry
    # @room_type.all_versions.order('created_at DESC')
    @history_view = true
    @version = PaperTrail::Version.find_by(:id => params[:vid])
    # binding.remote_pry
    @room = @version.reify(belongs_to: true, has_many: true)
   
    # binding.remote_pry
    render 'show_version'
   end
 
   def show_history
    @versions = @room.versions
    @history_view = false
     # binding.remote_pry
    
     render 'show'
   end
 
   def create 
    # binding.remote_pry
    @room = Room.new(room_params)
  
     if @room.save
      redirect_to room_types_path
     else
       render 'new'
     end
   end
 
  def update
    @room = Room.find(params[:id])
    @room.name = params[:room][:name]
    @room.description = params[:room][:description]

    # @room_type.paper_trail.save_with_version
    # @room.save
    
    if @room.update(room_params)
      redirect_to room_types_path
    else
      render 'edit'
    end
  end
   
 
   def destroy
     @room = Room.find(params[:id])
     @room.destroy
   
     redirect_to room_types_path
   end
 
 
   private
 
     def set_room
       # binding.remote_pry
       @room = Room.find(params[:id])
     end
 
     def room_params
       params.require(:room).permit(:description, :name, :versions )
     end
 
 end