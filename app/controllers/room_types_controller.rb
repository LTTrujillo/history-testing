class RoomTypesController < ApplicationController

  before_action :set_room_type, only: [:show, :edit, :update, :destroy, :show_history]
   # http_basic_authenticate_with name: "dhh", password: "secret", except: [:index, :show]
  
 
   def index
     @room_types = RoomType.all
     @rooms = Room.all
     
    

   end
 
   def new
     @room_type = RoomType.new
     @all_rooms = Room.all
     @all_room_types = RoomType.all  
     @is_new = true
     @room_type_save_path = false
   
    #  1.times { @room_type.rooms.build }

   end
   
   def show
     @room_type = RoomType.find(params[:id])
     @rooms = @room_type.rooms
   end
 
   def edit
     @room_type = RoomType.find(params[:id])
     @rooms = @room_type.rooms
     @all_rooms = Room.all
     @all_room_types = RoomType.all
     @is_new = false
     @room_type_save_path = room_type_save_path(@room_type.id)
     
    
   end
 
   def show_version
    #  binding.remote_pry
     @history_view = true
     @version = PaperTrail::Version.find_by(:id => params[:vid])
     @room_type = @version.reify(belongs_to: true, has_many: true, has_one: true)
    #  @rooms = @room_type.rooms
 
     # binding.remote_pry
     render 'show_version'
   end
 
   def show_history
     @versions = @room_type.versions
     # binding.remote_pry
    
     render 'show_history'
   end
 
   def create 
    # binding.remote_pry
     @room_type = RoomType.new(room_type_params)
     if params[:associated_rooms] && params[:associated_rooms].size > 0
      rooms = []
      params[:associated_rooms].each do |id|
      room = Room.find_by(:id => id)
      rooms << room
    end
      @room_type.rooms = rooms
    end
  
     if @room_type.save
      redirect_to room_types_path
     else
       render 'new'
     end

   end
 
   def update
    @room_type = RoomType.find(params[:id])
    @room_type.name = params[:room_type][:name]
    @room_type.description = params[:room_type][:description]
    @room_type.rooms.delete_all
    # binding.remote_pry
    if params[:associated_rooms] && params[:associated_rooms].size > 0
      rooms = []
      params[:associated_rooms].each do |id|
      room = Room.find_by(:id => id)
      rooms << room
    end
      @room_type.rooms = rooms
    end

    @room_type.save
    # @room_type.paper_trail.save_with_version
    
    
     if @room_type.update(room_type_params)
      redirect_to room_types_path
     else
       render 'edit'
     end

    end

   
 
   def destroy
    # binding.remote_pry
     @room_type = RoomType.find(params[:id])
     if @room_type.rooms
      @room_type.rooms.each do |room|
        room.room_type_id = nil
      end
      @room_type.save
    end
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
 