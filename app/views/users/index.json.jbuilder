json.users do
  json.array! @users do |user|
    json.first_name user.first_name
    json.avatar_url user.one_avatar_url
    json.id user.id
  end
end