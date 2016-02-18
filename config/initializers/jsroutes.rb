# https://github.com/railsware/js-routes#advanced-setup
JsRoutes.setup do |config|
  # Whitelist routes to include on the Front-End
  # NOTE: if you add a new route here, do not forget to run:
  #       $ rake tmp:cache:clear
  #       before restarting your `rails s`.
  config.include = [

  ]
end