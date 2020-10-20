class RoomType < ApplicationRecord
  has_paper_trail
  has_many :rooms
  # accepts_nested_attributes_for :rooms
  accepts_nested_attributes_for :rooms, :allow_destroy => true
  #  before_update :check_update

  # def check_update
  #   return if paper_trail.changed_notably?

  #   tracking_has_many_associations = [  ]
  #   tracking_has_one_association = [  ]

  #   tracking_has_many_associations.each do |a|
  #     send(a).each do |r|
  #       if r.send(:changed_notably?) || r.marked_for_destruction?
  #         self.touch
  #         return
  #       end
  #     end
  #   end
  #   tracking_has_one_associations.each do |a|
  #     r = send(a)
  #     if r.send(:changed_notably?) || r.marked_for_destruction?
  #       self.touch
  #       return
  #     end
  #   end
  # end
end