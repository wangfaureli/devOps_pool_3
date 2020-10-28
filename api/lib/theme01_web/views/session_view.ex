
defmodule Theme01Web.SessionView do
  use Theme01Web, :view

  def render("show.json", auth_token) do
    %{data: %{token: auth_token.token}}
  end
  
end