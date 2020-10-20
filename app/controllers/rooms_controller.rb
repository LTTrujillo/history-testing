class RoomsController < ApplicationController

  before_action :set_room, only: [:show, :edit, :update, :destroy, :show_history]
   # http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show]
  
 
   def index
     @rooms = Room.all
     @room_types = RoomType.all
   end
 
   def new
     @room = Room.new
   end
   
   def show
     @room = Room.find(params[:id])
   end
 
   def edit
     @room = Room.find(params[:id])
   end
 
   def show_version
     @version = PaperTrail::Version.find_by(:id => params[:vid])
     @room = @version.reify(belongs_to: true, has_many: true, has_one: true)
 
     # binding.remote_pry
     render 'show_version'
   end
 
   def show_history
     @versions = @room.versions
     # binding.remote_pry
    
     render 'show_history'
   end
 
   def create 
    @room = Room.new(room_params)
    # binding.remote_pry
  
     if @room.save
      redirect_to room_types_path
     else
       render 'new'
     end
   end
 
   def update
     # binding.remote_pry
     @room = Room.find(params[:id])
 
    
     if @room.update(room_params)
       redirect_to @room
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