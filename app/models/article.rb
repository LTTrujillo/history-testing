class Article < ApplicationRecord
  has_many :comments, dependent: :destroy
  # validates :title, presence: true

  has_paper_trail
end
