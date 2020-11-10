class RoomTypesController < ApplicationController

  before_action :set_room_type, only: [:edit, :update, :destroy, :show, :show_history, :show_version]
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
    #  rooms = PaperTrail::Version.where(item_type: 'Room').joins(:version_associations).where(version_associations: { foreign_key_name: 'room_type_id', foreign_key_id: @room_type.id }).order('versions.created_at desc')
    
     @history_view = true
     @version = PaperTrail::Version.find_by(:id => params[:vid])
     @old_room_type = @version.reify(has_many: true, belongs_to: true)
    #  binding.remote_pry
    #  @old_room_type.save!
    # #  @old_room_type.reload
    #  @old_room_type.rooms.each do |room|
    #   room.marked_for_destruction? ? room.destroy! : room.save!
    #  end
     if @old_room_type.rooms.length > 0
      @old_rooms = @old_room_type.rooms
     end
    #  @room_type.save

     
     
      
     
 
     # binding.remote_pry
     render 'show_version'
   end
 
   def show_history
     @versions = @room_type.versions
     
     @rooms = @room_type.rooms
     @history_view = false
     # binding.remote_pry
    
     render 'show'
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
    @room_type.save
  
     if @room_type.save!
      redirect_to room_types_path
     else
       render 'new'
     end

   end
 
  def update
    @room_type = RoomType.find(params[:id])
    @room_type.updated_at = DateTime.now
    @room_type.name = params[:room_type][:name]
    @room_type.description = params[:room_type][:description]

    # rooms = Room.where(:id => params[:associated_rooms])
    # rooms.each do |room|
    #   @room_type.room_ids << room.id
    # end
    # binding.remote_pry
    params[:associated_rooms].each do |id|
      room = Room.find(id)
      @room_type.room_ids << room.id
    end

    # @room_type = RoomType.first.versions.last.reify(has_many: true, has_one: true, belongs_to: false)
    # if @room_type.rooms
    #   @room_type.rooms.delete_all
    # end
    # binding.remote_pry
    # if params[:associated_rooms] && params[:associated_rooms].size > 0
    #   rooms = []
    #   params[:associated_rooms].each do |id|
    #   @room_type.room_ids << Room.find_by(:id => id)
    #   # rooms << room
    # end
      # @room_type.rooms = rooms
    # end
    # binding.remote_pry
    # @room_type_version = RoomType.first.versions.last.reify(has_many: true, has_one: true, belongs_to: false)
    # @room_type_version.save!
    # @room_type.save!
    # @room_type.save
    #
    
    if @room_type.save
      redirect_to room_types_path
    else
      render 'edit'
    end

  end

   
 
   def destroy
    # binding.remote_pry
     @room_type = RoomType.find(params[:id])
    #  if @room_type.rooms
    #   @room_type.rooms.each do |room|
    #     room.room_type_id = nil
    #   end
    #   @room_type.save
    # end
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
 