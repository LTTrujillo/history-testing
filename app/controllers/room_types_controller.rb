class RoomTypesController < ApplicationController

  before_action :set_room_type, only: [:show, :edit, :update, :destroy, :show_history]
   # http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show]
  
 
   def index
     @room_types = RoomType.all
     @rooms = Room.all
    

   end
 
   def new
     @room_type = RoomType.new
     @rooms = Room.all
     1.times { @room_type.rooms.build }

   end
   
   def show
     @room_type = RoomType.find(params[:id])
     
   end
 
   def edit
     @room_type = RoomType.find(params[:id])
     @rooms = Room.all
    
   end
 
   def show_version
     @version = PaperTrail::Version.find_by(:id => params[:vid])
     @room_type = @version.reify(belongs_to: true, has_many: true, has_one: true)
 
     # binding.remote_pry
     render 'show_version'
   end
 
   def show_history
     @versions = @room_type.versions
     # binding.remote_pry
    
     render 'show_history'
   end
 
   def create 
     @room_type = RoomType.new(room_type_params)
  
     if @room_type.save
      redirect_to room_types_path
     else
       render 'new'
     end

   end
 
   def update
    
    @room_type = RoomType.find(params[:id])

    # binding.remote_pry
    @room_type.rooms.delete_all
    rooms = []
     if params[:room_type][:rooms_attributes]["0"]
      @room_type.rooms.delete_all
      room = Room.find(params[:room_type][:rooms_attributes]["0"]["id"])
      room.name = params[:room_type][:rooms_attributes]["0"]["name"]
      room.description = params[:room_type][:rooms_attributes]["0"]["description"]
      room.room_type_id = @room_type.id
      rooms << room
    end
    @room_type.rooms = rooms
    @room_type.save
    # @room_type.paper_trail.save_with_version
    
    
     if @room_type.update(room_type_params)
      redirect_to room_types_path
     else
       render 'edit'
     end

    end

   
 
   def destroy
     @room_type = RoomType.find(params[:id])
     @room_type.destroy
   
     redirect_to room_types_path
   end
 
 
   private
 
     def set_room_type
       # binding.remote_pry
       @room_type = RoomType.find(params[:id])
     end
 
     def room_type_params
       params.require(:room_type).permit(:name, :description, :versions, rooms_attributes: [:id, :name, :description])
     end
 
 end
 