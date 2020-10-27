if @room_type
	json.id @room_type.id
	json.name @room_type.name
	json.description @room_type.description
else
	nil
end

if @all_rooms
	json.all_rooms @all_rooms
else
	nil
end