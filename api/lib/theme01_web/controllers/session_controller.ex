defmodule Theme01Web.SessionController do
  use Theme01Web, :controller

  alias Theme01.Account.Auth
  alias Theme01.Repo
  require Logger

  def new(conn, _params) do
    render(conn, "show.json", test: "")
  end

  @spec create(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def create(conn, %{"session" => auth_params}) do
    case Auth.login(auth_params, Repo) do
      {:ok, auth_token} ->
        conn
        |> put_status(:ok)
        |> render("show.json", token: auth_token)
      :error ->
        conn
        |> put_status(:unauthorized)
        |> text("Error during token generation")
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:current_user_id)
    |> put_flash(:info, "Signed out successfully.")
    |> redirect(to: Routes.session_path(conn, :new))
  end
end