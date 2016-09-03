class AddFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :last_name, :string
    add_column :users, :token, :string
    add_column :users, :token_expiry, :datetime
  end
end
