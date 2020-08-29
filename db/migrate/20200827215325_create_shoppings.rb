class CreateShoppings < ActiveRecord::Migration[6.0]
  def change
    create_table :shoppings do |t|
      t.string :name, null:false
      t.text :note
      t.timestamps null:false
    end
  end
end
