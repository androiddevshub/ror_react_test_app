class CreateGraphs < ActiveRecord::Migration[6.1]
  def change
    create_table :graphs do |t|
      t.string :month
      t.integer :value
      t.timestamps
    end
  end
end
