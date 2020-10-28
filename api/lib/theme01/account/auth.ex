defmodule Theme01.Account.Auth do
  @seed "user_token"
  @secret "k7kTFAgeBv0OR1vkPbTi8mZ5m"
  alias Theme01.Account.{Encryption, User}
  require Logger

  def login(params, repo) do
    user = repo.get_by(User, username: String.downcase(params["username"]))
    case authenticate(user, params["password"]) do
      true -> {:ok, generate_token(user)}
      _    -> :error
    end
  end

  defp authenticate(user, password) do
   if user do
       authenticated_user = case Encryption.validate_password(user, password) do
       {:ok, validated_user} -> validated_user.email == user.email
       {:error, _} -> false
       end
    else
        nil
    end
  end
  
  def generate_token(id) do
    Phoenix.Token.sign(@secret, @seed, id, max_age: 80000)
  end

  def signed_in?(conn) do
    conn.assigns[:current_user]
  end
end