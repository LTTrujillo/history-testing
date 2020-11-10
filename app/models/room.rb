class Room < ApplicationRecord
  has_paper_trail
  belongs_to :room_type, optional: true, autosave: true
end